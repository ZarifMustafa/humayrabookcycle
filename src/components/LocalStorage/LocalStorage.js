let currentUser = '';

// Set the user as logged in
export const setLoggedIn = (user) => {
  localStorage.setItem(currentUser, JSON.stringify(user));
};

// Set the user as logged out
export const setLoggedOut = () => {
  localStorage.setItem(currentUser, 'false');
};

// Check if the user is logged in
export const isLoggedIn = () => {
  const status = localStorage.getItem(currentUser);
  return status === 'hellohello';
};
