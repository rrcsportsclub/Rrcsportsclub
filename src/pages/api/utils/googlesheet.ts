import { google } from "googleapis";

export default async function getGoogleSheetsClient() {
  const project_id = process.env.NEXT_PUBLIC_PROJECT_ID;
  const private_key = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  const client_email = process.env.NEXT_PUBLIC_CLIENT_EMAIL;
  const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
  const token_uri = process.env.NEXT_PUBLIC_TOKEN_URL;
  try {
    const auth = await google.auth.getClient({
      projectId: project_id,
      credentials: {
        type: "service_account",
        private_key: private_key,
        client_email: client_email,
        client_id: client_id,
        token_url: token_uri,
        universe_domain: "googleapis.com",
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    return sheets;
  } catch (e) {
    console.log(e);
  }
}
