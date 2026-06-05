import { useState } from "react";

const Registro = ({ onRegistroExitoso, irALogin }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegistro = async () => {
    if (!nombre || !email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    const respuesta = await fetch("https://localhost:3000/api/auth/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password }),
    });

    const datos = await respuesta.json();

    if (respuesta.ok) {
      onRegistroExitoso();
    } else {
      setError(datos.mensaje);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        width: "360px",
        padding: "48px",
        border: "1px solid var(--borde)",
        borderRadius: "4px",
        background: "white",
      }}>
        <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>Crear cuenta</h1>
        <p style={{ color: "var(--gris)", fontSize: "14px", marginBottom: "32px" }}>
          Regístrate para empezar
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{
              padding: "12px 16px",
              border: "1px solid var(--borde)",
              borderRadius: "4px",
              fontSize: "14px",
              outline: "none",
            }}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "12px 16px",
              border: "1px solid var(--borde)",
              borderRadius: "4px",
              fontSize: "14px",
              outline: "none",
            }}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "12px 16px",
              border: "1px solid var(--borde)",
              borderRadius: "4px",
              fontSize: "14px",
              outline: "none",
            }}
          />

          {error && (
            <p style={{ color: "var(--error)", fontSize: "13px" }}>{error}</p>
          )}

          <button
            onClick={handleRegistro}
            style={{
              padding: "12px",
              background: "var(--acento)",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "500",
              marginTop: "8px",
            }}
          >
            Registrarse
          </button>
        </div>

        <p style={{ marginTop: "24px", fontSize: "13px", color: "var(--gris)", textAlign: "center" }}>
          ¿Ya tienes cuenta?{" "}
          <span
            onClick={irALogin}
            style={{ color: "var(--acento)", cursor: "pointer", fontWeight: "500" }}
          >
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
};

export default Registro;