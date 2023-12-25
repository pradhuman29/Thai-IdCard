import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import './../App.css'




const extractInformation = (text) => {
    const identificationNumberRegex = /\b\d{1,2}\s\d{4}\s\d{5}\s\d{2}\s\d\b/g;
    const nameRegex = /(?:Miss|Mr\.)\s[a-zA-Z]+\s[a-zA-Z]+/g;
    const dobRegex = /\b\d{1,2}\s(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s\d{4}\b/g;
    const doiRegex = /\b\d{1,2}\s(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s\d{4}\b/g;
    const doeRegex = /\b\d{1,2}\s(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s\d{4}\b/g;

    const identificationMatch = text.match(identificationNumberRegex);
    const nameMatch = text.match(nameRegex);
    const dobMatch = text.match(dobRegex);
    const doiMatch = text.match(doiRegex);
    const doeMatch = text.match(doeRegex);

    if (
        identificationMatch &&
        nameMatch &&
        dobMatch &&
        doiMatch &&
        doeMatch
    ) {
        const identificationNumber = identificationMatch[0];
        const [title, firstName, lastName] = nameMatch[0].split(' ');
        const dob = dobMatch[0];
        const doi = doiMatch[0];
        const doe = doeMatch[0];

        return {
            IdentificationNumber: identificationNumber,
            FirstName: firstName,
            LastName: lastName,
            DateOfBirth: dob,
            DateOfIssue: doi,
            DateOfExpiry: doe,
        };
    } else {
        return null;
    }
};



const ImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [ocrResult, setOcrResult] = useState(null);
    const navigate = useNavigate()
    const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // Maximum file size in bytes (2MB)

    const performOCR = async (imageData) => {
        const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTNmMDI3MDctOGM0Zi00OGM1LWE4ZTctOWQ1NTk0Y2RkZDdmIiwidHlwZSI6ImFwaV90b2tlbiJ9.G8f9hOmbCbIV05Sdgufg7oESzXt7caOykwl9RaD0ifg'; 
        const formData = new FormData();
        formData.append('providers', 'google');
        formData.append('file', imageData);
        formData.append('fallback_providers', '');

        const headers = {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'multipart/form-data',
        };

        try {
            const response = await axios.post('https://api.edenai.run/v2/ocr/ocr', formData, {
                headers: headers,
            });


            const googleData = response.data['google'];

            const textValue = googleData ? googleData['text'] : '';

            const user = extractInformation(textValue);

            const withoutThai = textValue.replace(/[\u0E00-\u0E7F]+/g, '');

            console.log(withoutThai);
            console.log(user)
            axios.post('http://localhost:8000/endpoint', user).then((response) => {
                if (response) {
                    try {
                        navigate("/first");
                    } catch (error) {
                        console.error("Error storing user data in local storage:", error);
                        // Handle the error, e.g., show a user-friendly message
                    }
                } else {
                    alert("Insufficient Entry! Please try again");
                }

            });

            setOcrResult(response.data);
        } catch (error) {
            console.error('Error during OCR processing:', error);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Check file size
            if (file.size > MAX_FILE_SIZE_BYTES) {
                // File size exceeds the maximum limit
                alert('File size exceeds 2MB. Please select a smaller file.');
                event.target.value = null; 
                setSelectedImage(null); 
            } else {
                setSelectedImage(file);
            
            }
        }
    };

    const handleUpload = () => {
        if (selectedImage) {
            performOCR(selectedImage);
        } else {
            alert('Please select an image!');
        }
    };

    return (
        <div style={{ marginTop: "300px" }}>
            <h2>Thai ID Card Image Uploader</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button disabled={!selectedImage} onClick={handleUpload}>Upload Image</button>
        </div>
    );
};

export default ImageUploader;
