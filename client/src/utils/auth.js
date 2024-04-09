
class Auth {
  // Store JWT Token in localStorage
  static login(token) {
    localStorage.setItem('id_token', token);
  }

  // Retrieve the token from localStorage
  static getToken() {
    return localStorage.getItem('id_token');
  }

  // Remove the token and user info from localStorage, effectively logging the user out
  static logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }

  // Check if the user is logged in by checking the presence of the token
  static loggedIn() {
    const token = this.getToken();
    return !!token; // Convert token presence to a boolean
  }
}

export default Auth;
