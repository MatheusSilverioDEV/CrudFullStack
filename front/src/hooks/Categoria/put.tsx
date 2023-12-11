import axios, {AxiosPromise} from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoriaData } from "../../interface/interfaces";

const apiURL = 'http://localhost:8080/apiFood/categorias'

// PUT
const putData = async (data: CategoriaData): AxiosPromise<any> => {
    const response = axios.put(apiURL, data);
    return response;
}

export function useCategoriaDataPut(){
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categoria-data'] })
        }
    });

    return mutate

}