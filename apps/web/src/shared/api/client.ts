type ApiEnvironment = Pick<ImportMetaEnv, "VITE_API_BASE_URL">;

export const resolveApiBaseUrl = (environment: ApiEnvironment = import.meta.env): string => {
  const apiBaseUrl = environment.VITE_API_BASE_URL.trim();

  if (!apiBaseUrl) {
    throw new Error("VITE_API_BASE_URL must be configured for the web app environment.");
  }

  try {
    return new URL(apiBaseUrl).toString().replace(/\/$/, "");
  } catch {
    throw new Error("VITE_API_BASE_URL must be a valid absolute URL.");
  }
};

export const createApiClient = (environment: ApiEnvironment = import.meta.env) => ({
  baseUrl: resolveApiBaseUrl(environment),
});
