# Import necessary modules
from flask import Flask, request, jsonify
from palm import palmChat
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Define endpoint to handle incoming messages
@app.route('/api/chat', methods=['POST'])
def chat():
    # Get the message from the request
    message = request.json['message']
    
    # Call your chat model to generate response
    trax = palmChat("UserIDTest", True, 0.8, message)
    response = trax.palm_response
    
    # Return the response as JSON
    return jsonify({'response': response}), 200, {'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'}

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
