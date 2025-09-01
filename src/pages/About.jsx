import React from "react";
import { CheckCircle, AlertTriangle, XCircle, Brain, Microscope, Users } from "lucide-react";

function Card({ children }) {
  return <div className="bg-white shadow-lg rounded-2xl p-6">{children}</div>;
}

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-12">
      <h1 className="text-4xl font-bold text-blue-900 mb-6">How Our System Works</h1>
      <p className="text-lg text-gray-600 max-w-3xl text-center mb-12">
        HealthAI Diagnostics helps detect cervical cancer risk levels early. Designed to support healthcare workers in
        <span className="font-semibold"> rural areas</span>, where expert pathologists may not be available.
      </p>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full">
        <Card>
          <Microscope className="w-12 h-12 text-blue-700 mb-3" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Upload Image</h2>
          <p>Healthcare worker uploads a cervical cell image via microscope or digital device.</p>
        </Card>

        <Card>
          <Brain className="w-12 h-12 text-green-700 mb-3" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">2. AI Analysis</h2>
          <p>CNN model analyzes the image and detects risk levels based on thousands of labeled examples.</p>
        </Card>

        <Card>
          <CheckCircle className="w-12 h-12 text-red-600 mb-3" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Get Result</h2>
          <p>Prediction and confidence scores are displayed for easy interpretation by doctors.</p>
        </Card>
      </div>

      <div className="max-w-4xl mt-16 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">🌍 Supporting Rural Healthcare</h2>
        <p className="text-lg text-gray-600 mb-8">
          Our system enables <span className="font-semibold">early detection</span> and <span className="font-semibold">faster medical decisions</span> in underserved regions.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <Users className="w-12 h-12 text-indigo-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Accessible & Affordable</h3>
            <p>Works with basic microscopes and smartphones, making it affordable for rural clinics.</p>
          </Card>

          <Card>
            <XCircle className="w-12 h-12 text-red-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Early Detection Saves Lives</h3>
            <p>Identifies high-risk patients needing urgent referrals to hospitals.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
