import axios, { AxiosPromise } from "axios";
import { CategoriaData } from "../../interface/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const apiURL = 'http://localhost:8080/apiFood/categorias';

// POST
const postData = async (data: CategoriaData): AxiosPromise<any> => {
    const response = axios.post(apiURL, data);
    return response;
}

export function useCategoriaDataPost() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categoria-data'] });
        }
    });
    return mutate;
}