import "./card.css"

export interface CardProps {
    nome: string,
    imagem: string,
    valor: number,
    descricao: string,
    status: boolean    
    onClick: () => void;


}


import "./card.css";

export interface CardProps {
  nome: string;
  imagem: string;
  valor: number;
  descricao: string;
  status: boolean;
  onClick: () => void;
}

export function Card({ nome, imagem, valor, descricao, status, onClick }: CardProps) {
    return (
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
          <footer>
            <p>{status}</p>
          </footer>
        </div>
      </>
    );
  }