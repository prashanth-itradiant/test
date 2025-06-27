import { ConfidentialClientApplication } from "@azure/msal-node";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Replace with your actual values
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const tenantId = process.env.TENANT_ID;
const userEmail = process.env.MAIL;

const msalConfig = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    clientSecret,
  },
};

const tokenRequest = {
  scopes: ["https://graph.microsoft.com/.default"],
};

async function readEmails() {
  const cca = new ConfidentialClientApplication(msalConfig);

  try {
    const tokenResponse = await cca.acquireTokenByClientCredential(
      tokenRequest
    );
    const accessToken = tokenResponse.accessToken;
    console.log(accessToken);

    const response = await axios.get(
      `https://graph.microsoft.com/v1.0/users/${userEmail}/mailFolders/inbox/messages?$top=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("📬 Latest Emails:");
    response.data.value.forEach((mail, index) => {
      console.log(`\n#${index + 1}`);
      console.log("Subject:", mail.subject);
      console.log("From:", mail.from?.emailAddress?.address);
      console.log("Received:", mail.receivedDateTime);
      console.log("Preview:", mail.bodyPreview);
    });
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
}

readEmails();
