import { google } from "googleapis";
import key from "../../secret.json";

export const auth = new google.auth.OAuth2(
  key.web.client_id,
  key.web.client_secret,
  key.web.redirect_uris[0],
);

export const isSignedIn = () => !!auth.credentials.access_token;

export const generateAuthURL = async () => {
  const authorizeUrl = auth.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.readonly",
    ],
  });
  return authorizeUrl;
};

export const getUserDocuments = async () => {
  if (!isSignedIn()) return [];

  const drive = google.drive({ version: "v3", auth });

  const { data } = await drive.files.list({
    q: "mimeType='application/vnd.google-apps.spreadsheet'",
    fields: "nextPageToken, files(id, name)",
  });

  return data.files || [];
};

export const getDocumentSheets = async (documentId: string) => {
  if (!isSignedIn()) return [];
  const sheets = google.sheets({ version: "v4", auth });

  const { data } = await sheets.spreadsheets.get({
    spreadsheetId: documentId,
    fields: "sheets.properties",
  });

  if (!data.sheets?.length) return [];

  return data.sheets.map((sheet: any) => sheet.properties.title);
};

export const getSheetData = async (documentId: string, sheetName: string) => {
  if (!isSignedIn()) return [];

  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: documentId,
    range: sheetName,
  });

  return response.data.values || [];
};

export const setSheetData = async (
  documentId: string,
  sheetName: string,
  data: string[][],
) => {
  if (!isSignedIn()) return null;

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.clear({
    spreadsheetId: documentId,
    range: sheetName,
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId: documentId,
    range: sheetName,
    valueInputOption: "RAW",
    requestBody: {
      values: data,
    },
  });

  return true;
};
