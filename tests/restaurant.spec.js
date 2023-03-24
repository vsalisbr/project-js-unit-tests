const createMenu = require('../src/restaurant');

/*
  A função createMenu(), retornará um novo objeto. Este novo objeto contém algumas chaves e ao acessar cada uma delas temos os seguintes retornos:

  - Uma chave `fetchMenu` retornando o menu, que nada mais é que o objeto passado como parâmetro para createMenu()

    Exemplo:
    const meuRestaurante = createMenu({
      food: {'coxinha': 3.90, 'sanduiche', 9.90},
      drinks: {'agua': 3.90, 'cerveja': 6.90}
    });

    meuRestaurante.fetchMenu() // Retorno: Menu acima

  - Uma chave `consumption` armazenando um array de strings. Cada string é a chave de um pedido.
    Exemplo: ['coxinha', 'cerveja']

  - Uma chave `order` armazenando uma função. Essa função recebe uma string como parâmetro e essa string deve ser adicionada à lista armazenada em `consumption`.

  - Uma chave `pay` que, quando chamada, invoca uma função. Essa função faz a soma do preço de todos os pedidos, retornando essa soma de preços com acréscimo de 10%.

  Comportamento:
    const meuRestaurante = createMenu({ food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} })

    meuRestaurante.fetchMenu() // Retorno: { food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} }

    meuRestaurante.order('coxinha') // Retorno: undefined

    meuRestaurante.consumption // Retorno: ['coxinha']

    meuRestaurante.pay() // Retorno: 4.29

  IMPORTANTE: FAÇA OS TESTES E IMPLEMENTAÇÕES DE ACORDO COM A SEQUÊNCIA INDICADA NO README DO PROJETO!
*/

describe('10 - Implemente a função `createMenu`, bem como seus casos de teste', () => {
  it('Verifica se a função `createMenu` tem o comportamento esperado', () => {
    // 1: Verifique se função `createMenu()` retorna um objeto que possui a chave `fetchMenu`, a qual tem como valor uma função.
    const menu1 = createMenu();
    expect(typeof menu1).toBe('object');
    expect(menu1).toHaveProperty('fetchMenu');
    expect(typeof menu1.fetchMenu).toBe('function');

    // 2: Verifique se 'objetoRetornado.fetchMenu()' retorna um objeto cujas chaves são somente `food` e `drink`, 
    // considerando que a função createMenu() foi chamada com o objeto: `{ food: {}, drink: {} }`.
    const menu2 = createMenu({ food: {}, drink: {} });
    const expectKeys = ['food', 'drink'];
    expect(Object.keys(menu2.fetchMenu())).toEqual(expectKeys);

    // 3: Verifique se o menu passado pra função createMenu() é idêntico ao menu recuperado pela função 'objetoRetornado.fetchMenu()'.
    const menu3 = createMenu({ food: { 'coxinha': 3.9, 'sopa': 9.9 }, drink: { 'agua': 3.9, 'cerveja': 6.9 } });
    const expectObj = {
      food: { 'coxinha': 3.9, 'sopa': 9.9 },
      drink: { 'agua': 3.9, 'cerveja': 6.9 }
    };
    expect(menu3.fetchMenu()).toEqual(expectObj);

    // 4: Faça a implementação do item 4 do README no arquivo src/restaurant.js.

    // 5: Verifique se 'objetoRetornado.consumption', após a criação do menu, retorna um array vazio.
    const menu4 = createMenu({ food: { 'coxinha': 3.9, 'sopa': 9.9 }, drink: { 'agua': 3.9, 'cerveja': 6.9 } });
    expect(menu1).toHaveProperty('consumption');
    expect(Array.isArray(menu4.consumption)).toBeTruthy();
    expect(menu4.consumption).toHaveLength(0);

    // 6: Faça a implementação do item 6 do README no arquivo src/restaurant.js.

    // 7: Verifique se, ao chamar uma função associada à chave `order` no objeto retornado, passando uma string como parâmetro
    // - se a string existir nas chaves 'food' ou 'drink', deve ser adicionada ao array consumption
    // - senão, deve exibir a mensagem "Item indisponível" e não adicionar nada ao array
    // Ex: obj.order('coxinha') --> ['coxinha']
    // Ex: obj.order('picanha') --> Exibe "Item indisponível"
    const menu5 = createMenu({ food: { 'coxinha': 3.9, 'sopa': 9.9 }, drink: { 'agua': 3.9, 'cerveja': 6.9 } });
    const expectFood = 'coxinha';
    const expectDrink = 'cerveja';
    expect(Object.keys(menu5.fetchMenu().food)).toContain(expectFood);
    expect(Object.keys(menu5.fetchMenu().drink)).toContain(expectDrink);
    expect(menu5).toHaveProperty('order');
    expect(typeof menu5.order).toBe('function');

    menu5.order(expectFood);
    expect(menu5.consumption).toHaveLength(1);
    expect(menu5.consumption).toContain(expectFood);
    menu5.order(expectDrink);
    expect(menu5.consumption).toHaveLength(2);
    expect(menu5.consumption).toContain(expectDrink);

    expect(() => { menu5.order('teste') }).toThrow('Item indisponível');
    expect(menu5.consumption).toHaveLength(2);
    // 8: Faça a implementação do item 8 do README no arquivo src/restaurant.js.

    // 9: Verifique se, ao adicionar três pedidos em sequência, dentre bebidas e comidas, o array `objetoRetornado.consumption` contém os itens pedidos.
    const menu6 = createMenu({ food: { 'coxinha': 3.9, 'sopa': 9.9 }, drink: { 'agua': 3.9, 'cerveja': 6.9 } });
    menu6.order('coxinha');
    menu6.order('sopa');
    menu6.order('cerveja');
    const expectConsumption1 = ['coxinha', 'sopa', 'cerveja'];
    expect(menu6.consumption).toEqual(expectConsumption1);

    // 10: Verifique se a função `order` aceita que pedidos repetidos sejam acrescidos a `consumption`.
    const menu7 = createMenu({ food: { 'coxinha': 3.9, 'sopa': 9.9 }, drink: { 'agua': 3.9, 'cerveja': 6.9 } });
    menu7.order('coxinha');
    menu7.order('coxinha');
    menu7.order('coxinha');
    const expectConsumption2 = ['coxinha', 'coxinha', 'coxinha'];
    expect(menu7.consumption).toEqual(expectConsumption2);

    // 11: Verifique se, ao chamar `objetoRetornado.pay()`, retorna-se a soma dos preços de tudo que foi pedido, acrescido de 10%, conforme registrado em `objetoRetornado.consumption`.
    const menu8 = createMenu({ food: { 'coxinha': 3.9, 'sopa': 9.9 }, drink: { 'agua': 3.9, 'cerveja': 6.9 } });
    menu8.order('coxinha');
    menu8.order('sopa');
    menu8.order('cerveja');
    menu8.order('agua');
    menu8.order('agua');
    const expectPrice = 28.50;

    expect(menu8).toHaveProperty('pay');
    expect(typeof menu8.pay).toBe('function');
    expect(menu8.pay()).toBeCloseTo(expectPrice);
    // 12: Faça a implementação do item 12 do README no arquivo src/restaurant.js.

  });
});
