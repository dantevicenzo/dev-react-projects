import Input from './components/Input';
import Button from './components/Button';
import { Container, Content, Row } from "./styles";
import { useState } from 'react';



const App = () => {

  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState('null');
  const [currentOperation, setCurrentOperation] = useState('null');
  const [valueCurrentOperation, setValueCurrentOperation] = useState('');
  const [recentClickOperation, setRecentClickOperation] = useState(false);
  const [recentClickEquals, setRecentClickEquals] = useState(false);
  const [recentClickNumber, setRecentClickNumber] = useState(false);
  
  

  const handleOnClear = () => {
    updateClickState(false, false, false);

    setCurrentNumber('0');
    setCurrentOperation('null');
    setFirstNumber('null');
    setValueCurrentOperation('');
  };
  
  const handleOnClearEntry = () => {
    updateClickState(false, false, false);

    setCurrentNumber('0');
  };

  const handleToggleSign = () => {
    updateClickState(false, false, false);

    if(currentNumber !== '0'){
      let flippedNumber = stringToFloat(currentNumber);
      flippedNumber *= -1;
      setCurrentNumber(floatToString(flippedNumber));
    }
  }

  const handleComma = () => {
    updateClickState(false, false, false);

    if(!String(currentNumber).includes(',')){
      if(recentClickEquals){
        setCurrentNumber('0,');
        setValueCurrentOperation('');
      }
      else{
        setCurrentNumber(currentNumber + ',');
      }
    }
  }

  const handleAddNumber = (number) => {
    if (recentClickEquals) {
      setCurrentNumber('');
      setValueCurrentOperation('');
    }
    
    updateClickState(false, false, true);
    
    if(currentOperation !== 'null' && recentClickOperation){
      setCurrentNumber('');
      setRecentClickOperation(false);
    }
    setCurrentNumber(prev => `${prev == '0' ? '' : prev}${number}`);
  };

  const handleSetOperation = (operation) => {
    updateClickState(false, true, false);

    setFirstNumber(currentNumber);
    
    switch (operation) {
      case '+':
        setCurrentOperation('+');
        setValueCurrentOperation(currentNumberPreventLastComma(currentNumber) + ' +' );
        break;
      case '-':
        setCurrentOperation('-');
        setValueCurrentOperation(currentNumberPreventLastComma(currentNumber) + ' −' );
        break;
      case 'x':
        setCurrentOperation('x');
        setValueCurrentOperation(currentNumberPreventLastComma(currentNumber) + ' ×' );
        break;
      case '/':
        setCurrentOperation('/');
        setValueCurrentOperation(currentNumberPreventLastComma(currentNumber) + ' ÷' );
        break;
      case '=':
        setCurrentOperation('=');
        setValueCurrentOperation(currentNumberPreventLastComma(currentNumber) + ' =' );
        break;
      case 'sqrt':
        let sqrt = Math.sqrt(stringToFloat(currentNumber));
        setValueCurrentOperation('√' + currentNumber + ' =');
        setCurrentNumber(currentNumberPreventLastComma(sqrt));
        break;
      default:
        break;
    }

    
  }

  const handleEquals = () => {
    updateClickState(true, false, false);
    
    switch (currentOperation) {
      case '+':
        let sum = stringToFloat(firstNumber) + stringToFloat(currentNumber);
        setCurrentNumber(currentNumberPreventLastComma(sum));
        setValueCurrentOperation(firstNumber + ' + ' + currentNumberPreventLastComma(currentNumber) + ' =');
        break;
      case '-':
        let subtraction = stringToFloat(firstNumber) - stringToFloat(currentNumber);
        setValueCurrentOperation(firstNumber + ' − ' + currentNumberPreventLastComma(currentNumber) + ' =');
        setCurrentNumber(currentNumberPreventLastComma(subtraction));
        break;
      case 'x':
        let multiplication = stringToFloat(firstNumber) * stringToFloat(currentNumber);
        setValueCurrentOperation(firstNumber + ' × ' + currentNumberPreventLastComma(currentNumber) + ' =');
        setCurrentNumber(currentNumberPreventLastComma(multiplication));
        break;
      case '/':
        let division = stringToFloat(firstNumber) / stringToFloat(currentNumber);
        setValueCurrentOperation(firstNumber + ' ÷ ' + currentNumberPreventLastComma(currentNumber) + ' =');
        setCurrentNumber(currentNumberPreventLastComma(division));
        break;
      case 'sqrt':
        let sqrt = Math.sqrt(stringToFloat(currentNumber));
        setValueCurrentOperation('√' + firstNumber);
        setCurrentNumber(currentNumberPreventLastComma(sqrt));
        break;
      default:
        setValueCurrentOperation(currentNumberPreventLastComma(currentNumber) + ' =');
        break;
    }

  }

  const handleBackspace = () => {
    updateClickState(false, false, false);
    if(currentNumber.length > 1){
      let sliceNumber = currentNumber.slice(0, -1);
      setCurrentNumber(sliceNumber);
    }
    else {
      setCurrentNumber('0');
    }
  }

  const updateClickState = (equals, operation, number) => {
    setRecentClickEquals(equals);
    setRecentClickOperation(operation);
    setRecentClickNumber(number);
  }

  const stringToFloat = (string) => {
    return parseFloat(string.replace(",", "."));
  }

  const floatToString = (float) => {
    return String(float).replace(".", ",");
  }

  const currentNumberPreventLastComma = (number) => {
    let string = floatToString(number);

    if(string.slice(-1) === ','){
      string = string.slice(0, -1);
      setCurrentNumber(string);
      return string;
    }
    else{
      return string;
    }
  }

  


  return (
    <Container>
      <Content>
        <Input value={currentNumber} valueCurrentOperation={valueCurrentOperation}/>
        <Row>
          <Button label={'%'} className='operation' onClick={() => handleAddNumber('⅟x')}/>
          <Button label={'CE'} className='operation' onClick={handleOnClearEntry}/>
          <Button label={'C'} className='operation' onClick={handleOnClear}/>
          <Button label={'⌫'} className='operation' onClick={handleBackspace}/>
        </Row>
        <Row>
          <Button label={'⅟x'} className='operation' onClick={() => handleSetOperation('⅟x')}/>
          <Button label={'x²'} className='operation' onClick={() => handleSetOperation('x²')}/>
          <Button label={'√'} className='operation' onClick={() => handleSetOperation('sqrt')}/>
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
          <Button label={'−'} className='operation' onClick={() => handleSetOperation('-')}/>
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
