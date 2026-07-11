const BASE_URL = import.meta.env.BASE_URL || "/";
const API_URL = `${BASE_URL}api`;
const TOKEN_KEY = "laelevc_admin_token";

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.ok === false) {
    throw new Error(data.error || "Error de servidor");
  }

  return data;
}

export async function loginAdmin(usuario, password) {
  const response = await fetch(`${API_URL}/login.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usuario, password }),
  });

  return parseResponse(response);
}

export async function listarProductos() {
  const response = await fetch(`${API_URL}/productos.php`);
  const data = await parseResponse(response);
  return data.productos || [];
}

export async function guardarProducto(formData, token) {
  formData.append("token", token);

  const response = await fetch(`${API_URL}/productos.php`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return parseResponse(response);
}

export async function eliminarProductoApi(id, token) {
  const formData = new FormData();
  formData.append("action", "delete");
  formData.append("id", id);
  formData.append("token", token);

  const response = await fetch(`${API_URL}/productos.php`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return parseResponse(response);
}
