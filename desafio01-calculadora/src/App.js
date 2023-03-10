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
  
  

  const handleOnClear = () => {
    setRecentClickEquals(false);
    setCurrentNumber('0');
    setCurrentOperation('null');
    setFirstNumber('null');
    setValueCurrentOperation('');
  };
  
  const handleOnClearEntry = () => {
    setRecentClickEquals(false);
    setCurrentNumber('0');
  };

  const handleToggleSign = () => {
    setRecentClickEquals(false);
    if(currentNumber !== '0'){
      let flippedNumber = stringToFloat(currentNumber);
      flippedNumber *= -1;
      setCurrentNumber(floatToString(flippedNumber));
    }
  }

  const handleComma = () => {

    if(currentNumber != '0' && !String(currentNumber).includes(',')){
      if(recentClickEquals){
        setCurrentNumber('0,');
        setValueCurrentOperation('');
      }
      else{
        setCurrentNumber(currentNumber + ',');
      }
    }
    setRecentClickEquals(false);
  }

  const handleAddNumber = (number) => {
    if (recentClickEquals) {
      setCurrentNumber('');
      setValueCurrentOperation('');
    }

    setRecentClickEquals(false);
    
    if(currentOperation !== 'null' && recentClickOperation){
      setCurrentNumber('');
      setRecentClickOperation(false);
    }
    setCurrentNumber(prev => `${prev == '0' ? '' : prev}${number}`);
  };

  const handleSetOperation = (operation) => {
    setRecentClickOperation(true);
    setRecentClickEquals(false);
    setFirstNumber(currentNumber);
    

    switch (operation) {
      case '+':
        setCurrentOperation('+');
        setValueCurrentOperation(currentNumber + ' +' );
        break;
      case '-':
        setCurrentOperation('-');
        setValueCurrentOperation(currentNumber + ' −' );
        break;
      case 'x':
        setCurrentOperation('x');
        setValueCurrentOperation(currentNumber + ' ×' );
        break;
      case '/':
        setCurrentOperation('/');
        setValueCurrentOperation(currentNumber + ' ÷' );
        break;
      default:
        break;
    }
  }

  const handleEquals = () => {
    setRecentClickEquals(true);

    switch (currentOperation) {
      case '+':
        let sum = stringToFloat(firstNumber) + stringToFloat(currentNumber);
        setCurrentNumber(floatToString(sum));
        setValueCurrentOperation(firstNumber + ' + ' + currentNumber + ' =');
        break;
      case '-':
        let subtraction = stringToFloat(firstNumber) - stringToFloat(currentNumber);
        setValueCurrentOperation(firstNumber + ' − ' + currentNumber + ' =');
        setCurrentNumber(floatToString(subtraction));
        
        break;
      case 'x':
        let multiplication = stringToFloat(firstNumber) * stringToFloat(currentNumber);
        setValueCurrentOperation(firstNumber + ' × ' + currentNumber + ' =');
        setCurrentNumber(floatToString(multiplication));
        break;
      case '/':
        let division = stringToFloat(firstNumber) / stringToFloat(currentNumber);
        setValueCurrentOperation(firstNumber + ' ÷ ' + currentNumber + ' =');
        setCurrentNumber(floatToString(division));
        break;
      default:
        break;
    }
  }

  const stringToFloat = (string) => {
    return parseFloat(string.replace(",", "."));
  }

  const floatToString = (float) => {
    return String(float).replace(".", ",");
  }


  return (
    <Container>
      <Content>
        <Input value={currentNumber} valueCurrentOperation={valueCurrentOperation}/>
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
