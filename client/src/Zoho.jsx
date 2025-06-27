import axios from "axios";
import { useState } from "react";

export default function ZohoSignUploader() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/create-document",
        formData
      );
      alert("Document sent for signature!");
      console.log(response.data);
      setFile(null);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to send document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 20,
        fontFamily: "Arial",
      }}
    >
      <h2>Zoho Sign Upload</h2>

      <label style={{ display: "block", marginBottom: 6 }}>
        Select Document:
      </label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginBottom: 20, width: "100%" }}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: loading ? "#999" : "#0070f3",
          color: "#fff",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "bold",
        }}
      >
        {loading ? "Sending..." : "Send for Signature"}
      </button>
    </div>
  );
}
