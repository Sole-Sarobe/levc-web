import { useEffect, useState } from "react";

import {
  clearAdminToken,
  eliminarProductoApi,
  getAdminToken,
  guardarProducto,
  listarProductos,
  loginAdmin,
  setAdminToken,
} from "../api";

function Admin() {
  const [token, setToken] = useState(() => getAdminToken() || "");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (token) {
      cargarProductos();
    }
  }, [token]);

  async function ingresar(e) {
    e.preventDefault();
    setLoginError("");

    try {
      const data = await loginAdmin(usuario, password);
      setAdminToken(data.token);
      setToken(data.token);
      setUsuario("");
      setPassword("");
    } catch (error) {
      setLoginError(error.message);
    }
  }

  function salir() {
    clearAdminToken();
    setToken("");
    setProductos([]);
  }

  async function cargarProductos() {
    try {
      const data = await listarProductos();
      setProductos(data);
    } catch (error) {
      console.log(error);
      alert("No se pudieron cargar los productos");
    }
  }

  async function subirProducto(e) {
    e.preventDefault();
    setGuardando(true);

    const formData = new FormData();
    formData.append("action", editandoId ? "update" : "create");
    formData.append("nombre", nombre);
    formData.append("categoria", categoria);
    formData.append("descripcion", descripcion);

    if (editandoId) {
      formData.append("id", editandoId);
    }

    if (imagen) {
      formData.append("imagen", imagen);
    }

    try {
      await guardarProducto(formData, token);
      alert(editandoId ? "Producto actualizado" : "Producto cargado");
      limpiarFormulario();
      cargarProductos();
    } catch (error) {
      alert(error.message);
    } finally {
      setGuardando(false);
    }
  }

  async function eliminarProducto(id) {
    const confirmar = confirm("Eliminar producto?");

    if (!confirmar) return;

    try {
      await eliminarProductoApi(id, token);
      cargarProductos();
    } catch (error) {
      alert(error.message);
    }
  }

  function editarProducto(producto) {
    setEditandoId(producto.id);
    setNombre(producto.nombre || "");
    setCategoria(producto.categoria || "");
    setDescripcion(producto.descripcion || "");
    setImagen(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function limpiarFormulario() {
    setNombre("");
    setCategoria("");
    setDescripcion("");
    setImagen(null);
    setEditandoId(null);
  }

  if (!token) {
    return (
      <div style={styles.page}>
        <form onSubmit={ingresar} style={styles.loginCard}>
          <h1 style={{ margin: "0 0 8px" }}>Panel administrador</h1>
          <p style={{ margin: "0 0 28px", color: "#667085" }}>
            Ingresa para cargar, editar y borrar productos.
          </p>

          {loginError && <div style={styles.error}>{loginError}</div>}

          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={styles.input}
            autoComplete="username"
          />

          <input
            type="password"
            placeholder="Contrasena"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            autoComplete="current-password"
          />

          <button type="submit" style={styles.primaryButton}>
            Ingresar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={{ margin: 0 }}>Panel administrador</h1>
        <button type="button" onClick={salir} style={styles.secondaryButton}>
          Cerrar sesion
        </button>
      </div>

      <form onSubmit={subirProducto} style={styles.form}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={styles.input}
          required
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          style={styles.input}
          required
        >
          <option value="">Seleccionar categoria</option>
          <option value="Iluminacion">Iluminacion</option>
          <option value="Herramientas">Herramientas</option>
          <option value="Pinturas">Pinturas</option>
          <option value="Agro">Agro</option>
        </select>

        <textarea
          placeholder="Descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={{ ...styles.input, minHeight: "140px" }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])}
        />

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button type="submit" style={styles.primaryButton} disabled={guardando}>
            {guardando
              ? "Guardando..."
              : editandoId
                ? "Actualizar producto"
                : "Guardar producto"}
          </button>

          {editandoId && (
            <button type="button" onClick={limpiarFormulario} style={styles.secondaryButton}>
              Cancelar edicion
            </button>
          )}
        </div>
      </form>

      <div style={styles.list}>
        {productos.map((producto) => (
          <div key={producto.id} style={styles.productRow}>
            <div style={styles.productInfo}>
              {producto.imagen ? (
                <img src={producto.imagen} alt={producto.nombre} style={styles.productImage} />
              ) : (
                <div style={styles.emptyImage}></div>
              )}

              <div>
                <span style={styles.category}>{producto.categoria}</span>
                <h2 style={{ margin: "8px 0" }}>{producto.nombre}</h2>
                <p style={{ margin: 0, color: "#4b5563" }}>{producto.descripcion}</p>
              </div>
            </div>

            <div style={styles.actions}>
              <button type="button" onClick={() => editarProducto(producto)} style={styles.smallPrimary}>
                Editar
              </button>

              <button type="button" onClick={() => eliminarProducto(producto.id)} style={styles.danger}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "120px 8%",
    minHeight: "100vh",
    background: "#f5f7fb",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "40px",
  },
  loginCard: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    maxWidth: "460px",
    margin: "0 auto",
    background: "white",
    padding: "40px",
    borderRadius: "30px",
    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "720px",
    background: "white",
    padding: "40px",
    borderRadius: "30px",
    marginBottom: "70px",
  },
  input: {
    width: "100%",
    padding: "18px",
    fontSize: "18px",
    border: "1px solid #dbe1f0",
    borderRadius: "16px",
    fontFamily: "inherit",
  },
  primaryButton: {
    border: "none",
    background: "#2954ff",
    color: "white",
    padding: "18px 24px",
    borderRadius: "18px",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
  },
  secondaryButton: {
    border: "1px solid #dbe1f0",
    background: "white",
    color: "#1f2937",
    padding: "14px 18px",
    borderRadius: "14px",
    fontWeight: "700",
    cursor: "pointer",
  },
  error: {
    padding: "12px 14px",
    borderRadius: "12px",
    color: "#8a1f1f",
    background: "#ffecec",
    border: "1px solid #f5b9b9",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  productRow: {
    background: "white",
    borderRadius: "30px",
    padding: "25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "24px",
  },
  productInfo: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
  },
  productImage: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "24px",
  },
  emptyImage: {
    width: "150px",
    height: "150px",
    borderRadius: "24px",
    background: "#eef2ff",
  },
  category: {
    color: "#2954ff",
    fontWeight: "700",
  },
  actions: {
    display: "flex",
    gap: "12px",
  },
  smallPrimary: {
    border: "none",
    background: "#2954ff",
    color: "white",
    padding: "12px 18px",
    borderRadius: "12px",
    cursor: "pointer",
  },
  danger: {
    border: "none",
    background: "#ff3d3d",
    color: "white",
    padding: "12px 18px",
    borderRadius: "12px",
    cursor: "pointer",
  },
};

export default Admin;
