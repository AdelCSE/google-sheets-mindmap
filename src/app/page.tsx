"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { GoogleSheets } from "../components/GoogleSheets/GoogleSheets";
import { Miro } from "../components/Miro/Miro";
import { getDocumentSheets, getUserDocuments } from "../lib/sheets";

export default function Page() {
  const auth = useAuth();
  const [selectedTab, setSelectedTab] = useState("sheets");

  useEffect(() => {
    if (!auth.isSignedIn) return;
    (async () => {
      const docs = await getUserDocuments();
      const sheets = await getDocumentSheets(docs[0].id);
      console.log(sheets);
    })();
  }, [auth.isSignedIn]);

  if (!auth.isLoaded) return null;

  if (!auth.isSignedIn)
    return (
      <div className='flex flex-col mt-8'>
        <div className='flex w-full justify-center items-center'>
          <img src='Google Sheets.png' className='w-16' />
        </div>
        <p className='text-xl text-center font-semibold mt-8'>
          Connect to Google Sheets
        </p>
        <p className='text-[13px] text-center mt-2'>
          Your Google Sheets account needs to be connected to Miro in order to
          use this application.
        </p>
        <button
          onClick={auth.signIn}
          className=' mt-8 px-8 sm:px-10 py-2.5 text-center font-semibold rounded-lg border-[#232227] border-[2px] bg-white shadow-[5px_5px_0px_#232227] cursor-pointer transition-all hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px]'
        >
          Login with Google Sheets
        </button>
      </div>
    );

  const setMindmapData = async (id: any, data: string[][]) => {
    const sheets = await getDocumentSheets(id);
    //await setSheetData(id, sheets[0], data);
  };

  return (
    <div className='flex flex-col w-full'>
      <div className='grid'>
        <div className='cs1 ce12'>
          <div className='tabs'>
            <div className='tabs-header-list'>
              <div
                tabIndex={0}
                className={`tab ${selectedTab === "sheets" && "tab-active"}`}
                onClick={() => setSelectedTab("sheets")}
              >
                <div className='tab-text tab-badge'>
                  Select from Google Sheets
                </div>
              </div>
              <div
                tabIndex={0}
                className={`tab ${selectedTab === "miro" && "tab-active"}`}
                onClick={() => setSelectedTab("miro")}
              >
                <div className='tab-text tab-badge'>Convert from Miro</div>
              </div>
            </div>
          </div>
        </div>
        <div className='cs1 ce12'>
          {selectedTab === "sheets" ? <GoogleSheets /> : <Miro />}
        </div>
      </div>
      <div className='mt-4 flex w-full p-4'>
        <button
          className='px-8 w-full sm:px-10 py-2.5 text-center font-semibold rounded-lg border-[#E84E36] border-[2px] bg-white shadow-[5px_5px_0px_#E84E36] cursor-pointer transition-all hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px]'
          onClick={auth.signOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
