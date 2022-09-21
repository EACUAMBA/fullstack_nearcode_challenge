import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import ICarro from "../domain/model/ICarro";
import CarroForm from "./CarroForm";

type Props = {
  carroList: Array<ICarro>;
  children?: JSX.Element;
  setSelectedCarroList: (carroList: Array<ICarro>) => any;
  selectedCarroList: Array<ICarro>;
};

const CarTable: React.FC<Props> = ({
  carroList,
  setSelectedCarroList,
  selectedCarroList,
  children,
}: Props) => {
  return (
    <>
      <DataTable
        selectionMode="multiple"
        selection={selectedCarroList}
        onSelectionChange={(e: { value: any[] }) =>
          setSelectedCarroList(e.value)
        }
        value={carroList}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3em" }}
        ></Column>
        <Column field="id" header="ID" />
        <Column field="marca" header="Marca" />
        <Column field="modelo" header="Modelo" />
        <Column field="matricula" header="Matricula" />
        <Column field="utilizadorId" header="ID do Utilizador" />
        <Column field="UtilizadorNome" header="Nome do utilizador" />
      </DataTable>
    </>
  );
};

export default CarTable;
