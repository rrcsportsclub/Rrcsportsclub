import getGoogleSheetsClient from "./utils/googlesheet";
import { NextApiRequest, NextApiResponse } from "next";
import { sheets_v4 } from "googleapis"; // Import the sheets type from googleapis
interface Captain {
  srNo: string;
  name: string;
  teamName: string;
  teamColor: string;
  totalAmt: string;
  creds?: string; // Assuming creds is optional
  players: [];
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const sheets: sheets_v4.Sheets | undefined = await getGoogleSheetsClient(); // Explicitly type the sheets client
    console.log(sheets?.spreadsheets.values);
    if (req.method === "GET") {
      const response = await sheets?.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "Sheet1!AR:AW",
      });

      const CaptainPlayers = await sheets?.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "Sheet1!B:Y",
      });

      console.log(CaptainPlayers?.data.values);
      // Convert the data into JSON format
      // const headers :any = response?.data?.values?[1]:[1] // Headers are at index 1
      const CaptainData = response?.data.values?.slice(2); // Actual data starts from index 2
      const CaptainsJson: Captain[] | undefined = CaptainData?.map(
        (captain: any, index) => {
          const Players: any = [];
          CaptainPlayers?.data.values?.map((player: any, i) => {
            if (i >= 4) {
              Players.push({
                image: player[0 + index * 4],
                name: player[1 + index * 4],
                baseprice: player[2 + index * 4],
                bid: player[3 + index * 4],
              });
            }
          });
          if (Players.length < 5) {
            for (let index = Players.length; index < 6; index++) {
              Players.push({
                image: "",
                name: "",
                baseprice: "",
                bid: "",
              });
            }
          }
          return {
            srNo: captain[0],
            name: captain[1],
            teamName: captain[2],
            teamColor: captain[3],
            totalAmt: captain[4],
            image: captain[5], // creds might not exist in some rows
            players: Players,
          };
        }
      );
      res.status(200).json(CaptainsJson);
    }
    if (req.method === "POST") {
      try {
        const { newData } = req.body; // Assuming newData is an array of values
        const request: sheets_v4.Params$Resource$Spreadsheets$Values$Append = {
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: "Sheet1!AR:AW",
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [newData],
          },
        };
        const response = await sheets?.spreadsheets.values.append(request);

        res.status(201).json({ data: response?.data });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    }
    if (req.method === "PUT") {
      try {
        const { rowIndex, updatedData } = req.body; // rowIndex is the row number to update
        const range = `listofplayers!AL${rowIndex}:AQ${rowIndex}`; // Adjust range for your sheet
        const request: sheets_v4.Params$Resource$Spreadsheets$Values$Append = {
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: "Sheet1!AL:AQ",
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [updatedData],
          },
        };
        const response = await sheets?.spreadsheets.values.update(request);

        res.status(201).json({ data: response?.data });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    }
    if (req.method === "DELETE") {
      try {
        const { rowIndex } = req.body; // rowIndex is the row number to delete
        const clearRange = `listofplayers!AL${rowIndex}:AQ${rowIndex}`;
        const response = await sheets?.spreadsheets.values.clear({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: clearRange,
        });
        res.status(204).json({ message: "Row cleared successfully" });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
