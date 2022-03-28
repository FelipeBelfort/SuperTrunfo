class Card {
    
    static attrName01 = "Força Física"
    static attrName02 = "Energia Amaldiçoada"
    static attrName03 = "Habilidade"
    static attrName04 = "Velocidade"
    
    constructor(name, img, attr1, attr2, attr3, attr4){
    this.name = name
    this.img = img
    this.attr1 = attr1
    this.attr2 = attr2
    this.attr3 = attr3
    this.attr4 = attr4
    this.owner = 1
    }

    get getName(){
        return this.name
    }
    get getImg(){
        return this.img
    }
    get getAttr1(){
        return [Card.attrName01, this.attr1]
    }
    get getAttr2(){
        return [Card.attrName02, this.attr2]
    }
    get getAttr3(){
        return [Card.attrName03, this.attr3]
    }
    get getAttr4(){
        return [Card.attrName04, this.attr4]
    }

    get getOwner(){
        return this.owner
    }

    setOwner(owner){
        this.owner = owner
    }

    getAllAttr() {
        return [
            this.getAttr1, 
            this.getAttr2, 
            this.getAttr3, 
            this.getAttr4
        ]
    }

    attrValue(value){
        switch (value) {
            case Card.attrName01:
                return this.getAttr1[1]
                break;
            case Card.attrName02:
                return this.getAttr2[1]
                break;
            case Card.attrName03:
                return this.getAttr3[1]
                break;
            case Card.attrName04:
                return this.getAttr4[1]
                break;
        }
    }

    orderedAttr(){
        
        var attrKeys = [this.getAttr1[0], this.getAttr2[0], this.getAttr3[0], this.getAttr4[0]] 
        var attrValues = [this.getAttr1[1], this.getAttr2[1], this.getAttr3[1], this.getAttr4[1]] 
        var sortedAttr = []
        while (attrKeys.length > 0) {
            var max = attrValues[0]
            var indexMax = 0
            for (var i = 0; i < attrKeys.length; i++){
                if(attrValues[i] > max){
                    max = attrValues[i] 
                    indexMax = i   
                }
            }
            sortedAttr.push(attrKeys[indexMax])
            attrKeys.splice(indexMax, 1)
            attrValues.splice(indexMax, 1)
        }
        return sortedAttr
    } 

    
}

class Match {
   
    static round = 0
    static divResult = document.getElementById("resultado")
    static btnCartas = document.getElementById("btnSortear")
    static btnJogar = document.getElementById("btnJogar")
    static tituloResultado = document.getElementById("subtitulo")
    
    
    launchRound(deckPlayer, deckNpc) {
        
        Match.divResult.innerHTML = ""
        this.deckMatch = [
            deckPlayer.shift(), 
            deckNpc.shift()
            ]
       
        showCard(this.deckMatch[0])
        this.tiedTimes = 1

    
        Match.btnCartas.innerHTML = "Nova rodada"
        if (Match.round % 2){
            Match.tituloResultado.innerHTML = "O adversário já escolheu o atributo"
            setTimeout(jogar, 2000)
        } else {
            Match.tituloResultado.innerHTML = "Escolha o seu atributo"
        }
        Match.btnCartas.setAttribute("disabled", "")
        Match.btnJogar.removeAttribute("disabled")
    }

    chooseAttr() {
        var orderedAttr = this.deckMatch[1].orderedAttr()
        var attrChosen;
        orderedAttr.forEach(attr => {
            if (this.deckMatch[1].attrValue(attr) != this.deckMatch[0].attrValue(attr)) {
                //marcar atributo (como?)
                attrChosen = attr;
            }
            
        });
        return attrChosen
    }

    pickAttr() {
        var radioAtributos = document.getElementsByName("atributo");
      
        for (var i = 0; i < radioAtributos.length; i++) {
          if (radioAtributos[i].checked == true) {
          return radioAtributos[i].value;
          }
        }
      }

    verifyResult() {
        var resultMessage = "<p class='resultado-final'>";
        
        var selectedAttr;
        
        if (!(Match.round % 2)) {
            selectedAttr = this.pickAttr()
        } else {
            selectedAttr = this.chooseAttr()
        }
        if (this.deckMatch[0].attrValue(selectedAttr) > this.deckMatch[1].attrValue(selectedAttr)) {
            resultMessage += "Você venceu!"
            this.roundResult = "win"
        }
        if (this.deckMatch[0].attrValue(selectedAttr) < this.deckMatch[1].attrValue(selectedAttr)) {
            resultMessage += "Você perdeu."
            this.roundResult = "lose"
        }
        if (this.deckMatch[0].attrValue(selectedAttr) == this.deckMatch[1].attrValue(selectedAttr)) {
            if (this.tiedTimes > 1){
            resultMessage += `empatou ${this.tiedTimes} vezes`
            } else {
            resultMessage += "Empatou!<br>Escolha outro atributo."
            }
            this.roundResult = "tied"
            this.tiedTimes++
        }
        resultMessage += "</p>"
        return resultMessage 
    }

