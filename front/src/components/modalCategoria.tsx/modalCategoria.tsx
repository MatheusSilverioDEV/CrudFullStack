import {useEffect, useState } from "react"
import "./modalCategoria.css"
import { CategoriaData } from "../../interface/categoriaData"
import { useCategoriaDataPost } from "../../hooks/Categoria/post"

export interface InputProps{
    label: string
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

export function CreateModalCategoria({closeModal} : ModalProps){
    const [nome, setNome] = useState("")
    const {mutate, isSuccess} = useCategoriaDataPost();



const submit = () => {
    const categoriaData: CategoriaData = {
        nome
    }

    mutate(categoriaData)
}

useEffect(() => {
    if(!isSuccess) return
    closeModal();
}, [isSuccess])

return(
    <>
    <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-body" onClick={(e) => e.stopPropagation()}>
            <h2>Gerenciar suas categorias</h2>
            <form className="input-container">
                <Input label="Nome" value={nome} updateValue={setNome}/>
            </form>
            <div className="button-container">
            <button onClick={submit} className="btn-secondary">Cadastrar</button>
            <button onClick={closeModal} className="btn-secondary">Fechar</button>
            </div>
        </div>
    </div>
    
    </>
)




}