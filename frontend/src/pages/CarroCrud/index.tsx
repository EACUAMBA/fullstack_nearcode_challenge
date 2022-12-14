import React from "react";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import CarroForm from "../../components/CarroForm";
import CarTable from "../../components/CarTable";
import ICarro from "../../domain/model/ICarro";
import APIHelper from "../../helper/APIHelper";
import IContextStorage from "../../domain/model/IContextStorage";
import { UtilizadorContext } from "../../helper/UtilizadorContext";
import { IUtilizadorLogin } from "../../domain/model/IUtilizador";

function CarroCrud() {
  const toast = React.useRef<Toast>(null);
  const [carroList, setCarros] = React.useState<Array<ICarro>>([]);
  const utilizadorContext =
    React.useContext<IContextStorage>(UtilizadorContext);

  const [selectedCarroList, setSelectedCarroList] = React.useState<
    Array<ICarro>
  >([]);
  React.useEffect(() => {
    fetchCarro();
  }, []);

  function fetchCarro() {
    setCarros([]);
    APIHelper.getCarroList(
      utilizadorContext.utilizadorLogin as IUtilizadorLogin
    ).then((carroList) => setCarros(carroList as Array<ICarro>));
  }

  const [carroFormVisibility, setCarroFormVisibility] =
    React.useState<boolean>(false);

  function handleOnHideDialog() {
    setCarroFormVisibility(false);
  }
  function handleOnClickButtonAdicionar() {
    setCarroFormVisibility(true);
  }

  function handleOnClickButtonEditar() {
    setCarroFormVisibility(true);
  }

  function handleOnClickButtonRemover() {
    if (selectedCarroList.length > 0) {
      const matriculas = selectedCarroList
        .map((c) => c.matricula)
        .reduce((o, n) => o + ", " + n);
      confirmDialog({
        message: `Deseja remover o carros com as matriculas ${matriculas}`,
        accept: () => {
          selectedCarroList.forEach((carro) => {
            APIHelper.deleteCarro(
              carro,
              utilizadorContext.utilizadorLogin as IUtilizadorLogin
            )
              .then(() => fetchCarro())
              .then(() =>
                toast.current?.show({
                  summary: "Removido com sucesso",
                  severity: "success",
                })
              );
          });
        },
      });
    } else {
    }
  }

  return (
    <>
      <div>
        <div style={{ margin: "1rem 0", display: "flex", gap: "1rem" }}>
          <Button label="Adicionar" onClick={handleOnClickButtonAdicionar} />
          <Button
            label="Editar"
            onClick={handleOnClickButtonEditar}
            visible={selectedCarroList.length > 0}
          />
          <Button label="Remover" onClick={handleOnClickButtonRemover} />
        </div>
        <CarroForm
          visible={carroFormVisibility}
          handleOnHideDialog={handleOnHideDialog}
          carro={selectedCarroList.length > 0 ? selectedCarroList[0] : null}
          setCarroSaved={(carro) => {
            setSelectedCarroList([]);
            fetchCarro();
            setCarroFormVisibility(false);
          }}
        />
        <CarTable
          carroList={carroList}
          selectedCarroList={selectedCarroList}
          setSelectedCarroList={(carroList) => setSelectedCarroList(carroList)}
        />
      </div>
      <ConfirmDialog />
      <Toast ref={toast} />
    </>
  );
}

export default CarroCrud;
