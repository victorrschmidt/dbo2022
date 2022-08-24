let icone = document.querySelector('#sanduiche');
let menus = document.querySelector('#menus');

icone.addEventListener('click', e => { abrirMenu() });
    
    function abrirMenu() {
        
        if(icone.className === "inativo") {
            icone.className = "sanduiche_ativo";
            menus.className += " menus_ativo";
          

        } else {
            icone.className = "inativo";
            menus.className = "";
        }

    }