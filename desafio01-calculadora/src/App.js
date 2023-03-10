import Input from './components/Input';
import Button from './components/Button';
import { Container, Content, Row } from "./styles";
import { useState } from 'react';



const App = () => {

  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState('null');
  const [currentOperation, setCurrentOperation] = useState('null');
  const [recentClickOperation, setRecentClickOperation] = useState(false);
  
  

  const handleOnClear = () => {
    setCurrentNumber('0');
    setCurrentOperation('null');
    setFirstNumber('null');
  };
  
  const handleOnClearEntry = () => {
    setCurrentNumber('0');
  };

  const handleToggleSign = () => {
    if(currentNumber !== '0'){
      let flippedNumber = Number(currentNumber);
      flippedNumber *= -1;
      setCurrentNumber(String(flippedNumber));
    }
  }

  const handleComma = () => {
    if(currentNumber != '0' && !currentNumber.includes(',')){
      setCurrentNumber(currentNumber + ',');
    }
  }

  const handleAddNumber = (number) => {
    if(currentOperation !== 'null' && recentClickOperation){
      setCurrentNumber('');
      setRecentClickOperation(false);
    }
    setCurrentNumber(prev => `${prev == '0' ? '' : prev}${number}`);
  };

  const handleSetOperation = (operation) => {

    setFirstNumber(currentNumber);
    setRecentClickOperation(true);

    switch (operation) {
      case '+':
        setCurrentOperation('+');
        break;
      case '-':
        setCurrentOperation('-');
        break;
      case 'x':
        setCurrentOperation('x');
        break;
      case '/':
        setCurrentOperation('=');
        break;
      default:
        break;
    }
  }

  const handleEquals = () => {
    switch (currentOperation) {
      case '+':
        let sum = Number(firstNumber) + Number(currentNumber);
        setCurrentNumber(sum);
        break;
      case '-':
        let subtraction = Number(firstNumber) - Number(currentNumber);
        setCurrentNumber(subtraction);
        break;
      case 'x':
        let multiplication = Number(firstNumber) * Number(currentNumber);
        setCurrentNumber(multiplication);
        break;
      case '/':
        let division = Number(firstNumber) / Number(currentNumber);
        setCurrentNumber(division);
        break;
      default:
        break;
    }
  }

  return (
    <Container>
      <Content>
        <Input value={currentNumber}/>
        <Row>
          <Button label={'%'} className='operation' onClick={() => handleAddNumber('⅟x')}/>
          <Button label={'CE'} className='operation' onClick={handleOnClearEntry}/>
          <Button label={'C'} className='operation' onClick={handleOnClear}/>
          <Button label={'⌫'} className='operation' onClick={() => handleAddNumber('%')}/>
        </Row>
        <Row>
          <Button label={'⅟x'} className='operation' onClick={() => handleAddNumber('⅟x')}/>
          <Button label={'x²'} className='operation' onClick={() => handleAddNumber('x²')}/>
          <Button label={'√'} className='operation' onClick={() => handleAddNumber('√')}/>
          <Button label={'÷'} className='operation' onClick={() => handleSetOperation('/')}/>
        </Row>
        <Row>
          <Button label={'7'} className='number' onClick={() => handleAddNumber('7')}/>
          <Button label={'8'} className='number' onClick={() => handleAddNumber('8')}/>
          <Button label={'9'} className='number' onClick={() => handleAddNumber('9')}/>
          <Button label={'×'} className='operation' onClick={() => handleSetOperation('x')}/>
        </Row>
        <Row>
          <Button label={'4'} className='number' onClick={() => handleAddNumber('4')}/>
          <Button label={'5'} className='number' onClick={() => handleAddNumber('5')}/>
          <Button label={'6'} className='number' onClick={() => handleAddNumber('6')}/>
          <Button label={'-'} className='operation' onClick={() => handleSetOperation('-')}/>
        </Row>
        <Row>
          <Button label={'1'} className='number' onClick={() => handleAddNumber('1')}/>
          <Button label={'2'} className='number' onClick={() => handleAddNumber('2')}/>
          <Button label={'3'} className='number' onClick={() => handleAddNumber('3')}/>
          <Button label={'+'} className='operation' onClick={() => handleSetOperation('+')}/>
        </Row>
        <Row>
          <Button label={'±'} className='number' onClick={handleToggleSign}/>
          <Button label={'0'} className='number' onClick={() => handleAddNumber('0')}/>
          <Button label={','} className='number' onClick={handleComma}/>
          <Button label={'='} className='equals' onClick={handleEquals}/>
        </Row>
        
      </Content>
    </Container>
  );
}

export default App;
