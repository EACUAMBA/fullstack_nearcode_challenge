import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React from "react";
import IContextStorage from "../../domain/model/IContextStorage";
import IException from "../../domain/model/IExcepion";
import IUtilizador, { IUtilizadorLogin } from "../../domain/model/IUtilizador";
import APIHelper from "../../helper/APIHelper";
import { UtilizadorContext } from "../../helper/UtilizadorContext";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const utilizadorContext =
    React.useContext<IContextStorage>(UtilizadorContext);
  const toast = React.useRef<Toast>(null);
  const [username, setUsername] = React.useState<string>("maria");
  const [password, setPassword] = React.useState<string>("");

  function handleOnClickSignIn() {
    const utilizadorLogin : IUtilizadorLogin = { username: username, password: password };
    APIHelper.login({ username: username, password: password }).then(
      (response) => {
        if (response.status === 200) {
          utilizadorContext.setUtilizadorLogin?.(utilizadorLogin);
          utilizadorContext.setUtilizador?.(response.data as IUtilizador);
          utilizadorContext.toast?.current?.show({
            severity: "success",
            summary: "Logado com sucesso!",
          });
          navigate("/carros");
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Error ao logar",
            content: (response.data as IException).message,
          });
          console.log("Erro");
        }
      }
    );
  }
  return (
    <form onSubmit={(event) => event.preventDefault()} className={styles.form}>
      <span className="p-float-label">
        <InputText
          id="in"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="in">Username</label>
      </span>

      <span className="p-float-label">
        <InputText
          id="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
        />
        <label htmlFor="in">Password</label>
      </span>

      <Button label="Sign In" onClick={handleOnClickSignIn} />
      <Toast ref={toast} />
    </form>
  );
};

export default Login;
