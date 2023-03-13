import Input from './components/Input';
import Button from './components/Button';
import { Container, Content, Row } from "./styles";
import { useState } from 'react';



const App = () => {

  //Número principal sendo exibido/digitado
  const [currentNumber, setCurrentNumber] = useState('0');
  //Primeiro número armazenado para o cálculo
  const [firstNumber, setFirstNumber] = useState('null');
  //Um indicador de qual será o tipo de operação a ser realizada
  const [currentOperation, setCurrentOperation] = useState('null');
  //Exibição completa da operação que foi realizada. Ex: 1 + 1 = 2
  const [valueCurrentOperation, setValueCurrentOperation] = useState('');
  //O último botão clicado foi um botão de setar operação?
  const [recentClickOperation, setRecentClickOperation] = useState(false);
  //O último botão clicado foi um botão de realizar operação? (=)
  const [recentClickEquals, setRecentClickEquals] = useState(false);
  //O último botão clicado foi um botão de número?
  const [recentClickNumber, setRecentClickNumber] = useState(false);
  
  
  //Função que realiza a limpeza completa de dados armazenados. Botão "C"
  const handleOnClear = () => {
    //Atualiza os estados de clique
    updateClickState(false, false, false);

    //Faz a limpeza das variáveis.
    setCurrentNumber('0');
    setCurrentOperation('null');
    setFirstNumber('null');
    setValueCurrentOperation('');
  };
  
  //Função que realiza a limpeza apenas do número que está sendo digitado. Botão "CE"
  const handleOnClearEntry = () => {
    //Atualiza os estados de clique
    updateClickState(false, false, false);

    //Faz a limpeza do número sendo digitado.
    setCurrentNumber('0');
  };

  //Função que realiza alterna o número atual entre negativo ou positivo. Botão "±"
  const handleToggleSign = () => {
    //Atualiza os estados de clique
    updateClickState(false, false, false);

    if(currentNumber !== '0'){
      let flippedNumber = stringToFloat(currentNumber);
      flippedNumber *= -1;
      setCurrentNumber(floatToString(flippedNumber));
    }
  }

  //Função que adiciona vírgula no número que está sendo digitado. Botão ","
  const handleComma = () => {
    //Atualiza os estados de clique
    updateClickState(false, false, false);

    //Verifica se o número digitado já inclui vírgula para evitar inserção de múltiplas vírgulas
    if(!String(currentNumber).includes(',')){
      /*
      Se o botão clicado anteriormente foi o de realizar operação (=), o valor que está sendo exibido na tela é o resultado da operação.
      Esse valor precisa ser resetado para 0 e adicionado a vírgula iniciando a digitação de um novo número para efetuar uma nova operação
      ao invés de editar o valor resultante da operação anterior.
      */
      if(recentClickEquals){
        setCurrentNumber('0,');
        setValueCurrentOperation('');
      }
      //Fora das condições anteriores, tá livre pra adicionar a vírgula :)
      else{
        setCurrentNumber(currentNumber + ',');
      }

    }
  }

  //Função que digita números. Botões "0-9"
  const handleAddNumber = (number) => {
    /*
      Se o botão clicado anteriormente foi o de realizar operação (=), o valor que está sendo exibido na tela é o resultado da operação.
      Esse valor precisa ser resetado iniciando a digitação de um novo número para efetuar uma nova operação
      ao invés de editar o valor resultante da operação anterior.
    */
    if (recentClickEquals) {
      setCurrentNumber('');
      //Aqui também é feita a limpeza do campo de exibição da operação completa que havia sido realizada anteriormente.
      setValueCurrentOperation('');
    }
    
    /*
      Se o botão clicado anteriormente foi o de setar uma operação, precisa ser feito um reset do campo
      para iniciar a digitação de um novo número.
    */
    if(currentOperation !== 'null' && recentClickOperation){
      setCurrentNumber('');
    }

    //Atualiza os estados de clique
    updateClickState(false, false, true);

    //Seta o número do botão digitado concatenando ao valor prévio
    setCurrentNumber(prev => `${prev == '0' ? '' : prev}${number}`);
  };

  //Função que define qual será a operação a ser realizada. Botões "+, −, ×, ÷, =, ⅟x, x², √, ÷, %"
  const handleSetOperation = (operation) => {
    //Atualiza os estados de clique
    updateClickState(false, true, false);

    //Seta o primeiro número da operação
    setFirstNumber(currentNumber);
    
    //Pra cada operação selecionada, temos ações um pouco diferentes
    switch (operation) {
      case '+':
        //Define o tipo de operação
        setCurrentOperation('+');
        //Exibe para o usuário a operação completa que está sendo feita
        setValueCurrentOperation(currentNumberPreventLastComma(currentNumber) + ' +' );
        break;
      case '-':
        //Define o tipo de operação
        setCurrentOperation('-');
        //Exibe para o usuário a operação completa que está sendo feita
        setValueCurrentOperation(currentNumberPreventLastComma(currentNumber) + ' −' );
        break;
      case 'x':
        //Define o tipo de operação
        setCurrentOperation('x');
        //Exibe para o usuário a operação completa que está sendo feita
        setValueCurrentOperation(currentNumberPreventLastComma(currentNumber) + ' ×' );
        break;
      case '/':
        //Define o tipo de operação
        setCurrentOperation('/');
        //Exibe para o usuário a operação completa que está sendo feita
        setValueCurrentOperation(currentNumberPreventLastComma(currentNumber) + ' ÷' );
        break;
      case '=':
        //Define o tipo de operação
        setCurrentOperation('=');
        //Exibe para o usuário a operação completa que está sendo feita
        setValueCurrentOperation(currentNumberPreventLastComma(currentNumber) + ' =' );
        break;
      case 'sqrt':
        //Aqui o cálculo da raiz quadrada é realizada diretamente no botão, sem precisar pressionar o botão "=" posteriormente
        let sqrt = Math.sqrt(stringToFloat(currentNumber));
        //Exibe para o usuário a operação realizada
        setValueCurrentOperation('√' + currentNumber + ' =');
        //Atualiza o campo de número atual com o resultado
        setCurrentNumber(currentNumberPreventLastComma(sqrt));
        break;
      case 'sqr':
        //Aqui o cálculo da raiz potência é realizada diretamente no botão, sem precisar pressionar o botão "=" posteriormente
        let sqr = stringToFloat(currentNumber) * stringToFloat(currentNumber);
        //Exibe para o usuário a operação realizada
        setValueCurrentOperation(currentNumber + '² =');
        //Atualiza o campo de número atual com o resultado
        setCurrentNumber(currentNumberPreventLastComma(sqr));
        break;
      case 'divX':
        //Aqui o cálculo de 1 dividido por X é realizada diretamente no botão, sem precisar pressionar o botão "=" posteriormente
        let divX = 1 / stringToFloat(currentNumber);
        //Exibe para o usuário a operação realizada
        setValueCurrentOperation('1/(' + currentNumber + ') =');
        //Atualiza o campo de número atual com o resultado
        setCurrentNumber(currentNumberPreventLastComma(divX));
        break;
      case '%':
        //Aqui o cálculo de porcentagem é realizada diretamente no botão, sem precisar pressionar o botão "=" posteriormente
        let valor1 = stringToFloat(firstNumber);
        let valor2 = stringToFloat(currentNumber);
        let porcentagem = (valor2 / 100) * valor1;
        //Exibe para o usuário a operação realizada
        setValueCurrentOperation(firstNumber + ' ' + currentOperation + ' ' + porcentagem);
        //Atualiza o campo de número atual com o resultado
        setCurrentNumber(currentNumberPreventLastComma(porcentagem));
        break;
      default:
        break;
    }
  }

  //Função que realiza a operação com os parâmetros definidos. Botão "="
  const handleEquals = () => {
    //Atualiza os estados de clique
    updateClickState(true, false, false);
    
    //Realiza a operação completa definida pelo usuário
    switch (currentOperation) {
      case '+':
        //Soma o primeiro número com o segundo
        let sum = stringToFloat(firstNumber) + stringToFloat(currentNumber);
        //Exibe para o usuário a operação completa que foi realizada
        setValueCurrentOperation(firstNumber + ' + ' + currentNumberPreventLastComma(currentNumber) + ' =');
        //Atualiza o campo de número atual com o resultado
        setCurrentNumber(currentNumberPreventLastComma(sum));
        break;
      case '-':
        //Subtrai o primeiro número com o segundo
        let subtraction = stringToFloat(firstNumber) - stringToFloat(currentNumber);
        //Atualiza o campo de número atual com o resultado
        setValueCurrentOperation(firstNumber + ' − ' + currentNumberPreventLastComma(currentNumber) + ' =');
        //Atualiza o campo de número atual com o resultado
        setCurrentNumber(currentNumberPreventLastComma(subtraction));
        break;
      case 'x':
        //Multiplica o primeiro número pelo segundo
        let multiplication = stringToFloat(firstNumber) * stringToFloat(currentNumber);
        //Atualiza o campo de número atual com o resultado
        setValueCurrentOperation(firstNumber + ' × ' + currentNumberPreventLastComma(currentNumber) + ' =');
        //Atualiza o campo de número atual com o resultado
        setCurrentNumber(currentNumberPreventLastComma(multiplication));
        break;
      case '/':
        //Divide o primeiro pelo segundo
        let division = stringToFloat(firstNumber) / stringToFloat(currentNumber);
        //Exibe para o usuário a operação completa que foi realizada
        setValueCurrentOperation(firstNumber + ' ÷ ' + currentNumberPreventLastComma(currentNumber) + ' =');
        //Atualiza o campo de número atual com o resultado
        setCurrentNumber(currentNumberPreventLastComma(division));
        break;
      default:
        /*
        Por padrão, se não for definida uma operação previamente, nenhuma operação será realizada,
        apenas exibe o número atual e o símbolo de "=" ao lado representando no campo de exibição
        a sequencia que foi digitada pelo usuário. Ex: "3 ="
        */
        setValueCurrentOperation(currentNumberPreventLastComma(currentNumber) + ' =');
        break;
    }

  }

  //Função de backspace que apaga o número digitado um caractere de cada vez. Botão "⌫" 
  const handleBackspace = () => {
    //Atualiza os estados de clique
    updateClickState(false, false, false);
    //Verifica se o texto tem mais de 1 caractere
    if(currentNumber.length > 1){
      //Remove o último caractere do texto
      let sliceNumber = currentNumber.slice(0, -1);
      //Atualiza o campo de número atual com um caractere a menos
      setCurrentNumber(sliceNumber);
    }
    else {
      //Caso o número tenha menos de 1 caractere, apenas exibe o caractere "0", resetando a calculadora e evitando que fique sem caracteres.
      setCurrentNumber('0');
    }
  }

  /*
    Função que atualiza os estados de clique informando qual o tipo de botão que acabou de ser pressionado
    Essa função é importante pois existem comportamentos específicos da calculadora após o pressionamento de determinados botões
  */
  const updateClickState = (equals, operation, number) => {
    setRecentClickEquals(equals);
    setRecentClickOperation(operation);
    setRecentClickNumber(number);
  }

  //Função que converte string em float trocando "," por "." para fazer a leitura das casas decimais
  const stringToFloat = (string) => {
    return parseFloat(string.replace(",", "."));
  }

  //Função que converte float em string trocando "." por "," para exibir o texto com vírgula ao invés de ponto nas casas decimais
  const floatToString = (float) => {
    return String(float).replace(".", ",");
  }

  /*
    Função de tratamento executada na realização da operação, removendo a vírgula no final do número digitado
    caso não tenha números após a vírgula. Ex: "9," -> "9"
  */
  const currentNumberPreventLastComma = (number) => {
    //Converte o número em string
    let string = floatToString(number);

    //Verifica se o último caractere da string é uma vírgula
    if(string.slice(-1) === ','){
      //Remove a vírgula do final
      string = string.slice(0, -1);
      //Atualiza o numero com o tratamento
      setCurrentNumber(string);
      //Retorna a variável tratada pra ser usada em outros métodos 
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
          <Button label={'%'} className='operation' onClick={() => handleSetOperation('%')}/>
          <Button label={'CE'} className='operation' onClick={handleOnClearEntry}/>
          <Button label={'C'} className='operation' onClick={handleOnClear}/>
          <Button label={'⌫'} className='operation' onClick={handleBackspace}/>
        </Row>
        <Row>
          <Button label={'⅟x'} className='operation' onClick={() => handleSetOperation('divX')}/>
          <Button label={'x²'} className='operation' onClick={() => handleSetOperation('sqr')}/>
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
