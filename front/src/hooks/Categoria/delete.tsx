import axios, {AxiosPromise} from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const apiURL = 'http://localhost:8080/apiFood/servicos';

// DELETE
const deleteData = async (id: number): AxiosPromise<any> => {
    const response = axios.delete(apiURL, {data : {id}})
    return response;
}


export function useCategoriaDataDelete(){
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['servico-data']})
        }
    })
    return mutate;
}