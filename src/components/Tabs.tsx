"use client";

import { useState } from "react";

interface Props {
  sheetsComponent: React.ReactNode;
  miroComponent: React.ReactNode;
}
const Tabs: React.FC<Props> = ({ sheetsComponent, miroComponent }) => {
  const [selectedTab, setSelectedTab] = useState("sheets");

  const handleSelectTab = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <>
      <div className="cs1 ce12">
        <div className="tabs">
          <div className="tabs-header-list">
            <div
              tabIndex={0}
              className={`tab ${selectedTab === "sheets" && "tab-active"}`}
              onClick={() => handleSelectTab("sheets")}
            >
              <div className="tab-text tab-badge">
                Select from Google Sheets
              </div>
            </div>
            <div
              tabIndex={0}
              className={`tab ${selectedTab === "miro" && "tab-active"}`}
              onClick={() => handleSelectTab("miro")}
            >
              <div className="tab-text tab-badge">Convert from Miro</div>
            </div>
          </div>
        </div>
      </div>
      <div className="cs1 ce12">
        {selectedTab === "sheets" ? sheetsComponent : miroComponent}
      </div>
    </>
  );
};

export default Tabs;
