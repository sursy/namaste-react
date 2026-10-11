const heading = React.createElement("div", { class: "heading"}, "", 
    [React.createElement("h1", { class: "heading"}, "Hello"), 
    React.createElement("h2", { class: "heading2"}, "welcome React")]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(heading);