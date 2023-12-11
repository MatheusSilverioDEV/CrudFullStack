
import './App.css'
import { Card } from './components/card/card'
import { EditModal } from './components/editModal/editModal';
import { CreateModal } from './components/modal/modal';
import { CreateModalCategoria } from './components/modalCategoria.tsx/modalCategoria';
import { useServicoData } from './hooks/Servico/get'
import { ServicoData } from './interface/interfaces';
import { useState } from 'react';


function App() {
  const { data } = useServicoData();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateModalCategoriaOpen, setIsCreateModalCategoriaOpen] = useState(false);
  const [selectedServicoData, setSelectedServicoData] = useState<ServicoData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  
  const handleOpenCreateModalCategoria = () => {
    setIsCreateModalCategoriaOpen(true);
  }
  
  const handleCloseModalCategoria = () => {
    setIsCreateModalCategoriaOpen(false)
  }
  
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    };
  
  const handleOpenEditModal = (servicoData: ServicoData) => {
    setSelectedServicoData(servicoData);
    setIsEditModalOpen(true);
    };
  
  const handleCloseEditModal = () => {
    setSelectedServicoData(null);
    setIsEditModalOpen(false);
    };



  return (
    <>
    <div className='container'> 
      <h1>FoodAPI</h1>
      <h2>Seu cardápio</h2>
      <div className='card-grid'>
        {data?.map(servicoData => (
          <Card
            key={servicoData.id}
            nome={servicoData.nome}
            imagem={servicoData.imagem}
            valor={servicoData.valor}
            descricao={servicoData.descricao}
            status={servicoData.status}
            onClick={() => handleOpenEditModal(servicoData)}
          /> 
          ))}
      </div>
      {isEditModalOpen && selectedServicoData && (
          <EditModal
            closeModal={handleCloseEditModal}
            servicoData={selectedServicoData}
          />
        )}

  <div className='buttonContainer'>
    <div className='buttonServico'>
      {isCreateModalOpen && (
        <CreateModal closeModal={handleCloseCreateModal} />
      )}
      <button onClick={handleOpenCreateModal}>Novo</button>
    </div>

    <div className='buttonCategoria'>
      {isCreateModalCategoriaOpen && (
        <CreateModalCategoria closeModal={handleCloseModalCategoria} />
      )}
      <button onClick={handleOpenCreateModalCategoria}>Categoria</button>
    </div>
  </div>
        
    </div>
    </>
  )
}

export default App
