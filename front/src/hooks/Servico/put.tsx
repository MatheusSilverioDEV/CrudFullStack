import axios, {AxiosPromise} from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ServicoData } from "../../interface/interfaces";

const apiURL = 'http://localhost:8080/apiFood/servicos';

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