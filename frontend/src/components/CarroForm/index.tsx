import React, { SetStateAction } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import APIHelper from "../../helper/APIHelper";
import ICarro from "../../domain/model/ICarro";
import IUtilizador, { IUtilizadorLogin } from "../../domain/model/IUtilizador";
import { Toast } from "primereact/toast";
import IException from "../../domain/model/IExcepion";
import { AxiosResponse } from "axios";
import { UtilizadorContext } from "../../helper/UtilizadorContext";
import IContextStorage from "../../domain/model/IContextStorage";

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

  const toast = React.useRef<Toast>(null);
  const [marca, setMarca] = React.useState<string>("");
  const [modelo, setModelo] = React.useState<string>("");
  const [matricula, setMatricula] = React.useState<string>("");
  const [utilizadorList, setUtilizadorList] = React.useState<Array<IUtilizador>>([]);
  const [action, setAction] = React.useState<string>("Registar");
  const [utilizador, setUtilizador] = React.useState<IUtilizador>();

const utilizadorContext = React.useContext<IContextStorage>(UtilizadorContext);
  React.useEffect(() => {
    APIHelper.getUtilizadorList(utilizadorContext.utilizadorLogin as IUtilizadorLogin).then(response => {
      if(response.status === 200){
        setUtilizadorList(response.data as Array<IUtilizador>)
      }else{ 
        toast.current?.show({severity: 'error',summary: "Ocorreu um erro ao buscar utilizadores!", content: (response.data as IException).message})
      }
    })
    if (carro) {
      setAction("Actualizar");
      setMarca(carro.marca);
      setMatricula(carro.matricula);
      setModelo(carro.modelo);
      if(carro.utilizadorId){
        APIHelper.getUtilizador(carro.utilizadorId, utilizadorContext.utilizadorLogin as IUtilizadorLogin).then(response=> setUtilizador((response.data) as IUtilizador));
      }
    } else {
      setAction("Registar");
      setMarca("");
      setModelo("");
      setMatricula("");
      setUtilizador(undefined);
    }
  }, [carro, utilizadorContext.utilizadorLogin]);

  async function handleOnClickButtonRegistar() {
    let response;
    let c: ICarro = { marca: marca, modelo: modelo, matricula: matricula, utilizadorId: utilizador?.id as number };
    if (carro) {
      c = {
        id: carro.id,
        ...c,
      };
      response = await APIHelper.updateCarro(c, utilizadorContext.utilizadorLogin as IUtilizadorLogin);
    } else {
      response = await APIHelper.saveCarro({
        ...c,
      }, utilizadorContext.utilizadorLogin as IUtilizadorLogin);
      c = (response as AxiosResponse<ICarro>).data as ICarro;
    }
    if (response.status === 201 || response.status === 200) {
      setCarroSaved(c);
      setMarca("");
      setModelo("");
      setMatricula("");
      setUtilizador(undefined)
    } else {
    }
  }

  return (
    <>
    <Dialog
      visible={visible.valueOf()}
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
        <Dropdown options={utilizadorList.map(utilizador => {return {label: utilizador.nome, value: utilizador}})} value={utilizador} onChange={(e)=> setUtilizador(e.value)} style={{ flex: 1 }} />
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
    <Toast ref={toast}/>
    </>
  );
};

export default CarroForm;
