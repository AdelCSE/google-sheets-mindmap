import { GoogleSheets } from "../components/GoogleSheets/GoogleSheets";
import { Miro } from "../components/Miro/Miro";
import { SignIn } from "../components/SignIn/SignIn";
import Tabs from "../components/Tabs";
import {
  createDocumentSheet,
  generateAuthURL,
  isSignedIn,
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

  return (
    <div className="grid">
      <Tabs
        sheetsComponent={<GoogleSheets authURL={authURL} SignedIn={SignedIn} />}
        miroComponent={<Miro createNewSheet={createNewSheet} />}
      />
    </div>
  );
}
