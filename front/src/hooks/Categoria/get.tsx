import { useQuery } from "@tanstack/react-query";
import axios, {AxiosPromise} from "axios"
import { CategoriaData} from "../../interface/interfaces";

const apiUrl = 'http://localhost:8080/apiFood/categorias'

//GET DATA
const fetchData = async (): AxiosPromise<CategoriaData> => {
  const response = axios.get(apiUrl);
  return response;
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

//HOOk DATALIST

export const useCategoriaDataList = () => {
  const query = useQuery<CategoriaData[]>({
    queryFn: async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        
        console.log("Dados retornados pelo useCategoriaDataList:", data);

        return data;
      } catch (error) {
        console.error("Erro ao obter dados:", error);
        throw error;
      }
    },
    queryKey: ["categorias"],
    retry: 2,
  });

  return query;
};


