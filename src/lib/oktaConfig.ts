export const oktaConfig = {
  clientId: '0oae3lcwrjqKJG9nG5d7',
  issuer: 'https://dev-68226474.okta.com/oauth2/default',
  redirectUri: 'http://localhost:3000/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  disableHttpsCheck: true
}