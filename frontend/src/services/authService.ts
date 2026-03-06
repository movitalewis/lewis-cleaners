export const loginService = async (
  username: string,
  password: string
) => {
  // dummy login
  if (username === "admin" && password === "admin") {
    return { token: "dummy-token", name: "Admin User" };
  }
  throw new Error("Invalid credentials");
};
