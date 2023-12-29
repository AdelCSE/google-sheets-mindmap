"use client";

import React from "react";
import Script from "next/script";
import { MiroSDKInit } from "../components/SDKInit";
import { Miro } from "../components/Miro/Miro";
import { GoogleSheets } from "../components/GoogleSheets/GoogleSheets";
import "../assets/style.css";

export default function RootLayout() {
  const [selectedTab, setSelectedTab] = React.useState("sheets");

  const handleSelectTab = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <html>
      <head>
        <link
          rel='stylesheet'
          href='https://unpkg.com/mirotone@^5/dist/styles.css'
        ></link>
      </head>
      <body>
        <Script
          src='https://miro.com/app/static/sdk/v2/miro.js'
          strategy='beforeInteractive'
        />
        <MiroSDKInit />
        <div id='root'>
          <div className='grid'>
            <div className='cs1 ce12'>
              <div className='tabs'>
                <div className='tabs-header-list'>
                  <div
                    tabIndex={0}
                    className={`tab ${
                      selectedTab === "sheets" && "tab-active"
                    }`}
                    onClick={() => handleSelectTab("sheets")}
                  >
                    <div className='tab-text tab-badge'>
                      Select from Google Sheets
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className={`tab ${selectedTab === "miro" && "tab-active"}`}
                    onClick={() => handleSelectTab("miro")}
                  >
                    <div className='tab-text tab-badge'>Convert from Miro</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='cs1 ce12'>
              {selectedTab === "sheets" ? <GoogleSheets /> : <Miro />}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
