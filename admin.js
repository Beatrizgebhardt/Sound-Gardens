console.log("batata");

async function buscarEventos() {
  const resposta = await fetch(
    `https://xp41-soundgarden-api.herokuapp.com/events`,
    {
      method: "GET",
    }
  );
  //extraindo o json da resposta
  const conteudoResposta = await resposta.json();
  console.log(conteudoResposta);
  return conteudoResposta;
}
// {
//     "_id": "6265ef4107abcf3543c8a4da",
//     "name": "Teste hora",
//     "poster": "https://picsum.photos/300",
//     "attractions": [
//         "teste"
//     ],
//     "description": "teste hora",
//     "scheduled": "2013-05-25T20:00:00.000Z",
//     "number_tickets": 1,
//     "created_at": "2022-04-25T00:45:53.995Z",
//     "updated_at": "2022-04-25T00:45:53.995Z",
//     "__v": 0
// },
async function ListarEventos() {
  let htmlEventos = "";
  let eventosAPI = await buscarEventos();

  eventosAPI.forEach((item, index) => {
    htmlEventos += `<tr>
    <th scope="row">${index + 1}</th>
    <td>${item.scheduled}</td>
    <td>${item.name}</td>
    <td>${item.attractions}</td>
    <td>
      <a href="reservas.html" class="btn btn-dark"
        >ver reservas</a
      >
      <a href="editar.html" class="btn btn-secondary">editar</a>
      <a href="editar.html" class="btn btn-danger">excluir</a>
    </td>
  </tr>`;
  });

  let tabelaEventos = document.querySelector("#tabela-eventos");

  tabelaEventos.innerHTML = htmlEventos;
}
ListarEventos();
buscarEventos();
