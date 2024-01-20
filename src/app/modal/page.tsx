import ModalContent from "../../components/modal";
import {
  getSheetData,
  getDocumentSheets,
  getUserDocuments,
  createDocumentSheet,
} from "../../lib/sheets";

export default async function Modal() {
  const docs = await getUserDocuments();

  const getSheets = async (id: any) => {
    "use server";
    return await getDocumentSheets(docs[id].id!);
  };

  const getSheetsData = async (sheetsIdList: any[], docId: any) => {
    "use server";
    const sheets = await getDocumentSheets(docs[docId].id!);
    let result = await getSheetData(docs[docId].id!, sheets[sheetsIdList[0]]);
    return result;
  };

  return (
    <ModalContent
      docs={docs}
      getSheets={getSheets}
      getSheetsData={getSheetsData}
    />
  );
}
