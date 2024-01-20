import { GoogleSheets } from "../components/GoogleSheets/GoogleSheets";
import { Miro } from "../components/Miro/Miro";
import Tabs from "../components/Tabs";
import {
  createDocumentSheet,
  generateAuthURL,
  getDocumentSheets,
  isSignedIn,
  setSheetData,
} from "../lib/sheets";

export default async function Page() {
  const authURL = await generateAuthURL();

  const SignedIn = async () => {
    "use server";

    const signedIn = isSignedIn();
    return signedIn;
  };

  const createNewSheet = async (title: string) => {
    "use server";
    return createDocumentSheet(title);
  };

  const setMindmapData = async (id: any, data: string[][]) => {
    "use server";
    const sheets = await getDocumentSheets(id);
    await setSheetData(id, sheets[0], data);
  };

  return (
    <div className='grid'>
      <Tabs
        sheetsComponent={<GoogleSheets authURL={authURL} SignedIn={SignedIn} />}
        miroComponent={
          <Miro
            createNewSheet={createNewSheet}
            setMindmapData={setMindmapData}
          />
        }
      />
    </div>
  );
}
