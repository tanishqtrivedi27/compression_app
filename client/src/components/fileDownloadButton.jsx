import React, { useState } from 'react';
import axios from 'axios';

export const FileDownload = () => {
    
    const handleDownload = async () => {
    try {
      

      const response = await axios.get('http://localhost:5000/download', {
        responseType: 'blob' // Specify the response type as blob
      });

      // Create a download link
      const downloadUrl = window.URL.createObjectURL(
        new Blob([response.data])
      );
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'compressed.txt';
      link.click();

      // Clean up the download URL
      window.URL.revokeObjectURL(downloadUrl);
      await axios.delete('http://localhost:5000/delete');

    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>Download File</button>
    </div>
  );
}

