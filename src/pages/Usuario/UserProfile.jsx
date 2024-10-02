import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UserProfile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Estado para habilitar/deshabilitar edición

  const userId = localStorage.getItem("id"); // Obtener ID del usuario desde el localStorage

  // Función para obtener los datos del usuario
  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUser({
          username: data.username,
          email: data.email,
          password: data.password, // La contraseña la dejamos vacía
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo obtener los datos del usuario",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo conectar con el servidor",
      });
    }
  };

  // Llamar a la función fetchUserData cuando el componente cargue
  useEffect(() => {
    fetchUserData();
  }, []);

  // Función para manejar el envío del formulario de edición
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Datos actualizados con éxito",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsEditing(false); // Deshabilitar edición después de guardar cambios
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron actualizar los datos",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo conectar con el servidor",
      });
    }
  };

  // Función para manejar el cambio en los inputs
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-8 min-h-screen flex flex-col mt-16 sm:ml-64 dark:text-white dark:bg-gray-800 shadow-md font-principal">
      <h1 className="text-4xl font-bold mb-14 ">Configuración</h1>

      {/* Botón para habilitar edición */}
      <div className="flex justify-between w-full mb-4">
        <h2 className="text-2xl font-semibold mb-4">Ajustes del perfil</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 flex items-center space-x-2 rounded-md transition-colors duration-200 text-white ${
            isEditing
              ? "bg-red-600 hover:bg-red-500"
              : "bg-green-600 hover:bg-green-500"
          }`}
        >
          <i className={`fas ${isEditing ? "fa-times" : "fa-edit"}`}></i>
          <span>{isEditing ? "Cancelar Edición" : "Editar Usuario"}</span>
        </button>
      </div>

      <p className="text-gray-400 mb-6">
        Cambia los datos de identificación de tu cuenta.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        {/* Nombre de usuario */}
        <div>
          <label className="block text-lg font-medium">Nombre de usuario</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            disabled={!isEditing} // Bloqueado si no estamos en modo edición
            className="mt-1 block w-full px-3 py-2 dark:bg-gray-700 dark:text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <p className="text-xs text-gray-500 mt-3">
            Podrás volver a actualizar tu nombre de usuario en 2 meses.
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-lg font-medium">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled={!isEditing} // Bloqueado si no estamos en modo edición
            className="mt-1 block w-full px-3 py-2 dark:bg-gray-700 dark:text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <p className="text-xs text-gray-500 mt-3">
            Coloca un correo electrónico autenticado
          </p>
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-lg font-medium">Contraseña</label>
          <input
            name="password"
            value={user.password}
            onChange={handleChange}
            disabled={!isEditing} // Bloqueado si no estamos en modo edición
            className="mt-1 block w-full px-3 py-2 dark:bg-gray-700 dark:text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Deja en blanco si no deseas cambiar la contraseña"
          />
          <p className="text-xs text-gray-500 mt-3">
            Trata de elegir una contraseña segura
          </p>
        </div>

        {/* Botón de Guardar */}
        {isEditing && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md flex items-center space-x-2"
            >
              <i className="fas fa-check"></i>
              <span>Guardar cambios</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
