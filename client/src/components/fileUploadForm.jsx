import React, { useState } from 'react';
import axios from 'axios';

export const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://localhost:5000/upload', formData);
      setSuccessMessage(response.data.message || 'File uploaded succesfully');
      
    } catch (error) {
      setSuccessMessage('Invalid file/ File not uploaded.');
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      
      {successMessage && <p>{successMessage}</p>}
    </>
  );
};
