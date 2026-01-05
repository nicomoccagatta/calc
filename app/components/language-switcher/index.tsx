"use client"

import { Flex, Text, Switch } from "@radix-ui/themes"
import { Language } from "@/app/translations"

export default function LanguageSwitcher({
  language,
  onLanguageChange,
}: {
  language: Language
  onLanguageChange: (language: Language) => void
}) {
  return (
    <div className="absolute top-2 right-4">
      <Flex align="center" gap="3">
        <Text size="2" weight="bold" style={{ opacity: language === 'es' ? 1 : 0.5 }}>
          🇪🇸 ES
        </Text>
        <Switch
          size="2"
          checked={language === 'en'}
          onCheckedChange={(checked) => onLanguageChange(checked ? 'en' : 'es')}
        />
        <Text size="2" weight="bold" style={{ opacity: language === 'en' ? 1 : 0.5 }}>
          🇬🇧 EN
        </Text>
      </Flex>
    </div>
  )
}
