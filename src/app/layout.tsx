import "../assets/style.css";
import Script from "next/script";
import { MiroSDKInit } from "../components/SDKInit";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/mirotone@^5/dist/styles.css"
        ></link>
      </head>
      <body>
        <Script
          src="https://miro.com/app/static/sdk/v2/miro.js"
          strategy="beforeInteractive"
        />
        <MiroSDKInit />
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
