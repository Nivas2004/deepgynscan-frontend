import React, { useState } from "react";

export default function Upload() {
  const API_URL = process.env.REACT_APP_BACKEND_URL; // Backend URL from .env

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientLocation, setPatientLocation] = useState("");
  const [alert, setAlert] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setAlert({ type: "error", message: "Please select an image first!" });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        setAlert({ type: "error", message: data.error });
        setResult(null);
      } else {
        setResult(data);
        setAlert({ type: "success", message: "Prediction completed successfully!" });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({ type: "error", message: "Prediction failed. Check console." });
      setResult(null);
    }
    setLoading(false);
  };

  const handleGenerateReport = async () => {
    if (!result) {
      setAlert({ type: "error", message: "Please run a prediction first." });
      return;
    }
    if (!patientName || !patientAge || !patientLocation) {
      setAlert({ type: "error", message: "Please fill in all patient details." });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/generate-report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prediction: result.prediction,
          confidence: result.confidence,
          details: result.details || {},
          patientName,
          patientAge: parseInt(patientAge),
          patientLocation,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate report");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Cancer_Report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      setAlert({ type: "success", message: "Report generated successfully!" });
    } catch (error) {
      console.error("Error:", error);
      setAlert({ type: "error", message: "Report generation failed. Check console." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-4">Cell Image Classifier</h1>

        {/* Alerts */}
        {alert && (
          <div
            className={`mb-4 px-4 py-3 rounded-lg ${
              alert.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {alert.message}
          </div>
        )}

        {/* Instructions Panel */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-6">
          <h2 className="font-semibold mb-2">Instructions:</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm">
            <li>Upload a clear cervical cell image.</li>
            <li>Fill in all patient details.</li>
            <li>Click "Upload & Predict" to see results.</li>
            <li>Generate and download the PDF report.</li>
          </ul>
        </div>

        {/* File Upload */}
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                     file:rounded-full file:border-0 file:text-sm file:font-semibold 
                     file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
        />

        {/* Image Preview */}
        {file && (
          <div className="text-center mb-4">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="mx-auto max-h-64 rounded-lg shadow"
            />
          </div>
        )}

        {/* Patient Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Age"
            value={patientAge}
            onChange={(e) => setPatientAge(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Location"
            value={patientLocation}
            onChange={(e) => setPatientLocation(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full md:w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Predicting..." : "Upload & Predict"}
          </button>
          {result && (
            <button
              onClick={handleGenerateReport}
              className="w-full md:w-1/2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Generate Report
            </button>
          )}
        </div>

        {/* Prediction Results */}
        {result && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">
              Prediction:{" "}
              <span
                className={`font-bold ${
                  result.prediction === "Normal"
                    ? "text-green-600"
                    : result.prediction === "Pre-cancerous"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {result.prediction}
              </span>
            </h2>

            <div className="space-y-3">
              {result.details &&
                Object.entries(result.details).map(([label, value]) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{label}</span>
                      <span>{(value * 100).toFixed(2)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          label === "High Risk"
                            ? "bg-red-600"
                            : label === "Pre-cancerous"
                            ? "bg-yellow-500"
                            : "bg-green-600"
                        }`}
                        style={{ width: `${value * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
