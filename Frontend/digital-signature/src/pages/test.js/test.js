import React, { useState } from "react";
import axios from "axios";

function Test() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleRequest = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      console.log(selectedFile);

      axios
        .post("https://api.fpt.ai/vision/idr/vnm", formData, {
          headers: {
            api_key: "wAWb3o0H7VwZN1bhrpmseUFdnhN3HiNw",
          },
        })
        .then((response) => {
          // Handle the API response here
          console.log(response.data);
        })
        .catch((error) => {
          // Handle any error that occurred during the API call
          console.error(error);
        });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleRequest}>Request</button>
    </div>
  );
}

export default Test;
