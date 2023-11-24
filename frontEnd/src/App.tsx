import './App.css'
import { useServicoData } from './hooks/useServicoData'
import { Card } from './components/card/card';
import { CreateModal } from './components/modal/modal';
import { useState } from 'react';
import { EditModal } from './components/editModal/editModal';
import { ServicoData } from './interface/servicoData';

// Cores > https://color.adobe.com/pt/color%20theme_pngtree-snack-food-popcorn-illustration-png-image_4507589-color-theme-15673320

function App() {
  const { data } = useServicoData();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedServicoData, setSelectedServicoData] = useState<ServicoData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

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
        <h2>Seu Cardápio</h2>
        <div className="card-grid">
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
        {isCreateModalOpen && (
          <CreateModal closeModal={handleCloseCreateModal} />
        )}
        <button onClick={handleOpenCreateModal}>Novo</button>
      </div>
    </>
  );
}

export default App;
