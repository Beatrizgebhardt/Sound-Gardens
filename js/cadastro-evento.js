const formSelector = document.querySelector('#form');
console.log(formSelector);

formSelector.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const formObject = new FormData(formSelector);

    const atracoesArray = formObject.get('atracoes').split(', ');

    const body = {
        "name": formObject.get('nome'),
        "poster": "N/D",
        "attractions": atracoesArray,
        "description": formObject.get('descricao'),
        "scheduled": formObject.get('data'),
        "number_tickets": formObject.get('lotacao')
    }

    console.log(body);

    fetch("https://xp41-soundgarden-api.herokuapp.com/events", {
        "method": "POST",
        "headers": {"content-type": "application/json"},
        "body": JSON.stringify(body)
    }).then((response) => console.log(response)).catch((error) => console.error(error));

})
