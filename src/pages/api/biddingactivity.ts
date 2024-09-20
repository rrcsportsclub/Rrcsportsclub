import getGoogleSheetsClient from "./utils/googlesheet";
import { NextApiRequest, NextApiResponse } from "next";
import { sheets_v4 } from "googleapis"; // Import the sheets type from googleapis
interface biddingActivites {
  round: string;
  captain: string;
  player: string;
  baseprice: number;
  bidamt: number;
  totalamt: number;
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
        range: "Sheet1!AB:AH",
      });
      // Extract the headers and player data
      //   const headers: any = response?.data?.values ? [1] : [1];
      const BiddingActivity = response?.data.values?.slice(2);
      const BiddingActivities: any = BiddingActivity?.map((activity: any) => {
        return {
          round: activity[0],
          captain: activity[1],
          player: activity[2],
          baseprice: activity[3],
          bidamt: activity[4],
          totalamt: activity[5],
          status: activity[6],
        };
      });
      res.status(200).json(BiddingActivities);
    }
    if (req.method === "POST") {
      try {
        const { newData } = req.body; // Assuming newData is an array of values
        const request: sheets_v4.Params$Resource$Spreadsheets$Values$Append = {
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: "Sheet1!AB:AH",
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [newData],
          },
        };
        const response = await sheets?.spreadsheets.values.append(request);
        if (newData[newData.length - 1] === "sold") {
          const playerName = newData[2]; // playerName is the name of the player to delete
          console.log(playerName);
          const captainName = newData[1];
          const playersoldprice = newData[5];

          // Fetch all data from the sheet to find the player's row
          const getResponse = await sheets?.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Sheet1!BD2:BD", // Assuming player names are in column B (adjust if different)
          });
          const rows = getResponse?.data.values;
          if (!rows) {
            return res
              .status(404)
              .json({ error: "No data found in the sheet" });
          }

          // Find the row index where the playerName matches
          const rowIndex = rows.findIndex((row) => row[0] === playerName);
          console.log(rows, rowIndex);
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

          // captain balance
          const getCaptainresponse = await sheets?.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Sheet1!AS2:AS",
          });
          const captainrows = getCaptainresponse?.data.values;
          if (!captainrows) {
            return res
              .status(404)
              .json({ error: "No data found in the sheet" });
          }

          // Find the row index where the playerName matches
          const captainrowIndex = captainrows.findIndex(
            (row) => row[0] === captainName
          );
          if (captainrowIndex === -1) {
            return res.status(404).json({ error: "Captain not found" });
          }

          // Convert 0-based captainrowIndex to actual row number in the sheet (add 2 for header offset)
          const captainrowNumber = captainrowIndex + 2;

          // Define the range for the "status" column (assuming status is in column F)
          const CaptainstatusRange = `Sheet1!AV${captainrowNumber}`;
          // Update the status of the found row to "sold"
          const getCaptainBiddingresponse =
            await sheets?.spreadsheets.values.get({
              spreadsheetId: process.env.GOOGLE_SHEET_ID,
              range: "Sheet1!AV2:AV",
            });
          const captainBiddingrows =
            getCaptainBiddingresponse?.data.values || [];
          const biddingamount: any =
            captainBiddingrows[captainrowIndex][0] - playersoldprice;
          const CaptainupdateResponse =
            await sheets?.spreadsheets.values.update({
              spreadsheetId: process.env.GOOGLE_SHEET_ID,
              range: CaptainstatusRange,
              valueInputOption: "RAW",
              requestBody: {
                values: [[biddingamount]],
              },
            });
        }

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
    if (req.method === "DELETE") {
      try {
        const { rowIndex } = req.body; // rowIndex is the row number to delete

        const clearRange = `listofplayers!A${rowIndex}:Z${rowIndex}`;
        const response = await sheets?.spreadsheets.values.clear({
          spreadsheetId: "YOUR_SPREADSHEET_ID",
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
