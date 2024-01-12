  import { useEffect, useState } from "react";
  import { ServicoData } from "../../interface/interfaces";
  import { useServicoDataPost } from "../../hooks/Servico/post";
  import './modal.css';
  import Switch from 'react-switch';
  import {  useCategoriaDataList } from "../../hooks/Categoria/get";
  import Select, { MultiValue, ActionMeta } from "react-select";
  import { CategoriaData } from "../../interface/interfaces";



  export interface Categoria {
    value: number;
    label: string;
  }

  export interface InputProps {
    label: string;
    value: string | number;
    updateValue(value: any): void;
  }

  export interface ModalProps {
    closeModal(): void;
  }

  export const Input = ({ label, value, updateValue }: InputProps) => {
    return (
      <>
        <label>{label}</label>
        <input value={value} onChange={e => updateValue(e.target.value)} />
      </>
    );
  };

  export function CreateModal({ closeModal }: ModalProps) {
    const [nome, setNome] = useState("");
    const [imagem, setImagem] = useState("");
    const [valor, setValor] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [status, setStatus] = useState(true);
    const [isCategoriasEnabled, setIsCategoriasEnabled] = useState(false);
    const [selectedCategorias, setSelectedCategorias] = useState<Array<{ value: number; label: string; }>>([]);
    const { data, isLoading, isError } = useCategoriaDataList();
    const { mutate, isSuccess } = useServicoDataPost();
    const [options, setOptions] = useState<Array<{ value: number; label: string }>>([]);
      
    const mapCategoriasToOptions = (categoriasData?: CategoriaData[] | null) => {
      if (!categoriasData || !categoriasData.length) {
        console.log("Categorias inválidas ou ausentes.");
        return [];
      }
    
      console.log("Categorias válidas.");
      return categoriasData.map((categoria) => ({
        label: categoria.nome,
        value: categoria.id,
      }));
    };

    
    useEffect(() => {
      if (isLoading || isError) return;
      console.log("Categorias carregadas:", data);
      const mappedOptions = mapCategoriasToOptions(data);
      console.log("Categorias mapeadas:", mappedOptions);
      setOptions(mappedOptions);
    }, [isLoading, isError, data]);
    

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsCategoriasEnabled(e.target.checked);
    };

    const toggleStatus = () => {
      setStatus((prevStatus) => !prevStatus);
    };

    const handleCategoriaChange = (
      categoria: MultiValue<{ value: number; label: string; }> | null,
      actionMeta: ActionMeta<{ value: number; label: string; }>
    ) => {
      console.log("Categoria change:", categoria);
      if (!categoria) {
        console.log("Dados de categorias não disponíveis.");
        return;
      }

      const updatedCategorias = categoria.map((value) => ({ value: value.value, label: value.label }));
      console.log("Updated Categorias:", updatedCategorias);
      setSelectedCategorias(updatedCategorias);
      setIsCategoriasEnabled(updatedCategorias.length > 0);
    };


    const submit = () => {
      const servicoData: ServicoData = {
        nome,
        imagem,
        valor,
        descricao,
        status,
        categorias: isCategoriasEnabled ? selectedCategorias.map((categoria) => categoria.value) : [],
      };
      mutate(servicoData);
    };

    useEffect(() => {
      if (!isSuccess) return;
      closeModal();
    }, [isSuccess]);

    if (isLoading || isError) {
      return <div>Loading...</div>; 
    }
    

    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-body" onClick={(e) => e.stopPropagation()}>
          <h2>Cadastre um novo item no cardápio</h2>
          <form className="input-container">
            <Input label="Nome" value={nome} updateValue={setNome} />
            <Input label="Imagem" value={imagem} updateValue={setImagem} />
            <Input label="Valor" value={valor} updateValue={setValor} />
            <Input label="Descricão" value={descricao} updateValue={setDescricao} />
            <label>Categorias</label>
            {isLoading ? (
              <p>Carregando...</p>
            ) : (
              <Select
                isDisabled={!isCategoriasEnabled}
                options={options}
                value={selectedCategorias}
                onChange={handleCategoriaChange}
                isMulti
                placeholder="Selecione uma categoria"
              />
            )}
              <div className="checkbox-container">
              <div className="checkbox-wrapper">
                <input type="checkbox" name="Habilitar categorias" checked={isCategoriasEnabled} onChange={handleCheckboxChange} />
              </div>
              <label htmlFor="Habilitar categorias">Habilitar categorias</label>
            </div>
          </form>
          <div className="button-container">
            <button  onClick={submit} className="btn-secondary">
              Postar
            </button>
            <button onClick={closeModal} className="btn-secondary">
              Fechar
            </button>
            <p>Status: Inativo/Ativo </p>
            <Switch
              className="toggle"
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
          </div>
        </div>
      </div>
    );
  }