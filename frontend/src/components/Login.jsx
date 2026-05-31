// Formulario para iniciar sesión y obtener el token JWT

import { useState } from "react";

const Login = ({ onLoginExitoso, irARegistro }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // si los campos están vacíos no hacemos nada
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    const respuesta = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const datos = await respuesta.json();

    if (respuesta.ok) {
      // guardamos el token en localStorage
      localStorage.setItem("token", datos.token);
      // avisamos a App.jsx que el login fue exitoso
      onLoginExitoso();
    } else {
      setError(datos.mensaje);
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* mostramos error si algo falla */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleLogin}>Entrar</button>

      <p>
        ¿No tienes cuenta?{" "}
        <button onClick={irARegistro}>Regístrate</button>
      </p>
    </div>
  );
};

export default Login;