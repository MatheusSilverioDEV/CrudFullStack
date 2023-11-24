import {useEffect, useState } from "react"
import { ServicoData } from "../../interface/servicoData"
import { useServicoDataMutate } from "../../hooks/useServicoDatamutate"
import './modal.css'

export interface InputProps {
    label: string,
    value: string | number
    updateValue(value:any): void
}

export interface ModalProps{
    closeModal(): void
}

export const Input = ({label, value, updateValue} : InputProps) => {
    return(
        <>
        <label>{label}</label>
        <input value={value} onChange={e => updateValue(e.target.value)}/>
        </>
    )

}


export function CreateModal({closeModal} : ModalProps){
    const [nome, setNome] = useState("");
    const [imagem, setImagem] = useState("");
    const [valor, setValor] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [status, setStatus] = useState(true);
    const { mutate, isSuccess} = useServicoDataMutate(); //mutate faz o submite dos dados


    const submit = () => {
        const servicoData: ServicoData = {
            nome,
            imagem,
            valor,
            descricao,
            status
        }
        mutate(servicoData)
    }

    useEffect(() => {
        if(!isSuccess) return
        closeModal();
    }, [isSuccess])




    return(
        <>
                <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                <form className="input-container">
                    <Input label="Nome" value={nome} updateValue={setNome}/>
                    <Input label="Imagem" value={imagem} updateValue={setImagem}/>
                    <Input label="Valor" value={valor} updateValue={setValor}/>
                    <Input label="Descricão" value={descricao} updateValue={setDescricao}/>
                </form>
                <button onClick={submit} className="btn-secondary">Postar</button>
                <button onClick={closeModal} className="btn-secondary">Fechar</button>
            </div>
        </div>
        </>
    )
}