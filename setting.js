
var page_status = {
    "index" : true,
    "project": true,
    "contacts": true
}

//ACCESS CSS VAR
var doc = getComputedStyle(document.documentElement)

export var color = {
    "blue" : doc.getPropertyValue('--blue'),
    "faded-blue" : doc.getPropertyValue('--faded-blue'),
    "white" : doc.getPropertyValue('--white'),
    "orange" : doc.getPropertyValue('--orange'),
    "grey" : doc.getPropertyValue('--grey')
}

export var smallwidth = doc.getPropertyValue('--smallwidth')


//INITIALISE COMMON COMPONENT-- icon/ header/ footer
let svg = `<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22>
            <rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%2310162d%22></rect>
            <text x=%2250%%22 y=%2250%%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2262%22>💻</text>
            <text x=%2250%%22 y=%2250%%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2236%22>✏️</text></svg>`

let l = document.createElement("link")
l.rel = "icon"
l.href = `data:image/svg+xml,${svg}`
document.getElementsByTagName("head")[0].appendChild(l)

import {header_init} from "./header.js";
import {card_init} from "./card.js";
import {footer_init} from "./footer.js";

//location.pathname.split("/").slice(-1)[0].split(".")[0]

header_init()
card_init()
footer_init()



/* function load_page(){
    /*
    load the page depending on the status
    redirect to maintenance.html if status is false
    

    var file_name = location.pathname.split("/").slice(-1)[0];
    var page_name = file_name.split(".")[0];
    
    if ( !page_status[page_name] ) {
        window.location = "maintenance.html"
    }
}

load_page() */