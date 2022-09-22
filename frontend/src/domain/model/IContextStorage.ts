import { Toast } from "primereact/toast";
import React from "react";
import IUtilizador, { IUtilizadorLogin } from "./IUtilizador";

export default interface IContextStorage {
  utilizador?: IUtilizador;
  setUtilizador?: (utilizador: IUtilizador) => any;
  toast?: React.RefObject<Toast>;
  setUtilizadorLogin?: (utilizadorLogin:IUtilizadorLogin)=>any;
  utilizadorLogin?: IUtilizadorLogin
}