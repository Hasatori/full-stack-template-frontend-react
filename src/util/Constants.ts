export function GOOGLE_AUTH_URL(locale: string): string {
    return process.env.REACT_APP_REST_API_URL + '/oauth2/authorize/google?redirect_uri=' + process.env.OAUTH2_REDIRECT_URI + '&language=' + locale
};

export function FACEBOOK_AUTH_URL(locale: string): string {
    return process.env.REACT_APP_REST_API_URL + '/oauth2/authorize/facebook?redirect_uri=' + process.env.OAUTH2_REDIRECT_URI + '&language=' + locale
};

export function GITHUB_AUTH_URL(locale: string): string {
    return process.env.REACT_APP_REST_API_URL + '/oauth2/authorize/github?redirect_uri=' + process.env.OAUTH2_REDIRECT_URI + '&language=' + locale
};
