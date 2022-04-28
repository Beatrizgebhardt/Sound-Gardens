const formSelector = document.querySelector("#form");
console.log(formSelector);

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

formSelector.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("id", id);
  fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${id}`, {
    method: "DELETE",
  })
    .then((response) => history.back())
    .catch((error) => console.error(error));
});

async function buscarEvento() {
  try {
    const resposta = await fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${id}`, {
      method: "GET",
    });
    const conteudoResposta = await resposta.json();
    formSelector["nome"].value = conteudoResposta.name;
    formSelector["banner"].value = conteudoResposta.poster;
    formSelector["atracoes"].value = conteudoResposta.attractions.join(",");
    formSelector["descricao"].value = conteudoResposta.descricao || "";
    formSelector["data"].value = conteudoResposta.scheduled;
    formSelector["lotacao"].value = conteudoResposta.number_tickets;
  } catch (error) {
    console.log(error);
  }
}
buscarEvento();
