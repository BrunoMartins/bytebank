const lista = document.querySelector("[data-lista]");

function imprimeCotacao(nome, valor) {
    lista.innerHTML = '';

    for (let multiplicador = 1; multiplicador <= 1000; multiplicador *= 10) {//definindo o intervalo para ficar 1/10/100/1000 (ou seja multiplicando por 10)
        const listaItem = document.createElement('li');
        listaItem.innerHTML = `${multiplicador} ${nome}: R$${(valor * multiplicador).toFixed(2)}`;
        lista.appendChild(listaItem);
    }
}

export default imprimeCotacao;