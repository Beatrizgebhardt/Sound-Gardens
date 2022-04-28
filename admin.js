async function buscarEventos() {
  try {
    const resposta = await fetch(`https://xp41-soundgarden-api.herokuapp.com/events`, {
      method: "GET",
    });
    const conteudoResposta = await resposta.json();
    return conteudoResposta;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function ListarEventos() {
  let htmlEventos = "";
  let eventosAPI = await buscarEventos();

  eventosAPI.forEach((item, index) => {
    const dataConvertida = new Date(item.scheduled).toLocaleString();
    htmlEventos += `<tr>
    <th scope="row">${index + 1}</th>
    <td>${dataConvertida}</td>
    <td>${item.name}</td>
    <td>${item.attractions}</td>
    <td>
      <a href="reservas.html" class="btn btn-dark"
        >ver reservas</a
      >
      <a href="editar-evento.html?id=${item._id}" class="btn btn-secondary">editar</a>
      <a href="excluir-evento.html?id=${item._id}" class="btn btn-danger">excluir</a>
    </td>
  </tr>`;
  });

  let tabelaEventos = document.querySelector("#tabela-eventos");

  tabelaEventos.innerHTML = htmlEventos;
}
ListarEventos();
