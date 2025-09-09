import React, { useState } from "react";
import { useForm } from "react-hook-form";

const RadioGroup = ({ label, name, options, register, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-2 flex items-center space-x-4">
      {options.map((option) => (
        <label key={option.value} className="flex items-center">
          <input
            type="radio"
            value={option.value}
            {...register(name, { required: `${label} is required.` })}
            className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
    {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
  </div>
);

const SelectField = ({ label, name, options, register, error }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      id={name}
      {...register(name, { required: `${label} is required.` })}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      <option value="">Select {label.toLowerCase()}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
  </div>
);

const NumberField = ({
  label,
  name,
  placeholder,
  register,
  error,
  validation = {},
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type="number"
      id={name}
      placeholder={placeholder}
      {...register(name, {
        required: `${label} is required.`,
        valueAsNumber: true,
        ...validation,
      })}
      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
    {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
  </div>
);

export default function Form() {
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError("");
    setPredictionResult(null);

    const formattedData = Object.entries(data).reduce((acc, [key, value]) => {
      acc[key] = Number(value);
      return acc;
    }, {});

    console.log("Submitting data:", formattedData);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setPredictionResult(result);
    } catch (error) {
      console.error("There was an error making the request:", error);
      setApiError(
        "Failed to get prediction. Please ensure the backend server is running and check the console for more details."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const binaryOptions = [
    { label: "Yes", value: "1" },
    { label: "No", value: "0" },
  ];
  const sexOptions = [
    { label: "Male", value: "1" },
    { label: "Female", value: "0" },
  ];

  return (
    <div className=" min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-xl shadow-black space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Diabetes Prediction
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Please fill out the form below to get a diabetes risk prediction.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-gray-800">
              Health Indicators
            </h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
              <RadioGroup
                label="High Blood Pressure"
                name="HighBP"
                options={binaryOptions}
                register={register}
                error={errors.HighBP}
              />
              <RadioGroup
                label="High Cholesterol"
                name="HighChol"
                options={binaryOptions}
                register={register}
                error={errors.HighChol}
              />
              <RadioGroup
                label="Cholesterol Check in 5 Yrs"
                name="CholCheck"
                options={binaryOptions}
                register={register}
                error={errors.CholCheck}
              />
              <RadioGroup
                label="Smoker"
                name="Smoker"
                options={binaryOptions}
                register={register}
                error={errors.Smoker}
              />
              <RadioGroup
                label="History of Stroke"
                name="Stroke"
                options={binaryOptions}
                register={register}
                error={errors.Stroke}
              />
              <RadioGroup
                label="Heart Disease or Attack"
                name="HeartDiseaseorAttack"
                options={binaryOptions}
                register={register}
                error={errors.HeartDiseaseorAttack}
              />
              <RadioGroup
                label="Physical Activity"
                name="PhysActivity"
                options={binaryOptions}
                register={register}
                error={errors.PhysActivity}
              />
              <RadioGroup
                label="Consume Fruit Daily"
                name="Fruits"
                options={binaryOptions}
                register={register}
                error={errors.Fruits}
              />
              <RadioGroup
                label="Consume Veggies Daily"
                name="Veggies"
                options={binaryOptions}
                register={register}
                error={errors.Veggies}
              />
              <RadioGroup
                label="Heavy Alcohol Consumption"
                name="HvyAlcoholConsump"
                options={binaryOptions}
                register={register}
                error={errors.HvyAlcoholConsump}
              />
              <RadioGroup
                label="Difficulty Walking"
                name="DiffWalk"
                options={binaryOptions}
                register={register}
                error={errors.DiffWalk}
              />
              <RadioGroup
                label="Sex"
                name="Sex"
                options={sexOptions}
                register={register}
                error={errors.Sex}
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-gray-800">
              Healthcare Access
            </h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
              <RadioGroup
                label="Have Any Healthcare Coverage"
                name="AnyHealthcare"
                options={binaryOptions}
                register={register}
                error={errors.AnyHealthcare}
              />
              <RadioGroup
                label="Could Not See Doctor Due to Cost"
                name="NoDocbcCost"
                options={binaryOptions}
                register={register}
                error={errors.NoDocbcCost}
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-gray-800">
              Physical & Mental Health
            </h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-6">
              <NumberField
                label="BMI"
                name="BMI"
                placeholder="Enter your BMI"
                register={register}
                error={errors.BMI}
              />
              <NumberField
                label="Mental Health (poor days in past 30)"
                name="MentHlth"
                placeholder="0-30 days"
                register={register}
                error={errors.MentHlth}
                validation={{
                  min: { value: 0, message: "Must be between 0 and 30" },
                  max: { value: 30, message: "Must be between 0 and 30" },
                }}
              />
              <NumberField
                label="Physical Health (poor days in past 30)"
                name="PhysHlth"
                placeholder="0-30 days"
                register={register}
                error={errors.PhysHlth}
                validation={{
                  min: { value: 0, message: "Must be between 0 and 30" },
                  max: { value: 30, message: "Must be between 0 and 30" },
                }}
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-gray-800">
              General Health & Socioeconomic
            </h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
              <SelectField
                label="General Health"
                name="GenHlth"
                options={[
                  { label: "Excellent", value: "1" },
                  { label: "Very Good", value: "2" },
                  { label: "Good", value: "3" },
                  { label: "Fair", value: "4" },
                  { label: "Poor", value: "5" },
                ]}
                register={register}
                error={errors.GenHlth}
              />
              <NumberField
                label="Age"
                name="Age"
                placeholder="Enter your age"
                register={register}
                error={errors.Age}
                validation={{
                  min: { value: 1, message: "Age must be positive" },
                  max: { value: 130, message: "Age seems too high" },
                }}
              />
              <SelectField
                label="Education Level"
                name="Education"
                options={[
                  { label: "No School", value: "1" },
                  { label: "Grades 1-8", value: "2" },
                  { label: "Grades 9-11", value: "3" },
                  { label: "Grade 12/GED", value: "4" },
                  { label: "College 1-3 yrs", value: "5" },
                  { label: "College 4+ yrs", value: "6" },
                ]}
                register={register}
                error={errors.Education}
              />
              <SelectField
                label="Income Level"
                name="Income"
                options={[
                  { label: "< $10,000", value: "1" },
                  { label: "$10k - $15k", value: "2" },
                  { label: "$15k - $20k", value: "3" },
                  { label: "$20k - $25k", value: "4" },
                  { label: "$25k - $35k", value: "5" },
                  { label: "$35k - $50k", value: "6" },
                  { label: "$50k - $75k", value: "7" },
                  { label: "> $75,000", value: "8" },
                ]}
                register={register}
                error={errors.Income}
              />
            </div>
          </div>

          <div className="pt-5">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading
                ? "Getting Prediction..."
                : "Get Diabetes Risk Prediction"}
            </button>
          </div>
        </form>

        {apiError && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-sm font-medium text-red-700">{apiError}</p>
          </div>
        )}
        {predictionResult && (
          <div className="mt-8 p-6 bg-indigo-50 border border-indigo-200 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Prediction Result
            </h3>
            {(() => {
              const prob = predictionResult.probability;
              let riskLabel = "";
              let colorClass = "";

              if (prob >= 0.7) {
                riskLabel = "High Risk of Diabetes";
                colorClass = "text-red-600";
              } else if (prob >= 0.5) {
                riskLabel = "Moderate Risk of Diabetes";
                colorClass = "text-yellow-600";
              } else {
                riskLabel = "Low Risk of Diabetes";
                colorClass = "text-green-600";
              }

              return (
                <p className={`text-2xl font-bold ${colorClass}`}>
                  {riskLabel}
                </p>
              );
            })()}

            <p className="text-md text-gray-700 mt-2">
              The model predicts a{" "}
              <span className="font-bold">
                {(predictionResult.probability * 100).toFixed(2)}%
              </span>{" "}
              probability of having diabetes.
            </p>
            <p className="text-xs text-gray-500 mt-4">
              Disclaimer: This is a prediction based on a machine learning model
              and not a medical diagnosis. Please consult a healthcare
              professional.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
