import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Search, CloudDownload } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user")
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los usuarios:", error);
      });
  }, []);

  const deleteUser = (userId) => {
    // Mostrar alerta de confirmación con SweetAlert
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Desea eliminar el usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar usuario!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, eliminar el usuario
        axios
          .delete(`http://localhost:8080/api/user/${userId}`)
          .then(() => {
            setUsers(users.filter((user) => user.id !== userId)); // Filtra el usuario eliminado

            // Mostrar notificación de éxito
            Swal.fire("Eliminado!", "El usuario ha sido eliminado.", "success");
          })
          .catch((error) => {
            console.error("Error al eliminar el usuario:", error);

            // Mostrar notificación de error
            Swal.fire(
              "Error!",
              "Hubo un problema al eliminar el usuario.",
              "error"
            );
          });
      }
    });
  };

  // Función para manejar la búsqueda
  const handleSearch = (value) => {
    setSearchTerm(value);
    // Filtrar usuarios por ID (o cualquier otro campo que quieras)
    const filtered = users.filter(
      (user) =>
        user.id.toString().includes(value) ||
        user.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const editUser = (userId) => {
    window.location.href = `/dashboard/edit/${userId}`;
  };

  //Generar PDF
  const generatePdf = () => {
    const table = document.getElementById("user-table"); // Obtiene el elemento de la tabla por ID
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL("/src/assets/images/logo.png");
      const pdf = new jsPDF({
        orientation: "landscape", // Orientación horizontal
      });
      const imgWidth = 280; // Ajusta el tamaño de la imagen para que encaje en el PDF
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("usuarios.pdf"); // Nombre del archivo PDF
    });
  };

  return (
    <div className="p-8 min-h-screen flex flex-col mt-16 sm:ml-64 bg-gray-100">
      <div className="flex justify-between items-center w-full mt-3">
        <div className="space-y-2 mb-12">
          <h1 className="text-[30px] font-bold">Lista de usuarios</h1>
          <p className="text-[18px] font-medium text-gray-600">
            Revisa la lista de usuarios registrados en la aplicación
          </p>
        </div>
        <div>
          <button
            className="flex justify-center items-center gap-1 p-3 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all duration-200"
            onClick={() => {
              {
                generatePdf();
              }
            }}
          >
            <CloudDownload />
            <p className="font-bold">Descargar todo</p>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex justify-center items-center gap-2 border px-3 py-2 rounded-lg bg-white max-w-[320px] w-full">
          <span className="">
            <Search size={20} />
          </span>
          <input
            className="w-full outline-0"
            type="text"
            placeholder="Buscar por ID o nombre de usuario"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <table
        id="user-table"
        className="min-w-full mt-10 border-collapse border border-gray-300 rounded-lg overflow-hidden bg-gray-300"
      >
        <thead>
          <tr className="bg-gray-100 uppercase text-sm border-b">
            <th className="p-3 text-left font-semibold py-3 px-4">ID</th>
            <th className="p-3 text-left font-semibold py-3 px-4">
              Nombre de Usuario
            </th>
            <th className="p-3 text-left font-semibold py-3 px-4">Email</th>
            <th className="p-3 text-left font-semibold py-3 px-4">
              Contraseña
            </th>
            <th className="p-3 text-left font-semibold py-3 px-4">DNI</th>
            <th className="p-3 text-left font-semibold py-3 px-4">Teléfono</th>
            <th className="p-3 text-left font-semibold py-3 px-4">Dirección</th>
            <th className="p-3 text-left font-semibold py-3 px-4">Rol</th>
            <th className="p-3 text-left font-semibold py-3 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id} className="border-t border-gray-300 bg-white">
                <td className="p-3 text-left py-3 px-4">{user.id}</td>
                <td className="p-3 text-left py-3 px-4">{user.username}</td>
                <td className="p-3 text-left py-3 px-4">{user.email}</td>
                <td className="p-3 text-left py-3 px-4">{user.password}</td>
                <td className="p-3 text-left py-3 px-4">{user.dni}</td>
                <td className="p-3 text-left py-3 px-4">{user.phone}</td>
                <td className="p-3 text-left py-3 px-4">{user.address}</td>
                <td className="p-3 text-left py-3 px-4">{user.role}</td>
                <td className="p-3 text-left py-3 px-4">
                  <button
                    onClick={() => {
                      editUser(user.id);
                    }}
                    className="text-blue-500"
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="text-2xl pr-4"
                    />
                  </button>

                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-500 ml-2"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-2xl" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="p-2 border text-center">
                No hay usuarios registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Toaster position="top-right" className="top-20" />
    </div>
  );
};

const notify = () => {
  toast("Usuario editado con éxito!");
};

export default UserList;
