import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import IContextStorage from "../../domain/model/IContextStorage";
import IUtilizador, { IUtilizadorLogin } from "../../domain/model/IUtilizador";
import APIHelper from "../../helper/APIHelper";
import { UtilizadorContext } from "../../helper/UtilizadorContext";

const Utilizadores = function () {
const utilizadorContext = React.useContext<IContextStorage>(UtilizadorContext);
  const [utilizadores, setUtilizadores] = React.useState<Array<IUtilizador>>();
  const [utilizadoresSelected, setUtilizadoresSelected] = React.useState<Array<IUtilizador>>();

  React.useEffect(()=>{
    APIHelper.getUtilizadorList(utilizadorContext.utilizadorLogin as IUtilizadorLogin).then((response) => setUtilizadores(response.data as Array<IUtilizador>))
  }, [utilizadorContext.utilizadorLogin]);
  return (
    <>
      <h1>Utilizadores</h1>
      <DataTable
        selectionMode="multiple"
        selection={utilizadoresSelected}
        onSelectionChange={(e: { value: any[] }) =>
          setUtilizadoresSelected(e.value)
        }
        value={utilizadores}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3em" }}
        ></Column>
        <Column field="id" header="ID" />
        <Column field="nome" header="Nome" />
        <Column field="idade" header="Idade" />
        <Column field="username" header="Nome de utilizador" />
      </DataTable>
    </>
  );
};

export default Utilizadores;
