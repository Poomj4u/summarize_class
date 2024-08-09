// UploadAudio.tsx
import React, { useState } from "react";
import axios from "axios";

const UploadAudio = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!file) return alert("Please select a file first.");

      const formData = new FormData();
      formData.append("audio", file as File);

      const response = await axios.post(
        "http://localhost:8888/transcribe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTranscription(response.data.transcription);
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred while uploading the file.");
    }
  };

  return (
    <div>
      <h2>Upload an Audio File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        {file && <p>Selected file: {file.name}</p>}
        <button type="submit">Submit</button>
      </form>
      {transcription && (
        <div>
          <h3>Transcription:</h3>
          <pre>{transcription}</pre>
        </div>
      )}
    </div>
  );
};

export default UploadAudio;
