import type { AuthCredentials, Expense, RegisterCredentials } from "../types";
const BASE_URL = "http://localhost:3001/api";

async function fetchApi(BASE_URL: string, options: RequestInit = {}) {
  const res = await fetch(BASE_URL, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "API error");
  }

  return res.json();
}

export async function login(data: AuthCredentials) {
  return fetchApi(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function register(data: RegisterCredentials) {
  return fetchApi(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getMe() {
  return fetchApi(`${BASE_URL}/auth/me`);
}

export async function getExpenses() {
  return fetchApi(`${BASE_URL}/expense`);
}

export async function getCategories() {
  return fetchApi(`${BASE_URL}/category`);
}

export async function createExpense(data: Expense) {
  return fetchApi(`${BASE_URL}/expense`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteExpense(id: number) {
  return fetchApi(`${BASE_URL}/expense/${id}`, {
    method: "DELETE",
  });
}
