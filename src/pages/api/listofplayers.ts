import getGoogleSheetsClient from "./utils/googlesheet";
import { NextApiRequest, NextApiResponse } from "next";
import { sheets_v4 } from "googleapis"; // Import the sheets type from googleapis
interface Player {
  srNo: string;
  name: string;
  basePrice: string;
  speciality: string;
  usp: string;
  imageUrl: string;
  status: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const sheets: sheets_v4.Sheets | undefined = await getGoogleSheetsClient(); // Explicitly type the sheets client
    if (req.method === "GET") {
      const response = await sheets?.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "Sheet1!BC:BI",
      });
      // Extract the headers and player data
      //   const headers: any = response?.data?.values ? [1] : [1];
      const playersData = response?.data.values?.slice(2);
      const playersJson: Player[] | undefined = playersData?.map((player) => {
        return {
          srNo: player[0],
          name: player[1],
          basePrice: player[2],
          speciality: player[3],
          usp: player[4],
          imageUrl: player[5],
          status: player[6],
        };
      });
      const filtersoldplayer = playersJson?.filter(
        (player: Player) => player?.status === "unsold"
      );
      res.status(200).json(filtersoldplayer);
    }
    if (req.method === "POST") {
      try {
        const { newData } = req.body; // Assuming newData is an array of values
        const request: sheets_v4.Params$Resource$Spreadsheets$Values$Append = {
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: "Sheet1!BC:BH",
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
        const range = `listofplayers!A${rowIndex}:Z${rowIndex}`; // Adjust range for your sheet
        const request: sheets_v4.Params$Resource$Spreadsheets$Values$Append = {
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: "Sheet1!AE:AJ",
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
    // if (req.method === "DELETE") {
    //   try {
    //     const { rowIndex } = req.body; // rowIndex is the row number to delete

    //     const clearRange = `Sheet1!BC${rowIndex}:BH${rowIndex}`;
    //     const response = await sheets?.spreadsheets.values.clear({
    //       spreadsheetId: process.env.GOOGLE_SHEET_ID,
    //       range: clearRange,
    //     });
    //     res.status(204).json({ message: "Row cleared successfully" });
    //   } catch (error: any) {
    //     res.status(500).json({ error: error.message });
    //   }
    // }
    if (req.method === "DELETE") {
      try {
        const { playerName } = req.body; // playerName is the name of the player to delete

        // Fetch all data from the sheet to find the player's row
        const getResponse = await sheets?.spreadsheets.values.get({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: "Sheet1!BD2:BD", // Assuming player names are in column B (adjust if different)
        });
        console.log(getResponse?.data.values);
        const rows = getResponse?.data.values;
        if (!rows) {
          return res.status(404).json({ error: "No data found in the sheet" });
        }

        // Find the row index where the playerName matches
        const rowIndex = rows.findIndex((row) => row[0] === playerName);
        if (rowIndex === -1) {
          return res.status(404).json({ error: "Player not found" });
        }

        // Convert 0-based rowIndex to actual row number in the sheet (add 2 for header offset)
        const rowNumber = rowIndex + 2;

        // Define the range for the "status" column (assuming status is in column F)
        const statusRange = `Sheet1!BI${rowNumber}`;

        // Update the status of the found row to "sold"
        const updateResponse = await sheets?.spreadsheets.values.update({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: statusRange,
          valueInputOption: "RAW",
          requestBody: {
            values: [["sold"]],
          },
        });

        res.status(200).json({ message: "Player status updated to 'sold'" });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
