# Project Overview

This repository is a "playground" for AI-driven code generation and experimentation. It contains a variety of small, self-contained projects in different languages and frameworks. The projects are not directly related to each other but serve as test cases for AI-powered development.

The main technologies and frameworks used in this repository are:

*   **Python:** Flask
*   **HTML/CSS:** Bootstrap
*   **PowerShell**

The overall architecture is a collection of independent projects, each in its own subdirectory.

# Building and Running

## Python/Flask (Warframe Bless App)

1.  **Navigate to the project directory:**
    ```bash
    cd python/warframe-bless-app-flask
    ```
2.  **Install dependencies:**
    ```bash
    pip install Flask
    ```
3.  **Run the application:**
    ```bash
    python app.py
    ```
The application will be available at `http://127.0.0.1:5000`.

## HTML (Gym Website)

1.  **Open the `gym.html` file in a web browser:**
    ```bash
    # Open the file directly or use a live server extension in your IDE.
    # For example, with Python's built-in server:
    cd html/gym
    python -m http.server
    ```
    The website will be available at `http://localhost:8000/gym.html`.

## PowerShell (Hello World)

1.  **Navigate to the project directory:**
    ```bash
    cd powershell
    ```
2.  **Execute the script:**
    ```powershell
    ./hello-world.ps1
    ```

# Development Conventions

Due to the nature of this repository as a collection of disparate experiments, there are no strict, repository-wide development conventions. Each project is self-contained and follows the conventions of its respective language or framework.

However, the following general principles can be observed:

*   **Clear and descriptive naming:** File and directory names are generally indicative of their purpose (e.g., `warframe-bless-app-flask`, `gym`).
*   **Standard project structures:** The projects follow common structural patterns for their respective ecosystems (e.g., the Flask app's `app.py` and `templates` directory).
*   **Minimalism:** The projects are kept small and focused, each demonstrating a specific concept or technology.
