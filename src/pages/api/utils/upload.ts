import { google } from "googleapis";
import path from "path";
import fs from "fs";
const ClientID = process.env.GOOGLE_CLIENT_ID;
const ClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const RedirectURI = process.env.GOOGLE_REDIRECT_URI;
const RefreshToken = process.env.GOOGLE_REFRESHTOKEN;

const oauth2Client = new google.auth.OAuth2(
  ClientID,
  ClientSecret,
  RedirectURI
);

oauth2Client.setCredentials({ refresh_token: RefreshToken });
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const filtPath = path.join(__dirname, "abc.png");

export async function UploadImage(file: any) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: file.originalname,
        mimeType: file.mimetype,
      },
      media: {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path),
      },
    });
    console.log(response);
    const url = await generatePublicUrl(response.data.id || "");
    fs.unlinkSync(file.path);
    console.log(url);
    return url;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "admire.logo",
        mimeType: "image/png",
      },
      media: {
        mimeType: "image/png",
        body: fs.createReadStream(filtPath),
      },
    });
    const url = await generatePublicUrl(response.data.id || "");
    console.log(url);
    return url;
  } catch (error) {
    console.log(error);
  }
}

export async function Deletefile(id: string) {
  try {
    const response = await drive.files.delete({
      fileId: id,
    });
    console.log(response.data, response.status);
    return response.status;
  } catch (error) {
    console.log(error);
  }
}

export async function generatePublicUrl(id: string) {
  try {
    const fileId = id;
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    const result = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink,webContentLink",
    });
    // console.log(result.data);
    return `https://drive.google.com/thumbnail?id=${id}&sz=s4000`;
  } catch (error) {
    console.log(error);
  }
}

// https://drive.google.com/thumbnail?id=1pEqirqNbHmfvjcCRBmTQX4ntT8Y7_Q1i
