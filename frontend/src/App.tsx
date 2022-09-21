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

function App() {
  const toast = React.useRef<Toast>(null);
  
  return (
    <BrowserRouter>
    <div>
      <h2>Menu</h2>
      <Routes>
      <Route path="/" element={<App />} />
      <Route path="/carro-crud" element={<ProtectedRoute><CarroCrud/></ProtectedRoute>} />
      </Routes>
    </div>
      <ConfirmDialog />
      <Toast ref={toast} />
    </BrowserRouter>
  );
}

export default App;
