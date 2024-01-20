"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { GoogleSheets } from "../components/GoogleSheets/GoogleSheets";
import { Miro } from "../components/Miro/Miro";
import { getDocumentSheets, getUserDocuments } from "../lib/sheets";

export default function Page() {
  const auth = useAuth();
  const [selectedTab, setSelectedTab] = useState("sheets");

  useEffect(() => {
    if (!auth.isSignedIn) return;
    (async () => {
      const docs = await getUserDocuments();
      const sheets = await getDocumentSheets(docs[0].id);
      console.log(sheets);
    })();
  }, [auth.isSignedIn]);

  if (!auth.isLoaded) return null;

  if (!auth.isSignedIn) return <button onClick={auth.signIn}>login</button>;

  return (
    <div className="grid">
      <div className="cs1 ce12">
        <div className="tabs">
          <div className="tabs-header-list">
            <div
              tabIndex={0}
              className={`tab ${selectedTab === "sheets" && "tab-active"}`}
              onClick={() => setSelectedTab("sheets")}
            >
              <div className="tab-text tab-badge">
                Select from Google Sheets
              </div>
            </div>
            <div
              tabIndex={0}
              className={`tab ${selectedTab === "miro" && "tab-active"}`}
              onClick={() => setSelectedTab("miro")}
            >
              <div className="tab-text tab-badge">Convert from Miro</div>
            </div>
          </div>
        </div>
      </div>
      <div className="cs1 ce12">
        {selectedTab === "sheets" ? <GoogleSheets /> : <Miro />}
      </div>
    </div>
  );
}
