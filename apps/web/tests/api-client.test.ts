import { describe, expect, it } from "vitest";
import { resolveApiBaseUrl } from "../src/shared/api/client";

describe("resolveApiBaseUrl", () => {
  it("returns the configured API base URL", () => {
    expect(resolveApiBaseUrl({ VITE_API_BASE_URL: " https://api.example.test/ " })).toBe(
      "https://api.example.test"
    );
  });

  it("fails fast when the API base URL is missing", () => {
    expect(() => resolveApiBaseUrl({ VITE_API_BASE_URL: "" })).toThrow(
      "VITE_API_BASE_URL must be configured"
    );
  });

  it("fails fast when the API base URL is not an absolute URL", () => {
    expect(() => resolveApiBaseUrl({ VITE_API_BASE_URL: "not-a-url" })).toThrow(
      "VITE_API_BASE_URL must be a valid absolute URL"
    );
  });
});
