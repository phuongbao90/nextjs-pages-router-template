import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

export default function ProtectedComponent() {
  const { data: session } = useSession();
  const { t } = useTranslation();

  if (!session) {
    return <div>{t("please_sign_in")}</div>;
  }

  return <div>Welcome {session.user.name}</div>;
}
