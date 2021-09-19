export enum O2AuthProvider {
    GOOGLE = "google",
    GITHUB = "github",
    FACEBOOK = "facebook"
}

export const O2_AUTH_PROVIDER_LOCAL_STORAGE_NAME = "o2authProvider";
export const O2_AUTH_USE_RECOVERY_LOCAL_STORAGE_NAME = "userRecovery";

export function O2AUTH_URL(provider: O2AuthProvider, locale: string): string {
    return `${process.env.REACT_APP_REST_API_URL}/oauth2/authorize/${provider}?redirect_uri=${process.env.REACT_APP_OAUTH2_REDIRECT_URI}&language=${locale}`
};


export function O2AUTH_URL_TWO_FACTOR(provider: O2AuthProvider, locale: string, twoFactorCode: string): string {
    return `${process.env.REACT_APP_REST_API_URL}/oauth2/authorize/${provider}?redirect_uri=${process.env.REACT_APP_OAUTH2_REDIRECT_URI}&language=${locale}&two_factor_code=${twoFactorCode}`
};

export function O2AUTH_URL_RECOVERY(provider: O2AuthProvider, locale: string, recoveryCode: string): string {
    return `${process.env.REACT_APP_REST_API_URL}/oauth2/authorize/${provider}?redirect_uri=${process.env.REACT_APP_OAUTH2_REDIRECT_URI}&language=${locale}&recovery_code=${recoveryCode}`
};
