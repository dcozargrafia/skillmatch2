import { useTranslation } from "react-i18next";
import { I18nProvider } from "../shared/i18n/I18nProvider";
import { AppShell } from "../shared/ui/AppShell";

const AppContent = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <AppShell>
      <h1>{t("foundation.title")}</h1>
      <p>{t("foundation.description")}</p>
    </AppShell>
  );
};

export const App = (): JSX.Element => (
  <I18nProvider>
    <AppContent />
  </I18nProvider>
);
