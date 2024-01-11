import { GoogleSheets } from "../components/GoogleSheets/GoogleSheets";
import { Miro } from "../components/Miro/Miro";
import Tabs from "../components/Tabs";
import {
  generateAuthURL,
  getSheetData,
  getDocumentSheets,
  getUserDocuments,
  isSignedIn,
  setSheetData,
} from "../lib/sheets";

export default async function Page() {
  const authURL = await generateAuthURL();

  if (isSignedIn()) {
    const docs = await getUserDocuments();
    console.log(docs);

    const sheets = await getDocumentSheets(docs[0].id!);
    console.log(sheets);

    const data = await getSheetData(docs[0].id!, sheets[0]);
    console.log(data);

    await setSheetData(docs[0].id!, sheets[0], [["does", "this"], ["work"]]);
  }

  return (
    <div className="grid">
      <Tabs
        sheetsComponent={<GoogleSheets authURL={authURL} />}
        miroComponent={<Miro />}
      />
    </div>
  );
}
