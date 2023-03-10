import { InputContainer } from './styles';

const Input = ({value, valueCurrentOperation}) => {
    return (
      <InputContainer>
        <input disabled value={valueCurrentOperation} className='valueCurrentOperation'/>
        <input disabled value={value}/>
      </InputContainer>
    );
  }
  
export default Input;