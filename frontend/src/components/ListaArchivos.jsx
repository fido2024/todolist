// Muestra todos los archivos subidos con opciones de descargar y eliminar

const ListaArchivos = ({ archivos, onEliminado }) => {

  const eliminarArchivo = async (id) => {
    await fetch(`http://localhost:3000/api/archivos/${id}`, {
      method: "DELETE",
    });
    onEliminado();
  };

  const descargarArchivo = (id, nombre) => {
    // abre la URL de descarga en una nueva pestaña
    window.open(`http://localhost:3000/api/archivos/${id}`, "_blank");
  };

  return (
    <div>
      {archivos.map((archivo) => (
        <div key={archivo._id}>
          <span>{archivo.nombre}</span>
          <span> | {archivo.tipo}</span>
          <span> | {(archivo.tamaño / 1024).toFixed(2)} KB</span>

          <button onClick={() => descargarArchivo(archivo._id, archivo.nombre)}>
            Descargar
          </button>
          <button onClick={() => eliminarArchivo(archivo._id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListaArchivos;