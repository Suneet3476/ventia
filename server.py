from flask import Flask, request, jsonify, render_template
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

app = Flask(__name__)

# Load the model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")

@app.route('/message', methods=['POST'])
def get_bot_response():
    # Get the user's message from the request body
    user_message = request.json.get('message')

    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    # Encode the input message for the model
    inputs = tokenizer.encode(user_message + tokenizer.eos_token, return_tensors="pt")

    # Generate response using the model
    outputs = model.generate(inputs, max_length=1000, pad_token_id=tokenizer.eos_token_id)
    bot_message = tokenizer.decode(outputs[:, inputs.shape[-1]:][0], skip_special_tokens=True)

    return jsonify({'reply': bot_message})

# Serve the chatbot HTML page
@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')

if __name__ == '__main__':
    # Start the Flask server
    app.run(host='0.0.0.0', port=5000)
