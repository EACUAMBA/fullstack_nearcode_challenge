import React from "react";
import { UtilizadorContext } from "./UtilizadorContext";
import { useNavigate } from "react-router-dom";
import IContextStorage from "../domain/model/IContextStorage";

type Props = {
  children: React.ReactElement;
};

const ProtectedRoute: React.FC<Props> = ({ children }: Props) => {
  const navigate = useNavigate();
  const utilizadorContext =
    React.useContext<IContextStorage>(UtilizadorContext);

    React.useEffect(()=>{
if(!utilizadorContext
  .utilizador){
    navigate("/");
  }
    }, [])

    if (utilizadorContext.utilizador) {
      return <>{children}</>;
    } else {
      
      return null;
    }
};

export default ProtectedRoute;
