import React from "react";
import { Link } from "react-router-dom";
import { Microscope, Brain, CheckCircle } from "lucide-react";
import microscopeImg from "../assets/microscope.jpg"; // adjust path if needed


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-20">
        <div className="md:w-1/2 pr-10 space-y-6">
          <h1 className="text-5xl font-bold text-blue-900 leading-tight">
            DeepGynScan
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            Cervical Cancer Prediction with AI Assistance
          </h2>
          <p className="text-gray-600">
            Early detection of cervical cancer made easy for healthcare workers and patients. 
            Upload microscopic images and get accurate AI-powered predictions instantly.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/upload"
              className="bg-blue-800 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-900 transition font-semibold"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="bg-white border border-blue-800 text-blue-800 py-3 px-6 rounded-lg shadow-lg hover:bg-blue-50 transition font-semibold"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-end">
          {/* Placeholder for hero image */}
          <img
            src={microscopeImg}
            alt="Microscope Hero"
            className="rounded-xl shadow-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-12">
            How DeepGynScan Works
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-6 rounded-2xl shadow-lg space-y-4">
              <Microscope className="w-12 h-12 text-blue-700 mx-auto" />
              <h3 className="font-semibold text-xl">Upload Image</h3>
              <p className="text-gray-600">
                Upload cervical cell images via smartphone or microscope for AI analysis.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl shadow-lg space-y-4">
              <Brain className="w-12 h-12 text-green-700 mx-auto" />
              <h3 className="font-semibold text-xl">AI Analysis</h3>
              <p className="text-gray-600">
                The CNN model analyzes the image and predicts the risk level accurately.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl shadow-lg space-y-4">
              <CheckCircle className="w-12 h-12 text-red-600 mx-auto" />
              <h3 className="font-semibold text-xl">Get Result</h3>
              <p className="text-gray-600">
                View predictions, confidence scores, and generate a professional PDF report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-900 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Predicting Today</h2>
        <p className="text-lg mb-6">Join healthcare professionals in early detection of cervical cancer.</p>
        <Link
          to="/upload"
          className="bg-yellow-500 text-blue-900 py-3 px-8 rounded-lg font-semibold hover:bg-yellow-400 transition"
        >
          Upload Your Image
        </Link>
      </section>
    </div>
  );
}
