from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)  


with open("xgb_model.pkl", "rb") as f:
    model = pickle.load(f)


FEATURE_ORDER = [
    "HighBP","HighChol","CholCheck","BMI","Smoker","Stroke",
    "HeartDiseaseorAttack","PhysActivity","Fruits","Veggies",
    "HvyAlcoholConsump","AnyHealthcare","NoDocbcCost","GenHlth",
    "MentHlth","PhysHlth","DiffWalk","Sex","Age","Education","Income"
]

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json


        for feat in FEATURE_ORDER:
            if feat not in data:
                return jsonify({"error": f"Missing feature: {feat}"}), 400

        features = np.array([data[feat] for feat in FEATURE_ORDER]).reshape(1, -1)


        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0][1] 

        return jsonify({
            "prediction": int(prediction),
            "probability": float(probability)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
