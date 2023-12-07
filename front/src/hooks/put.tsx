import axios, {AxiosPromise} from "axios";
import { ServicoData } from "../interface/servicoData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const apiURL = 'http://localhost:8080/Turquesa/servicos';

//PUT
const putData =async (data: ServicoData): AxiosPromise<any> => {
    const response = axios.put(apiURL, data);
    return response;   
}

export function useServicoDataPut(){
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: putData,
        retry:2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['servico-data'] });
        },    
    });

    return mutate


}