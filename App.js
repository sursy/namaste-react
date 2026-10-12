import React from "react";
import { createRoot } from "react-dom/client";

const heading = React.createElement(
    "div",
    { className: "heading" },
    React.createElement("h1", { className: "heading" }, "Hello"),
    React.createElement("h2", { className: "heading2" }, "welcome React")
);

const root = createRoot(document.getElementById("root"));

root.render(heading);