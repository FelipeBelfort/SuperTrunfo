//corrigir o empate
//corrigir o css
//talvez transformar cartas em classe




var deckJogador = Array()
var deckPc = Array()
var cartaJogador = document.getElementById("carta-jogador")
var cartaPc = document.getElementById("carta-maquina")
var rodada = 0
var btnCartas = document.getElementById("btnSortear")
var btnJogar = document.getElementById("btnJogar")
sortearCartas()

function sortearCartas() {
    //embaralhar e distribuir as cartas entre os jogadores
    shuffle(baralho)
    while (baralho.length > 0){
        deckJogador.push(baralho.shift())
        deckPc.push(baralho.shift())
    }
    //desativar o botao
    btnCartas.setAttribute("disabled", "")
    //habilitar o botão jogar
    btnJogar.removeAttribute("disabled")
    //transformar o botao em nova rodada
    btnCartas.innerHTML = "Nova rodada"
    btnCartas.setAttribute("onclick", "novaRodada()")
    mostrarCarta("carta-jogador")
    var tituloResultado = document.getElementById("subtitulo")
    tituloResultado.innerHTML = "Escolha o seu atributo"
}
function jogar(){
    //verificar se e a vez do jogador
    //pegar o atributo escolhido
    var divResultado = document.getElementById("resultado")
    var atributoSelecionado = obtemAtributoSelecionado()
    if (verificarTurno() == "carta-maquina"){escolherAtributo()}
    //comparar o atributo
    if (
        deckJogador[0].attributes[atributoSelecionado] ==
        deckPc[0].attributes[atributoSelecionado]
      ) {
        divResultado.setAttribute("name", "tied")
        htmlResultado = "<p class='resultado-final'>Empatou!<br>Escolha outro atributo.</p>";
        //escolherAtributo(1)
    } else {
        if (
        deckJogador[0].attributes[atributoSelecionado] <
        deckPc[0].attributes[atributoSelecionado]
        ) {
            divResultado.setAttribute("name", "lose")
            htmlResultado = "<p class='resultado-final'>Você perdeu esta rodada.</p>";
        } else {
            divResultado.setAttribute("name", "win")
            htmlResultado = "<p class='resultado-final'>Você ganhou esta rodada</p>";
        }
         //mostrar a carta
    mostrarCarta("carta-maquina")
        //desativar o botao
    btnJogar.setAttribute("disabled", "")
        //ativar o botao nova rodada
    btnCartas.removeAttribute("disabled")
    }
      //mensagem
    divResultado.innerHTML = htmlResultado;

   if (deckJogador.length == 0 || deckPc.length == 0){
       fimDoJogo()
   }
     

}
function mostrarCarta(jogador){
    //verificar se e a vez do jogador
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style="width: inherit; height: inherit; position: absolute;">'
    var opcoesTexto = ""
    var tagHTML = "<div id= 'opcoes' class= 'carta-status'>"
    if(jogador == "carta-jogador"){
        var cartaEscolhida = deckJogador[0]
        var divCartaEscolhida = cartaJogador
        var opcoesTexto2 = ""
        var incognita = "?"
        var tituloIncognito = incognita.repeat(12) + "_".repeat(13) + deckPc.length + "/" + (deckJogador.length + deckPc.length)
        var nome2 = `<p class= "carta-subtitle">${tituloIncognito}</p>`
        cartaPc.style.backgroundImage = `url(https://i.imgflip.com/4ps0yj.gif)`

        for(var atributo in deckPc[0].attributes){ 
            opcoesTexto2 += "<p>" + incognita.repeat(atributo.length) + ": " + incognita + "</p>"
        }
        cartaPc.innerHTML = moldura + nome2 + tagHTML + opcoesTexto2 + "</div>"
    } else {
        var cartaEscolhida = deckPc[0]
        var divCartaEscolhida = cartaPc
    } 
    var nomeFormatado = cartaEscolhida.name + "_".repeat(25 - cartaEscolhida.name.length) + deckPc.length + "/" + (deckJogador.length + deckPc.length)
    var nome = `<p class= "carta-subtitle">${nomeFormatado}</p>`
    divCartaEscolhida.style.backgroundImage = `url(${cartaEscolhida.img})`
    for(var atributo in cartaEscolhida.attributes){
        if(verificarTurno() == jogador){
            opcoesTexto += "<input type='radio' name='atributo' checked value='" + atributo + "'>" + atributo + ": " + cartaEscolhida.attributes[atributo] + "<br>"
        } else {
            opcoesTexto += "<p>" + atributo + ": " + cartaEscolhida.attributes[atributo] + "</p>"
        }
    }
    

    divCartaEscolhida.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>"


    
    //recuperar dados da carta
    //recuperar tamanho das listas
    //se jogador == pessoa mostrar carta da pessoa e generico pro pc
    //se jogador == pc mostrar a carta do pc 
}
function novaRodada(){
    var divResultado = document.getElementById("resultado")
    console.log(deckJogador)
    console.log(deckPc)
    var cartasDaRodada = [deckJogador.shift(), deckPc.shift()]
    console.log(cartasDaRodada)
    if(divResultado.name == "win"){
        deckJogador.push(cartasDaRodada)
    } else if (divResultado.name == "lose"){
        deckPc.push(cartasDaRodada)
    }
    console.log(deckJogador)
    console.log(deckPc)

    divResultado.innerHTML = ""
    divResultado.setAttribute("name", "")
    //checar se o jogo acabou
    rodada++
    if (verificarTurno() == "carta-maquina"){escolherAtributo()}
    

    //pegar as duas cartas e adicionar ao deck do vencedor
    //mostrar a carta
    mostrarCarta("carta-jogador")
    btnCartas.setAttribute("disabled", "")
    btnJogar.removeAttribute("disabled")
    
}
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
function verificarTurno(){
    if(rodada % 2 == 0){
        return "carta-jogador"
    } else {
        return "carta-maquina"
    }
}
function obtemAtributoSelecionado() {
    var radioAtributos = document.getElementsByName("atributo");
  
    for (var i = 0; i < radioAtributos.length; i++) {
      if (radioAtributos[i].checked == true) {
      return radioAtributos[i].value;
      }
    }
  }
