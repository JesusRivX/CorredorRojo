import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/index";
import Nosotros from "./pages/nosotros";
import Recarga from "./pages/recarga";
import Blog from "./pages/blog";
import Contacto from "./pages/contacto";
import InicioSesion from "./pages/inicioSesion";
import Registro from "./pages/register";

import Usuario from "./pages/usuario";
import Tarjeta from "./pages/Usuario/tarjeta";
import Codigo from "./pages/Usuario/codigo";
import Agente from "./pages/Usuario/agente";
import Map from "./pages/Usuario/map";
import Ecommerce from "./components/Ecommerce/Ecommerce";
import Listar from "./components/Listar";
import EditarUser from "./components/EditUser";

import Dashboard from "./pages/dashboard";

import ModalComponent from "./components/Dashboard/LoginCard";
import UserProfile from "./pages/Usuario/UserProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/inicioSesion" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/usuario" element={<Usuario />} />

        <Route path="/codigo" element={<Codigo />} />
        <Route path="/modal" element={<ModalComponent />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Usuario />} />
          <Route path="recarga" element={<Recarga />} />
          <Route path="tarjeta" element={<Tarjeta />} />
          <Route path="agente" element={<Agente />} />
          <Route path="ecommerce" element={<Ecommerce />} />
          <Route path="map" element={<Map />} />
          <Route path="listar" element={<Listar />} />
          <Route path="edit/:userId" element={<EditarUser />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
