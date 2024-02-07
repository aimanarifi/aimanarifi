/*
Card: HTML Element
CardBinder: store card content and the dom

Do not use instantiate project-card directly using createElement
bcs Card requires data that'll be passed from CardBinder

Use CardBinder to instantiate!
 */
class Card extends HTMLElement {
    
    constructor(){
        super();
    }

    connectedCallback() {
        
        let data = this.innerHTML.split(";")

        this.innerHTML = `<img src="${data[1]}" alt="${data[1]}"/>
                          <p>${data[0]}</p>`;
        
        if(data.length < 3){return}
            
        let  extraHTML = ""
        
        if(data.length == 4){

            extraHTML = "<div class='misc'>"
            extraHTML += "<div class='icon-wrapper'>"

            for(let icon of data[3].split("%")){

                extraHTML += `<img src="./assets/${icon}.png" alt="${icon}-icon"/>`

            }
            extraHTML += `</div><div class="button"><a href="./project.html?id=${data[2]}">details&nbsp;<div></div></a></div></div>`
        } else {
            extraHTML += `<div class="button"><a href="./project.html?id=${data[2]}">details&nbsp;<div></div></a></div>`
        }

        this.innerHTML += extraHTML

    }

}


export function card_init(){
    customElements.define('project-card', Card);

}

export class CardBinder {
//This class store the necessary information to a card
//as well as the dom object of the card

    constructor() {
        this.id = ""
        this.text = "Sample title"
        this.image = "./assets/blank_image.png"
        this.icons = ""
        this.dom = null
    }

    setText(txt){
        this.text = txt
        return this
    }

    setImage(url){
        if(!fileExists(url)) {return this}
        this.image = url
        return this
    }

    setID(no){
        this.id = no
        return this
    }

    setIcons(iconNames){
        
        var counter = 0
        for(let ic of iconNames){
            
            if( counter < 3 && fileExists(`./assets/${ic.toLowerCase()}.png`)){
                this.icons += `${ic.toLowerCase()}%`
                counter++
            }

        }

        if(this.icons.slice(-1) == "%"){
            this.icons = this.icons.substring(0, this.icons.length - 1)
        }

        return this
    }
    
    createCard(){

        if ( this.dom == null){ 
            this.dom = document.createElement('project-card')
        }
        
        this.dom.innerHTML = `${this.text};${this.image};${this.id};${this.icons}`

        if(this.dom.innerHTML.slice(-1) == ";"){
            this.dom.innerHTML = this.dom.innerHTML.substring(0, this.dom.innerHTML.length - 1)
        }

        return this
    }

}

function fileExists(path){
    let x = new XMLHttpRequest()
    x.open('HEAD',path,false)
    x.send()
    return x.status == 200
}
