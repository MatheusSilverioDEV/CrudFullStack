import {useEffect, useState } from "react"
import { ServicoData } from "../../interface/servicoData"
import { useServicoDataPost } from "../../hooks/Servico/post"
import './modal.css';
import Switch from 'react-switch';


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
    const {mutate, isSuccess} = useServicoDataPost();

    const toggleStatus = () => {
        setStatus((prevStatus) => !prevStatus);
      };

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
                <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-body" onClick={(e) => e.stopPropagation()}>
                <h2>Cadastre um novo item no cardápio</h2>
                <form className="input-container">
                    <Input label="Nome" value={nome} updateValue={setNome}/>
                    <Input label="Imagem" value={imagem} updateValue={setImagem}/>
                    <Input label="Valor" value={valor} updateValue={setValor}/>
                    <Input label="Descricão" value={descricao} updateValue={setDescricao}/>
                </form>
     
                <button onClick={submit} className="btn-secondary">Postar</button>
                <button onClick={closeModal} className="btn-secondary">Fechar</button>
                <p>Status: Inativo/Ativo
                <Switch className="toggle"
                        onChange={toggleStatus}
                        checked={status}
                        onColor="#91ff00"
                        offColor="#ff2400"
                        offHandleColor="#ff2400"
                        onHandleColor="#91ff00"
                        activeBoxShadow="0 0"
                        handleDiameter={30}
                        height={20}
                        width={48}
                        uncheckedIcon={false}
                        checkedIcon={false}
                    />
                </p>
            </div>
        </div>
        </>
    )
}
