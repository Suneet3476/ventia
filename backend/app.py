from transformers import AutoTokenizer, AutoModelForCausalLM
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load the tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("openai-community/gpt2-medium")
model = AutoModelForCausalLM.from_pretrained("openai-community/gpt2-medium")

# Route for generating text
@app.route('/generate', methods=['POST'])
def generate_text():
    data = request.json
    input_text = data.get("inputs", "")

    inputs = tokenizer(input_text, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=100)
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return jsonify({"generated_text": generated_text})

if __name__ == '__main__':
    app.run(debug=True)
