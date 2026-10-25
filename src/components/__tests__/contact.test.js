import {render, screen } from "@testing-library/react"
import ContactUs from "../ContactUs";
import "@testing-library/jest-dom"

describe("contact us page test cases", () => {
    test("should test contact us how many h1 tag in the page", () => {

    render(<ContactUs/>);
 
    const input = screen.getByRole("heading", { level: 1 });

    expect(input).toBeInTheDocument();

});


test("should test contact us button in the page", () => {

    render(<ContactUs/>);

    const heading = screen.getByRole("button");

    expect(heading).toBeInTheDocument();

});


test("should test contact us button test in the page", () => {

    render(<ContactUs/>);

    const heading = screen.getByRole("button", {name: "Send"});

    expect(heading).toBeInTheDocument();

});

test("should test contact us button test in the page", () => {

    render(<ContactUs/>);

    const input = screen.getAllByRole("textbox");

    expect(input).toHaveLength(3);

});
})

