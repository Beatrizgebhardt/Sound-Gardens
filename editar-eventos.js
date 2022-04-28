const formSelector = document.querySelector("#form");
console.log(formSelector);

formSelector.addEventListener("submit", (event) => {
  event.preventDefault();

  const formObject = new FormData(formSelector);

  const attractionsArray = formObject.get("attractions-input").split(", ");

  const body = {
    name: formObject.get("name-input"),
    poster: "N/D",
    attractions: attractionsArray,
    description: formObject.get("description-input"),
    scheduled: formObject.get("date-input"),
    number_tickets: formObject.get("capacity-input"),
  };

  fetch("https://xp-soundgarden-api.herokuapp.com/events", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => console.log(response))
    .catch((error) => console.error(error));
});

async function buscarEvento() {
  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get("id");
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
