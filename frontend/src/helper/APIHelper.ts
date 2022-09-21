import axios, { AxiosResponse} from "axios";
import ICarro from "../domain/model/ICarro";

class APIHelper {
  static API = axios.create({
    baseURL: "http://localhost:8088",
    headers: {"Content-Type": "application/json"},
    withCredentials: false,
  });

  async getCarroList() {
    const response = await APIHelper.API.get<Array<ICarro>>("/carros");
    return response.data;
  }

  async saveCarro(carro: ICarro): Promise<AxiosResponse<ICarro>>{
    const response =  await APIHelper.API.post<ICarro>('/carros', JSON.stringify(carro))
    return response;
  }

  async updateCarro(carro: ICarro): Promise<AxiosResponse<ICarro>>{
    const response =  await APIHelper.API.put<ICarro>('/carros', JSON.stringify(carro))
    return response;
  }

  async deleteCarro(carro: ICarro): Promise<AxiosResponse<ICarro>>{
    const response =  await APIHelper.API.delete<ICarro>('/carros',{
      params: {"carroId" : carro.id}
    })
    return response;
  }
}

export default new APIHelper();
