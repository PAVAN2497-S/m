import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClick = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data && response.data.image) {
        setImageUrl(`http://localhost:5000/public/images/${response.data.image}`);
      }
      console.log('File uploaded successfully');
    } catch (error) {
      alert(error.response?.data?.error)
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <input type="file" onChange={handleChange} />
      <button onClick={handleClick}>Upload</button>

      {imageUrl && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '25%' }} />
        </div>
      )}
    </div>
  );
}

export default App;
