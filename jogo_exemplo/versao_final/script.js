const game_display = document.getElementById("game-display"),
player_div = document.getElementById("player-div"),
player_key_up = document.getElementById("control-up"),
player_key_right = document.getElementById("control-right"),
player_key_down = document.getElementById("control-down"),
player_key_left = document.getElementById("control-left"),
destiny_key = document.getElementById("destiny-div"),
enemy_div = document.getElementById("first-enemy-div"),
keyboard_keys = { 38: "up", 39: "right", 40: "down", 37: "left" };

let VERIFY_KEY_TOUCH;  // Variável que verifica que se o jogador encostou na chave
let LEVEL = 1;

    // Verificar se as setas do teclado foram pressionadas (apenas para pc)
    document.onkeydown = keyboardKey;
    function keyboardKey(e) 
    {
        if(e.keyCode >= 37 && e.keyCode <= 40)
        {    
            playerMovement("control-" + keyboard_keys[e.keyCode]);
            e.preventDefault();  // Impedir que a página suba ou desça no navegador
        }
    }

    // Movimento do jogador
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

    // Verificar se o jogador encostou na chave
    function touchKey()
    {
        let key_width = parseInt(getComputedStyle(destiny_key).width);
        let key_height = parseInt(getComputedStyle(destiny_key).height);
        let key_top_pos = parseInt(getComputedStyle(destiny_key).top);
        let key_left_pos = parseInt(getComputedStyle(destiny_key).left);
        let player_top_pos = parseInt(getComputedStyle(player_div).top);
        let player_left_pos = parseInt(getComputedStyle(player_div).left);

        if(Math.abs(key_top_pos-player_top_pos) < key_height && parseInt(Math.abs(key_left_pos-player_left_pos)*1.6) < key_width)
        {
            LEVEL++;
        }

        clearTimeout(VERIFY_KEY_TOUCH);
    }












let enemy_movement_direction = "right";

    function enemyMovement()
    {   
        let game_display_width = parseInt(getComputedStyle(game_display).width);
        let enemy_div_width = parseInt(getComputedStyle(enemy_div).width);
        let enemy_left_pos = parseInt(getComputedStyle(enemy_div).left);

        let enemy_speed = Math.ceil(game_display_width/600);  

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


//const EVENT_VERIFIER = setInterval( () => { }, 500);