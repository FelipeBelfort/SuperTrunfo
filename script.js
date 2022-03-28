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
