
// este componente permite seleccionar y subir un archivo al servidor

import { useState } from "react";

const FormularioArchivo = ({ onArchivoSubido }) => {
  // guardamos el archivo seleccionado
  const [archivo, setArchivo] = useState(null);

  const subirArchivo = async () => {
    if (!archivo) return;

    // FormData permite enviar archivos al backend
    const formData = new FormData();
    formData.append("archivo", archivo);

    await fetch("http://localhost:3000/api/archivos", {
      method: "POST",
      body: formData, // no usamos JSON aquí porque es un archivo
    });

    setArchivo(null);
    onArchivoSubido();
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setArchivo(e.target.files[0])}
      />
      <button onClick={subirArchivo}>Subir archivo</button>
    </div>
  );
};

export default FormularioArchivo;