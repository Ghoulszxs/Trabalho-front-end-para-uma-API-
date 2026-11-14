const grupos = { iniciais: [1, 4, 7, 25], floresta: [10, 13, 16, 17] };
const tipos = { grass: "Planta", poison: "Veneno", fire: "Fogo", water: "Água",
  electric: "Elétrico", bug: "Inseto", normal: "Normal", flying: "Voador" };
const cache = new Map();
const grupo = document.querySelector("#grupo");
const fichas = document.querySelector("#fichas");
const estado = document.querySelector("#estado");
const repetir = document.querySelector("#repetir");
const decimal = new Intl.NumberFormat("pt-BR");

async function buscarPokemon(id) {
  if (cache.has(id)) return cache.get(id);
  const resposta = await fetch("https://pokeapi.co/api/v2/pokemon/" + id + "/");
  if (!resposta.ok) throw new Error("Resposta HTTP " + resposta.status);
  const pokemon = await resposta.json();
  cache.set(id, pokemon);
  return pokemon;
}

function elemento(tag, classe, texto) {
  const no = document.createElement(tag);
  if (classe) no.className = classe;
  if (texto) no.textContent = texto;
  return no;
}

function criarFicha(pokemon) {
  const nome = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const codigo = "#" + String(pokemon.id).padStart(3, "0");
  const card = elemento("article");
  const foto = elemento("div", "foto " + pokemon.types[0].type.name);
  const imagem = elemento("img");
  imagem.alt = "Ilustração de " + nome;
  imagem.src = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;
  foto.append(elemento("span", "numero", codigo), imagem);

  const dados = elemento("div", "dados");
  const tiposDaFicha = pokemon.types.map(({ type }) => tipos[type.name] || type.name);
  const altura = decimal.format(pokemon.height / 10);
  const massa = decimal.format(pokemon.weight / 10);
  dados.append(elemento("h3", "", nome), elemento("p", "tipo", tiposDaFicha.join(" · ")),
    elemento("p", "medidas", "Altura " + altura + " m · Massa " + massa + " kg"));
  card.append(foto, dados);
  return card;
}

async function carregar() {
  grupo.disabled = true;
  repetir.hidden = true;
  fichas.replaceChildren();
  estado.textContent = "Consultando a PokéAPI…";
  const resultados = await Promise.allSettled(grupos[grupo.value].map(buscarPokemon));
  for (const resultado of resultados) {
    if (resultado.status === "fulfilled") fichas.appendChild(criarFicha(resultado.value));
  }
  const total = fichas.childElementCount;
  repetir.hidden = total === resultados.length;
  estado.textContent = total + " de " + resultados.length + " fichas carregadas." +
    (repetir.hidden ? "" : " Verifique a conexão e tente novamente.");
  grupo.disabled = false;
}

grupo.addEventListener("change", carregar);
repetir.addEventListener("click", carregar);
carregar();
