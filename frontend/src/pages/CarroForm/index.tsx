import React from "react";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import "./App.css";
import CarTable from "./components/CarTable";
import ICarro from "./domain/model/ICarro";
import APIHelper from "./helper/APIHelper";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarroForm from "./pages/CarroCrud";

function CarroForm() {
  const toast = React.useRef<Toast>(null);

  return (
    <BrowserRouter>
    <CarroForm />
    </BrowserRouter>
  );
}

export default CarroForm;
