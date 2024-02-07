
class Footer extends HTMLElement {

    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `<div id="footer-main">
                            <div id="text-area">
                                <h2>Let's work together!</h2>
                                <p>reach out to me at <span>arifikamal01@gmail.com</span> or my LinkedIn</p>
                            </div>
                            <div id="social">
                            <a href="https://github.com/aimanarifi" target="_blank"><img src="./assets/github_icon_blue.png" alt="GitHub icon"/></a>
                            <a href="https://www.linkedin.com/in/muhammad-aiman-arifi-kamaludin-9210a62b1/" target="_blank"><img src="./assets/linkedin.png" alt="LinkedIn icon"/></a>
                            </div>
                          </div>
                          <div id="credit"><p>All icons are obtaine from www.flaticon.com and designed by multiple creators</p></div>`;
    }
    
}

export function footer_init(){
    customElements.define('common-footer', Footer);
}

