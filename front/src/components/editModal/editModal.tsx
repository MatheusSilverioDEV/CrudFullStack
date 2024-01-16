    import { useEffect, useState } from "react";
    import { ModalProps, Input } from "../modal/modal";
    import { useServicoDataPut} from "../../hooks/Servico/put";
    import { useServicoDataDelete } from "../../hooks/Servico/delete";
    import { CategoriaData, ServicoData } from "../../interface/interfaces";
    import Switch from 'react-switch';
    import { useCategoriaDataList } from "../../hooks/Categoria/get";
    import Select, { MultiValue, ActionMeta } from 'react-select';

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
        const [isCategoriasEnabled, setIsCategoriasEnabled] = useState(servicoData.categorias ? true : false);
        const { data, isLoading, isError } = useCategoriaDataList();
        const [options, setOptions] = useState<Array<{value: number; label: string }>>([]);
        const [selectedCategorias, setSelectedCategorias] = useState<Array<{ value: number; label: string; }>>([]);

        
        useEffect(() => {
          if (isLoading || isError) return;
          console.log("Categorias carregadas:", data);
          const mappedOptions = mapCategoriasToOptions(data);
          console.log("Categorias mapeadas:", mappedOptions);
          setOptions(mappedOptions);
        }, [isLoading, isError, data]);


        useEffect(() => {   //Faz a comparação da lista de id em serviços, com o banco de dados de categoria e devolve o objeto completo
          const categoriasCadastradas = servicoData.categorias;
          const categoriasDoBanco = data;
        
          if (categoriasDoBanco && !isError) {
            const categoriasFiltradas: Array<CategoriaData | undefined> = categoriasCadastradas?.map((categoriaId) => {
              return categoriasDoBanco?.find((c) => c.id === categoriaId);
            });                                                                                       
        
            const selecionadas: Array<CategoriaData> = categoriasFiltradas.filter((categoria) => categoria !== undefined);
            console.log("selecionadas", selecionadas)

            setSelectedCategorias(mapCategoriasToOptions(selecionadas)) // mapeia os dados completo de nome,id para label,value

          }
        
          console.log("categoriasCadastradas", categoriasCadastradas);
          console.log("categoriasDoBanco", categoriasDoBanco);
          console.log("selected", selectedCategorias);
        }, [servicoData, data, isError]);


      
        const mapCategoriasToOptions = (categoriasData?: CategoriaData[] | null) => {
          if(!categoriasData || !categoriasData.length){
            console.log("Categorias inválidas ou ausentes");
            return [];
          }
          
          console.log("Categorias válidas");
          return categoriasData.filter(categoria => categoria.id !== undefined).map((categoria) => ({
            key: categoria.id,
            label: categoria.nome,
            value: categoria.id
          }));
        }



        
        

        const submit = () => {

          const selectedCategoriasIds = selectedCategorias.map((categoria) => categoria.value); // extrai somente os ids das categorias selecionadas


          const updateServicoData: ServicoData = {
            id: servicoData.id,
            nome,
            imagem,
            valor,
            descricao,
            status,
            categorias: isCategoriasEnabled ? selectedCategoriasIds : [],
          };
        
            

          mutate(updateServicoData);
        };
        
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

      
      const handleCategoriaChange = (
        categoria: MultiValue<{ value: number; label: string; }> | null,
        actionMeta: ActionMeta<{ value: number; label: string; }>
      ) => {
        if (categoria) {
          setSelectedCategorias(categoria.map((option) => option));
        } else {
          console.log("Dados de categorias não disponíveis.");
        }
      }
        
      const optionsComChaves = options.map((option) => ({
        value: option.value,
        label: option.label,
        key: option.value.toString(), 
      }));
        
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
                        <label>Categorias</label>
                        <label>Categorias</label>
                          <Select
                            isDisabled={!isCategoriasEnabled}
                            options={optionsComChaves} 
                            value={selectedCategorias}
                            onChange={handleCategoriaChange}
                            isMulti
                            placeholder="Selecione uma categoria"
                          />
                          <label>
                          <input
                              type="checkbox" checked={isCategoriasEnabled} onChange={() => setIsCategoriasEnabled((prev) => !prev)} />
                          Habilitar categorias
                          </label>
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