import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Usuario = () => {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [rol, setRol] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el nombre de usuario del localStorage
    const savedUsername = localStorage.getItem("username");
    const savedRol = localStorage.getItem("rol");
    const savedId = localStorage.getItem("id");
    if (savedUsername) {
      setUsername(savedUsername);
    }
    if (savedId) {
      setId(savedId);
    }
    if (savedRol) {
      setRol(savedRol);
    }
  }, []);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    Swal.fire({
      title: "Sesión culminada",
      text: "Has cerrado sesión exitosamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
      navigate("/inicioSesion"); // Redirige a la página de inicio de sesión
    });
  };

  // Función para cargar el saldo inicial desde localStorage
  const cargarSaldoInicial = () => {
    const saldoGuardado = localStorage.getItem("saldo");
    return saldoGuardado ? parseFloat(saldoGuardado) : 0; // Si no hay saldo guardado, empieza en 0
  };

  // Estados del componente
  const [monto, setMonto] = useState(""); // Para el monto a recargar
  const [numeroTarjeta, setNumeroTarjeta] = useState(""); // Número de tarjeta
  const [metodoPago, setMetodoPago] = useState(""); // Método de pago seleccionado
  const [selectedSection, setSelectedSection] = useState("recargarTarjeta"); // Sección seleccionada
  const [saldo, setSaldo] = useState(cargarSaldoInicial()); // Saldo del usuario

  const handleProcesarCompra = () => {
    if (metodoPago) {
      switch (metodoPago) {
        case "tarjeta":
          navigate("/dashboard/tarjeta");
          break;
        case "codigo":
          navigate("/codigo");
          break;
        case "agentes":
          navigate("/dashboard/agente");
          break;
        default:
          break;
      }
    } else {
      alert("Por favor, selecciona un método de pago.");
    }
  };

  // Usar useEffect para guardar el saldo en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("saldo", saldo.toFixed(2)); // Guardar el saldo en localStorage como cadena
  }, [saldo]);

  // Función para procesar una recarga
  const handleRecargarTarjeta = () => {
    const montoRecarga = parseFloat(monto);
    if (isNaN(montoRecarga) || montoRecarga <= 0) {
      Swal.fire({
        icon: "error",
        title: "Error en la recarga",
        text: "Por favor, ingrese un monto válido para recargar.",
      });
      return;
    }

    // Si la recarga es válida, sumar al saldo
    setSaldo((prevSaldo) => prevSaldo + montoRecarga);
    Swal.fire({
      icon: "success",
      title: "Recarga exitosa",
      text: `Has recargado S/${montoRecarga.toFixed(2)} exitosamente.`,
    });

    // Limpiar los campos
    setMonto("");
    setNumeroTarjeta("");
    setMetodoPago("");
  };

  // Función para realizar un pago de 3.75
  const handlePagar = () => {
    const montoAPagar = 3.75;

    if (saldo >= montoAPagar) {
      setSaldo((prevSaldo) => prevSaldo - montoAPagar);
      Swal.fire({
        icon: "success",
        title: "Pago exitoso",
        text: `Has pagado S/${montoAPagar.toFixed(2)} exitosamente.`,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Saldo insuficiente",
        text: "No tienes suficiente saldo para realizar este pago.",
      });
    }
  };

  return (
    <div className="mx-auto p-8 shadow-lg mt-16 sm:ml-64 bg-gray-100 dark:bg-gray-800 dark:text-white h-screen">
      <div>
        <div>
          <h1 className="text-3xl font-bold mb-4">
            Saldo: S/{saldo.toFixed(2)}
          </h1>
          <h1 className="text-3xl font-bold mb-4">Bienvenido! {username}</h1>
          <h1>ID {id}</h1>
        </div>
      </div>
    </div>
  );
};

export default Usuario;
