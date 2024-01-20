"use client";

import { MindmapNode } from "@mirohq/websdk-types";
import React, { useEffect } from "react";

export const Miro = ({
  createNewSheet,
}: {
  createNewSheet: (title: string) => Promise<string | null | undefined>;
}) => {
  const [isItemSelected, setIsItemSelected] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<any>();
  const [data, setData] = React.useState<string[][]>([]);

  useEffect(() => {
    // Listen to selection updates
    miro.board.ui.on("selection:update", async () => {
      const selection = await miro.board.getSelection();

      // Filter mindmap roots from the selected items
      const mindmapRoot = selection.filter(
        (item) => item.type === "mindmap" && item.parentId === null,
      );
      const selectedLength = mindmapRoot.length;

      // Check to see if one mindmap root is selected
      if (selectedLength === 1) {
        setIsItemSelected(true);
        setSelectedItem(mindmapRoot[0]);
      } else {
        setIsItemSelected(false);
        setSelectedItem(null);
      }
    });
  }, []);

  useEffect(() => {
    // Log data whenever it changes
    console.log("Updated Data:", data);
  }, [data]);

  const handleConvertClick = async () => {
    if (selectedItem) {
      const root = await miro.board.experimental.get({ type: "mindmap_node" });
      const nodesList: string[][] = [];

      for (const node of root) {
        await traverse(node, nodesList, []);
      }

      setData(reverseRows(filterRows(nodesList)));
      await createNewSheet("AAAAAAAAAAA");
    }
  };

  const traverse = async (
    node: MindmapNode,
    data: string[][],
    path: string[],
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
        nextRow.includes(elem),
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

  return (
    <div className="flex flex-col w-full items-center gap-4 mt-6 px-2">
      <h3 className="font-semibold">Convert from Miro</h3>
      <p className="font-medium text-center">
        Select from the board the root node of the mindmap you'd like to convert
        !
      </p>

      <img className="import-github-image" src="" draggable={false} />

      <button
        className="button button-primary w-fit"
        type="button"
        disabled={!isItemSelected}
        onClick={handleConvertClick}
      >
        Convert to spreadsheet
      </button>

      <div className="mt-6">
        <p className="font-bold mb-2">Synced changes !</p>
        <p>
          Any changes you apply, either in Miro or in Google Sheets, are synced
          between both tools.
        </p>
      </div>
    </div>
  );
};