    endOfRound() {
        
        if (this.roundResult == "win") {
            this.deckMatch.forEach(card => { 
                card.setOwner(1);
                deckPlayer.push(card)
            })
        }
        if (this.roundResult == "lose") {
            this.deckMatch.forEach(card => {
                card.setOwner(0);
                deckNpc.push(card)
            })
        }
        
        if (!deckPlayer.length || !deckNpc.length) {
            endOfGame()
            
        }
        Match.tituloResultado.innerHTML = "Clique para a próxima rodada"
        Match.btnJogar.setAttribute("disabled", "")
        Match.btnCartas.removeAttribute("disabled")
        this.deckMatch = []
        this.roundResult = ""
        Match.round++
    }

    endOfGame() {
        let finalMessage;
        if (this.roundResult == "win") {
            finalMessage = "Você venceu o jogo!"
            while (deckPlayer.length > 0) {
                deck.push(deckPlayer.shift)
            }
        } else {
            finalMessage = "Você não tem mais cartas, boa sorte na próxima..."
            while (deckNpc.length > 0) {
                deck.push(deckNpc.shift)
            }
        }

        Match.tituloResultado.innerHTML = finalMessage
        Match.btnJogar.setAttribute("disabled", "")
        Match.btnCartas.removeAttribute("disabled")
        this.roundResult = ""
        Match.round = 0
        Match.btnCartas.innerHTML = "Nova partida"
        
    }
}

function dealCards(deckWhole, deckPlayer, deckNpc) {
    
    deckWhole.sort(() => Math.random() - 0.5);
    while (deckWhole.length > 0){
        deckPlayer.push(deckWhole.shift())
        deckNpc.push(deckWhole.shift())
    }
    deckNpc.forEach(card => { card.setOwner(0)
    });
    
}

function showCard(card) {
    var totCards = (deckPlayer.length + deckNpc.length + match.deckMatch.length)
    var roundNumber = parseInt(Match.round)
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style="width: inherit; height: inherit; position: absolute;">'
    var opcoesTexto = ""
    var tagHTML = "<div id= 'opcoes' class= 'carta-status'>"
    var divCardNpc = document.getElementById("carta-maquina")
    var divCardPlayer = document.getElementById("carta-jogador")
    var divCard;
    var deckTemp;
    if (card.getOwner) {
        divCard = divCardPlayer
        deckTemp = deckPlayer
        var opcoesTexto2 = ""
        var incognita = "??"
        var nome2 = `<p class= "carta-subtitle">
                    <span>${incognita.repeat(6)}</span>
                    <span>${deckNpc.length + 1}/${totCards}</span>
                    </p>`
        divCardNpc.style.backgroundImage = `url(https://pbs.twimg.com/media/E_mYQfUVUAkUXiv.jpg)`
        
        for (let index = 0; index < 4; index++) {
            opcoesTexto2 += "<p>" + card.getAllAttr()[index][0] + ": " + incognita + "</p>"            
        }
       
        divCardNpc.innerHTML = moldura + nome2 + tagHTML + opcoesTexto2 + "</div>"

    } else {
        divCard = divCardNpc
        deckTemp = deckNpc
    }

    var nome = `<p class= "carta-subtitle">
                <span>${card.getName}</span>
                <span>${deckTemp.length + 1}/${totCards}</span>
                </p>`
    
    divCard.style.backgroundImage = `url(${card.getImg})`

    if (card.getOwner && !(roundNumber % 2)) {
        for (let index = 0; index < 4; index++) {
            opcoesTexto += "<input type='radio' name='atributo' checked value='" + card.getAllAttr()[index][0] + "'>" + card.getAllAttr()[index][0] + ": " + card.getAllAttr()[index][1] + "<br>"            
        }
    } else {
        for (let index = 0; index < 4; index++) {
            opcoesTexto += "<p class='selected-attr'>" + card.getAllAttr()[index][0] + ": " + card.getAllAttr()[index][1] + "</p>"            
        }
    }
     
    divCard.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>"
    if (!card.getOwner) {
        //showSelectedAttr()
    }   

}

