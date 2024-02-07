/*
common header component:

    <common-header></common-header>

*/

import {color, smallwidth} from "./setting.js";

class Header extends HTMLElement {

    
    constructor(){
        super();
    }
    

    connectedCallback() {
        

        this.innerHTML = `<header>
                            <div id="firstline">
                                <a " href="https://github.com/aimanarifi" target="_blank"><img id="github-icon" src="./assets/github_icon.svg" alt="github icon"/></a>
                                <div id="navbar">
                                    <a href="index.html">Home</a>
                                    <a href="project.html">Projects</a>
                                    <a class="unavailable" href="about.html">About me</a>
                                    <a class="unavailable" href="contact.html">Contact</a>
                                </div>
                                <img id="menu" src="./assets/hamburger_menu.svg" alt="menu"/>
                            </div>
                            <div id="secondline"></div>
                          </header>`
                          ;


        //Highlight of the current page in the navbar
        var current_url = location.pathname.split("/").slice(-1)[0];

        for(const item of this.getElementsByTagName("a")){

            let short_url = item.href.split("/").slice(-1)[0]
            if (current_url == short_url){
                item.style.color = color["orange"];
            }
        }

        //DOM OBJECTS
        var firstline = document.getElementById("firstline")
        var secondline = document.getElementById("secondline")
        var menu = document.getElementById("menu")
        var navbar = document.getElementById("navbar")
    
        // inital header can have either menu or navbar not both
        if (document.documentElement.clientWidth <= smallwidth.split("px")[0]){

            firstline.removeChild(navbar)
            navbar.classList.add("collapse")
            secondline.appendChild(navbar)

        } else {
            firstline.removeChild(menu)
        }   

        // move navbar into firstline on wide screen, and into secondline on smaller screen
        menu.dataset.state = "collapse"

        var smallScreenQuery = window.matchMedia(`(max-width: ${smallwidth})`)
        smallScreenQuery.addEventListener("change", moveNavbar)

        function moveNavbar() {

            if(smallScreenQuery.matches) {

                if (firstline.contains(navbar)) {firstline.removeChild(navbar)}

                firstline.appendChild(menu)
                navbar.classList.add("collapse")
                secondline.appendChild(navbar)


            } else {
                
                if (firstline.contains(menu)){      firstline.removeChild(menu)    }
                if (secondline.contains(navbar)){   secondline.removeChild(navbar) }
                
                firstline.appendChild(navbar)
                navbar.classList.remove("open")
                navbar.classList.remove("collapse")
            }

            menu.dataset.state = "collapse"

        }

        // hamburger menu, the behaviour of collapsing navbar is handled by css as well as the class 
        menu.addEventListener("click", setMenuState)

        function setMenuState(){
             if (menu.dataset.state == "collapse") {
                menu.dataset.state = "open"
                navbar.classList.remove("collapse")
                navbar.classList.add("open")

            } else if (menu.dataset.state == "open") {
                menu.dataset.state = "collapse"
                navbar.classList.remove("open")
                navbar.classList.add("collapse")
            }           
        }
        
        document.getElementsByClassName("unavailable")[0].onclick = function(){
                alert("Oops, looks like the requested page isn't ready yet")
                return false
            }


        document.getElementsByClassName("unavailable")[1].onclick = function(){
            
            document.querySelector('common-footer').scrollIntoView()
            alert("Oops, looks like the requested page isn't ready yet. You can find some contact information at the footer.")
            return false
        }
        


        }



}


export function header_init(){
    customElements.define('common-header', Header);
}









