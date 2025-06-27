import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import FormData from "form-data";
import multer from "multer";
import qs from "qs";

dotenv.config();
const app = express();
const upload = multer();
const port = 8000;

app.use(express.json());

const REGION = process.env.ZOHO_API_REGION || "com";

// Get fresh access token from refresh token
async function getAccessToken() {
  const params = new URLSearchParams();
  params.append("refresh_token", process.env.ZOHO_REFRESH_TOKEN);
  params.append("client_id", process.env.ZOHO_CLIENT_ID);
  params.append("client_secret", process.env.ZOHO_CLIENT_SECRET);
  params.append("redirect_uri", process.env.ZOHO_REDIRECT_URI);
  params.append("grant_type", "refresh_token");

  const response = await axios.post(
    `https://accounts.zoho.in/oauth/v2/token`,
    params
  );
  console.log(response.data);
  return response.data.access_token;
}

// API to send file for signature via Zoho Sign
app.post("/api/create-document", upload.single("file"), async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    console.log("Access token:", accessToken);

    const formData = new FormData();

    // 1. Append uploaded file
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    // 2. Define data payload for Zoho Sign
    const data = {
      requests: {
        request_name: "NDA Document",
        is_sequential: true,
        expiration_days: 10,
        email_reminders: true,
        reminder_period: 2,
        notes: "Please review and sign the document.",
        actions: [
          {
            action_type: "SIGN",
            recipient_name: "Prashanth Kumar",
            recipient_email: "pkgaming.prashanth@gmail.com",
            verify_recipient: true,
            signing_order: 0,
            private_notes: "Please sign here",
            verification_type: "EMAIL",
          },
        ],
      },
    };

    // Append JSON string of data
    formData.append("data", JSON.stringify(data));

    // 3. Send request to Zoho Sign API
    const response = await axios.post(
      `https://sign.zoho.in/api/v1/requests`,
      formData,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          ...formData.getHeaders(),
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error creating document:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to create document",
      details: error.response?.data || error.message,
    });
  }
});

// ✅ SUBMIT document to recipients

app.post("/api/submit-document", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { request_id, document_id, action_id } = req.body;

    if (!request_id || !document_id || !action_id) {
      return res.status(400).json({
        error: "request_id, document_id and action_id are required.",
      });
    }

    const payload = {
      requests: {
        request_name: "NDA Document",
        is_sequential: true,
        expiration_days: 10,
        email_reminders: true,
        reminder_period: 2,
        notes: "Please review and sign the document.",
        actions: [
          {
            action_id: action_id,
            action_type: "SIGN",
            recipient_name: "Prashanth Kumar",
            recipient_email: "pkgaming.prashanth@gmail.com",
            verify_recipient: true,
            verification_type: "EMAIL",
            signing_order: 0,
            private_notes: "Please sign on the marked field",
            // fields: {
            //   date_fields: [
            //     {
            //       field_name: "Date",
            //       field_label: "Date",
            //       field_type_name: "Date",
            //       document_id: document_id,
            //       action_id: action_id,
            //       is_mandatory: true,
            //       x_coord: 120,
            //       y_coord: 360,
            //       abs_width: 150,
            //       abs_height: 30,
            //       page_no: 1,
            //       date_format: "dd MMM yyyy",
            //     },
            //   ],
            // },
          },
        ],
      },
    };

    const response = await axios.post(
      `https://sign.zoho.in/api/v1/requests/${request_id}/submit`,
      qs.stringify({ data: JSON.stringify(payload) }),
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.json({
      message: "Document submitted successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("Submit Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to submit document",
      details: error.response?.data || error.message,
    });
  }
});

// ✅ GET document status
app.get("/api/document-status/:requestId", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { requestId } = req.params;

    const response = await axios.get(
      `https://sign.zoho.in/api/v1/requests/${requestId}`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching status:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to get document status",
      details: error.response?.data || error.message,
    });
  }
});

app.get("/api/download-signed/:requestId", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { requestId } = req.params;

    const response = await axios.get(
      `https://sign.zoho.in/api/v1/requests/${requestId}/pdf`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
        responseType: "stream",
      }
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=signed_document.pdf"
    );
    response.data.pipe(res);
  } catch (error) {
    console.error(
      "Error downloading signed PDF:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to download signed document",
      details: error.response?.data || error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
