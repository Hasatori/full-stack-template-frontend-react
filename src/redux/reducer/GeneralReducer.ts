import {DISMISS_SUCCESS, FAILURE, GeneralActionTypes, IN_PROGRESS, SUCCESS} from "../actiontype/GeneralActionTypes";


const initialState = {
    loading: false
} as GeneralState;

export interface GeneralState {
    loading: boolean,
    loadingMessage: string | undefined,
    failureMessage: string | undefined,
    successMessage: string | undefined,
    warningMessage: string | undefined,
    infoMessage: string | undefined,
    redirectUrl:string | undefined
}

const notLoading = {
    loading: false,
    loadingMessage: undefined,
};
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
        default:
            return state;
    }

}
