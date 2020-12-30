import i18n from 'i18next';
import en from './en/translation.json';
import cs from './cs/translation.json';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const resources = {
    en: {ns1: en,},
    cs: {ns1: cs,}
} as const;

export function getLanguageFlagPairFromLocale(locale: string) {
    switch (locale) {
        case 'en':
            return ['united-kingdom.svg', 'english'];
        case 'cs':
            return ['czech-republic.svg', 'čeština'];
        default:
            return ['', ''];
    }
}

i18n

    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        fallbackLng: ['en', 'cs'],
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }, resources
    });
export default i18n;
