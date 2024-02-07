import { CardBinder } from "./card.js";

let smallwidth = getComputedStyle(document.documentElement).getPropertyValue('--smallwidth')
alert("halo")
//HERO SECTION
var hero_section = document.getElementById("hero")
var textWrapper = hero_section.getElementsByClassName("textwrapper")[0]
var graphics = hero_section.getElementsByTagName("img")[0]

//configure initail layout based on screen size
let minWidth = textWrapper.getClientRects()[0].width + graphics.getClientRects()[0].width

if (minWidth > document.documentElement.clientWidth) {

    hero_section.classList.add("small-window")
    graphics.style.transform = `translateX(${document.documentElement.clientWidth - minWidth}px)`
}

// reposition graphics on hero everytime screen resizes
window.addEventListener("resize", reposition)

function reposition(){

    let minWidth = textWrapper.getClientRects()[0].width + graphics.getClientRects()[0].width

    if (hero_section.classList.contains("small-window")){

        if (document.documentElement.clientWidth > minWidth){

            hero_section.classList.remove("small-window")
            graphics.style.transform = "translateX(0px)"

        } else {

            graphics.style.transform = `translateX(${document.documentElement.clientWidth - minWidth}px)`
        }
            
    } else {
     
        if (minWidth > document.documentElement.clientWidth) {

            hero_section.classList.add("small-window")
            graphics.style.transform = `translateX(${document.documentElement.clientWidth - minWidth}px)`
        }
 
    }

}

//PROJECTS SECTION

var cardWrapper = document.getElementById("card-wrapper")

import{ projs }from "./projects/project_list.js"

var cards = []

for (let i = 1; i<=3; i++){

    let p = projs[i]
    let binder = new CardBinder().setText(p.title).setImage(p.image).setIcons(p.tools).setID(i)
    binder.createCard()

    cards.push(binder)
    cardWrapper.appendChild(binder.dom)

} 

for (let c of cards){

    c.dom.addEventListener("mouseenter", function(){

        for(let d of cards){

            if( c != d){
                d.dom.style.filter = "blur(1px)"
                d.dom.style.transition = "filter 1s"
            }

        }
    })

    c.dom.addEventListener("mouseleave", function(){

        for(let d of cards){
            d.dom.style.filter = "none"

        }
    })
}

//attach dot indicator for each card
var dots = document.querySelector('#dots')

for(let i = 0; i < cards.length ; i++){

    let dot = document.createElement('span')
    dot.classList.add("dot")

    dot.addEventListener("click", function(){
    //display the associated card and change indicator color

        for(let j = 0; j < cards.length; j++){
            
            if( i == j){
                cards[j].dom.style.display = "flex"

            }else{
                cards[j].dom.style.display = "none"
                
            }
            
        }

        for(let d of dots.children){
            
            if(d==dot){
                d.style.backgroundColor = "white"
            }else{
                d.style.backgroundColor = "grey"
            }
        }

    })

    dots.appendChild(dot)

}



//show one card at a time and the dot indicators
//in small screen
var smallScreenQuery = window.matchMedia(`(max-width: ${smallwidth})`)
smallScreenQuery.addEventListener("change", adjustCards)

function adjustCards() {

    if(smallScreenQuery.matches) {
        
        //Hide all cards except the first one
        cards[1].dom.style.display = "none"
        cards[2].dom.style.display = "none"

        //create a ... card indicator
        dots.style.display = "flex"
        let ds = dots.children
        ds[0].style.backgroundColor = "white"
        ds[1].style.backgroundColor = "grey"
        ds[2].style.backgroundColor = "grey"


    } else {
        
        cards.forEach((c)=>{
            c.dom.style.display = "flex"
        });

        //revert changes
        dots.style.display = "none"
        
    }

}

//ABOUT ME SECTION