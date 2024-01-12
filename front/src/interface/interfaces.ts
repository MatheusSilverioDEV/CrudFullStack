export interface CategoriaData {
  id: number,
  nome: string;
}


  export interface ServicoData{
    id?: number,
    nome: string,
    imagem: string,
    valor: number,
    descricao: string,
    status: boolean,
    categorias?: CategoriaData[] // Se categorias for undefined, use um array vazio

}

export interface CategoriasList {
  data: CategoriaData[];
}

