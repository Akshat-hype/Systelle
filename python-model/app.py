from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

# Load trained model
model = joblib.load("pcod_pcos_predictor_model.pkl")

# Initialize Flask app
app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Map frontend keys to model input format
    input_dict = {
        "How was your flowing?": data.get("How_was_your_flowing"),
        "Any Spotting or irregular spotting?": data.get("Any_Spotting_or_irregular_spotting"),
        "What is your pain level?": data.get("What_is_your_pain_level"),
        "How was your sleep quality?": data.get("How_was_your_sleep_quality"),
        "How you feel about your skin?": data.get("How_you_feel_about_your_skin"),
        "How you feel about your hair?": data.get("How_you_feel_about_your_hair"),
        "Your cycle last upto?": data.get("Your_cycle_last_upto"),
        "Number of days of menstrual cycle?": data.get("Number_of_days_of_menstrual_cycle")
    }

    # Check for missing values
    if any(v is None for v in input_dict.values()):
        return jsonify({"error": "Missing input fields"}), 400

    # Convert to DataFrame
    input_df = pd.DataFrame([input_dict])

    # Predict using model
    try:
        prediction = model.predict(input_df)[0]
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

    return jsonify({
        "pcod_pcos_chance_percent": round(prediction, 2)
    })

if __name__ == '__main__':
    app.run(debug=True)
