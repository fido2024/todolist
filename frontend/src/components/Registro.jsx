// Formulario para crear una cuenta nueva

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

    const respuesta = await fetch("http://localhost:3000/api/auth/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password }),
    });

    const datos = await respuesta.json();

    if (respuesta.ok) {
      // registro exitoso → vamos al login
      onRegistroExitoso();
    } else {
      setError(datos.mensaje);
    }
  };

  return (
    <div>
      <h2>Crear cuenta</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

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

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleRegistro}>Registrarse</button>

      <p>
        ¿Ya tienes cuenta?{" "}
        <button onClick={irALogin}>Inicia sesión</button>
      </p>
    </div>
  );
};

export default Registro;