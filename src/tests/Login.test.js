import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../pages/Login/Login";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store";
import App from "../App";

const fakeUser = {
  user: {
    email: "",
    password: "",
  },
  token,
  message,
};

const user = { email: "gustavo@gmail.com", password: "Gustavo12345" };
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const message = "Login feito com sucesso !";

function pageRender(element) {
  render(
    <Provider store={store}>
      <BrowserRouter>{element}</BrowserRouter>
    </Provider>
  );
}

describe("Teste pagina login", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ user, message, token }),
      })
    );
  });

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

  it("Mockando Api", async () => {
    fakeUser.token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    fakeUser.user.email = "gustavo@gmail.com";
    fakeUser.user.password = "Gustavo12345";
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ fakeUser }),
        })
      );
    });
  });
});
