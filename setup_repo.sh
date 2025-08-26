#!/bin/bash

# A script to initialize a new Git repository, commit all files,
# and push to a new remote repository on GitHub.

# --- Configuration ---
# Replace this URL with your own new, empty GitHub repository URL.
GITHUB_URL="https://github.com/Snehahm10/MCQ-Generator-Firebase.git"
MAIN_BRANCH="main"

# --- Script ---
echo "Starting repository setup..."

# 1. Initialize Git repository
echo "Initializing local git repository..."
git init

# 2. Add all the project files
echo "Adding all project files..."
git add .

# 3. Make the initial commit
echo "Creating the first commit..."
git commit -m "Initial commit: Add project files from Firebase Studio"

# 4. Set the main branch name
git branch -M "$MAIN_BRANCH"

# 5. Add your GitHub repository as the remote
echo "Adding remote origin: $GITHUB_URL"
git remote add origin "$GITHUB_URL"

# 6. Push the code to GitHub
echo "Pushing code to GitHub..."
git push -u origin "$MAIN_BRANCH"

echo "---"
echo "✅ All done! Your project code has been pushed to your GitHub repository."
echo "You can now clone it to your local machine from there."
