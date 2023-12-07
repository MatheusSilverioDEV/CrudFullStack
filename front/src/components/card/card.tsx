import './card.css'

export interface CardProps {

}

export interface CardProps {
    nome: string,
    imagem: string,
    valor: number,
    descricao: string,
    status: boolean    
    onClick: () => void;

}

export function Card({nome, imagem, valor, descricao, status, onClick}: CardProps){
  
  const statusStyle = {
    color: status? 'green' : 'red',
  };
  
  return( 
        <>
        <div className="card" onClick={onClick}>
          <div className="cardImage">
            <img src={imagem} alt={nome} />
          </div>
          <div className="cardContent">
            <h2>{nome}</h2>
            <div className="cardDetails">
              <p>
                <b>Valor:</b> R$ {valor}
              </p>
              <p className="descricao">{descricao}</p>
            </div>
          </div>
            <p><b>Status: </b> <span style={statusStyle}>{status ? 'Ativo' : 'Inativo'}</span></p>
        </div>
      </>
    )
}