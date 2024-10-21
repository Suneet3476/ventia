from flask import Flask, request, jsonify, render_template
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import gc

app = Flask(__name__)

# Load tokenizer globally to save memory on repeated requests
tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-small")

@app.route('/message', methods=['POST'])
def get_bot_response():
    # Force garbage collection before loading the model
    gc.collect()

    # Load the model inside the function to reduce memory usage
    model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-small")
    model.eval()  # Set model to evaluation mode
    device = torch.device("cpu")  # Use CPU to limit memory usage
    model.to(device)

    # Get the user's message from the request body
    user_message = request.json.get('message')

    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    # Limit input length to avoid excessive memory use
    if len(user_message) > 200:  # Adjust length as needed
        return jsonify({'error': 'Message too long'}), 400

    # Encode the input message for the model
    inputs = tokenizer.encode(user_message + tokenizer.eos_token, return_tensors="pt").to(device)

    with torch.no_grad():  # Disable gradient calculation
        outputs = model.generate(inputs, max_length=1000, pad_token_id=tokenizer.eos_token_id)

    bot_message = tokenizer.decode(outputs[:, inputs.shape[-1]:][0], skip_special_tokens=True)

    return jsonify({'reply': bot_message})

# Serve the chatbot HTML page
@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
