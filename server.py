from flask import Flask, request, jsonify, render_template
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

app = Flask(__name__)

# Load the model and tokenizer once at startup
tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")
model.eval()  # Set the model to evaluation mode

@app.route('/message', methods=['POST'])
def get_bot_response():
    # Get the user's message from the request body
    user_message = request.json.get('message')

    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    try:
        # Encode the input message for the model
        inputs = tokenizer.encode(user_message + tokenizer.eos_token, return_tensors="pt")

        # Check if the input length is acceptable
        if inputs.size(1) > 1024:  # Limiting to 1024 tokens
            return jsonify({'error': 'Message too long'}), 400

        # Generate response using the model
        with torch.no_grad():  # Disable gradient calculation for efficiency
            outputs = model.generate(inputs, max_length=1000, pad_token_id=tokenizer.eos_token_id)

        # Decode the bot's response
        bot_message = tokenizer.decode(outputs[:, inputs.shape[-1]:][0], skip_special_tokens=True)

        return jsonify({'reply': bot_message})

    except Exception as e:
        # Log the error for debugging
        print(f"Error generating response: {e}")
        return jsonify({'error': 'An error occurred while processing your request.'}), 500

# Serve the chatbot HTML page
@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')

if __name__ == '__main__':
    # Start the Flask server
    app.run(host='0.0.0.0', port=5000)