function escolherAtributo(int=0){
    if(verificarTurno() == "carta-maquina"){
        var chavesCartaMaquina = Object.keys(deckPc[0].attributes)
        var valoresCartaMaquina = Object.values(deckPc[0].attributes)
        var sortedAttr = []
        while (chavesCartaMaquina.length > 0) {
            var max = valoresCartaMaquina[0]
            var indexMax = 0
            for (var i = 0; i < chavesCartaMaquina.length; i++){
                if(valoresCartaMaquina[i] > max){
                    max = valoresCartaMaquina[i] 
                    indexMax = i   
                }
            }
            sortedAttr.push(chavesCartaMaquina[indexMax])
            chavesCartaMaquina.splice(indexMax, 1)
            valoresCartaMaquina.splice(indexMax, 1)
        }
        selecionarAtributo(sortedAttr)
       
    }
}
function selecionarAtributo(sortedAttr){
    var radioAtributos = document.getElementsByName("atributo");
    sortedAttr.forEach(attr => {
        for (var i = 0; i < radioAtributos.length; i++) {
            if (radioAtributos[i].value == attr && deckJogador[0].attributes[attr] != deckPc[0].attributes[attr]) {
             radioAtributos[i].checked = "true";
                }
            }
        }
    )
}
function fimDoJogo(){
    var tituloResultado = document.getElementById("subtitulo")
    btnCartas.innerHTML = "Jogar novamente"
    btnCartas.setAttribute("onclick", "sortearCartas()")
    
    var mensagemResultado = ""
    if (deckJogador.length == 0){
        mensagemResultado = "Você ficou sem cartas e perdeu o jogo. Quem sabe na próxima..."
        deckPc.forEach(carta => baralho.push(carta))
        deckPc = []
    } else if (deckPc.length == 0){
        mensagemResultado = "Parabéns, você ganhou o jogo!<br>Deseja jogar novamente?"
        deckJogador.forEach(carta => baralho.push(carta))
        deckJogador = []
    }
    tituloResultado.innerHTML = mensagemResultado
    
}



var carta1 = {
    name: "Satoru Gojo",
    img:"https://i.pinimg.com/736x/64/af/38/64af38b1fa5a26c5002fbb0776ebde12.jpg",
    attributes: {
        "Força": 1,
        "Energia": 10,
        "Inteligência": 9,
        "amizade": 8,
        "Vitalidade": 6
        },
}
var carta2 = {
    name: "Yuji Itadori",
    img:"https://otakuorbit.com/wp-content/uploads/2021/03/Screenshot-2021-03-26-231928.png",
    attributes: {
        "Força": 7,
        "Energia": 9,
        "Inteligência": 4,
        "amizade": 5,
        "Vitalidade": 7
        },
    }
var carta3 = {
    name: "Megumi Fushiguro",
    img:"https://i.pinimg.com/originals/48/67/de/4867de4f592290f49ad0e860438d058c.jpg",
    attributes: {
        "Força": 2,
        "Energia": 8,
        "Inteligência": 5,
        "amizade": 9,
        "Vitalidade": 9
        },
    }
var carta4 = {
    name: "Nobara Kugisaki",
    img:"https://m.media-amazon.com/images/I/71DAVK+E8RL._AC_SX425_.jpg",
    attributes: {
        "Força": 3,
        "Energia": 8,
        "Inteligência": 5,
        "amizade": 9,
        "Vitalidade": 9
        },
    }
var carta5 = {
    name: "Maki Zenin",
    img:"https://shogi-pineapple.com/wp-content/uploads/2022/01/Cosplayer-amazes-us-with-his-version-of-Maki-Zenin-from.jpg",
    attributes: {
        "Força": 4,
        "Energia": 8,
        "Inteligência": 5,
        "amizade": 9,
        "Vitalidade": 9
        },
    }
var carta6 = {
    name: "Toge Inumaki",
    img:"https://i.pinimg.com/originals/c8/d3/10/c8d3107519d03670afcd49874c48a86e.jpg",
    attributes: {
        "Força": 5,
        "Energia": 8,
        "Inteligência": 5,
        "amizade": 9,
        "Vitalidade": 9
        },
    }
