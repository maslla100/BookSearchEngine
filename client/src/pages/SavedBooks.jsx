import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, DELETE_BOOK } from '../graphql/queries'; // Assume GET_ME is your query for fetching user data
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  // Removed the useState for userData and userDataLength. We will use data from useQuery

  // Use the Apollo useQuery hook to fetch the logged-in user's data
  const { data, loading, error, refetch } = useQuery(GET_ME, {
    // Do not run the query if not logged in
    skip: !Auth.loggedIn(),
  });

  const [deleteBook] = useMutation(DELETE_BOOK, {
    onCompleted: () => refetch(), // Refetch user data after a book is deleted
  });

  const handleDeleteBook = async (bookId) => {
    if (!Auth.loggedIn()) {
      console.log('You need to be logged in!');
      return;
    }

    try {
      await deleteBook({
        variables: { bookId },
      });

      // Upon success, remove the book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h2>LOADING...</h2>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data.me) return <h2>You need to log in!</h2>;

  const { savedBooks } = data.me;

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {savedBooks.length
            ? `Viewing ${savedBooks.length} saved ${savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {savedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image && <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors.join(', ')}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
