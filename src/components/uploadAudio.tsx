// UploadAudio.tsx
import React, { useState } from "react";
import axios from "axios";

const UploadAudio = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!file) return alert("Please select a file first.");

      setLoading(true);
      const formData = new FormData();
      formData.append("audio", file as File);

      const response = await axios.post(
        "http://localhost:3000/transcribe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);
      console.log("Response:", response);
      console.log("Response Data:", response.data);
      if (response.data.transcript) {
        setTranscription(response.data.transcript);
      } else {
        console.error("Transcription not found in response");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h2>Upload an Audio File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        {file && <p>Selected file: {file.name}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
      {loading && <p>Loading... Please wait.</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {transcription && (
        <div>
          <h3>Transcription:</h3>
          <pre style={{ backgroundColor: "#f0f0f0", padding: "10px" }}>
            {transcription}
          </pre>
        </div>
      )}
    </div>
  );
};

export default UploadAudio;
