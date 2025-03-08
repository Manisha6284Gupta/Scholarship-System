import { useState } from "react";
import axios from "axios";
import Tesseract from "tesseract.js";
import conf from "../conf/conf.js"; // Import backend URL

const ImageUploadOCR = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Preview Image
    }
  };

  // Upload & Extract Text
  const handleUploadAndExtract = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      // Upload image to backend
      const uploadResponse = await axios.post(`${conf.backendUrl}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Extract text using Tesseract.js
      const imageUrl = uploadResponse.data.imageUrl;
      const { data } = await Tesseract.recognize(imageUrl, "eng"); // OCR Processing
      setExtractedText(data.text);

      // Store extracted text in database
      await axios.post(`${conf.backendUrl}/store-text`, { text: data.text });

      alert("Text extracted & stored successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to extract text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-500" />

      {preview && <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-md" />}

      <button
        onClick={handleUploadAndExtract}
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Extracting..." : "Upload & Extract Text"}
      </button>

      {extractedText && (
        <div className="p-3 bg-gray-100 rounded-md">
          <h3 className="font-bold">Extracted Text:</h3>
          <p className="text-gray-700">{extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadOCR;
