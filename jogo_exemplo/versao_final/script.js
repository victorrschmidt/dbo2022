const game_display = document.getElementById("game-display"),
enemy_div = document.getElementById("first-enemy-div"),
player_div = document.getElementById("player-div"),
player_key_up = document.getElementById("control-up"),
player_key_right = document.getElementById("control-right"),
player_key_down = document.getElementById("control-down"),
player_key_left = document.getElementById("control-left");

let enemy_movement_direction = "right";

    function enemyMovement()
    {   
        let game_display_width = parseInt(getComputedStyle(game_display).width);
        let enemy_div_width = parseInt(getComputedStyle(enemy_div).width);
        let enemy_left_pos = parseInt(getComputedStyle(enemy_div).left);

        let enemy_speed = Math.ceil(game_display_width/300);  

        if(enemy_movement_direction == "right")
        {
            enemy_div.style.left = `${enemy_left_pos + enemy_speed}px`;

            if(parseFloat(enemy_div.style.left) > game_display_width - enemy_div_width)
            {
                enemy_div.style.left = `${game_display_width - enemy_div_width}px`;
            }

            if(enemy_left_pos >= game_display_width - enemy_div_width)
            {
                enemy_movement_direction = "left";
            }
        }

        if(enemy_movement_direction == "left")
        {
            enemy_div.style.left = `${enemy_left_pos - enemy_speed}px`;

            if(enemy_left_pos <= 0)
            {
                enemy_div.style.left = 0;
                enemy_movement_direction = "right";
            }
        }
    }

let enemy_time = setInterval("enemyMovement()", 6);

const keyboard_keys = { 38: "up", 39: "right", 40: "down", 37: "left" };
document.onkeydown = keyboardKey;

    function keyboardKey(e) {
        
        if(e.keyCode >= 37 && e.keyCode <= 40)
        {    
            playerMovement("control-" + keyboard_keys[e.keyCode]);
        }
    }

let VERIFY_KEY_TOUCH;

    function playerMovement(key)
    {
        let game_display_width = parseInt(getComputedStyle(game_display).width);
        let game_display_height = parseInt(getComputedStyle(game_display).height);
        let player_div_width = parseInt(getComputedStyle(player_div).width);
        let player_div_height = parseInt(getComputedStyle(player_div).height);
        let player_top_pos = parseInt(getComputedStyle(player_div).top);
        let player_left_pos = parseInt(getComputedStyle(player_div).left);

        let player_speed = Math.ceil(game_display_width/55);

        if(key == "control-up")
        {
            player_div.style.top = `${player_top_pos - player_speed}px`;
            if(parseFloat(player_div.style.top) < 0)
            {
                player_div.style.top = 0;
            }
        }

        if(key == "control-right")
        {
            player_div.style.left = `${player_left_pos + player_speed}px`;
            if(parseFloat(player_div.style.left) > game_display_width - player_div_width)
            {
                player_div.style.left = `${game_display_width - player_div_width}px`;
            } 
        }

        if(key == "control-down")
        {
            player_div.style.top = `${player_top_pos + player_speed}px`;
            if(parseFloat(player_div.style.top) > game_display_height - player_div_height)
            {
                player_div.style.top = `${game_display_height - player_div_height}px`;
            }
        }

        if(key == "control-left")
        {
            player_div.style.left = `${player_left_pos - player_speed}px`;
            if(parseFloat(player_div.style.left) < 0)
            {
                player_div.style.left = 0;
            }
        }
        
        VERIFY_KEY_TOUCH = setTimeout("touchKey()", 500);
    }

let destiny_key = document.getElementById("destiny-div");

    function touchKey()
    {
        let key_width = parseInt(getComputedStyle(destiny_key).width);
        let key_height = parseInt(getComputedStyle(destiny_key).height);
        let key_top_pos = parseInt(getComputedStyle(destiny_key).top);
        let key_left_pos = parseInt(getComputedStyle(destiny_key).left);
        let player_top_pos = parseInt(getComputedStyle(player_div).top);
        let player_left_pos = parseInt(getComputedStyle(player_div).left);

        if(key_top_pos+(key_height-4) - player_top_pos >= -4 && key_left_pos+(key_width-4) - player_left_pos >= -4)
        {
            alert('voce ganhou!');
        }

        clearTimeout(VERIFY_KEY_TOUCH);
    }

//const EVENT_VERIFIER = setInterval( () => { }, 500);



/*
}

    function colisao(){
    let div1Left= parseInt(getComputedStyle(div1).left);
    let div1Top= parseInt(getComputedStyle(div1).top);
    let div1Height= parseInt(getComputedStyle(div1).height);
    let div1Width= parseInt(getComputedStyle(div1).width);

    let div2Left= parseInt(getComputedStyle(div2).left);
    let div2Top= parseInt(getComputedStyle(div2).top);
    let div2Height= parseInt(getComputedStyle(div2).height);
    let div2Width= parseInt(getComputedStyle(div2).width);
    
    let fundoHeight= parseInt(getComputedStyle(fundo).height);
    let fundoWidth= parseInt(getComputedStyle(fundo).width);



        if (((div1Left >= div2Left)&&(div1Left <= div2Left + div2Width))&&
            ((div1Top >= div2Top)&&(div1Top <= div2Top + div2Height))){
                para2();
                para();
        }
        if (((div2Left >= div1Left)&&(div2Left <= div1Left + div1Width))&&
            ((div2Top >= div1Top)&&(div2Top <= div1Top + div1Height))){
                para2();
                para();
        }
    }


//Ao carregar a página estas linhas são executadas. 
let contador = 0;
let cont = 0;
   let m = setInterval("moverdireita()", 15); //Funções que são chamadas a cada 15 e 5 milisegundos
let n = setInterval("colisao()", 5); */