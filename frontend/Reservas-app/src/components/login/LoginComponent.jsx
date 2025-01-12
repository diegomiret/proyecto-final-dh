import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("https://api.example.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Credenciales incorrectas.");
      }

      const data = await response.json();
      alert(`Bienvenido ${data.user.name}`); // Puedes redirigir al usuario a otra página aquí
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgb(238, 239, 242)" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px", backgroundColor: "#fff" }}>
        <h4 className="text-center mb-4">Iniciar sesión</h4>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: "#0d6efd" }}>
            Iniciar Sesión
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="/registro" className="text-decoration-none" style={{ color: "#0d6efd" }}>
            Crear Cuenta
          </a>
        </div>
      </div>
    </div>
  );
};
