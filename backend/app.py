from transformers import AutoTokenizer, AutoModelForCausalLM
from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__, static_folder='../public')  # Point Flask to serve static files from 'public'

# Load the tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("openai-community/gpt2-medium")
model = AutoModelForCausalLM.from_pretrained("openai-community/gpt2-medium")

# Route for generating text (Chatbot API)
@app.route('/generate', methods=['POST'])
def generate_text():
    data = request.json
    input_text = data.get("inputs", "")

    inputs = tokenizer(input_text, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=100)
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return jsonify({"generated_text": generated_text})

# Serve the main frontend page (index.html)
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

# Serve other static files (like chatbot.js, CSS, images, etc.)
@app.route('/<path:path>')
def serve_static_file(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    app.run(debug=True)
