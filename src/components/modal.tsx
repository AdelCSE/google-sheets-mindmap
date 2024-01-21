"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Spreadsheet } from "../types";
import { createMindmap } from "../lib/mindmap";
import Header from "./Modal/Header";
import SheetRows from "./Modal/SheetRow";
import Loader from "./Modal/Loader";
import { useAuth } from "../contexts/authContext";
import {
  getSheetresult,
  getDocumentSheets,
  getUserDocuments,
} from "../lib/sheets";

export default function ModalContent({}) {
  /** Store Selected Spreadsheet and Sheets **/

  const [selectedSheets, setSelectedSheets] = React.useState<string[]>([]);
  const [selectedSpreadsheet, setSelectedSpreadsheet] = useState<string>();

  /** Store Loading States **/

  const [loading, setLoading] = React.useState<boolean>(false);
  const [converting, setConverting] = React.useState<boolean>(false);

  /** Store Error State **/

  const [errorType, setErrorType] = React.useState<string>("NO_ERROR");

  /** Store information pulled from Google Sheet API **/

  const [spreadsheets, setSpreadsheets] = useState<Spreadsheet[]>([]);
  const [sheets, setSheets] = useState<string[]>([]);

  /** Fetch Spreadsheets **/

  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoaded) return;
    getUserDocuments().then((data: any) => {
      const convertedData: Spreadsheet[] = data.map((spreadsheet: any) => {
        return {
          id: spreadsheet.id,
          name: spreadsheet.name,
        };
      });
      setSpreadsheets(convertedData);
    });
  }, [auth.isLoaded]);

  /** Fetch Sheets **/

  useEffect(() => {
    if (!auth.isLoaded) return;
    if (selectedSpreadsheet !== undefined) {
      getDocumentSheets(spreadsheets[parseInt(selectedSpreadsheet)].id!).then(
        (data: any) => {
          setSheets(data);
          setLoading(false);
        }
      );
    }
  }, [selectedSpreadsheet, auth.isLoaded]);

  /** Handle Sheet Rows Selection **/

  const handleSheetSelect = (isChecked: boolean, sheet: string) => {
    setErrorType("NO_ERROR");
    if (isChecked) {
      setSelectedSheets((previousState) => [...previousState, sheet]);
    } else {
      const updatedSheets = selectedSheets.filter(
        (currentSheet) => currentSheet !== sheet
      );
      setSelectedSheets([...updatedSheets]);
    }
  };

  /** Fetch Selected Sheets Data **/

  const handleImportClick = async () => {
    if (!CheckForErrors()) {
      if (selectedSpreadsheet !== undefined) {
        getSheetresult(
          spreadsheets[parseInt(selectedSpreadsheet)].id!,
          sheets[0]
        ).then((data: any) => {
          setConverting(true);
          ConvertToMindmap(data);
        });
      }
    }
  };

  /** Convert Sheet Data to Mindmap **/

  const ConvertToMindmap = async (SheetData: any[][]) => {
    try {
      await createMindmap(SheetData);
      await miro.board.ui.closeModal();
      setConverting(false);
    } catch (e) {
      console.error(e);
    }
  };

  /** Handle Convert Click Errors **/

  const CheckForErrors = () => {
    setErrorType("NO_ERROR");
    if (selectedSpreadsheet === undefined || selectedSpreadsheet === "-1") {
      setErrorType("EMPTY_SPREADSHEET");
      return true;
    } else if (selectedSheets.length === 0) {
      setErrorType("EMPTY_SHEET");
      return true;
    } else if (selectedSheets.length > 1) {
      setErrorType("MULTIPLE_SHEETS");
      return true;
    }
    return false;
  };

  return (
    <div className='flex flex-col'>
      <p className='text-center text-3xl font-bold'>
        Choose from Google Sheets
      </p>
      <div className='flex flex-col items-start gap-4 mt-8'>
        <label className='font-[14px]'>
          Select Spreadsheet <span className='text-red-500'>*</span>
        </label>
        <select
          className='select'
          required={true}
          defaultValue={-1}
          onChange={(e) => {
            setSelectedSheets([]);
            setErrorType("NO_ERROR");
            setLoading(true);
            setSelectedSpreadsheet(e.target.value);
          }}
        >
          <option value={-1} disabled>
            Select ...
          </option>
          {spreadsheets &&
            spreadsheets.map((option, index) => {
              return (
                <option key={index} value={index}>
                  {option.name}
                </option>
              );
            })}
        </select>
      </div>

      <div className='mt-12'>
        {loading ? (
          <div className='flex justify-center'>
            <Loader />
          </div>
        ) : (
          selectedSpreadsheet !== undefined && (
            <>
              <Header />
              <div className='flex flex-col gap-4 mt-6'>
                {sheets &&
                  sheets.map((sheet: any, index: any) => (
                    <div key={index}>
                      <SheetRows
                        title={sheet}
                        onSelect={(value) => handleSheetSelect(value, sheet)}
                      />
                    </div>
                  ))}
              </div>
            </>
          )
        )}
      </div>
      <div className='flex flex-col font-bold mt-6'>
        <button
          className='px-8 sm:px-10 py-2.5 text-center rounded-lg border-[#232227] border-[2px] bg-white shadow-[5px_5px_0px_#232227] cursor-pointer transition-all hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px]'
          type='button'
          onClick={handleImportClick}
        >
          Convert to Mind Map
        </button>
        <div className='font-semibold mt-4'>
          {errorType === "EMPTY_SPREADSHEET" && (
            <p className='text-red-500'>Please select a spreadsheet</p>
          )}
          {errorType === "EMPTY_SHEET" && (
            <p className='text-red-500'>Please select a sheet</p>
          )}
          {errorType === "MULTIPLE_SHEETS" && (
            <p className='text-red-500'>
              Please select only one sheet at a time
            </p>
          )}
          {converting && (
            <div className='flex justify-center'>
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
