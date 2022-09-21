import React from "react";
import { IContextStorage, UtilizadorContext } from "./UtilizadorContext";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactElement;
};

const ProtectedRoute: React.FC<Props> = ({ children }: Props) => {
  const navigate = useNavigate();
  const utilizadorContext =
    React.useContext<IContextStorage>(UtilizadorContext);

  if (utilizadorContext.utilizador) {
    return <>{children}</>;
  } else {
    navigate("/login");
    return null;
  }
};

export default ProtectedRoute;
