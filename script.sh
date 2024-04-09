#!/bin/bash

# Loop through all files in the target directories, excluding node_modules and package-lock.json files
find ./BookSearchEngine/* \( -type d -name 'node_modules' -prune \) -o \( -type d -name 'dist' -prune \) -o \( -type f -name '*.jpeg' -prune \) -o \( -type f -name '*.pdf' -prune \) -o \( -type f -name '*.ico' -prune \) -o \( -type f -name '*.md' -prune \) -o \( -type f -name '*.png' -prune \) -o \( -type f -name '*.gitignore' -prune \) -o \( -type f -name '*.css' -prune \) -o \( -type f -name '*.ico' -prune \) -o \( -type f -name 'package-lock.json' -prune \) -o -type f -print0 | while IFS= read -r -d $'\0' file; do
    # Print the file name at the beginning
    echo "---- START OF $file ----"
    # Cat (output) the file content
    cat "$file"
    # Print the file name at the end
    echo "---- END OF $file ----"
    # Optionally, add an extra echo for better readability between files
    echo
done