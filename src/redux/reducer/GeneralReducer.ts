import {DISMISS_SUCCESS, FAILURE, GeneralActionTypes, IN_PROGRESS, SUCCESS} from "../actiontype/GeneralActionTypes";
import {Cookies} from "react-cookie";

export type Theme = 'dark' | 'light';
export const THEME_COOKIE_NAME = 'theme';

const initialState = {
    loading: false,
    theme: getDefaultTheme()
} as GeneralState;

export interface GeneralState {
    loading: boolean,
    loadingMessage: string | undefined,
    failureMessage: string | undefined,
    successMessage: string | undefined,
    warningMessage: string | undefined,
    infoMessage: string | undefined,
    redirectUrl: string | undefined,
    theme: Theme
}

const notLoading = {
    loading: false,
    loadingMessage: undefined,
};

function getDefaultTheme(): Theme {
    const cookies = new Cookies();
    let theme = cookies.get(THEME_COOKIE_NAME);
    if (typeof theme === 'undefined') {
        cookies.set(THEME_COOKIE_NAME, 'dark', {path: "/", expires: createThemeCookieExpirationDate()})
        theme = cookies.get(THEME_COOKIE_NAME);
    }
    return theme;
}

function createThemeCookieExpirationDate(): Date {
    const expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + (100 * 365 * 24 * 60 * 60 * 1000)); // expires in 100 years
    return expiresDate;
}

export default function generalReducer(state = initialState, action: GeneralActionTypes): GeneralState {

    switch (action.type) {
        case "IN_PROGRESS":
            return {
                ...state,
                loading: true,
                loadingMessage: action.message,
                failureMessage: undefined,
                successMessage: undefined,
                infoMessage: undefined
            };
        case "FAILURE":
            return {
                ...state,
                failureMessage: action.message
            };
        case "DISMISS_FAILURE":
            return {
                ...state,
                failureMessage: undefined
            };
        case "SUCCESS":
            return {
                ...state,
                successMessage: action.message
            };
        case "DISMISS_SUCCESS":
            return {
                ...state,
                successMessage: undefined
            };
        case "INFO":
            return {
                ...state,
                infoMessage: action.message
            };
        case "DISMISS_INFO":
            return {
                ...state,
                infoMessage: undefined
            };
        case "WARNING":
            return {
                ...state,
                warningMessage: action.message
            };
        case "DISMISS_WARNING":
            return {
                ...state,
                warningMessage: undefined
            };
        case "DONE":
            return {
                ...state,
                ...notLoading,
            };

        case "REDIRECT":
            return {
                ...state,
                redirectUrl: action.url
            }
        case "SET_THEME":
            const cookies = new Cookies();
            cookies.set(THEME_COOKIE_NAME, action.theme, {path: "/", expires: createThemeCookieExpirationDate()})
            return {
                ...state,
                theme: action.theme
            }
        default:
            return state;
    }

}
