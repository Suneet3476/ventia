import os
import requests
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Get the Hugging Face API key from environment variables
HF_API_KEY = os.getenv('HF_API_KEY')

if not HF_API_KEY:
    raise ValueError("Hugging Face API key is missing. Please set it as an environment variable.")

API_URL = "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-125M"
headers = {"Authorization": f"Bearer {HF_API_KEY}"}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

@app.route('/message', methods=['POST'])
def get_bot_response():
    user_message = request.json.get('message')
    
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    try:
        # Send the user's message to Hugging Face API
        response = query({"inputs": user_message})
        bot_message = response.get('generated_text', 'Sorry, I didn\'t get that.')

        return jsonify({'reply': bot_message})

    except Exception as e:
        print(f"Error generating response: {e}")
        return jsonify({'error': 'An error occurred while processing your request.'}), 500

# Serve the chatbot HTML page
@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))  # Use the PORT environment variable or default to 5000
    app.run(host='0.0.0.0', port=port)
