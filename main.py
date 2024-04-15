from flask import Flask, request, jsonify
from flask_cors import CORS  # Import Flask-CORS
import cv2
import numpy as np
from keras.models import load_model
from keras.preprocessing.image import img_to_array

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load your trained model
model = load_model('model.h5')

# Load the face detector model
face_classifier = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# Define the labels of emotions
emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'image' in request.files:
        file = request.files['image']
        img = file.read()
        npimg = np.frombuffer(img, np.uint8)
        frame = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_classifier.detectMultiScale(gray, 1.3, 5)

        results = []
        for (x, y, w, h) in faces:
            roi_gray = gray[y:y+h, x:x+w]
            roi_gray = cv2.resize(roi_gray, (48, 48), interpolation=cv2.INTER_AREA)
            if np.sum([roi_gray]) != 0:
                roi = roi_gray.astype('float')/255.0
                roi = img_to_array(roi)
                roi = np.expand_dims(roi, axis=0)

                prediction = model.predict(roi)[0]
                label = emotion_labels[prediction.argmax()]
                # Convert position to JSON serializable format
                position = (int(x), int(y), int(w), int(h))
                results.append({'emotion': label, 'position': position})

        return jsonify(results)
    else:
        return "No image found", 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5006)

