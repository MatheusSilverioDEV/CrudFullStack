import {useEffect, useState } from "react"
import { CategoriaData } from "../../interface/interfaces"
import { useCategoriaDataPost} from "../../hooks/Categoria/post"
import { useCategoriaDataDelete } from "../../hooks/Categoria/delete"
import { useCategoriaData } from "../../hooks/Categoria/get"
import { useCategoriaDataPut } from "../../hooks/Categoria/put"
import { MdEdit, MdDeleteForever  } from "react-icons/md";



import "./modalCategoria.css"


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
    const [nome, setNome] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [categoriaParaEditar, setCategoriaParaEditar] = useState<CategoriaData | null>(null);
  
    const { mutate, isSuccess } = isEditing ? useCategoriaDataPut() : useCategoriaDataPost();
    const { data } = useCategoriaData();
    const { mutate: deleteCategoria } = useCategoriaDataDelete();




    const submit = (event: React.MouseEvent<HTMLButtonElement>) => {
      
        const categoriaData: CategoriaData = {
          id: categoriaParaEditar?.id,
          nome,
        };
      
        mutate(categoriaData); // PUT
        setIsEditing(false);
        setCategoriaParaEditar(null);

        event.preventDefault(); 

      };

    const handleDelete = (categoriaId: number) => {
        deleteCategoria(categoriaId);
    };
    

    const handleEdit = (categoriaId: number) => {
        console.log("handleEdit chamado");
        setIsEditing(true);
        const categoria = data?.find((cat) => cat.id === categoriaId);
        setCategoriaParaEditar(categoria);
        setNome(categoria?.nome || "");
      };
      



      useEffect(() => {
        if (isSuccess) {
            closeModal();
        }
    }, [isSuccess, closeModal]);

return(
    <>
    <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <h2>{isEditing ? "Editar categoria" : "Cadastre uma categoria"}</h2>
            <form className="input-container" >
                <Input label="Nome" value={nome} updateValue={setNome}/>
                <ul className="category-list">
              {data?.map((categoria: CategoriaData) => (
                <li key={categoria.id} className="category-row">
                  {categoria.nome}
                  <button onClick={(e) => { e.stopPropagation(); handleEdit(categoria.id);}} className="alterar"><MdEdit color="#F2E9CE" /></button>    
                  <button onClick={() => handleDelete(categoria?.id)} className="excluir"><MdDeleteForever color="#F2E9CE" /></button>
                </li>
              ))}
            </ul>
            </form>
            <div className="button-container">
            <button onClick={submit} className="btn-secondary">{isEditing ? "Atualizar" : "Cadastrar"}</button>
            <button onClick={closeModal} className="btn-secondary">Fechar</button>
            </div>
        </div>
    </div>
    
    </>
)




}