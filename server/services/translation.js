const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.GEMINI_API_KEY;

exports.translateText = async (text, targetLang) => {
  console.log("Using Gemini API Key:", API_KEY); // Debugging API Key (Ensure it's loaded)

  // Correct API Endpoint with API Key in URL
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  try {
    // Make the API Request
    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [
              {
                text: `Translate the following text to ${targetLang} and provide only the translated text:\n\n"${text}"`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json", // Content-Type is still required
        },
      }
    );

    // Log Full Response for Debugging
    console.log("Gemini API Response:", JSON.stringify(response.data, null, 2));

    // Extract Translated Text
    const translatedText =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Translation not available";

    return translatedText;
  } catch (error) {
    console.error(
      "Gemini API Error:",
      error.response ? error.response.data : error.message
    );
    return text; // Return original text in case of an error
  }
};
