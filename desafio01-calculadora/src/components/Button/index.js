import { ButtonContainer } from "./styles";

const Button = ({label, onClick, className}) => {
  
  let corFundo = '';

  if (className === 'number') {
    corFundo = '#383B40';
  } else if (className === 'operation') {
    corFundo = '#2E2F33';
  } else if (className === 'equals') {
    corFundo = '#4CC2FF';
  }

  const estilo = {
    backgroundColor: corFundo,
  };

    return (
      <ButtonContainer onClick={onClick} className={`${className}`} style={estilo}>
        {label}
      </ButtonContainer>
    );
  }
  
  export default Button;
  