import {useEffect, useState } from "react"
import { ServicoData } from "../../interface/interfaces";
import { useServicoDataPost } from "../../hooks/Servico/post"
import './modal.css';
import Switch from 'react-switch';
import { useCategoriaData } from "../../hooks/Categoria/get";


interface Categoria {
    id: number;
    nome: string;
  }

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
    const { data: categorias, isLoading, isError } = useCategoriaData();
    const {mutate, isSuccess} = useServicoDataPost();
    const [selectedCategorias, setSelectedCategorias] = useState<Categoria[]>([]);


    const toggleStatus = () => {
        setStatus((prevStatus) => !prevStatus);
      };

      const handleCategoriaChange = (
        event: React.ChangeEvent<HTMLSelectElement>
      ) => {
        const selectedCategorias: Categoria[] = Array.from(
          event.target.selectedOptions,
          (option) => ({
            id: Number(option.value),
            nome: option.text,
          })
        );
        setSelectedCategorias(selectedCategorias);
      };

const submit = () => {
  const servicoData: ServicoData = {
    nome,
    imagem,
    valor,
    descricao,
    status,
    categorias: selectedCategorias.map((categoria) => categoria.id),


  };
  mutate(servicoData);
};
    
    
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
                    <label>Categorias</label>
                    <select multiple value={categorias?.map(String)} onChange={handleCategoriaChange}>           
                    {categorias?.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                        {categoria.nome}
                        </option>
                        ))}
                 </select>
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
