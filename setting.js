page_status = {
    "index" : true
}

styles = {

    "font": ["Rubik", "Coolvetica"],

    "color": {"dark-blue": "#0A1128",
              "neon-green": "#4BFF88",
              "off-white": "#FEFCFB"}

    }


function initialize_styles(){
    /* set css variable to the client so all .css can use them*/

    //font
    document.documentElement.style.setProperty(`--primary-font`, `${styles["font"][0]}`);
    document.documentElement.style.setProperty(`--secondary-font`, `${styles["font"][1]}`);

    //color
    for (const [k, v] of Object.entries(styles["color"])) {
        document.documentElement.style.setProperty(`--${k}`, `${v}`);
    }
}

function load_page(){
    /*It will load the page depending on the status
    it will redirect to maintenance.html if status is false
    */

    var file_name = location.pathname.split("/").slice(-1)[0];
    var page_name = file_name.split(".")[0];
    
    if ( !page_status[page_name] ) {
        window.location = "maintenance.html"
    }
}

load_page()
initialize_styles()