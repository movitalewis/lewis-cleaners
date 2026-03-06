const AUTH_KEY = "auth_user";

export const saveUser = (user: any) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
};

export const removeUser = () => {
  localStorage.removeItem(AUTH_KEY);
};
