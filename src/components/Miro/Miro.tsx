"use client";

import { MindmapNode } from "@mirohq/websdk-types";
import React, { useEffect } from "react";
import Loader from "../Modal/Loader";

export const Miro: React.FC = () => {
  const [isItemSelected, setIsItemSelected] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<any>();
  const [data, setData] = React.useState<string[][]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [errorType, setErrorType] = React.useState<string>("NO_ERROR");

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
      setErrorType("NO_ERROR");
      if (selectedLength === 1) {
        setIsItemSelected(true);
        setSelectedItem(mindmapRoot[0]);
      } else {
        setIsItemSelected(false);
        setSelectedItem(null);
      }
    });
  }, []);

  const handleConvertClick = async () => {
    if (!CheckErrors()) {
      setLoading(true);
      if (selectedItem) {
        const root = await miro.board.experimental.get({
          type: "mindmap_node",
        });
        const nodesList: string[][] = [];

        for (const node of root) {
          await traverse(node, nodesList, []);
        }

        setData(reverseRows(filterRows(nodesList)));
        const spreadsheetId = await createNewSheet(title);
        await setMindmapData(spreadsheetId, data);
        setLoading(false);
      }
      setData(reverseRows(filterRows(nodesList)));
    }
  };

  const traverse = async (
    node: MindmapNode,
    data: string[][],
    path: string[]
  ) => {
    const content = node.nodeView.content;
    const children = await node.getChildren();

    // Create a new path for the current node
    const currentPath = [...path, content];

    // Push the current path to the array
    data.push(currentPath);

    // Traverse each child with the updated path
    for (const child of children) {
      await traverse(child, data, currentPath);
    }
  };

  function filterRows(input: string[][]): string[][] {
    const output: string[][] = [];
    let currentRow: string[] = input[0];

    for (let i = 1; i < input.length; i++) {
      const nextRow: string[] = input[i];

      // Check if nextRow contains all elements of currentRow
      const containsAll: boolean = currentRow.every((elem) =>
        nextRow.includes(elem)
      );

      if (!containsAll) {
        output.push(currentRow);
      }

      // Update currentRow for the next iteration
      currentRow = nextRow;
    }

    // Add the last row to the output
    output.push(currentRow);

    return output;
  }

  function reverseRows(input: string[][]): string[][] {
    const reversedRows: string[][] = [];

    for (let i = input.length - 1; i >= 0; i--) {
      reversedRows.push([...input[i]]);
    }

    return reversedRows;
  }

  const CheckErrors = () => {
    setErrorType("NO_ERROR");
    if (title === "") {
      setErrorType("EMPTY_TITLE");
      return true;
    } else {
      setErrorType("NO_ERROR");
      return false;
    }
  };

  return (
    <div className='flex flex-col w-full items-center gap-4 mt-4 px-2'>
      <h3 className='font-semibold'>Convert from Miro</h3>
      {isItemSelected ? (
        <>
          <div className='flex flex-col w-full gap-4 items-start'>
            <label className='font-[14px]'>
              Enter a spreadsheet name <span className='text-red-500'>*</span>
            </label>
            <input
              className='input'
              type='text'
              placeholder='Enter a spreadsheet name ...'
              required={true}
              onChange={(e) => {
                setErrorType("NO_ERROR");
                setTitle(e.target.value);
              }}
            />

            <button
              className='w-full px-8 sm:px-10 py-2.5 text-center font-semibold rounded-lg border-[#232227] border-[2px] bg-white shadow-[5px_5px_0px_#232227] cursor-pointer transition-all hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px]'
              type='button'
              disabled={!isItemSelected}
              onClick={handleConvertClick}
            >
              Convert to spreadsheet
            </button>
          </div>
        </>
      ) : (
        <>
          <p className='font-medium text-center'>
            Select from the board the root node of the mindmap you'd like to
            convert !
          </p>
          <div className='mt-6'>
            <p className='font-bold mb-2'>How to use ?</p>
            <p className='font-medium'>
              Select the root node, name your spreadsheet and click on convert !
            </p>
            <div className='mt-4 flex flex-col w-fit p-4 gap-2 justify-center items-center border-2 border-dashed border-black rounded-2xl'>
              <img
                className='w-full'
                alt='Mindmap example'
                src='mindmapExample.png'
              />
            </div>
          </div>
        </>
      )}
      {errorType === "EMPTY_TITLE" && (
        <p className='text-red-500'>Please enter a spreadsheet name</p>
      )}
      {loading && <Loader />}
    </div>
  );
};
