import { useEffect, useState } from "react";
import { ServicoData } from "../../interface/servicoData";
import { useServiceDataEdit } from "../../hooks/useEditService";
import { ModalProps, Input } from "../modal/modal";
import { useServiceDataDelete } from "../../hooks/useDeleteServico";

interface EditModalProps extends ModalProps {
  servicoData: ServicoData;
}

export function EditModal({ closeModal, servicoData }: EditModalProps) {
  const [nome, setNome] = useState(servicoData.nome);
  const [imagem, setImagem] = useState(servicoData.imagem);
  const [valor, setValor] = useState(servicoData.valor);
  const [descricao, setDescricao] = useState(servicoData.descricao);
  const [status, setStatus] = useState(servicoData.status);
  const { mutate, isSuccess } = useServiceDataEdit();
  const { mutate: deleteMutate, isSuccess: deleteIsSuccess } = useServiceDataDelete();



  const submit = () => {
    const updatedServicoData: ServicoData = {
      id: servicoData.id,  
      nome,
      imagem,
      valor,
      descricao,
      status,
    };
  

    
    // Lógica para fazer a atualização (PUT) do serviço
    mutate(updatedServicoData);
  };

  const handleDelete = () => {
    if (servicoData.id !== undefined) {
      deleteMutate(servicoData.id);
    }
  };


  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess, closeModal]);

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <h2>Editar item do cardápio</h2>
        <form className="input-container">
          <Input label="Nome" value={nome} updateValue={setNome} />
          <Input label="Imagem" value={imagem} updateValue={setImagem} />
          <Input label="Valor" value={valor} updateValue={setValor} />
          <Input label="Descricão" value={descricao} updateValue={setDescricao} />
        </form>
        <div className="button-container">
          <button onClick={submit} className="btn-secondary">
            Atualizar
          </button>
          <button onClick={handleDelete} className="btn-secondary">
            Excluir
          </button>
          <button onClick={closeModal} className="btn-secondary">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}