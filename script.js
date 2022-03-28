class Card {
    
    static attrName01 = "Força"
    static attrName02 = "Energia"
    static attrName03 = "Inteligência"
    static attrName04 = "amizade"
    
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

    
        Match.btnCartas.setAttribute("disabled", "")
        Match.btnJogar.removeAttribute("disabled")
        Match.btnCartas.innerHTML = "Nova rodada"
        if (Match.round % 2){
            Match.tituloResultado.innerHTML = "O adversário já escolheu o atributo"
        } else {
            Match.tituloResultado.innerHTML = "Escolha o seu atributo"
        }
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
        var resultMessage = ""
        var selectedAttr;
        
        if (!(Match.round % 2)) {
            selectedAttr = this.pickAttr()
        } else {
            selectedAttr = this.chooseAttr()
        }
        if (this.deckMatch[0].attrValue(selectedAttr) > this.deckMatch[1].attrValue(selectedAttr)) {
            resultMessage = "Venceu"
            this.roundResult = "win"
        }
        if (this.deckMatch[0].attrValue(selectedAttr) < this.deckMatch[1].attrValue(selectedAttr)) {
            resultMessage = "perdeu"
            this.roundResult = "lose"
        }
        if (this.deckMatch[0].attrValue(selectedAttr) == this.deckMatch[1].attrValue(selectedAttr)) {
            if (this.tiedTimes > 1){
            resultMessage = `empatou ${this.tiedTimes} vezes`
            } else {
            resultMessage = "empatou"
            }
            this.roundResult = "tied"
            this.tiedTimes++
        }
        
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
            endOfGame(this.roundResult)
            
        }
        Match.tituloResultado.innerHTML = "Clique para a próxima rodada"
        Match.btnJogar.setAttribute("disabled", "")
        Match.btnCartas.removeAttribute("disabled")
        this.deckMatch = []
        this.roundResult = ""
        Match.round++
    }

    endOfGame(rndResult) {
        // resetar a porra toda, dizer a mensagem e ajeitar botoes

    }
}
