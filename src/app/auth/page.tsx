"use client";
export default async function Auth() {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full gap-6'>
      <div className='w-10 h-10'>
        <img src='Google Sheets.png' alt='Google Sheets' />
      </div>
      <p className='text-4xl font-bold text-[#232227] text-center'>
        Google <span className='text-[#0F9D58]'>Sheets</span> is now authorized
        !
      </p>
      <p className='text-lg font-medium text-[#232227] text-center'>
        You can safely close this window.
      </p>
    </div>
  );
}
