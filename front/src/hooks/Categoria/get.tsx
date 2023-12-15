import { useQuery } from "@tanstack/react-query";
import axios, {AxiosPromise} from "axios"
import { CategoriaData, CategoriasList} from "../../interface/interfaces";

const apiUrl = 'http://localhost:8080/apiFood/categorias'

//GET DATA
const fetchData = async (): AxiosPromise<CategoriaData[]> =>{
    const response = await axios.get(apiUrl);
    return response.data.data;
}

//HOOK DATA
export function useCategoriaData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['categoria-data'],
        retry: 2
    })

    return{
        ...query,
        data: query.data?.data
    }
}



//GET LIST
const fetchDataList = async () => {
    const response = await axios.get(apiUrl);
  
    if (response.data) {
      return response.data.categorias.map((categoria: { id: number; nome: string; }) => ({
        id: categoria.id,
        nome: categoria.nome,
      }));
    } else {
      return [];
    }
  };

//HOOK LIST
export function useCategoriaDataList() {
    const query = useQuery({
        queryFn: fetchDataList,
        queryKey: ["categorias"],
        retry: 2,
    });

    return { data: query.data?.categorias || [] };
    
}
  

