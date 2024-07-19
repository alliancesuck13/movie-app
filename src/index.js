import React from "react";
import ReactDOM from "react-dom/client";
import { Online, Offline } from "react-detect-offline";
import { Alert } from "antd";

import "./index.css";
import MovieApp from "./components/MovieApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Online>
      <MovieApp />
    </Online>
    <Offline>
      <Alert
        banner="true"
        message="No internet connection"
        description="You are offline now =( Check your internet connection"
        type="error"
      />
    </Offline>
  </React.StrictMode>
);
