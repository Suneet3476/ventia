from flask import Flask, request, jsonify, render_template
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

app = Flask(__name__)

# Load the GPT-Neo 125M model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("EleutherAI/gpt-neo-125M")  # Lighter GPT model
model = AutoModelForCausalLM.from_pretrained("EleutherAI/gpt-neo-125M")
model.eval()
device = torch.device("cpu")  # Ensure the model runs on CPU
model.to(device)

@app.route('/message', methods=['POST'])
def get_bot_response():
    # Disable gradients
    torch.set_grad_enabled(False)

    # Get the user's message from the request body
    user_message = request.json.get('message')

    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    try:
        # Encode the input message for the model
        inputs = tokenizer.encode(user_message + tokenizer.eos_token, return_tensors="pt").to(device)

        if inputs.size(1) > 1024:  # Limiting to 1024 tokens
            return jsonify({'error': 'Message too long'}), 400

        with torch.no_grad():
            # Generate a response with a limited max length for efficiency
            outputs = model.generate(inputs, max_length=200, pad_token_id=tokenizer.eos_token_id)

        bot_message = tokenizer.decode(outputs[:, inputs.shape[-1]:][0], skip_special_tokens=True)

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
