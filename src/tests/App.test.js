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
    const loginPage = screen.getByTestId("login-test-id");
    expect(loginPage).toBeInTheDocument();
  });

  it("Teste de renderPage do main", async () => {
    render(<App />);
    const passwordInput = screen.getByTestId("password-id");
    const emailInput = screen.getByTestId("email-id");

    const loginButton = screen.getByTestId("login-button-id");

    fireEvent.change(passwordInput, {
      target: {
        value: "Gustavo12345",
      },
    });

    fireEvent.change(emailInput, {
      target: {
        value: "gustavo@gmail.com",
      },
    });

    expect(emailInput).toHaveValue("gustavo@gmail.com");
    expect(passwordInput).toHaveValue("Gustavo12345");

    fireEvent.click(loginButton);

    const mainPage = screen.getByTestId("main-test-id");

    expect(mainPage).toBeInTheDocument();
  });
});
