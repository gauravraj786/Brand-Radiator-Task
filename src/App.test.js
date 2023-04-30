import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "./App";
import Header from "./components/Header/Header";
import SideNav from "./components/SideNav/SideNav";
import ContactUs from "./components/ContactUs/ContactUs";
import Admin from "./components/Admin/Admin";

describe("App", () => {
  it("renders home page by default", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const homeTitle = screen.getByText(/Welcome to our website/i);
    expect(homeTitle).toBeInTheDocument();
  });

  it("renders about page when path is /about", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <App />
      </MemoryRouter>
    );
    const aboutTitle = screen.getByText(/About Us/i);
    expect(aboutTitle).toBeInTheDocument();
  });

  it("renders contact page when path is /contact", () => {
    render(
      <MemoryRouter initialEntries={["/contact"]}>
        <App />
      </MemoryRouter>
    );
    const contactTitle = screen.getAllByText(/Contact Us/i)[2];
    expect(contactTitle).toBeInTheDocument();
  });

  it("renders admin page when path is /admin", () => {
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <App />
      </MemoryRouter>
    );
    const adminTitle = screen.getByText(/login/i);
    expect(adminTitle).toBeInTheDocument();
  });
});

// Header.js
describe("Header", () => {
  it("renders header logo", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const homeLink = screen.getByRole("link", { name: /home/i });
    const aboutLink = screen.getByRole("link", { name: /about/i });
    const contactLink = screen.getByRole("link", { name: /contact us/i });
    const adminLink = screen.getByRole("link", { name: /admin/i });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(adminLink).toBeInTheDocument();
  });

  it("clicking hamburger button toggles navigation", () => {
    const toggleNav = jest.fn();
    render(
      <MemoryRouter>
        <Header isOpen={false} toggleNav={toggleNav} />
      </MemoryRouter>
    );
    const hamburgerBtn = screen.getByTestId("hamburger_btn");
    fireEvent.click(hamburgerBtn);
    expect(toggleNav).toHaveBeenCalledTimes(1);
  });
});

//SideNav.js
describe("SideNav", () => {
  it("renders SideNav component with links", () => {
    render(
      <BrowserRouter>
        <SideNav isOpen={true} toggleNav={() => {}} />
      </BrowserRouter>
    );

    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByText("About");
    expect(aboutLink).toBeInTheDocument();

    const contactLink = screen.getByText("Contact Us");
    expect(contactLink).toBeInTheDocument();

    const adminLink = screen.getByText("Admin");
    expect(adminLink).toBeInTheDocument();
  });

  it("renders SideNav component with close button", () => {
    const mockToggleNav = jest.fn();

    render(
      <BrowserRouter>
        <SideNav isOpen={true} toggleNav={mockToggleNav} />
      </BrowserRouter>
    );

    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(mockToggleNav).toHaveBeenCalledTimes(1);
  });

  it("SideNav component toggles open and closed", () => {
    const mockToggleNav = jest.fn();

    const { rerender } = render(
      <BrowserRouter>
        <SideNav isOpen={false} toggleNav={mockToggleNav} />
      </BrowserRouter>
    );

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("sidenav");

    rerender(
      <BrowserRouter>
        <SideNav isOpen={true} toggleNav={mockToggleNav} />
      </BrowserRouter>
    );

    expect(nav).toHaveClass("sidenav--open");

    rerender(
      <BrowserRouter>
        <SideNav isOpen={false} toggleNav={mockToggleNav} />
      </BrowserRouter>
    );

    expect(nav).toHaveClass("sidenav");
  });
});

//Contact Us
describe("ContactUs", () => {
  it("should render Contact Us title", () => {
    render(<ContactUs />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("should submit the form and clear input values", async () => {
    // Mock the fetch API
    const mockFetch = jest.fn();
    global.fetch = mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        status: "success",
      }),
    });

    render(<ContactUs />);

    // Fill the form
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Message"), {
      target: { value: "Test message" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Submit"));

    // Wait for fetch request to be called
    await waitFor(() => expect(mockFetch).toHaveBeenCalled());

    // Check if form values are cleared
    expect(screen.getByPlaceholderText("Name")).toHaveValue("");
    expect(screen.getByPlaceholderText("Email")).toHaveValue("");
    expect(screen.getByPlaceholderText("Message")).toHaveValue("");
  });
});

//Admin.js
describe("Admin component", () => {
  test("renders login form when not logged in", () => {
    render(<Admin />);
    const loginForm = screen.getByPlaceholderText(/Username/i);
    expect(loginForm).toBeInTheDocument();
  });

  test("renders admin dashboard when logged in", async () => {
    // Mock the fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, name: "John", email: "john@example.com", message: "Hi" },
            {
              id: 2,
              name: "Jane",
              email: "jane@example.com",
              message: "Hello",
            },
          ]),
      })
    );

    render(<Admin />);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    // Fill in the login form and submit
    fireEvent.change(usernameInput, { target: { value: "user1" } });
    fireEvent.change(passwordInput, { target: { value: "pass1" } });
    fireEvent.click(submitButton);

    // Wait for fetch API to resolve
    const adminDashboard = await screen.findByRole("heading", {
      name: /admin dashboard/i,
    });

    expect(adminDashboard).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/comments");
  });

  test("displays error message for invalid username", () => {
    render(<Admin />);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    // Fill in the login form with invalid username and submit
    fireEvent.change(usernameInput, { target: { value: "invalid" } });
    fireEvent.change(passwordInput, { target: { value: "pass1" } });
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText(/invalid username/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays error message for invalid password", async () => {
    render(<Admin />);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    // Fill in the login form with invalid password and submit
    fireEvent.change(usernameInput, { target: { value: "user1" } });
    fireEvent.change(passwordInput, { target: { value: "invalid" } });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText(/invalid password/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
