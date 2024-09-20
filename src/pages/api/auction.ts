import { google } from "googleapis";
import keys from "../../../hemdarcollection-680a28236086.json";
import { NextApiRequest, NextApiResponse } from "next";

type SheetForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).send({ message: "ONLY POST REQUEST ARE ALLOWED" });
    }
    const auth = await google.auth.getClient({
      projectId: keys.project_id,
      credentials: {
        type: "service_account",
        private_key: keys.private_key,
        client_email: keys.client_email,
        client_id: keys.client_id,
        token_url: keys.token_uri,
        universe_domain: "googleapis.com",
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // copy your spreadshset id here
    // and update the range based on the sheet name and colums used
    const data = await sheets.spreadsheets.values.get({
      spreadsheetId: "1u59n8oqdo38pH_Yr-D_k02bdUioQC9ojR3YYstFng1E",
      range: "Sheet1!A:D",
    });

    // const response = await sheets.spreadsheets.values.append({
    //   spreadsheetId: "1u59n8oqdo38pH_Yr-D_k02bdUioQC9ojR3YYstFng1E",
    //   range: "A1:D1",
    //   valueInputOption: "USER_ENTERED",
    //   requestBody: {
    //     values: [
    //       [
    //         "jigar",
    //         "jigarpariyar18@gmail.com",
    //         8097567290,
    //         "hello how are you !!",
    //       ],
    //     ],
    //   },
    // });
    // return res.status(200).send({ data: response.data });
    // here we'll work with the data

    return res.status(200).send(data);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "Error getting spreadsheet data", success: false });
  }
}
