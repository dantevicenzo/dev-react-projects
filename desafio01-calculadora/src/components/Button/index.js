import { ButtonContainer } from "./styles";

const Button = ({label, onClick, className}) => {
  
  let corFundo = '';
  let corTexto = '';

  if (className === 'number') {
    corFundo = '#3B3B3B';
    corTexto = '#FFFFFF';
  } else if (className === 'operation') {
    corFundo = '#323232';
    corTexto = '#FFFFFF';
  } else if (className === 'equals') {
    corFundo = '#4CC2FF';
    corTexto = '#202020';
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
  