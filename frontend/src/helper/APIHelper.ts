import axios, { AxiosResponse } from "axios";
import ICarro from "../domain/model/ICarro";
import IException from "../domain/model/IExcepion";
import IUtilizador, { IUtilizadorLogin } from "../domain/model/IUtilizador";

class APIHelper {
  static API = axios.create({
    baseURL: "http://localhost:8088",
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
  });

  async getCarroList(utilizador: IUtilizadorLogin) {
    const response = await APIHelper.API.get<Array<ICarro> | IException>(
      "/carros",
      {
        auth: { username: utilizador.username, password: utilizador.password },
      }
    );
    return response.data;
  }

  async saveCarro(
    carro: ICarro,
    utilizador: IUtilizadorLogin
  ): Promise<AxiosResponse<ICarro> | IException> {
    const response = await APIHelper.API.post<ICarro>(
      "/carros",
      JSON.stringify(carro),
      {
        auth: { username: utilizador.username, password: utilizador.password },
      }
    );
    return response;
  }

  async updateCarro(
    carro: ICarro,
    utilizador: IUtilizadorLogin
  ): Promise<AxiosResponse<ICarro> | IException> {
    const response = await APIHelper.API.put<ICarro>(
      "/carros",
      JSON.stringify(carro),
      {
        auth: { username: utilizador.username, password: utilizador.password },
      }
    );
    return response;
  }

  async deleteCarro(
    carro: ICarro,
    utilizador: IUtilizadorLogin
  ): Promise<AxiosResponse<ICarro> | IException> {
    const response = await APIHelper.API.delete<ICarro>("/carros", {
      params: { carroId: carro.id },
      auth: { username: utilizador.username, password: utilizador.password },
    });
    return response;
  }

  async getUtilizadorList(utilizador: IUtilizadorLogin) {
    const response = await APIHelper.API.get<Array<IUtilizador> | IException>(
      "/utilizadores",
      {
        auth: { username: utilizador.username, password: utilizador.password },
      }
    );
    return response;
  }

  async getUtilizador(utilizadorId: number, utilizador: IUtilizadorLogin) {
    const response = await APIHelper.API.get<IUtilizador | IException>(
      "/utilizadores",
      {
        params:{utilizadorId},
        auth: { username: utilizador.username, password: utilizador.password },
      }
    );
    return response;
  }

  async login(utilizadorLogin: IUtilizadorLogin) {
    const response = await APIHelper.API.get<IUtilizador | IException>(
      "/APILogin",
      {
        params: utilizadorLogin,
      }
    );
    return response;
  }
}

export default new APIHelper();
