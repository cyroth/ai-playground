## Gemini API Playground

This document serves as a playground for experimenting with the Gemini API.

### Setup

1. **Install the Google Generative AI library:**

    ```bash
    pip install google-generativeai
    ```

2. **Get an API Key:**

    * Go to the [Google AI Studio](https://aistudio.google.com/).
    * Create a new API key.

3. **Configure your environment:**

    Set your API key as an environment variable:

    ```bash
    export GOOGLE_API_KEY="YOUR_API_KEY"
    ```

    Replace `YOUR_API_KEY` with the key you obtained.

### Examples

#### 1. Text Generation

```python
import google.generativeai as genai
import os

# Configure the API key
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

# Initialize the model
model = genai.GenerativeModel('gemini-pro')

# Generate content
response = model.generate_content("Tell me a story about a brave knight.")
print(response.text)
```

#### 2. Chat Conversation

```python
import google.generativeai as genai
import os

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])

print(chat.send_message("Hello, how are you?").text)
print(chat.send_message("What's your favorite color?").text)
```

#### 3. Multimodal Input (Image and Text)

```python
import google.generativeai as genai
import os
from PIL import Image

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

model = genai.GenerativeModel('gemini-pro-vision')

# Load an image (replace with your image path)
img = Image.open('path/to/your/image.jpg')

response = model.generate_content(["What is in this picture?", img])
print(response.text)
