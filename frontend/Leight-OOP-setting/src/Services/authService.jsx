import { apiRequest } from "../config/Api";

export const loginUser = async (email, password) => {
  try {
    const users = await apiRequest("/users");
    const user = users.find((u) => u.email === email);

    if (user && user.password === password) {
      return { success: true, user };
    }
    throw new Error("invalid credentials");
  } catch (error) {
    throw new Error(error.message || "login failed");
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      isAdmin: false,
      createdAt: new Date().toISOString(),
    };
    return await apiRequest("/user", {
      method: "POST",
      body: JSON.stringify(newUser),
    });
  } catch (error) {
    throw new Error(error.message || "registration Failed");
  }
};

export const varifyToken = async (token) => {
  return { valid: true };
};
