"use client";

import React, { useEffect } from "react";

export const Miro = () => {
  const [isItemSelected, setIsItemSelected] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<any>();

  useEffect(() => {
    // Listen to selection updates
    miro.board.ui.on("selection:update", async () => {
      const selection = await miro.board.getSelection();

      // Filter mindmap roots from the selected items
      const mindmapRoot = selection.filter(
        (item) => item.type === "mindmap" && item.parentId === null
      );
      const selectedLength = mindmapRoot.length;

      // Check to see if one mindmap root is selected
      if (selectedLength == 1) {
        setIsItemSelected(true);
        setSelectedItem(mindmapRoot[0]);
      } else {
        setIsItemSelected(false);
        setSelectedItem(null);
      }
    });
  }, []);

  const handleConvertClick = () => {
    //handle convert mindmap to spreadsheet
    console.log("Mindmap root id:" + selectedItem.id);
  };

  return (
    <div className='flex flex-col w-full items-center gap-4 mt-6 px-2'>
      <h3 className='font-semibold'>Convert from Miro</h3>
      <p className='font-medium text-center'>
        Select from the board the root node of the mindmap you'd like to convert
        !
      </p>

      <img className='import-github-image' src='' draggable={false} />

      <button
        className='button button-primary w-fit'
        type='button'
        disabled={!isItemSelected}
        onClick={handleConvertClick}
      >
        Convert to spreadsheet
      </button>

      <div className='mt-6'>
        <p className='font-bold mb-2'>Synced changes !</p>
        <p>
          Any changes you apply, either in Miro or in Google Sheets, are synced
          between both tools.
        </p>
      </div>
    </div>
  );
};
