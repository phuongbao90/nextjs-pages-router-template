import { useAppDispatch, useAppSelector } from "@/store/store";
import { setLanguage } from "@/store/slices/app.slice";
import { Button } from "./ui/button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, Globe } from "lucide-react";
import { useRouter } from "next/router";

type Language = {
  code: "en" | "vi" | "ja" | "ko" | "zh";
  name: string;
  flag: string;
};

// For development, we'll only use EN and VI
const AVAILABLE_LANGUAGES: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  // Uncomment these when ready to add more languages
  // { code: "ja", name: "日本語", flag: "🇯🇵" },
  // { code: "ko", name: "한국어", flag: "🇰🇷" },
  // { code: "zh", name: "中文", flag: "🇨🇳" },
];

export function LanguageSwitcher() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentLanguage = useAppSelector((state) => state.app.language);

  const handleLanguageChange = (lang: Language["code"]) => {
    // Update Redux store
    dispatch(setLanguage(lang));

    // Update i18n locale using Next.js router
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: lang });
  };

  const currentLang = AVAILABLE_LANGUAGES.find(
    (lang) => lang.code === currentLanguage
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>{currentLang?.flag}</span>
          <span className="hidden sm:inline">{currentLang?.name}</span>
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md animate-in fade-in-80"
          align="end"
        >
          {AVAILABLE_LANGUAGES.map((lang) => (
            <DropdownMenu.Item
              key={lang.code}
              className={`
                flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none
                hover:bg-gray-100 focus:bg-gray-100
                ${currentLanguage === lang.code ? "bg-gray-50" : ""}
              `}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
              {currentLanguage === lang.code && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
