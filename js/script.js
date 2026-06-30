const inputCor = document.getElementById("inputCor");
const btnBuscar = document.getElementById("btnBuscar");
const btnCopiar = document.getElementById("btnCopiar");

const mensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");

const cor = document.getElementById("cor");
const nome = document.getElementById("nome");
const hex = document.getElementById("hex");
const rgb = document.getElementById("rgb");
const hsl = document.getElementById("hsl");
const cmyk = document.getElementById("cmyk");

const paleta = document.getElementById("paleta");

btnBuscar.addEventListener("click", verificarCampo);

inputCor.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        verificarCampo();

    }

});

btnCopiar.addEventListener("click", copiarHex);

function verificarCampo(){

    let corDigitada = inputCor.value.trim();

    corDigitada = corDigitada.replace("#","");

    if(corDigitada === ""){

        mensagem.innerText = "Digite um código HEX.";

        mensagem.className = "mt-5 text-center text-red-500";

        resultado.classList.add("hidden");

        return;

    }

    if(corDigitada.length !== 6){

        mensagem.innerText = "O código HEX deve possuir 6 caracteres.";

        mensagem.className = "mt-5 text-center text-red-500";

        resultado.classList.add("hidden");

        return;

    }

    mensagem.innerText = "Buscando informações...";

    mensagem.className = "mt-5 text-center text-green-400";

    buscarCor(corDigitada);

}

async function buscarCor(corHex){

    try{

        const resposta = await fetch("https://www.thecolorapi.com/id?hex=" + corHex);

        const dados = await resposta.json();

        resultado.classList.remove("hidden");

        mensagem.innerText = "";

        nome.innerText = dados.name.value;

        hex.innerText = dados.hex.value;

        rgb.innerText = dados.rgb.value;

        hsl.innerText = dados.hsl.value;

        cmyk.innerText = dados.cmyk.value;

        cor.style.backgroundColor = dados.hex.value;

        gerarPaleta(dados.hex.value);

    }

    catch{

        mensagem.innerText = "Não foi possível buscar essa cor.";

        mensagem.className = "mt-5 text-center text-red-500";

        resultado.classList.add("hidden");

    }

}

function gerarPaleta(corHex){

    paleta.innerHTML = "";

    const porcentagens = [80,60,40,20,0];

    porcentagens.forEach(function(valor){

        const bloco = document.createElement("div");

        bloco.className = "h-20 rounded-lg border border-zinc-700";

        bloco.style.backgroundColor = corHex;

        bloco.style.filter = `brightness(${100 + valor}%)`;

        paleta.appendChild(bloco);

    });

}

function copiarHex(){

    navigator.clipboard.writeText(hex.innerText);

    mensagem.innerText = "HEX copiado com sucesso!";

    mensagem.className = "mt-5 text-center text-green-400";

}