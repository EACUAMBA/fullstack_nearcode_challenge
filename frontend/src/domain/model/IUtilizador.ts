export default interface IUtilizador{
  id: number|null;
  nome: string;
  idade?: number;
  username?: string;
  password? : string
}


export interface IUtilizadorLogin{
  username: string;
  password: string
}