import { useEffect, useState } from "react";
import { ServicoData } from "../../interface/servicoData";
import { ModalProps, Input } from "../modal/modal";
import { useServicoDataPut } from "../../hooks/Servico/put";
import { useServicoDataDelete } from "../../hooks/Servico/delete";
import Switch from 'react-switch';

import './editModal.css'

interface EditModalProps extends ModalProps {
    servicoData : ServicoData

}
export function EditModal({closeModal, servicoData} : EditModalProps){
    const [nome, setNome] = useState(servicoData.nome);
    const [imagem, setImagem] = useState(servicoData.imagem);
    const [valor, setValor] = useState(servicoData.valor);
    const [descricao, setDescricao] = useState(servicoData.descricao);
    const [status, setStatus] = useState(servicoData.status);
    const { mutate, isSuccess } = useServicoDataPut();
    const { mutate: deleteMutate, isSuccess: deleteIsSuccess } = useServicoDataDelete();
  
    
    const submit = () =>{
        const updateServicoData: ServicoData = {
            id: servicoData.id,
            nome,
            imagem,
            valor,
            descricao,
            status
            
        };

        mutate(updateServicoData); // meu hook de Put
    }

    const handleDelete = () => {
        if (servicoData.id !== undefined){
            deleteMutate(servicoData.id); // meu hook de Delete
        }
    };


  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess, closeModal]);

  const toggleStatus = () => {
    setStatus((prevStatus) => !prevStatus);
  };

    
    
    
    return(
        <>
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-body" onClick={(e) => e.stopPropagation()}>
                <h2>Editar item no Cardápio</h2>
                <form className="input-container">
                    <Input label="Nome" value={nome} updateValue={setNome} />
                    <Input label="Imagem" value={imagem} updateValue={setImagem} />
                    <Input label="Valor" value={valor} updateValue={setValor} />
                    <Input label="Descricão" value={descricao} updateValue={setDescricao}/>
                </form>
                <div className="button-container">
                    <button onClick={submit} className="btn-secondary">Atualizar</button>
                    <button onClick={handleDelete} className="btn-secondary">Excluir</button>
                    <button onClick={closeModal} className="btn-secondary">Fechar</button>
                    <p> Status: Inativo/Ativo
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

        </div>
        </>
    )
}