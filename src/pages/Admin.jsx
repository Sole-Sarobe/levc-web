import { useEffect, useState } from "react";

import { supabase } from "../supabase";

function Admin() {

  const [productos, setProductos] = useState([]);

  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);

  const [editandoId, setEditandoId] =
    useState(null);

  useEffect(() => {

    cargarProductos();

  }, []);

  async function cargarProductos() {

    const { data, error } =
      await supabase
        .from("productos")
        .select("*")
        .order("id", { ascending: false });

    console.log(data);

    if (error) {
      console.log(error);
      return;
    }

    setProductos(data);

  }

  async function subirProducto(e) {

    e.preventDefault();

    let urlImagen = null;

    // SI HAY IMAGEN NUEVA

    if (imagen) {

      const nombreArchivo =
        `${Date.now()}-${imagen.name}`;

      const { error: errorImagen } =
        await supabase.storage
          .from("productos")
          .upload(nombreArchivo, imagen);

      if (errorImagen) {
        console.log(errorImagen);
        alert("ERROR STORAGE");
        return;
      }

      urlImagen =
        `https://wcimextrjelgwbklqirk.supabase.co/storage/v1/object/public/productos/${nombreArchivo}`;
    }

    // EDITAR

    if (editandoId) {

      const updateData = {
        nombre,
        categoria,
        descripcion
      };

      if (urlImagen) {
        updateData.imagen = urlImagen;
      }

      console.log("EDITANDO:");
      console.log(editandoId);

      console.log("DATA:");
      console.log(updateData);

      const response =
        await supabase
          .from("productos")
          .update(updateData)
          .eq("id", editandoId)
          .select();

      console.log("RESPUESTA:");
      console.log(response);

      if (response.error) {
        console.log(response.error);
        alert("ERROR UPDATE");
        return;
      }

      alert("Producto actualizado");

    } else {

      // CREAR

      const response =
        await supabase
          .from("productos")
          .insert([
            {
              nombre,
              categoria,
              descripcion,
              imagen: urlImagen
            }
          ])
          .select();

      console.log("INSERT:");
      console.log(response);

      if (response.error) {
        console.log(response.error);
        alert("ERROR INSERT");
        return;
      }

      alert("Producto cargado");
    }

    setNombre("");
    setCategoria("");
    setDescripcion("");
    setImagen(null);

    setEditandoId(null);

    cargarProductos();

  }

  async function eliminarProducto(id) {

    const confirmar =
      confirm("Eliminar producto?");

    if (!confirmar) return;

    const { error } =
      await supabase
        .from("productos")
        .delete()
        .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    cargarProductos();

  }

  function editarProducto(producto) {

    setEditandoId(producto.id);

    setNombre(producto.nombre);
    setCategoria(producto.categoria);
    setDescripcion(producto.descripcion);

  }

  return (

    <div
      style={{
        padding: "120px 8%",
        minHeight: "100vh",
        background: "#f5f7fb"
      }}
    >

      <h1
        style={{
          marginBottom: "40px"
        }}
      >
        Panel administrador
      </h1>

      <form
        onSubmit={subirProducto}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "700px",
          background: "white",
          padding: "40px",
          borderRadius: "30px",
          marginBottom: "70px"
        }}
      >

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) =>
            setNombre(e.target.value)
          }
          style={{
            padding: "18px",
            fontSize: "18px"
          }}
        />

        <select
          value={categoria}
          onChange={(e) =>
            setCategoria(e.target.value)
          }
          style={{
            padding: "18px",
            fontSize: "18px"
          }}
        >

          <option value="">
            Seleccionar categoría
          </option>

          <option value="Iluminación">
            Iluminación
          </option>

          <option value="Herramientas">
            Herramientas
          </option>

          <option value="Pinturas">
            Pinturas
          </option>

          <option value="Agro">
            Agro
          </option>

        </select>

        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) =>
            setDescripcion(e.target.value)
          }
          style={{
            padding: "18px",
            fontSize: "18px",
            minHeight: "140px"
          }}
        />

        <input
          type="file"
          onChange={(e) =>
            setImagen(e.target.files[0])
          }
        />

        <button
          type="submit"
          style={{
            border: "none",
            background: "#2954ff",
            color: "white",
            padding: "20px",
            borderRadius: "18px",
            fontSize: "22px",
            fontWeight: "700",
            cursor: "pointer"
          }}
        >
          {editandoId
            ? "Actualizar producto"
            : "Guardar producto"}
        </button>

      </form>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "25px"
        }}
      >

        {productos.map((producto) => (

          <div
            key={producto.id}
            style={{
              background: "white",
              borderRadius: "30px",
              padding: "25px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >

            <div
              style={{
                display: "flex",
                gap: "25px",
                alignItems: "center"
              }}
            >

              <img
                src={producto.imagen}
                alt={producto.nombre}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "24px"
                }}
              />

              <div>

                <span
                  style={{
                    color: "#2954ff",
                    fontWeight: "700"
                  }}
                >
                  {producto.categoria}
                </span>

                <h2>
                  {producto.nombre}
                </h2>

                <p>
                  {producto.descripcion}
                </p>

              </div>

            </div>

            <div
              style={{
                display: "flex",
                gap: "12px"
              }}
            >

              <button
                onClick={() =>
                  editarProducto(producto)
                }
                style={{
                  border: "none",
                  background: "#2954ff",
                  color: "white",
                  padding: "12px 18px",
                  borderRadius: "12px",
                  cursor: "pointer"
                }}
              >
                Editar
              </button>

              <button
                onClick={() =>
                  eliminarProducto(producto.id)
                }
                style={{
                  border: "none",
                  background: "#ff3d3d",
                  color: "white",
                  padding: "12px 18px",
                  borderRadius: "12px",
                  cursor: "pointer"
                }}
              >
                Eliminar
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Admin;