import { GoogleSheets } from "../components/GoogleSheets/GoogleSheets";
import { Miro } from "../components/Miro/Miro";
import Tabs from "../components/Tabs";
import { generateAuthURL, isSignedIn } from "../lib/sheets";

export default async function Page() {
  const authURL = await generateAuthURL();

  const SignedIn = async () => {
    "use server";
    const signedIn = await isSignedIn();
    return signedIn;
  };

  return (
    <div className='grid'>
      <Tabs
        sheetsComponent={<GoogleSheets authURL={authURL} SignedIn={SignedIn} />}
        miroComponent={<Miro />}
      />
    </div>
  );
}
