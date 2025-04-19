import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mocking child components (basic stubs for UI)
vi.mock("./Components/NewTodo", () => ({
    default: () => <div>NewTodo Component</div>,
  }));
  
  vi.mock("./Components/TodoList", () => ({
    default: () => <div>TodoList Component</div>,
  }));
  
  vi.mock("./Components/StatsTodo", () => ({
    default: () => <div>StatsTodo Component</div>,
  }));
  
  vi.mock("./Components/CreateTask", () => ({
    default: () => <div>CreateTask Component</div>,
  }));

describe("App Component", () => {
  it("renders static components", () => {
    render(<App />);

    expect(screen.getByText("NewTodo Component")).toBeInTheDocument();
    expect(screen.getByText("TodoList Component")).toBeInTheDocument();
    expect(screen.getByText("StatsTodo Component")).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /\+ New To Do/i });
    expect(button).toBeInTheDocument();
  });

  it("opens modal on button click", () => {
    render(<App />);

    const button = screen.getByRole("button", { name: /\+ New To Do/i });
    fireEvent.click(button);

    expect(screen.getByText("CreateTask Component")).toBeInTheDocument();
  });
});
