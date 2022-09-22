import { Toast } from "primereact/toast";
import React from "react";
import IContextStorage from "../domain/model/IContextStorage";
import IUtilizador, { IUtilizadorLogin } from "../domain/model/IUtilizador";

type Props = {
  children: React.ReactElement;
};

export const UtilizadorContext = React.createContext<IContextStorage>({
  utilizador: undefined,
  setUtilizador: undefined,
});
export const UtilizadorStorage = ({ children }: Props) => {
  const [utilizador, setUtilizador] = React.useState<IUtilizador>();
  const [utilizadorLogin, setUtilizadorLogin] = React.useState<IUtilizadorLogin>();
  const toast = React.useRef<Toast>(null);

  return (
    <UtilizadorContext.Provider value={{ setUtilizador, utilizador, toast, setUtilizadorLogin, utilizadorLogin }}>
      {children}
      <Toast ref={toast}/>
    </UtilizadorContext.Provider>
  );
};
