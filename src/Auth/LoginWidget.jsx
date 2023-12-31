/* eslint-disable react-hooks/rules-of-hooks */
import { useOktaAuth } from "@okta/okta-react";
import { Redirect } from "react-router-dom";
import { Spinner } from "../layouts/Common/Spinner";
import OktaSignInWidget from "./OktaSignInWidget";

const loginWidget = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const onSucess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  }
  const onError = (error) => {
    console.log('Sign In Error:', error);
  }
  if (!authState) {
    return (<Spinner />);
  }
  return authState.isAuthenticated 
    ? <Redirect to={{ pathname: '/'}} /> 
    : <OktaSignInWidget config={config} onSuccess={onSucess} onError={onError} />
}

export default loginWidget;