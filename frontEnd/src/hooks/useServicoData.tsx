import {useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { ServicoData } from "../interface/servicoData";

const apiURL = 'http://localhost:8080/Turquesa/servicos'


//GET
const fetchData = async (): AxiosPromise<ServicoData[]> => {
    const response = axios.get(apiURL);
    return response;
}

export function useServicoData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['servico-data'],
        retry: 2
    })

    return{
        ...query,
        data: query.data?.data
    }

}

