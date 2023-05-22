import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// const router = createBrowserRouter([
//     {
//         path: "/", element: <App />, children:[
//             {
//                 children: [
//                     {}
//                 ]
//             }
//         ]
//     }
// ])

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
