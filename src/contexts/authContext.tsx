"use client";
import { gapi } from "gapi-script";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isSignedIn: boolean;
  isLoaded: boolean;
  signIn: () => void;
  signOut: () => void;
}

const authContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(authContext);

const DISCOVERY_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    gapi.load("client:auth2", async () => {
      await gapi.client.init({
        apiKey: "AIzaSyAaYKs5q92CeQs5sjY5iRGN5Q1AsBqIQvA",
        discoveryDocs: DISCOVERY_DOCS,
        scope:
          "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.readonly",
        clientId:
          "846025308320-0vkcudds6s889souhdnlq3srgjoqrsd3.apps.googleusercontent.com",
      });
      setIsSignedIn(gapi.auth2.getAuthInstance().isSignedIn.get());
      setIsLoaded(true);
    });
  }, []);

  const signIn = async () => {
    if (!isLoaded || isSignedIn) return;
    try {
      await gapi.auth2.getAuthInstance().signIn();
      setIsSignedIn(true);
    } catch (e) {
      // closed by user
    }
  };

  const signOut = async () => {
    if (!isLoaded || !isSignedIn) return;
    try {
      await gapi.auth2.getAuthInstance().signOut();
      setIsSignedIn(false);
    } catch (e) {
      // idk what could happen lol
    }
  };

  return (
    <authContext.Provider
      value={{
        isLoaded,
        isSignedIn,
        signIn,
        signOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
