const queryParameter = new URLSearchParams(window.location.search);
const arrowGetEventById = async () => {
  try {
    const response = await fetch("https://xp41-soundgarden-api.herokuapp.com/events/" + queryParameter.get("id"));

    const data = await response.json();

    return data;
  } catch {
    (error) => console.error(error);
  }
};

function placeInputByEvent(event) {
  const nameSelector = document.querySelector("#nome-input");
  nameSelector.value = event.name;

  const bannerSelector = document.querySelector("#banner-input");
  bannerSelector.value = event.poster;

  const attractionsSelector = document.querySelector("#atracoes-input");
  attractionsSelector.value = event.attractions.join(", ");

  const descriptionSelector = document.querySelector("#descricao-input");
  descriptionSelector.value = event.description;

  const dateSelector = document.querySelector("#data-input");
  dateSelector.value = event.scheduled.substring(0, 16);

  const capacityInput = document.querySelector("#lotacao-input");
  capacityInput.value = event.number_tickets;
}
function placeInputOnObject(event) {
  const nameSelector = document.querySelector("#nome-input");
  const bannerSelector = document.querySelector("#banner-input");
  const attractionsSelector = document.querySelector("#atracoes-input");
  const descriptionSelector = document.querySelector("#descricao-input");
  const dateSelector = document.querySelector("#data-input");
  const capacityInput = document.querySelector("#lotacao-input");

  return {
    name: nameSelector.value,
    attractions: (attractionsSelector.value || "").split(","),
    poster: bannerSelector.value,
    description: descriptionSelector.value,
    scheduled: dateSelector.value,
    number_tickets: capacityInput.value,
  };
}

async function main() {
  try {
    const event = await arrowGetEventById();

    placeInputByEvent(event);

    const formSelector = document.querySelector("#form");

    formSelector.addEventListener("submit", (event) => {
      event.preventDefault();

      const body = placeInputOnObject(event);
      const id = queryParameter.get("id");
      fetch("https://xp41-soundgarden-api.herokuapp.com/events/" + id, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((response) => {
          console.log(response);
          alert("Seu evento foi atualizado");
        })
        .catch((error) => {
          console.error(error);
        });
    });
  } catch {
    (error) => console.error(error);
  }
}
main();
