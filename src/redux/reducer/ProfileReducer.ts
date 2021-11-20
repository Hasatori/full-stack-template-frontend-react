import {UserActionTypes} from "../actiontype/UserActionTypes";
import {User} from "../../components/App";

const initialState = {
    authenticated: false,
    loggedIn: false,
    currentUser: {} as any,
    twoFactorRequired: false,
    accessToken: "",

} as UserState;

export interface UserState {
    authenticated: boolean,
    loggedIn: boolean,
    currentUser: User,
    twoFactorRequired: boolean,
    accessToken: string,
}

export function userReducer(state = initialState, action: UserActionTypes): UserState {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                accessToken: action.accessToken,
                loggedIn: true,
            };
        case "TOKEN_REFRESHED":
            return {
                ...state,
                accessToken: action.accessToken,
                loggedIn: true
            };
        case "ADD_USER":
            return {
                ...state,
                currentUser: action.user,
                authenticated: true,
            };
        case "LOGIN_TWO_FACTOR":
            return {
                ...state,
                twoFactorRequired: true
            };
        case "LOGOUT_USER":
            return {
                ...state,
                authenticated: false,
                loggedIn: false,
                currentUser: {} as any,
                twoFactorRequired: false,
                accessToken: "",
            };
        case "UPDATE_USER":
            return {
                ...state,
                currentUser: action.newUser
            };
        case "TWO_FACTOR_DISABLED":
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    twoFactorEnabled: false
                }
            };
        case "TWO_FACTOR_ENABLED":
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    twoFactorEnabled: true,
                    backupCodes: action.backupCodes
                }
            };
        case "EMPTY_BACKUP_CODES":
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    backupCodes: []
                }
            };
        case "PASSWORD_RESET":
            if (state.currentUser?.email === action.userEmail && state.currentUser?.o2AuthInfo !== null){
                return {
                    ...state,
                    currentUser: {
                        ...state.currentUser,
                        o2AuthInfo:{
                            needToSetPassword: false
                        }
                    }
                };
            }
            return state;
        default:
            return state;
    }
}

export default userReducer;
