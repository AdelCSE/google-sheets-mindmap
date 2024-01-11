"use client";

export const GoogleSheets: React.FC<{ authURL: string }> = ({ authURL }) => {
  const handleGoogleSheetsClick = async () => {
    window.open(authURL, "_blank");
  };

  return (
    <div className="flex flex-col w-full items-center gap-4 mt-6 px-2">
      <h3 className="font-semibold">Select from Google Sheets</h3>
      <p className="font-medium text-center">
        Select a spreadsheet and automatically generate mind maps in Miro !
      </p>

      <img className="import-github-image" src="" draggable={false} />

      <button
        className="button button-primary w-fit"
        type="button"
        onClick={handleGoogleSheetsClick}
      >
        Choose from Google Sheets
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
