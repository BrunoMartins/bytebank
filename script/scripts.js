import selecionaCotacao from "./imprimeCotacao.js";

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

  /* Método single thread

  async function conectaAPI(){
    const conecta = await fetch ("https://economia.awesomeapi.com.br/json/last/USD-BRL");
    const conectaTraduzido = await conecta.json();
    let tempo = geraHorario();
    let valor = conectaTraduzido.USDBRL.ask;//acessando diretamente o valor do dólar dentro do objeto
    adicionarDados(graficoParaDolar, tempo, valor);//parametros para a função do grafico
    imprimeCotacao("dolar", valor);
  }

  setInterval(() => conectaAPI(), 5000);//Chamando a API para atualizar a cada 5 segundos */

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

let workerDolar = new Worker('./script/workers/workerDolar.js');
workerDolar.postMessage('usd');//Enviando a mensagem para o arquivo worker.js

workerDolar.addEventListener("message", event => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  selecionaCotacao("dolar", valor);
  adicionarDados(graficoParaDolar, tempo, valor);
})

const graficoIene = document.getElementById("graficoIene");
const graficoParaIene = new Chart(graficoIene, {
  type: 'line',
  data: {
      labels: [],
      datasets: [{
          label: 'Iene',
          data: [],
          borderWidth: 1
      }]
  }
})

let workerIene = new Worker("./script/workers/workerIene.js");
workerIene.postMessage("iene");

workerIene.addEventListener("message", event => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  selecionaCotacao("iene", valor);
  adicionarDados(graficoParaIene, tempo, valor);
})