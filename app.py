from flask import Flask, request, jsonify
from huggingface_hub import InferenceClient
import os

app = Flask(__name__)

# Load API key from environment variable
api_key = os.getenv('my_api_key')
client = InferenceClient(api_key=api_key)

@app.route('/api/message', methods=['POST'])
def handle_message():
    data = request.get_json()

    if not data or 'message' not in data:
        return jsonify({"error": "No message provided"}), 400

    user_message = data['message']

    try:
        # Call Hugging Face API for chatbot completion
        messages = [{"role": "user", "content": user_message}]
        reply = ""

        # Using the chat_completion streaming method
        for message in client.chat_completion(
            model="microsoft/DialoGPT-medium",
            messages=messages,
            max_tokens=500,
            stream=True,
        ):
            reply += message.choices[0].delta.content

        return jsonify({"reply": reply})

    except Exception as e:
        print(f"Error during Hugging Face API call: {e}")
        return jsonify({"error": "Failed to generate response"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
