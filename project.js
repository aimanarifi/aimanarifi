import {projs} from "./projects/project_list.js" 

//PROJECT HIGHLIGHT

var mainSect = document.querySelector("#project-highlight")
var img = mainSect.querySelector("#thumbnail")
var mainCtn = document.querySelector("#content")
let project_id = window.location.search.slice(-1)

if(project_id != ''){
    let p = projs[project_id]
    img.src = p.image
    mainSect.querySelector('span').innerText = p.title
    mainSect.querySelector('h2').innerText = p.date
    document.querySelector('#details p').innerText = p.description

    if (p.repo == "none"){
        document.querySelector('#details a').style.display = 'none'
    } else {
        document.querySelector('#details a').href = p.repo
    }

    let toolsWrapper = mainCtn.querySelector('#tools')
    for( let t of p.tools){
        let txt = document.createElement("p")
        txt.innerText = t
        toolsWrapper.append(txt)
    }

}else{
    mainSect.style.display = "none"
}

//check querystring
//layout on small screen
const smallScreen = 600

if( document.documentElement.clientWidth <= smallScreen){
    mainSect = document.querySelector("#project-highlight")
    img = mainSect.querySelector("#thumbnail")
    mainCtn= document.querySelector("#content")

    mainCtn.removeChild(img)
    mainSect.prepend(img)
}

var smallScreenQuery = window.matchMedia(`(max-width: ${smallScreen}px)`)

smallScreenQuery.addEventListener("change",moveImage)

function moveImage(){

    if (smallScreenQuery.matches){

        if(mainCtn.contains(img)){
            mainCtn.removeChild(img)
        }
        mainSect.prepend(img)
    }
    else{

        if(mainSect.contains(img)){
            mainSect.removeChild(img)
        }

        mainCtn.append(img)
    }
}

//PROJECTS LIST
import { CardBinder } from "./card.js";

let sect = document.querySelector("#project-list")

const PROJ_COUNT = 8
//separate projects by year
var years = []
for(var i = 1; i <= PROJ_COUNT; i++){

    if(years.includes(projs[`${i}`].date)){continue}
    years.push(projs[`${i}`].date)

}

years.sort().reverse()

for( var y of years){

    var h1 = document.createElement("h2")
    h1.innerText = y
    sect.append(h1)

    var cardWrapper = document.createElement("div")
    cardWrapper.classList.add("card-wrapper")

    for(var i = 1; i <= PROJ_COUNT; i++){

        var p = projs[`${i}`]
        if(y != p.date){continue}
        let binder = new CardBinder().setText(p.title).setImage(p.image).setIcons(p.tools).setID(i)
        binder.createCard()
        cardWrapper.append(binder.dom)
        
    }
    sect.append(cardWrapper)

} 

