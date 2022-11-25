import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

describe("Teste de rotas das paginas", () => {
  beforeEach(() => {
    const currentState = window.history.state;

    window.history.replaceState(currentState, "", "/");
  });

  it("Teste de renderPage do login", () => {
    window.history.pushState({}, "Login", "/login");
    render(<App></App>);
    const loginPage = screen.getByTestId("login-page");
    expect(loginPage).toBeInTheDocument();
  });
});
