from flask import Flask, request, jsonify
from flask_cors import CORS
from iris_idealai import Iris
import base64
from io import BytesIO
from PIL import Image

# Initialize the Flask application
app = Flask(__name__)
CORS(app)

# Initialize the Iris API
api_key = 'mark-ZvK8ZoYZgd8rF2q2t9xW7nFWx7jlwYaxikxCb4iEhWI9dMuofs8Kz23JzCXmjnt3'
iris = Iris(api_key=api_key)

# Endpoint for text generation
@app.route('/generate_text', methods=['POST'])
def generate_text():
    data = request.json
    prompt = data.get('prompt', '')

    if prompt:
        try:
            # Call the Iris API to generate text
            response = iris.generate_chunk_text(prompt)

            return jsonify({'status': 'success', 'answer': response}), 200

        except Exception as e:
            return jsonify({'status': 'failed', 'answer': str(e)}), 500

    return jsonify({'status': 'failed', 'answer': 'Prompt is required.'}), 400

# Endpoint for image generation
@app.route('/generate_image', methods=['POST'])
def generate_image():
    data = request.json
    prompt = data.get('prompt', '')

    if prompt:
        try:
            # Call the Iris API to generate an image and get the PIL image
            image = iris.generate_image(prompt)

            # Check if the image object is valid
            if isinstance(image, Image.Image):
                # Convert the image to base64
                buffered = BytesIO()
                image.save(buffered, format="JPEG")  # Save the image in the desired format (JPEG, PNG, etc.)
                img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')  # Convert to base64 string

                return jsonify({'status': 'success', 'image': img_str}), 200
            else:
                return jsonify({'status': 'failed', 'answer': 'Invalid image response from Iris API.'}), 500

        except Exception as e:
            return jsonify({'status': 'failed', 'answer': str(e)}), 500

    return jsonify({'status': 'failed', 'answer': 'Prompt is required.'}), 400

@app.route('/analyze_image', methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        return jsonify({'status': 'failed', 'answer': 'No image file provided.'}), 400
    
    image_file = request.files['image']
    prompt = request.form.get('prompt', 'Explain every detail in this picture.')

    try:
        # Save image to a temporary file
        image = Image.open(image_file)
        image_path = "temp_image.png"  # Save the uploaded image to a temporary path
        image.save(image_path)

        # Analyze the image using the Iris API
        result = iris.analyze_image(image_input=image_path, prompt=prompt)
        
        return jsonify({'status': 'success', 'answer': result}), 200

    except Exception as e:
        return jsonify({'status': 'failed', 'answer': str(e)}), 500

# Run the application
if __name__ == '__main__':
    app.run(debug=True)
