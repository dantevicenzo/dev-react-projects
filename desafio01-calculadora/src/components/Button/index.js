import { ButtonContainer } from "./styles";

const Button = ({label, onClick, className}) => {
  
  let corFundo = '';
  let corTexto = '';

  if (className === 'number') {
    corFundo = '#383B40';
    corTexto = '#FFFFFF';
  } else if (className === 'operation') {
    corFundo = '#2E2F33';
    corTexto = '#FFFFFF';
  } else if (className === 'equals') {
    corFundo = '#4CC2FF';
    corTexto = '#1E2024';
  }

  const estilo = {
    backgroundColor: corFundo,
    color: corTexto,
  };

    return (
      <ButtonContainer onClick={onClick} className={`${className}`} style={estilo}>
        {label}
      </ButtonContainer>
    );
  }
  
  export default Button;
  