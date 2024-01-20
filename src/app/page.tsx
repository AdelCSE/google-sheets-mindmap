import { GoogleSheets } from "../components/GoogleSheets/GoogleSheets";
import { Miro } from "../components/Miro/Miro";
import { SignIn } from "../components/SignIn/SignIn";
import Tabs from "../components/Tabs";
import { generateAuthURL, isSignedIn } from "../lib/sheets";

export default async function Page() {
  const authURL = await generateAuthURL();

  const SignedIn = async () => {
    "use server";
    return await isSignedIn();
  };

  const signedIn = await isSignedIn();

  return (
    <>
      {signedIn ? (
        <div className='grid'>
          <Tabs
            sheetsComponent={
              <GoogleSheets authURL={authURL} SignedIn={SignedIn} />
            }
            miroComponent={<Miro />}
          />
        </div>
      ) : (
        <SignIn authURL={authURL} SignedIn={SignedIn} />
      )}
    </>
  );
}
