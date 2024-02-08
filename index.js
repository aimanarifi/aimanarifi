import { CardBinder } from "./card.js";

let smallwidth = getComputedStyle(document.documentElement).getPropertyValue('--smallwidth')

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
    //Respond to mouse hover
   
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
    //display the associated card and 
    //change indicator color

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

if (document.documentElement.clientWidth <= smallwidth.split('px')[0]){
    dots.style.display = "flex"
    let ds = dots.children

    for(let i=0; i<cards.length;i++){

        cards[i].dom.style.display =  i==0 ? "flex": "none";
        ds[i].style.backgroundColor=  i==0 ? "white": "grey";
    }
}

var smallScreenQuery = window.matchMedia(`(max-width: ${smallwidth})`)
smallScreenQuery.addEventListener("change", adjustCards)

var currentCardIndex = 0
function adjustCards() {

    if(smallScreenQuery.matches) {
        //Hide all cards except the first one &&
        //light up the first dot indicator
        dots.style.display = "flex"
        let ds = dots.children

        for(let i=0; i<cards.length;i++){

            cards[i].dom.style.display =  i==0 ? "flex": "none";
            ds[i].style.backgroundColor=  i==0 ? "white": "grey";
        }

    } else {
        //revert changes
        cards.forEach((c)=>{
            c.dom.style.display = "flex"
        });
        dots.style.display = "none"
        currentCardIndex = 0

    }

}

//card wrapper respond to swipe gesture
var xTouchStart = null
var xTouchEnd = null

cardWrapper.addEventListener('touchstart', (e) =>{
    if(document.documentElement.clientWidth > smallwidth.split("px")[0]) {return}
    xTouchStart = e.changedTouches[0].screenX
})

cardWrapper.addEventListener('touchend', (e) => {
    if(document.documentElement.clientWidth > smallwidth.split("px")[0]) {return}
    xTouchEnd = e.changedTouches[0].screenX

    
    if (xTouchEnd < xTouchStart && currentCardIndex != 2) {//left
        console.log('move to right card')
        currentCardIndex += 1
    }

    if (xTouchEnd > xTouchStart && currentCardIndex != 0) {//right
        console.log('move to left card')
        currentCardIndex -= 1
    }

    let ds = dots.children
    for(let i=0; i<cards.length;i++){

        cards[i].dom.style.display =  i==currentCardIndex ? "flex": "none";
        ds[i].style.backgroundColor=  i==currentCardIndex ? "white": "grey";
    }
        
})

//ABOUT ME SECTION