import imprimeCotacao from "./imprimeCotacao.js";

const graficoDolar = document.getElementById("graficoDolar");

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dólar',
        data: [],
        borderWidth: 1
      }]
    },
  });

  async function conectaAPI(){
    const conecta = await fetch ("https://economia.awesomeapi.com.br/json/last/USD-BRL");
    const conectaTraduzido = await conecta.json();
    let tempo = geraHorario();
    let valor = conectaTraduzido.USDBRL.ask;//acessando diretamente o valor do dólar dentro do objeto
    adicionarDados(graficoParaDolar, tempo, valor);//parametros para a função do grafico
    imprimeCotacao("dolar", valor);
  }

  setInterval(() => conectaAPI(), 5000);//Chamando a API para atualizar a cada 5 segundos

  function geraHorario() {
    let data = new Date();
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();//Pegando somente as informações de hora,minuto e segundos
    console.log(horario);
    return horario;
}

function adicionarDados(grafico, legenda, dados) {
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados);
    })
    grafico.update();
}