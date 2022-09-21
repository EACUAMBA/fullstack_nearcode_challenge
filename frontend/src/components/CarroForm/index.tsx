import React, { SetStateAction } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import APIHelper from "../../helper/APIHelper";
import ICarro from "../../domain/model/ICarro";

type Props = {
  visible: boolean;
  handleOnHideDialog: SetStateAction<any>;
  setCarroSaved: (carro: ICarro) => any;
  carro?: ICarro | null;
  children?: React.Component;
};
const CarroForm: React.FC<Props> = function ({
  visible,
  handleOnHideDialog,
  setCarroSaved,
  carro,
}: Props) {
  const [marca, setMarca] = React.useState<string>("");
  const [modelo, setModelo] = React.useState<string>("");
  const [matricula, setMatricula] = React.useState<string>("");
  const [action, setAction] = React.useState<string>("Registar");

  React.useEffect(() => {
    if (carro) {
      setAction("Actualizar");
      setMarca(carro.marca);
      setMatricula(carro.matricula);
      setModelo(carro.modelo);
    } else {
      setAction("Registar");
      setMarca("");
      setModelo("");
      setMatricula("");
    }
  }, [carro]);

  async function handleOnClickButtonRegistar() {
    let response;
    let c: ICarro = { marca: marca, modelo: modelo, matricula: matricula };
    if (carro) {
      c = {
        id: carro.id,
        ...c,
      };
      response = await APIHelper.updateCarro(c);
    } else {
      response = await APIHelper.saveCarro({
        ...c,
      });
      c = response.data;
    }
    if (response.status === 201 || response.status === 200) {
      setCarroSaved(c);
      setMarca("");
      setModelo("");
      setMatricula("");
    } else {
    }
  }

  return (
    <Dialog
      visible={visible}
      style={{ width: "40vw" }}
      onHide={handleOnHideDialog}
      header="Registar carro"
      contentStyle={{
        padding: "1rem",
        display: "flex",
        gap: "2rem",
        flexDirection: "column",
      }}
    >
      <div className="p-float-label" style={{ display: "flex", flex: 1 }}>
        <InputText
          id="in"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          style={{ flex: 1 }}
        />
        <label htmlFor="in">Marca</label>
      </div>

      <span className="p-float-label" style={{ display: "flex", flex: 1 }}>
        <InputText
          id="in"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          style={{ flex: 1 }}
        />
        <label htmlFor="in">Modelo</label>
      </span>

      <span className="p-float-label" style={{ display: "flex", flex: 1 }}>
        <InputText
          id="in"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          style={{ flex: 1 }}
        />
        <label htmlFor="in">Matricula</label>
      </span>

      <span className="p-float-label" style={{ display: "flex", flex: 1 }}>
        <Dropdown style={{ flex: 1 }} />
        <label htmlFor="in">Utilizador</label>
      </span>

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          label={action}
          className="p-button-success"
          onClick={handleOnClickButtonRegistar}
        />
      </div>
    </Dialog>
  );
};

export default CarroForm;
