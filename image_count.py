from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/script.js')
def serve_script():
    return send_from_directory('.', 'script.js')

@app.route('/images/<path:filename>')
def serve_images(filename):
    return send_from_directory('images', filename)

@app.route('/image-count')
def image_count():
    image_extensions = ('.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg')
    image_dir = os.path.join(os.getcwd(), 'images')
    count = 0
    for root, dirs, files in os.walk(image_dir):
        count += sum(1 for file in files if file.lower().endswith(image_extensions))
    return jsonify({'count': count})

if __name__ == '__main__':
    app.run(debug=True)

