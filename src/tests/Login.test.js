import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../pages/Login/Login";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store";
import App from "../App";

function pageRender(element) {
  render(
    <Provider store={store}>
      <BrowserRouter>{element}</BrowserRouter>
    </Provider>
  );
}

describe("Teste pagina login", () => {
  it("Testando se o email esta em formato incorreto", async () => {
    pageRender(<Login />);

    fireEvent.change(email, {
      target: { value: "gustavo" },
    });

    const buttonEntrar = screen.getByText(/entrar/i);
    fireEvent.click(buttonEntrar);

    const formato = screen.getByText(/formato incorreto/i);
    expect(formato).toBeInTheDocument();
  });

  it("Obtendo o valor do e-mail", async () => {
    render(<App />);
    const emailInput = screen.getByTestId("email-id");

    fireEvent.change(emailInput, {
      target: {
        value: "gustavo@gmail.com",
      },
    });

    expect(emailInput).toHaveValue("gustavo@gmail.com");
  });

  it("Obtendo o valor da senha", async () => {
    render(<App />);
    const passwordInput = screen.getByTestId("password-id");

    fireEvent.change(passwordInput, {
      target: {
        value: "Gustavo1234",
      },
    });

    expect(passwordInput).toHaveValue("Gustavo1234");
  });
});
