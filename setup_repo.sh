#!/bin/bash
# -----------------------------------------------------------------------------
# A script to initialize a Git repository and push it to GitHub.
#
# INSTRUCTIONS:
# 1. Open the terminal in this Firebase Studio environment.
# 2. Make this script executable by running:
#    chmod +x setup_repo.sh
# 3. Execute the script by running:
#    ./setup_repo.sh
#
# The script will handle initializing Git, committing all files, and
# pushing them to your specified GitHub repository.
# -----------------------------------------------------------------------------

# Exit immediately if a command exits with a non-zero status.
set -e

# Your GitHub repository URL
GITHUB_URL="https://github.com/Snehahm10/MCQ-Generator-Firebase.git"
MAIN_BRANCH="main"

# --- Script ---
echo "Starting repository setup..."

# Clean up any previous Git initializations
if [ -d ".git" ]; then
  echo "Removing existing .git directory..."
  rm -rf .git
fi

# 1. Initialize Git repository
echo "Initializing local git repository..."
git init

# 2. Set the main branch name
git branch -M "$MAIN_BRANCH"

# 3. Add all the project files
echo "Adding all project files to staging..."
git add .

# 4. Make the initial commit
echo "Creating the first commit..."
# Use -m to provide the commit message directly
git commit -m "Initial commit: Add all project files from Firebase Studio"

# 5. Add your GitHub repository as the remote origin
echo "Adding remote origin: $GITHUB_URL"
git remote add origin "$GITHUB_URL"

# 6. Push the code to GitHub, overwriting the remote
echo "Pushing code to GitHub... This will overwrite the remote repository."
# Use --force to ensure the push succeeds even with differing histories
git push --force -u origin "$MAIN_BRANCH"

echo "---"
echo "✅ All done! Your project code should now be in your GitHub repository."
echo "You can now go to your computer and run 'git clone $GITHUB_URL' to download it."
