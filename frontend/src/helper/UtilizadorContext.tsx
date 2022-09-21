import React from "react";
import IUtilizador from "../domain/model/IUtilizador";

type Props = {
  children: React.ReactElement;
};

export interface IContextStorage {
  utilizador?: IUtilizador;
  setUtilizador?: (utilizador: IUtilizador) => any;
}

export const UtilizadorContext = React.createContext<IContextStorage>({
  utilizador: undefined,
  setUtilizador: undefined,
});
export const UtilizadorStorage = ({ children }: Props) => {
  const [utilizador, setUtilizador] = React.useState<IUtilizador>();
  return (
    <UtilizadorContext.Provider value={{ setUtilizador, utilizador }}>
      {children}
    </UtilizadorContext.Provider>
  );
};
