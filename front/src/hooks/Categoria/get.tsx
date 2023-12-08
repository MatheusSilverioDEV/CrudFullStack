import { useQuery } from "@tanstack/react-query";
import axios, {AxiosPromise} from "axios"
import { CategoriaData } from "../../interface/categoriaData";

const apiUrl = 'http://localhost:8080/apiFood/servicos'

//GET
const fetchData = async (): AxiosPromise<CategoriaData[]> =>{
    const response = axios.get(apiUrl)
    return response;
}

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