
class Header extends HTMLElement {

    constructor(){
        super();
    }

    connectedCallback() {
        this.innerHTML = `<link rel="stylesheet" href="header.css">
                          <header>
                            <a id="github-header" href="https://github.com/aimanarifi"><img src="./assets/github_icon.svg" alt="GitHub icon"/></a>
                            <div id="navbar">
                                <a href="index.html">Home<hr></a>
                                <a href="projects.html">Projects<hr></a>
                                <a href="about.html">About me<hr></a>
                                <a href="contact.html">Contact<hr></a>
                            </div>
                          </header>`
                          ;

        //Show the underline of the current page in the navbar
        var current_url = location.pathname.split("/").slice(-1)[0];
        for(const item of this.getElementsByTagName("a")){

            let short_url = item.href.split("/").slice(-1)[0]
            if (current_url == short_url){
                item.getElementsByTagName("hr")[0].style.visibility = "visible";
            }
        }

    }
}

customElements.define('common-header', Header);

class Footer extends HTMLElement {

    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `<link rel="stylesheet" href="footer.css">
                          <footer>
                            <img id="blob" src="./assets/horizontal_blob.svg" alt="blob"/>
                            <div id="flex-container">
                                <div id="text-area">
                                    <h2>Fancy working together?</h2>
                                    <p>reach out to me at</p>
                                    <p id="email">arifikamal01@gmail.com</p>
                                </div>
                                <a id="github-footer" href="https://github.com/aimanarifi"><img src="./assets/github_icon.svg" alt="GitHub icon"/></a>
                            </div>
                          </footer>`;

        window.addEventListener('load', function() {
            //reposition the blob behind email when everything are rendered
            var email_rect = document.getElementById("email").getClientRects()[0];
            var blob = document.getElementById("blob");
            var blob_rect = blob.getClientRects()[0];
            
            blob.style.top = email_rect['y'] + email_rect['height']/2 - blob_rect['height']/2 + 'px';
            blob.style.left = email_rect['x'] + email_rect['width']/2 - blob_rect['width']/2 + 'px';
            });                        
    }
    
    
}


customElements.define('common-footer', Footer);