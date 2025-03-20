import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@radix-ui/themes/styles.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Theme } from "@radix-ui/themes";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Theme appearance="dark">
                <App />
            </Theme>
        </BrowserRouter>
    </StrictMode>
);
