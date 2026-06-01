import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "../src/app/App";

describe("App", () => {
  it("renders foundation placeholder copy", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "SkillMatch Foundation" })).toBeInTheDocument();
    expect(screen.getByText(/Phase 0 web skeleton/i)).toBeInTheDocument();
  });
});
