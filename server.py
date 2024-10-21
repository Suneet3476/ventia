from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

# Hugging Face API settings
API_URL = "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-125M"
headers = {"Authorization": "Bearer YOUR_HUGGINGFACE_API_KEY"}  # Replace with your actual API key

def query_huggingface(payload):
    try:
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()
    except Exception as e:
        print(f"Error in API request: {e}")
        return {'error': 'An error occurred while contacting the API.'}

@app.route('/message', methods=['POST'])
def get_bot_response():
    # Get the user's message from the request body
    user_message = request.json.get('message')

    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    try:
        # Prepare the payload for the Hugging Face API
        payload = {"inputs": user_message}

        # Send the request to the Hugging Face API
        response_data = query_huggingface(payload)

        # Check for errors in the API response
        if 'error' in response_data:
            return jsonify({'error': response_data['error']}), 500

        # Extract the generated response
        bot_message = response_data[0]['generated_text']

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
