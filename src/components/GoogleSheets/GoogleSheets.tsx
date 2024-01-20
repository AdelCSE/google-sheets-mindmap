"use client";

export const GoogleSheets: React.FC<{
  authURL: string;
  SignedIn: any;
}> = ({ authURL, SignedIn }) => {
  const handleGoogleSheetsClick = async () => {
    const isSignedIn = await SignedIn();
    if (!isSignedIn) {
      await window.open(authURL, "_blank");
    } else {
      openModal();
    }
  };

  const openModal = async () => {
    if (await miro.board.ui.canOpenModal()) {
      await miro.board.ui.openModal({
        url: "/modal",
        fullscreen: false,
      });
    }
  };

  return (
    <div className='flex flex-col w-full items-center gap-4 mt-4 px-2'>
      <h3 className='font-semibold'>Select from Google Sheets</h3>
      <p className='font-medium text-center'>
        Select a spreadsheet and automatically generate mind maps in Miro !
      </p>

      <button
        className='px-8 sm:px-10 py-2.5 text-center font-semibold rounded-lg border-[#232227] border-[2px] bg-white shadow-[5px_5px_0px_#232227] cursor-pointer transition-all hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px]'
        type='button'
        onClick={handleGoogleSheetsClick}
      >
        Choose from Google Sheets
      </button>

      <div className='mt-6'>
        <p className='font-bold mb-2'>How to use ?</p>
        <p>
          Make sure the selected sheet matches a similar format like the
          following:
        </p>
        <SheetFormat />
      </div>
    </div>
  );
};

const SheetFormat = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='mt-4 flex flex-col w-fit p-4 gap-2 justify-center items-center border-2 border-dashed border-black rounded-2xl'>
        <div className='flex gap-4'>
          <div className='flex-grow-1 px-2 py-1 text-center font-semibold rounded-lg border-[#232227] border-[2px] bg-[#BAADFC]'>
            Root
          </div>
          <div className='flex-grow-1 px-2 py-1 text-center font-semibold rounded-lg border-[#232227] border-[2px] bg-[#F3B1AF]'>
            Child 1
          </div>
          <div className='flex-grow-1 px-2 py-1 text-center font-semibold rounded-lg border-[#232227] border-[2px] bg-[#BEBEBE]'>
            Child 1.1
          </div>
        </div>
        <div className='flex gap-4'>
          <div className='flex-grow-1 px-2 py-1 text-center font-semibold rounded-lg border-[#232227] border-[2px] bg-[#BAADFC]'>
            Root
          </div>
          <div className='flex-grow-1 px-2 py-1 text-center font-semibold rounded-lg border-[#232227] border-[2px] bg-[#F3B1AF]'>
            Child 1
          </div>
          <div className='flex-grow-1 px-2 py-1 text-center font-semibold rounded-lg border-[#232227] border-[2px] bg-[#AFF4FD]'>
            Child 1.2
          </div>
        </div>
        <div className='flex gap-4'>
          <div className='flex-grow-1 px-2 py-1 text-center font-semibold rounded-lg border-[#232227] border-[2px] bg-[#BAADFC]'>
            Root
          </div>
          <div className='flex-grow-1 px-2 py-1 text-center font-semibold rounded-lg border-[#232227] border-[2px] bg-[#D5FCC5]'>
            Child 2
          </div>
          <div className='flex-grow-1 px-2 py-1 text-center font-semibold rounded-lg border-[#232227] border-[2px] bg-[#F6C9FB]'>
            Child 2.1
          </div>
        </div>
        <div className='flex gap-4'>
          <div className='flex-grow-1 px-2 py-1 text-center font-semibold rounded-lg border-[#232227] border-[2px] bg-[#BAADFC]'>
            Root
          </div>
          <div className='flex-grow-1 px-2 py-1 text-center font-semibold rounded-lg border-[#232227] border-[2px] bg-[#FDFEBE]'>
            Child 3
          </div>
          <div className='flex-grow-1 px-2 py-1 text-center font-semibold rounded-lg border-[#232227] border-[2px] bg-[#A6C4FA]'>
            Child 3.1
          </div>
        </div>
      </div>
    </div>
  );
};
