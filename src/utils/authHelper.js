export const authCheck = () => {
  if (fetchAuthToken()) {
    return true;
  }
  return false;
};

export const fetchAuthToken = () =>
  localStorage.getItem(process.env.REACT_APP_AUTH_KEY_NAME);