function sortearCartas() {
    if (!Match.round) {
    dealCards(deck, deckPlayer, deckNpc)
    }
    match.launchRound(deckPlayer, deckNpc)
   
}

function jogar() {
    var resultMessage = match.verifyResult()
    Match.divResult.innerHTML = resultMessage
    if (match.roundResult != "tied") {
        showCard(match.deckMatch[1])
        match.endOfRound()
    } 
}

var deck = [
    new Card( "Satoru Gojo",
    "https://i.pinimg.com/736x/64/af/38/64af38b1fa5a26c5002fbb0776ebde12.jpg",
    6,
    10,
    9,
    9
    )
, new Card("Yuji Itadori",
    "https://otakuorbit.com/wp-content/uploads/2021/03/Screenshot-2021-03-26-231928.png",
    9,
    9,
    7,
    8
    )

, new Card( "Megumi Fushiguro",
    "https://i.pinimg.com/originals/48/67/de/4867de4f592290f49ad0e860438d058c.jpg",
    7,
    8,
    9,
    6
    )

, new Card( "Nobara Kugisaki",
    "https://m.media-amazon.com/images/I/71DAVK+E8RL._AC_SX425_.jpg",
    6,
    8,
    9,
    5
    )

, new Card( "Maki Zenin",
    "https://shogi-pineapple.com/wp-content/uploads/2022/01/Cosplayer-amazes-us-with-his-version-of-Maki-Zenin-from.jpg",
    6,
    4,
    9,
    8
    )

, new Card( "Toge Inumaki",
    "https://i.pinimg.com/originals/c8/d3/10/c8d3107519d03670afcd49874c48a86e.jpg",
    5,
    8,
    6,
    5
    )

, new Card( "Panda",
    "https://laverdadnoticias.com/__export/1612131943315/sites/laverdad/img/2021/01/31/oanda_modo_gorila_jujutsu_kaisen.jpg_1743420889.jpg",
    9,
    5,
    7,
    4
    )

, new Card( "Aoi Todo",
    "https://i.pinimg.com/originals/47/20/c5/4720c5e828b3250a66a39ea59f79cbd4.jpg",
    10,
    6,
    8,
    9
    )

, new Card( "Kento Nanami",
    "https://danbooru.donmai.us/data/__nanami_kento_jujutsu_kaisen_drawn_by_ichimatsuinfo__c83fd2e1d9525a1cb1032d0eaf7ab838.jpg",
    5,
    6,
    8,
    8
    )

, new Card( "Mahito",
    "https://otakukart.com/wp-content/uploads/2022/02/Mahitos-1.jpg",
    4,
    8,
    9,
    6
    )

, new Card( "Jogo",
    "https://quotetheanime.com/wp-content/uploads/2021/09/j2-768x432.jpg",
    7,
    8,
    8,
    7
    )
, new Card( "Hanami",
    "https://jutsume.com/images/2021/05/13/best-matchup-for-hanami-jujutsu-kaisen-deathbattlematchups.jpg",
    9,
    4,
    6,
    9
    )

, new Card( "Eso",
    "https://otakukart.com/wp-content/uploads/2021/05/eso-Jujutsu-Kaisen.jpg",
    8,
    8,
    5,
    6
    )

, new Card( "Kechizu",
    "https://nerdhits.com.br/wp-content/uploads/2021/05/Kechizu-jujutsu.jpg",
    5,
    8,
    5,
    4
    )

, new Card( "Finger Bearers",
    "https://i.stack.imgur.com/IEJVB.jpg",
    9,
    8,
    5,
    9
    )

, new Card( "Mai Zenin",
    "https://i.pinimg.com/originals/e9/9a/7a/e99a7a253f231d82842084a3ffae27de.jpg",
    4,
    7,
    8,
    9
    )

, new Card( "Kokichi Muta",
    "https://vainkeurz.com/wp-content/uploads/2021/06/kokichi-muta.jpg",
    4,
    8,
    7,
    4
    )

, new Card( "Kasumi Miwa",
    "https://safebooru.org//images/3277/3fc9a85a9eab875e5e94fd9dddf3fe397ddeab56.jpg",
    3,
    7,
    5,
    9
    )

, new Card( "Noritoshi Kamo",
    "https://i.pinimg.com/736x/10/4d/12/104d12e851ff67799c3cf99abe58e5ad.jpg",
    7,
    8,
    5,
    9
    )

, new Card( "Momo Nishimiya",
    "https://i.pinimg.com/originals/71/22/a3/7122a30f93730a09919f70f073a675ac.jpg",
    4,
    8,
    5,
    8
    )
]
var deckPlayer = []
var deckNpc = []
var match = new Match()

