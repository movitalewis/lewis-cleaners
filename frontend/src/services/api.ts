import { getUser } from "../utils/storage";

const API_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const user = getUser();

  const headers = new Headers();

  headers.append("Content-Type", "application/json");

  if (user?.token) {
    headers.append("Authorization", `Bearer ${user.token}`);
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  console.log("FULL RESPONSE:", data);

  if (!res.ok) {
    throw new Error(data.message || "API Error");
  }

  return data;
};