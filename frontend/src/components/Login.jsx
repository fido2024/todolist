import { useState } from "react";

const Login = ({ onLoginExitoso, irARegistro }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    const respuesta = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    //aqui recepcionamos la respuesta del backend, que puede ser un token si el login fue exitoso, o un mensaje de error si no lo fue
    const datos = await respuesta.json();

    if (respuesta.ok) {
      localStorage.setItem("token", datos.token);
      onLoginExitoso();
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
        <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>TodoList</h1>
        <p style={{ color: "var(--gris)", fontSize: "14px", marginBottom: "32px" }}>
          Inicia sesión para continuar
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
            onClick={handleLogin}
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
            Entrar
          </button>
        </div>

        <p style={{ marginTop: "24px", fontSize: "13px", color: "var(--gris)", textAlign: "center" }}>
          ¿No tienes cuenta?{" "}
          <span
            onClick={irARegistro}
            style={{ color: "var(--acento)", cursor: "pointer", fontWeight: "500" }}
          >
            Regístrate
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;