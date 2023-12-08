import axios, { AxiosPromise } from "axios";
import { ServicoData } from "../../interface/servicoData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const apiURL = 'http://localhost:8080/apiFood/servicos'

//POST

const postData = async (data: ServicoData): AxiosPromise<any> => {
    const response = axios.post(apiURL, data);
    return response;
} 

export function useServicoDataPost(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['servico-data']})
        }
    })
    return mutate
}