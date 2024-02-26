async function conectaAPI() {
    const conecta = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
    const conectaTraduzido = await conecta.json();
    postMessage(conectaTraduzido.USDBRL);//enviando o resultado da conexão para o script (thread principal)
}

addEventListener("message", () => {//Quando recebe a mensagem do workerdolar ele chama as funções
    conectaAPI();
    setInterval(() => conectaAPI(), 5000);
})

