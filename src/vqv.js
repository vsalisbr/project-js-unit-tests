const auxFunctions = require('./auxiliaryFunctions');

/* eslint-disable no-unused-vars */

/*
  Use template literals para escrever uma função que,
  recebe seu nome e sua idade e retorna o parágrafo descrito abaixo:

  Parâmetros:
  - Uma string;
  - Um número.

  Comportamento:
  vqv(Tunico, 30) // Retorna:
  'Oi, meu nome é Tunico!
  Tenho 30 anos,
  trabalho na Trybe e mando muito em programação!
  #VQV!'

  Caso a função seja chamada sem nenhum parâmetro, o valor undefined deve ser retornado.
*/

const vqv = (name, age) => {
  if (!auxFunctions.stringEmpty(name) && auxFunctions.isNumber(age)) {
    let output = `Oi, meu nome é ${name}!\nTenho ${age} anos,\n`;
    output += 'trabalho na Trybe e mando muito em programação!\n#VQV!';
    return output;
  }
};

module.exports = vqv;
