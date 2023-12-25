import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import './../App.css'


// const [text, setText] = useState(null);

// import json
// import requests

// headers = {"Authorization": "Bearer 🔑 Your_API_Key"}

// url = "https://api.edenai.run/v2/ocr/ocr"
// data = {
//     "providers": "google",
//     "language": "en",
//     "fallback_providers": ""
// }
// files = {"file": open("🖼️ path/to/your/image.png", 'rb')}

// response = requests.post(url, data=data, files=files, headers=headers)

// result = json.loads(response.text)
// print(result["google"]["text"])

// Sample texts

// const extractInformation = (text) => {
//     const identificationNumberRegex = /\d{1,2} \d{4} \d{5} \d{2} \d/g;
//     const nameRegex = /(?:ชื่อตัวและชื่อสกุล|Name|นาย\s|น.ส.\s)[^\d]+/g;
//     const dobRegex = /(?:Date of Birth|เกิดวันที่)\s*(\d{1,2}\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.? \d{4})/g;
//     const doiRegex = /(?:Date of Issue|วันออกบัตร)\s*(\d{1,2}\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.? \d{4})/g;
//     const doeRegex = /(?:Date of Expiry|วันบัตรหมดอายุ)\s*(\d{1,2}\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.? \d{4})/g;

//     const identificationNumber = text.match(identificationNumberRegex)[0];
//     const [firstName, lastName] = text.match(nameRegex)[0].split(' ').slice(1);
//     const dob = text.match(dobRegex)[0].split(' ')[1];
//     const doi = text.match(doiRegex)[0].split(' ')[1];
//     const doe = text.match(doeRegex)[0].split(' ')[1];

//     return {
//         IdentificationNumber: identificationNumber,
//         FirstName: firstName,
//         LastName: lastName,
//         DateOfBirth: dob,
//         DateOfIssue: doi,
//         DateOfExpiry: doe,

//     };
// };
// const extractedInfoText1 = extractInformation(text1);
// console.log('Information from text1:', extractedInfoText1);


// const extractInformation = (text) => {
//     const identificationNumberRegex = /\b\d{1,2}\s\d{4}\s\d{5}\s\d{2}\s\d\b/g;
//     const nameRegex = /(?:Mr\.|Miss|Mrs)\s[a-zA-Z]+\s[a-zA-Z]+/g;
//     const dobRegex = /\b\d{1,2}\s(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s\d{4}\b/g;
//     const doiRegex = /\b\d{1,2}\s(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s\d{4}\b/g;
//     const doeRegex = /\b\d{1,2}\s(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s\d{4}\b/g;

//     const identificationNumber = text.match(identificationNumberRegex)[0];
//     const [title, firstName, lastName] = text.match(nameRegex)[0].split(' ');
//     const dob = text.match(dobRegex)[0];
//     const doi = text.match(doiRegex)[0];
//     const doe = text.match(doeRegex)[0];

//     return {
//         IdentificationNumber: identificationNumber,
//         FirstName: firstName,
//         LastName: lastName,
//         DateOfBirth: dob,
//         DateOfIssue: doi,
//         DateOfExpiry: doe,
//     };
// };

const extractInformation = (text) => {
    const identificationNumberRegex = /\b\d{1,2}\s\d{4}\s\d{5}\s\d{2}\s\d\b/g;
    const nameRegex = /(?:Miss|Mr\.|นาย\s|น\.ส\.)\s[a-zA-Z]+\s(?:[a-zA-Z]+\s)?[a-zA-Z]+/g;
    const dobRegex = /\b\d{1,2}\s(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s\d{4}\b/g;
    const doiRegex = /(?<=Date of Issue|วันออกบัตร)\s+\b\d{1,2}\s(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s\d{4}\b/g;
    const doeRegex = /(?<=Date of Expiry|วันบัตรหมดอายุ)\s+\b\d{1,2}\s(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s\d{4}\b/g;

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
        // Handle the case where matches are not found
        return null;
    }
};

// Rest of the code remains the same...


// Rest of the code remains the same...




// const text1 = "Thai National ID Card 1 7206 00071 41 5 Identification Number .. Name Miss Suchanan Last name Nakmai 2 .. 2535 Date of Birth 2 Jul. 1992 150, 470 5 . . ai.com . 14 S.A. 2559 14 Dec. 2016 ( ) Date of Issue -- 1 .. 2558 1 Jul. 2025 Date of Expiry 130 150 150 140 30 7201-04-12141154";
// const text2 = "Thai National ID Card 0 1234 56789 10 1 Identification Number Mr. Meenoy Koyruk 14 .. 2523 Date of Birth 14 Jan 1980 2300 .. 20007 2 .. 2566 2 Jan 2023 Date of Issue Name Last Name ( ) 180- 170 10 1 .. 2573 1 Jan 2032 Date of Expiry 180 170 160";

// const user1 = extractInformation(text1);
// const user2 = extractInformation(text2);

// console.log(user1);
// console.log("space");
// console.log(user2);


const ImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [ocrResult, setOcrResult] = useState(null);
    const navigate = useNavigate()
    const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // Maximum file size in bytes (2MB)

    const performOCR = async (imageData) => {
        const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTNmMDI3MDctOGM0Zi00OGM1LWE4ZTctOWQ1NTk0Y2RkZDdmIiwidHlwZSI6ImFwaV90b2tlbiJ9.G8f9hOmbCbIV05Sdgufg7oESzXt7caOykwl9RaD0ifg'; // Replace with your Eden AI API key

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

            // console.log('OCR Result:', response.data);

            const googleData = response.data['google'];

            // Accessing the 'text' key inside the 'google' object
            const textValue = googleData ? googleData['text'] : '';

            const user = extractInformation(textValue);

            // Remove Thai language words using regular expression
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
            // console.log('Text value:', textValue);

            // if (response.data && response.data.Google && response.data.Google.text) {
            //     const googleText = response.data.Google.text;
            //     console.log('Google Text:', googleText);
            // } else {
            //     console.log('Google text not found in response');
            // }
            // Store the OCR result in state
            setOcrResult(response.data);
        } catch (error) {
            console.error('Error during OCR processing:', error);
            // Handle errors or set state with the error if needed
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Check file size
            if (file.size > MAX_FILE_SIZE_BYTES) {
                // File size exceeds the maximum limit
                alert('File size exceeds 2MB. Please select a smaller file.');
                event.target.value = null; // Clear the selected file
                setSelectedImage(null); // Reset selectedImage state
            } else {
                setSelectedImage(file);
                // Additional actions, such as showing a preview of the selected image, can be performed here
            }
        }
    };

    const handleUpload = () => {
        if (selectedImage) {
            performOCR(selectedImage);
        } else {
            // Handle case where no image is selected
            alert('Please select an image!');
        }
    };

    return (
        <div className='hell'>
            <h2>Thai ID Card Image Uploader</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button disabled={!selectedImage} onClick={handleUpload}>Upload Image</button>

            {/* Display the JSON result if available */}
            {ocrResult && (
                <div>
                    <h3>OCR Result:</h3>
                    <pre>{JSON.stringify(ocrResult, null, 2)}</pre>

                </div>
            )}
        </div>
    );
};

export default ImageUploader;
