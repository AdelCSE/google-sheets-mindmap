import * as React from "react";

const Header = () => {
  return (
    <div className='flex flex-row gap-12'>
      <div className='flex flex-grow-0'>
        <p className='font-bold'> </p>
      </div>
      <div className='flex flex-grow'>
        <p className='font-bold text-[#232227]'>Sheet Name</p>
      </div>
    </div>
  );
};

export default Header;