var carta7 = {
    name: "Panda",
    img:"https://laverdadnoticias.com/__export/1612131943315/sites/laverdad/img/2021/01/31/oanda_modo_gorila_jujutsu_kaisen.jpg_1743420889.jpg",
    attributes: {
        "Força": 6,
        "Energia": 8,
        "Inteligência": 5,
        "amizade": 9,
        "Vitalidade": 9
        },
    }
var carta8 = {
    name: "Aoi Todo",
    img:"https://i.pinimg.com/originals/47/20/c5/4720c5e828b3250a66a39ea59f79cbd4.jpg",
    attributes: {
        "Força": 7,
        "Energia": 8,
        "Inteligência": 5,
        "amizade": 9,
        "Vitalidade": 9
        },
    }
var carta9 = {
    name: "Kento Nanami",
    img:"https://danbooru.donmai.us/data/__nanami_kento_jujutsu_kaisen_drawn_by_ichimatsuinfo__c83fd2e1d9525a1cb1032d0eaf7ab838.jpg",
    attributes: {
        "Força": 8,
        "Energia": 8,
        "Inteligência": 5,
        "amizade": 9,
        "Vitalidade": 9
        },
    }
var carta10 = {
    name: "Mahito",
    img:"https://otakukart.com/wp-content/uploads/2022/02/Mahitos-1.jpg",
    attributes: {
        "Força": 9,
        "Energia": 8,
        "Inteligência": 5,
        "amizade": 9,
        "Vitalidade": 9
        },
    }
var carta11 = {
    name: "Jogo",
    img:"https://quotetheanime.com/wp-content/uploads/2021/09/j2-768x432.jpg",
    attributes: {
        "Força": 10,
        "Energia": 10,
        "Inteligência": 9,
        "amizade": 8,
        "Vitalidade": 6
        },
}
var carta12 = {
    name: "Hanami",
    img:"https://www.nautiljon.com/images/perso/00/94/hanami_20049.jpg",
    attributes: {
        "Força": 11,
        "Energia": 8,
        "Inteligência": 5,
        "amizade": 9,
        "Vitalidade": 9
        },
    }
var carta13 = {
    name: "Eso",
    img:"https://otakukart.com/wp-content/uploads/2021/05/eso-Jujutsu-Kaisen.jpg",
    attributes: {
        "Força": 12,
        "Energia": 8,
        "Inteligência": 5,
        "amizade": 9,
        "Vitalidade": 9
        },
    }
var carta14 = {
    name: "Kechizu",
    img:"https://nerdhits.com.br/wp-content/uploads/2021/05/Kechizu-jujutsu.jpg",
    attributes: {
        "Força": 13,
        "Energia": 8,
        "Inteligência": 5,
        "amizade": 9,
        "Vitalidade": 9
        },
    }
var carta15 = {
    name: "Finger Bearers",
    img:"https://i.stack.imgur.com/IEJVB.jpg",
    attributes: {
        "Força": 14,
        "Energia": 8,
        "Inteligência": 5,
        "amizade": 9,
        "Vitalidade": 9
        },
    }
var carta16 = {
    name: "Mai Zenin",
    img:"https://i.pinimg.com/originals/e9/9a/7a/e99a7a253f231d82842084a3ffae27de.jpg",
    attributes: {
        "Força": 15,
        "Energia": 8,
        "Inteligência": 5,
        "amizade": 9,
        "Vitalidade": 9
        },
    }
var carta17 = {
    name: "Kokichi Muta",
    img:"https://vainkeurz.com/wp-content/uploads/2021/06/kokichi-muta.jpg",
    attributes: {
        "Força": 16,
        "Energia": 8,
        "Inteligência": 5,
        "amizade": 9,
        "Vitalidade": 9
        },
    }
var carta18 = {
    name: "Kasumi Miwa",
    img:"https://safebooru.org//images/3277/3fc9a85a9eab875e5e94fd9dddf3fe397ddeab56.jpg",
    attributes: {
        "Força": 17,
        "Energia": 8,
        "Inteligência": 5,
        "amizade": 9,
        "Vitalidade": 9
        },
    }
var carta19 = {
    name: "Noritoshi Kamo",
    img:"https://i.pinimg.com/736x/10/4d/12/104d12e851ff67799c3cf99abe58e5ad.jpg",
    attributes: {
        "Força": 18,
        "Energia": 8,
        "Inteligência": 5,
        "amizade": 9,
        "Vitalidade": 9
        },
    }
var carta20 = {
    name: "Momo Nishimiya",
    img:"https://i.pinimg.com/originals/71/22/a3/7122a30f93730a09919f70f073a675ac.jpg",
    attributes: {
        "Força": 19,
        "Energia": 8,
        "Inteligência": 5,
        "amizade": 9,
        "Vitalidade": 9
        },
    }

var baralho = [carta1, carta2, carta3, carta4, carta5, carta6, carta7, carta8, carta9, carta10, carta11, carta12, carta13, carta14, carta15, carta16, carta17, carta18, carta19, carta20]