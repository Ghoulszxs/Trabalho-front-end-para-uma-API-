# Atlas Kanto

Guia de campo interativo inspirado nas aventuras de Ash em Kanto. Este projeto acadêmico usa HTML, CSS e JavaScript puro para consultar a PokéAPI e transformar os dados de oito espécies em fichas com ilustração, número da Pokédex, nome, tipos, altura e massa.

## Como executar

1. Na página do repositório, clique em **Code → Download ZIP** e extraia a pasta.
2. Com acesso à internet, abra `index.html` no navegador. A página carrega os dados e as imagens sem exigir instalação de dependências ou chave de API.
3. Em **Seleção**, alterne entre **Primeiros parceiros** (Bulbasaur, Charmander, Squirtle e Pikachu) e **Na floresta** (Caterpie, Weedle, Pidgey e Pidgeotto).

## Como os dados viram fichas

O [HTML](./index.html) reserva uma área vazia com o identificador `fichas`. Ao abrir a página ou trocar de seleção, a função `carregar()` do [JavaScript](./atlas.js) solicita os quatro registros do grupo. Para cada espécie, `buscarPokemon()` usa `fetch()`, verifica o status HTTP e lê a resposta com `resposta.json()`.

A função `criarFicha()` monta um elemento `article` com `document.createElement()` e reúne a ilustração e os dados com `append()`. Em seguida, `fichas.appendChild()` insere o card na página. A [folha de estilos](./estilo.css) distribui os cards em uma grade que ajusta o número de colunas à largura da tela.

Os registros recebidos ficam em memória até a página ser recarregada. Se uma consulta falhar, as fichas disponíveis aparecem e o botão **Tentar novamente** permite buscar as que faltam.

## Como conferir no navegador

1. Abra as ferramentas de desenvolvedor com **F12**, selecione **Rede** (*Network*), filtre por **Fetch/XHR** e recarregue a página.
2. Abra a requisição que termina em `/pokemon/25/` e consulte a aba **Resposta**. No JSON de Pikachu, `height` vale `4` (decímetros) e `weight` vale `60` (hectogramas). Confira na ficha os valores convertidos para **0,4 m** e **6 kg**.
3. Na aba **Console**, execute o comando abaixo. Ele lista os nomes presentes nos cards. Troque para **Na floresta**, aguarde o carregamento e execute o comando novamente para conferir os quatro novos nomes.

```js
Array.from(document.querySelectorAll("#fichas article h3"), titulo => titulo.textContent)
```

## Referências

- [PokéAPI · Documentação da API v2](https://pokeapi.co/docs/v2)
- [MDN · Usando Fetch](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch)
- [DevMedia · JavaScript Fetch API](https://www.devmedia.com.br/javascript-fetch/41206)
- [MDN · document.createElement()](https://developer.mozilla.org/pt-BR/docs/Web/API/Document/createElement)
- [MDN · Node.appendChild()](https://developer.mozilla.org/pt-BR/docs/Web/API/Node/appendChild)
- [MDN · Element.append()](https://developer.mozilla.org/en-US/docs/Web/API/Element/append)
