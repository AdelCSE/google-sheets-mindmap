import * as React from "react";
import Checkbox from "./Checkbox";

const SheetRows = ({
  title,
  onSelect,
}: {
  title: string;
  onSelect: (value: boolean) => void;
}) => {
  return (
    <div className='flex flex-row items-start w-full gap-4'>
      <div className='flex flex-grow-0'>
        <Checkbox
          onSetChecked={(value) => {
            onSelect(value);
          }}
        />
      </div>
      <div className='flex flex-grow gap-2'>
        <p className='text-[#0F9D58]'> ♦ </p>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default SheetRows;
