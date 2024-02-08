import {projs} from "./projects/project_list.js" 

//PROJECT HIGHLIGHT

var mainSect = document.querySelector("#project-highlight")
var img = mainSect.querySelector("#thumbnail")
var imgs = mainSect.querySelector("#multi-thumbnail")
var mainCtn = document.querySelector("#content")
let project_id = window.location.search.slice(-1)
var multi_thumbnail = false
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

    multi_thumbnail = p.imageCount > 1
    if( multi_thumbnail ){
        //move thumbnail into div show dots indicator
        mainCtn.removeChild(img)
        imgs.prepend(img)

        var currentThumbnailIndex = 0

        var dots = document.querySelector('#dots')

        
        for(let i = 0; i < p.imageCount; i++){

            let dot = document.createElement('span')

            dot.classList.add("dot")
            dot.style.backgroundColor = (i == 0) ? 'white' : 'grey'
            console.log('bjir')
            
            dot.addEventListener("click", function(){
            //display the thumbnail and 
            //change indicator color
                
                for(let d of dots.children){  
                    d.style.backgroundColor = d==dot ? "white" : "grey";
                }

                currentThumbnailIndex = i

                img.src =  currentThumbnailIndex == 0 ? p.image : `${p.image.split(".")[1]}${currentThumbnailIndex}.${p.image.split(".")[2]}`
        
            })
        
            dots.appendChild(dot)
        }

        dots.style.display = 'flex'
    
    } else{

       imgs.style.display = 'none'
    }
    

}else{

    mainSect.style.display = "none"
}

//check querystring
//layout on small screen
const smallScreen = 600

if( document.documentElement.clientWidth <= smallScreen &&  !multi_thumbnail ){

    mainCtn.removeChild(img)
    mainSect.prepend(img)
}

if( document.documentElement.clientWidth <= smallScreen &&  multi_thumbnail ){

    mainCtn.removeChild(imgs)
    mainSect.prepend(imgs)
}


var smallScreenQuery = window.matchMedia(`(max-width: ${smallScreen}px)`)

smallScreenQuery.addEventListener("change",moveImage)

function moveImage(){

    if (smallScreenQuery.matches){

        if(multi_thumbnail){

            if(mainCtn.contains(imgs)) {mainCtn.removeChild(imgs)}
            mainSect.prepend(imgs)

        }
        
        else{

            if(mainCtn.contains(img)) {mainCtn.removeChild(img)}
            mainSect.prepend(img)

        }

    } else{

        if(multi_thumbnail){

            if(mainSect.contains(imgs)) {mainSect.removeChild(imgs)}
            mainCtn.append(imgs)

        }
        
        else{

            if(mainSect.contains(img)) {mainSect.removeChild(img)}
            mainCtn.append(img)

        }

    }
}

//PROJECTS LIST
import { CardBinder } from "./card.js";

let sect = document.querySelector("#project-list")

const PROJ_COUNT = 9
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

