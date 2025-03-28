var TotalDeImagens = [10]
// Função para criar os corações flutuando
// Função para criar os corações descendo
// Função para criar os corações descendo do topo da página

function criarCoracoes(event) {
    const container = document.querySelector('.container');
    
    // Gerar múltiplos corações
    for (let i = 0; i < 30; i++) {
        const coracao = document.createElement('div');
        coracao.classList.add('coracao');
        
        // Definir a posição inicial dos corações no topo da página
        const posX = Math.random() * container.clientWidth; // Posição aleatória na largura da tela
        const posY = Math.random() * container.clientHeight; // Começam fora da tela no topo

        // Coloca o coração no topo da tela, com variação na posição X
        coracao.style.left = `${posX}px`;
        coracao.style.top = `${posY}px`;

        // Adiciona o coração ao container
        container.appendChild(coracao);

        // Remover o coração após a animação
        setTimeout(() => {
            coracao.remove();
        }, 3000); // Tempo para a animação completar
    }
}



// Adicionar o evento de clique aos quadrados
document.querySelectorAll('.quadrado').forEach((quadrado) => {
    quadrado.addEventListener('click', criarCoracoes);
});



function atualizarContador() {
    const dataInicio = new Date("2025-03-10T00:00:00");
    const agora = new Date();

    let anos = agora.getFullYear() - dataInicio.getFullYear();
    let meses = agora.getMonth() - dataInicio.getMonth();
    let dias = agora.getDate() - dataInicio.getDate();

    // Ajuste para anos e meses
    if (meses < 0) {
        anos--;
        meses += 12;
    }


    // Ajuste para dias negativos
    if (dias < 0) {
        meses--;
        const ultimoDiaMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
        dias += ultimoDiaMesAnterior;
    }


    if (meses < 0) {
        anos--;
        meses += 12;
    }


    // Calculando horas, minutos e segundos
    let horas = agora.getHours() - dataInicio.getHours();
    let minutos = agora.getMinutes() - dataInicio.getMinutes();
    let segundos = agora.getSeconds() - dataInicio.getSeconds();

    // Ajustes para valores negativos
    if (segundos < 0) {
        minutos--;
        segundos += 60;
    }
    if (minutos < 0) {
        horas--;
        minutos += 60;
    }
    if (horas < 0) {
        dias--;
        horas += 24;
    }

    // Atualizando os elementos HTML com os resultados
    let AnoHtml = document.querySelector('#anos');
    let MesHtml = document.querySelector('#meses');
    let DiaHtml = document.querySelector('#dias');
    let HoraHtml = document.querySelector('#horas');
    let MinutoHtml = document.querySelector('#minutos');
    let SegundoHtml = document.querySelector('#segundos');

    // Verificando se as unidades de tempo devem ser ocultadas (quando o valor for 0)
    if (anos === 0) {
        AnoHtml.style.display = 'none';
    } else {
        AnoHtml.style.display = 'block';
        AnoHtml.innerHTML = `${anos < 10 ? `0${anos}` : anos} <br>ano${anos > 1 ? 's' : ''}`;
    }


    if (meses === 0) {
        MesHtml.style.display = 'none';
    } else {
        MesHtml.style.display = 'block';
        MesHtml.innerHTML = `${meses < 10 ? `0${meses}`: meses} <br>mês${meses > 1 ? 'es' : ''}`;
    }


    if (dias === 0) {
        DiaHtml.style.display = 'none';
    } else {
        DiaHtml.style.display = 'block';
        DiaHtml.innerHTML = `${dias < 10 ? `0${dias}` : dias} <br>dia${dias > 1 ? 's' : ''}`;
    }


    if (horas === 0){
        HoraHtml.style.display = 'none';
    } else {
        HoraHtml.style.display = 'block';
        HoraHtml.innerHTML = `${horas < 10 ? `0${horas}` : horas} <br>hora${horas > 1 ? 's' : ''}`;
    }


    if (minutos === 0){
        MinutoHtml.style.display = 'none';
    } else {
        MinutoHtml.style.display = 'block';
        MinutoHtml.innerHTML = `${minutos < 10 ? `0${minutos}`: minutos} <br>minuto${minutos > 1 ? 's' : ''}`;
    }


    if (segundos === 0){
        SegundoHtml.style.display = 'none';
    } else {
        SegundoHtml.style.display = 'block';
        SegundoHtml.innerHTML = `${segundos < 10 ? `0${segundos}` : segundos} <br>segundo${segundos > 1 ? 's' : ''}`;
    }
}


