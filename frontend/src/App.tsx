import React from "react";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import "./App.css";
import CarroForm from "./components/CarroForm";
import CarTable from "./components/CarTable";
import ICarro from "./domain/model/ICarro";
import APIHelper from "./helper/APIHelper";
import ProtectedRoute from "./helper/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarroCrud from "./pages/CarroCrud";
import Login from "./pages/Login";
import Header from "./components/Header";
import Utilizadores from "./pages/Utilizadores";

function App() {
  const toast = React.useRef<Toast>(null);

  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/carros"
            element={
              <ProtectedRoute>
                <CarroCrud />
              </ProtectedRoute>
            }
          />
          <Route
            path="/utilizadores"
            element={
              <ProtectedRoute>
                <Utilizadores />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <ConfirmDialog />
      <Toast ref={toast} />
    </>
  );
}

export default App;
