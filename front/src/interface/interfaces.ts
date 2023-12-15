export interface CategoriaData {
    id?: number;
    nome: string;
    value?: number;
  }

  export interface ServicoData{
    id?: number,
    nome: string,
    imagem: string,
    valor: number,
    descricao: string,
    status: boolean,
    categorias?: number[] // Se categorias for undefined, use um array vazio

}

export interface CategoriasList {
  categorias?: CategoriaData[];
  data: any;
}