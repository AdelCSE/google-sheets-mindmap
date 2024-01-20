"use client";
import * as React from "react";

export const SignIn: React.FC<{
  authURL: string;
  SignedIn: any;
}> = ({ authURL, SignedIn }) => {
  const handleLoginClick = async () => {
    const isSignedIn = await SignedIn();
    if (!isSignedIn) {
      await window.open(authURL, "_blank");
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='w-full h-32 bg-slate-400'></div>
      <p className='text-xl text-center font-semibold mt-8'>
        Connect to Google Sheets
      </p>
      <p className='text-[13px] text-center mt-2'>
        Your Google Sheets account needs to be connected to Miro in order to use
        this application.
      </p>
      <button
        onClick={handleLoginClick}
        className=' mt-8 px-8 sm:px-10 py-2.5 text-center font-semibold rounded-lg border-[#232227] border-[2px] bg-white shadow-[5px_5px_0px_#232227] cursor-pointer transition-all hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px]'
      >
        Login with Google Sheets
      </button>
    </div>
  );
};
