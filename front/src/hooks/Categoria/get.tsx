import { useQuery } from "@tanstack/react-query";
import axios, {AxiosPromise} from "axios"
import { CategoriaData, CategoriasList} from "../../interface/interfaces";

const apiUrl = 'http://localhost:8080/apiFood/categorias'

//GET DATA
const fetchData = async (): AxiosPromise<CategoriasList> => {
  try {
    console.log("Fetching data from API...");
    const response = await axios.get(apiUrl);
    console.log("Data fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propaga o erro para que seja tratado pelo React Query
  }
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


