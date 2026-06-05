
// este componente permite seleccionar y subir un archivo al servidor

import { useState } from "react";

const FormularioArchivo = ({ onArchivoSubido, token }) => {
  // guardamos el archivo seleccionado
  const [archivo, setArchivo] = useState(null);

  const subirArchivo = async () => {
    if (!archivo) return;

    // FormData permite enviar archivos al backend
    const formData = new FormData();
    formData.append("archivo", archivo);

    await fetch("https://localhost:3000/api/archivos", {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    setArchivo(null);
    onArchivoSubido();
  };

 return (
    <div style={{
      padding: "16px",
      border: "1px dashed var(--borde)",
      borderRadius: "4px",
      background: "var(--fondo)",
    }}>
      <p style={{ fontSize: "13px", color: "var(--gris)", marginBottom: "12px" }}>
        Selecciona un archivo para subir
      </p>

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <input
          type="file"
          onChange={(e) => setArchivo(e.target.files[0])}
          style={{ fontSize: "13px", flex: 1 }}
        />

        <button
          onClick={subirArchivo}
          style={{
            padding: "10px 20px",
            background: "var(--acento)",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Subir
        </button>
      </div>
    </div>
  );
};

export default FormularioArchivo;