import React, { useState } from "react";
import { motion } from "framer-motion";

const Predict = () => {
  const [model, setModel] = useState("soil");
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setResult("");
  };

  const handlePredict = () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    // Simulated output based on selected model
    setTimeout(() => {
      if (model === "soil") {
        setResult("🧪 Predicted: Soil Type - Clay Loam");
      } else if (model === "plant") {
        setResult("🌿 Predicted: Leaf Disease - Bacterial Blight");
      } else if (model === "pest") {
        setResult("🐛 Predicted: Pest - Whitefly");
      }
    }, 1500);
  };

  return (
    <section
      id="predict"
      className="min-h-screen bg-gradient-to-tr from-lime-100 via-green-100 to-lime-200 flex flex-col items-center justify-center px-4 py-20"
    >
     <h2 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-10 text-center tracking-wide animate__animated animate__fadeInDown hover:drop-shadow-[0_0_12px_#4ade80] transition-all duration-500">
  🔍 <span className="text-yellow-400">Upload</span> & Predict
</h2>


      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xl text-center"
      >
        {/* Select Model */}
        <div className="mb-6 text-left">
          <label className="block text-lg font-semibold text-green-700 mb-3">
            Select Model
          </label>

          <div className="relative">
           <select
  value={model}
  onChange={(e) => setModel(e.target.value)}
  className="w-full appearance-none bg-white border border-green-400 text-green-800 font-semibold py-3 px-4 pr-10 rounded-xl shadow-md focus:outline-none focus:ring-4 focus:ring-green-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
>
  <option disabled hidden value="">
    🔽 Select a Model
  </option>
  <option value="soil" className="text-green-700 font-medium">
    🌱 Soil Classification
  </option>
  <option value="plant" className="text-green-700 font-medium">
    🌿 Plant Disease Detection
  </option>
  <option value="pest" className="text-green-700 font-medium">
    🐛 Pest Identification
  </option>
</select>


            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-green-600">
              ▼
            </div>
          </div>
        </div>

        {/* Upload Image */}
        <div className="mb-6 text-left">
          <label className="block text-lg font-semibold text-green-700 mb-3">
            Upload {model === "soil" ? "Soil" : model === "plant" ? "Leaf" : "Pest"} Image
          </label>

          <label className="flex flex-col items-center justify-center w-full h-40 px-4 transition bg-white border-2 border-dashed border-green-400 rounded-xl cursor-pointer hover:bg-green-50 hover:shadow-lg group">
            <svg
              className="w-10 h-10 mb-2 text-green-600 group-hover:animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 15a4 4 0 01.88-7.912A6 6 0 0118.36 6.64a5.5 5.5 0 11-1.36 10.862H5a4 4 0 01-2-7.524z"
              />
            </svg>
            <span className="text-sm font-medium text-green-700 group-hover:text-green-900">
              Click or drag an image to upload
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Image Preview */}
        {image && (
          <div className="mb-4">
            <img
              src={image}
              alt="Preview"
              className="max-h-60 mx-auto rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Predict Button */}
        <motion.button
          onClick={handlePredict}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="mt-4 bg-gradient-to-r from-green-600 via-lime-500 to-green-600 text-white font-bold py-3 px-8 rounded-full shadow-xl hover:shadow-green-400 transition-all duration-500 tracking-wide animate-pulse"
        >
          🔍 Predict {model === "soil" ? "Soil Type" : model === "plant" ? "Disease" : "Pest"}
        </motion.button>

        {/* Prediction Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-lg text-green-800 font-semibold"
          >
            {result}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Predict;
