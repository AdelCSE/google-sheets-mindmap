import { gapi } from "../contexts/authContext";

export const getUserDocuments = async () => {
  if (!gapi) return;
  const { result } = await gapi.client.drive.files.list({
    q: "mimeType='application/vnd.google-apps.spreadsheet'",
    fields: "nextPageToken, files(id, name)",
  });

  return result.files || [];
};

export const getDocumentSheets = async (documentId: string) => {
  if (!gapi) return;
  const { result } = await gapi.client.sheets.spreadsheets.get({
    spreadsheetId: documentId,
    fields: "sheets.properties",
  });

  if (!result.sheets?.length) return [];

  return result.sheets.map((sheet: any) => sheet.properties.title);
};

export const createDocumentSheet = async (title: string) => {
  if (!gapi) return;
  const sheet = await gapi.client.sheets.spreadsheets.create({
    properties: {
      title,
    },
  });

  return sheet.result.spreadsheetId;
};

export const getSheetresult = async (documentId: string, sheetName: string) => {
  if (!gapi) return;
  const response = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: documentId,
    range: sheetName,
  });

  return response.result.values || [];
};

export const setSheetresult = async (
  documentId: string,
  sheetName: string,
  result: string[][]
) => {
  const gapi = (await import("gapi-script")).gapi;
  await gapi.client.sheets.spreadsheets.values.clear({
    spreadsheetId: documentId,
    range: sheetName,
  });

  await gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: documentId,
    range: sheetName,
    valueInputOption: "RAW",
    resource: {
      values: result,
    },
  });

  return true;
};