setInterval(atualizarContador, 1000);
atualizarContador();
// Primeiro, vamos criar um array com os nomes das imagens
async function verificarimagem(src) {
    try {
        const response = await fetch(src);
        return response.ok;
    } catch (error) {
        return false; // Se der erro, retorna false
    }
}
const imagePaths = [];

async function carregarImagens() {
    for (let i = 0; i <= TotalDeImagens[0]; i++) { // Ajuste o número conforme quantidade de imagens
        if (await verificarimagem(`images/MyLove${i+1}.jpg`)){
            imagePaths.push(`images/MyLove${i+1}.jpg`);
        } else if (await verificarimagem(`images/MyLove${i+1}.jpeg`)){
            imagePaths.push(`images/MyLove${i+1}.jpeg`);
        } else if (await verificarimagem(`images/MyLove${i+1}.png`)){
            imagePaths.push(`images/MyLove${i+1}.png`);
        }
    }
    CriarSlides()
}
carregarImagens()
console.log(imagePaths);


// Criar elementos de imagem dinamicamente

function CriarSlides(){
    const slidesContainer = document.querySelector('.slides');
    imagePaths.forEach((path, index) => {
        const img = document.createElement('img');
        img.src = path;
        img.className = index === 0 ? 'active' : '';
        slidesContainer.appendChild(img);
    });

    // Atualizar a referência das imagens para o carrossel
    const imagens = document.querySelectorAll(".slides img");

    // Carrossel de imagens
    let currentIndex = 0;
    function mudarSlide() {
        imagens[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % imagens.length;
        imagens[currentIndex].classList.add("active");
    }
    setInterval(mudarSlide, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os parágrafos dentro de elementos com classe 'musicas'
    const musicTitles = document.querySelectorAll('.musicas p');
    
    // Adiciona evento de clique a cada parágrafo
    musicTitles.forEach(title => {
        title.addEventListener('click', function() {
            // Alterna a classe 'expanded' para mudar o ícone
            this.classList.toggle('expanded');
            
            // Encontra o elemento de áudio que é o próximo irmão deste parágrafo
            const audioElement = this.nextElementSibling;
            
            // Verifica se o próximo elemento é um áudio
            if (audioElement && audioElement.tagName === 'AUDIO') {
                // Alterna a visibilidade do áudio
                audioElement.classList.toggle('visible');
                
                // Pausa o áudio se estiver sendo escondido
                // if (!audioElement.classList.contains('visible')) {
                //     audioElement.pause();
                // }
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('audio').forEach(function(audio){
        audio.volume = 0.15;
    });
})
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o botão que abrirá a carta (substitua 'seu-botao' pelo ID ou classe do seu botão)
    const botaoAbrirCarta = document.querySelector('.botao-ver-poema'); // Usando a classe .quadrado como exemplo
    const cartaOverlay = document.querySelector('.carta-overlay');
    const carta = document.querySelector('.carta');
    const botaoFechar = document.querySelector('.fechar-carta');
    
    // Abre a carta quando o botão for clicado
    botaoAbrirCarta.addEventListener('click', function() {
        cartaOverlay.style.display = 'flex';
        // Pequeno atraso para a animação de abertura
        setTimeout(() => {
            carta.classList.add('aberta');
        }, 100);
    });
    
    // Fecha a carta quando o botão de fechar for clicado
    botaoFechar.addEventListener('click', function() {
        carta.classList.remove('aberta');
        // Espera a animação de fechamento terminar antes de esconder o overlay
        setTimeout(() => {
            cartaOverlay.style.display = 'none';
        }, 2500);
    });
    
    // Também fecha a carta quando clicar fora dela
    cartaOverlay.addEventListener('click', function(e) {
        if (e.target === cartaOverlay) {
            carta.classList.remove('aberta');
            setTimeout(() => {
                cartaOverlay.style.display = 'none';
            }, 2500);
        }
    });
});