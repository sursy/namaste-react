import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import Header from "../Header"
import { BrowserRouter } from "react-router-dom";


test("should load header component in login button or not", () => {
  render(
    <BrowserRouter>
       <Provider store={appStore}>
         <Header/>
       </Provider>
    </BrowserRouter>
  );

  const logoutButton = screen.getByRole("button", { name: "Logout" });
  fireEvent.click(logoutButton);

  const loginButton = screen.getByRole("button", { name: "Login" });
  expect(loginButton).toBeInTheDocument();
  expect(screen.getByText("Login User: Guest")).toBeInTheDocument();

  fireEvent.click(loginButton);
  expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
})