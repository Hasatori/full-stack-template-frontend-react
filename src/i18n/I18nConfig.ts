import i18n from 'i18next';
import en from './en/translation.json';
import cs from './cs/translation.json';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import english_flag from "../assets/images/flags/united-kingdom.svg";
import cs_flag from "../assets/images/flags/czech-republic.svg";

export const resources = {
    en: {ns1: en,},
    cs: {ns1: cs,}
} as const;

export function getLanguageFlagPairFromLocale(locale: string) {
    switch (locale) {
        case 'en':
            return [english_flag, 'english'];
        case 'cs':
            return [cs_flag, 'čeština'];
        default:
            return ['', ''];
    }
}

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: ['en', 'cs'],
        debug: true,
        interpolation: {
            escapeValue: false,
        }, resources
    });
export default i18n;
