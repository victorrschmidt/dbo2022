const game_display = document.getElementById("game-display"),
player = document.getElementById("player-div"),
key = document.getElementById("key-div"),
keyboard_keys = { 38: "up", 39: "right", 40: "down", 37: "left" },
start_screen = document.getElementById("start-screen"),
continue_option = document.getElementById("continue-option"),
newgame_option = document.getElementById("newgame-option"),
config_option = document.getElementById("config-option"),
dificulty_option = document.getElementById("dificulty-option"),
easy_option = document.getElementById("easy-option"),
medium_option = document.getElementById("medium-option"),
hard_option = document.getElementById("hard-option"),
colors_option = document.getElementById("colors-option"),
show_color = document.getElementById("show-color"),
player_color = document.getElementById("player-color"),
apply_color = document.getElementById("apply-color"),
confirm_color = document.getElementById("confirm-color"),
clear_option = document.getElementById("clear-option"),
records_option = document.getElementById("records-option"),
records_table = document.getElementById("records-table"),
back_records = document.getElementById("back-records"),
melhor_tempo = document.getElementById("melhor-tempo"),
end_screen = document.getElementById("end-screen"),
win_screen = document.getElementById("win-screen"),
lost_screen = document.getElementById("lost-screen"),
try_time = document.getElementById("time"),
background_music = document.getElementById("background-music"),
audio_control = document.getElementById("audio-control");

let force_music_pause = false;
let LEVEL = 1;
let ENEMIES = [document.getElementById("first-enemy-div")];
let ENEMIES_MOVE_DIRECTION = ["right"];
let ENEMIES_POSITIONS = [];
let PLAYER_FREEZE = true;
let DIFICULDADE;
let time = 0;
let TIMER;
let LOCALSTORAGE = true;

    // Local storage
    if(typeof(Storage) == "undefined")
    {
        LOCALSTORAGE = false;
        console.log("Não possível salvar os recordes no Local Storage.");
    }

    if(localStorage.getItem("Dificuldade") == null)
    {
        localStorage.setItem("Dificuldade", 2);
        DIFICULDADE = 2;
    } else {
        DIFICULDADE = Number(localStorage.getItem("Dificuldade"));
    }

    if(localStorage.getItem("Cor") == null)
    {
        localStorage.setItem("Cor", "#800080");
    } else {
        player.style.backgroundColor = localStorage.getItem("Cor");
    }

    if(localStorage.getItem("Record") != null)
    {
        let time = Number(localStorage.getItem("Record"));
        melhor_tempo.innerHTML = `${String(parseInt(time/3600)).padStart("2","0")}:${String(parseInt(time%3600/60)).padStart("2","0")}:${String(parseInt(time%3600%60/1)).padStart("2","0")}.${String(parseInt(time%3600%60%1*10))}`;
    }

    // Remover as divs dos inimigos da fase passada e criar "number" inimigos para a próxima fase
    function removeCreateEnemies(number)
    {   
        let enemies = document.getElementsByClassName("enemy");
        let amount = enemies.length;
        
        for(let i = 0; i < amount; i++)
        {
            enemies[0].remove();
        }

        for(let i = 0; i < number; i++)
        {
            let new_enemy = document.createElement("div");
            new_enemy.setAttribute("class", "enemy");
            new_enemy.style.top = `${ENEMIES_POSITIONS[i].slice(0, ENEMIES_POSITIONS[i].indexOf(" "))}%`;
            new_enemy.style.left = `${ENEMIES_POSITIONS[i].slice(ENEMIES_POSITIONS[i].indexOf(" ")+1)}%`;
            game_display.appendChild(new_enemy);
        }

        ENEMIES = document.getElementsByClassName("enemy");
    }
    
    // Organizar elementos das fases (posição do jogador, chave e dos inimigos)
    function createLevel()
    {
        switch(LEVEL)
        {
            case 1:
                player.style.top = "86%";
                player.style.left = "47%";

                key.style.display = "unset";  // Ajustar a posição da chave
                key.style.top = "6%";
                key.style.left = "45.5%";

                ENEMIES_MOVE_DIRECTION = ["right"];
                ENEMIES_POSITIONS = ["45.5 0"];
                removeCreateEnemies(1);
                break;

            case 2:
                key.style.display = "unset";  
                key.style.top = "86%";
                key.style.left = "45.5%";
                
                ENEMIES_MOVE_DIRECTION = ["right", "left"];
                ENEMIES_POSITIONS = ["30 0", "60 92"];
                removeCreateEnemies(2);
                break;

            case 3:
                key.style.display = "unset";  
                key.style.top = "46%";
                key.style.left = "90%";
            
                ENEMIES_MOVE_DIRECTION = ["right", "up", "down"];
                ENEMIES_POSITIONS = ["60 0", "91 60", "0 78"];
                removeCreateEnemies(3);
                break;

            case 4:
                key.style.display = "unset";  
                key.style.top = "46%";
                key.style.left = "2%";
    
                ENEMIES_MOVE_DIRECTION = ["down", "up", "down", "up", "down"];
                ENEMIES_POSITIONS = ["2 12", "92 28", "2 44", "92 60", "2 76"];
                removeCreateEnemies(5);
                break;

            case 5:
                key.style.display = "unset";  
                key.style.top = "46%";
                key.style.left = "45.5%";

                ENEMIES_MOVE_DIRECTION = ["right", "right", "left", "left", "up"];
                ENEMIES_POSITIONS = ["30 0", "60 0", "30 92", "60 92", "92 30"];
                removeCreateEnemies(5);
                break;

            case 6:
                key.style.display = "unset";
                key.style.top = "86%";
                key.style.left = "45.5%";

                ENEMIES_MOVE_DIRECTION = ["down", "up", "right", "left", "right", "left"];
                ENEMIES_POSITIONS = ["0 35", "92 60", "28 0", "28 92", "62 0", "62 92"];
                removeCreateEnemies(6);
                break;

            case 7:
                key.style.display = "unset"; 
                key.style.top = "6%";
                key.style.left = "45.5%";

                ENEMIES_MOVE_DIRECTION = ["right", "right", "right", "right", "left", "left", "left", "left", "up", "down", "up", "down"];
                ENEMIES_POSITIONS = ["5 0", "26 0", "47 0", "68 0", "5 92", "26 92", "47 92", "68 92", "92 8", "0 25", "92 65", "0 82"];
                removeCreateEnemies(12);
                break;

            default:
                winLostScreen("win");
        }
    }

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
        let player_width = parseInt(getComputedStyle(player).width);
        let player_height = parseInt(getComputedStyle(player).height);
        let player_top_pos = parseInt(getComputedStyle(player).top);
        let player_left_pos = parseInt(getComputedStyle(player).left);

        let player_speed = Math.ceil(game_display_width/55);
         
        if(PLAYER_FREEZE == false){
            
            if(force_music_pause == false)
            {
                background_music.play();
            }

            if(key == "control-up")
            {
                player.style.top = `${player_top_pos - player_speed}px`;

                if(parseFloat(player.style.top) < 0)
                {
                    player.style.top = 0;
                }
            }

            if(key == "control-right")
            {
                player.style.left = `${player_left_pos + player_speed}px`;

                if(parseFloat(player.style.left) > game_display_width - player_width)
                {
                    player.style.left = `${game_display_width - player_width}px`;
                } 
            }

            if(key == "control-down")
            {
                player.style.top = `${player_top_pos + player_speed}px`;

                if(parseFloat(player.style.top) > game_display_height - player_height)
                {
                    player.style.top = `${game_display_height - player_height}px`;
                }
            }

            if(key == "control-left")
            {
                player.style.left = `${player_left_pos - player_speed}px`;

                if(parseFloat(player.style.left) < 0)
                {
                    player.style.left = 0;
                }
            }
        }
        
        verifyKeyCollision();
    }

    // Verificar se o jogador encostou na chave
    function verifyKeyCollision()
    {
        let key_width = parseInt(getComputedStyle(key).width);
        let key_height = parseInt(getComputedStyle(key).height);
        let key_top_pos = parseInt(getComputedStyle(key).top);
        let key_left_pos = parseInt(getComputedStyle(key).left);
        let player_top_pos = parseInt(getComputedStyle(player).top);
        let player_left_pos = parseInt(getComputedStyle(player).left);
        
        if(Math.abs(key_top_pos-player_top_pos) < key_height && parseInt(Math.abs(key_left_pos-player_left_pos)*1.6) < key_width)
        {
            key.style.display = "none";
            LEVEL++;
            if(LOCALSTORAGE)
            {
                localStorage.setItem("Fase", LEVEL);
            }
            createLevel();
        }
    }

let enemy_movement_interval;
let enemy_speed;

    // Movimentação dos inimigos
    function enemyMovementsCollisions()
    {   
        for(let i = 0; i < ENEMIES.length; i++)
        {
            let enemy = ENEMIES[i];

            let game_display_width = parseInt(getComputedStyle(game_display).width);
            let game_display_height = parseInt(getComputedStyle(game_display).height);
            let enemy_width = parseInt(getComputedStyle(enemy).width);
            let enemy_height = parseInt(getComputedStyle(enemy).height);
            let enemy_top_pos = parseInt(getComputedStyle(enemy).top);
            let enemy_left_pos = parseInt(getComputedStyle(enemy).left);
            let player_top_pos = parseInt(getComputedStyle(player).top);
            let player_left_pos = parseInt(getComputedStyle(player).left);

            if(DIFICULDADE == 1)
            { 
                enemy_speed = Math.ceil(game_display_width/400);
            }
            else if(DIFICULDADE == 2)
            {
                enemy_speed = Math.ceil(game_display_width/300);
            }
            else {
                enemy_speed = Math.ceil(game_display_width/200);
            }
                

            if(ENEMIES_MOVE_DIRECTION[i] == "right")
            {
                enemy.style.left = `${enemy_left_pos + enemy_speed}px`;

                if(parseFloat(enemy.style.left) > game_display_width - enemy_width)
                {
                    enemy.style.left = `${game_display_width - enemy_width}px`;
                }

                if(enemy_left_pos >= game_display_width - enemy_width)
                {
                    ENEMIES_MOVE_DIRECTION[i] = "left";
                }
            }

            if(ENEMIES_MOVE_DIRECTION[i] == "left")
            {
                enemy.style.left = `${enemy_left_pos - enemy_speed}px`;

                if(enemy_left_pos <= 0)
                {
                    enemy.style.left = 0;
                    ENEMIES_MOVE_DIRECTION[i] = "right";
                }
            }

            if(ENEMIES_MOVE_DIRECTION[i] == "up")
            {
                enemy.style.top = `${enemy_top_pos - enemy_speed}px`;

                if(enemy_top_pos <= 0)
                {
                    enemy.style.top = 0;
                    ENEMIES_MOVE_DIRECTION[i] = "down";
                }
            }

            if(ENEMIES_MOVE_DIRECTION[i] == "down")
            {
                enemy.style.top = `${enemy_top_pos + enemy_speed}px`;

                if(parseFloat(enemy.style.top) > game_display_height - enemy_height)
                {
                    enemy.style.top = `${game_display_height - enemy_height}px`;
                }

                if(enemy_top_pos >= game_display_height - enemy_height)
                {
                    ENEMIES_MOVE_DIRECTION[i] = "up";
                }
            }

            if(Math.abs(enemy_left_pos-player_left_pos)+4< enemy_width && Math.abs(enemy_top_pos-player_top_pos)+4 < enemy_height) 
            {
                winLostScreen("lost");
            }
        }
    }
  
    // Mostrar tela de vitória ou derrota
    function winLostScreen(result)
    {
        clearInterval(TIMER);
        clearInterval(enemy_movement_interval);
        PLAYER_FREEZE = true;
        end_screen.style.display = "flex";

        if(result == "lost")
        {
            key.style.display = "none";
            lost_screen.style.display = "flex";
        } 
        else {
            win_screen.style.display = "flex";
            let extense = `${String(parseInt(time/3600)).padStart("2","0")}:${String(parseInt(time%3600/60)).padStart("2","0")}:${String(parseInt(time%3600%60/1)).padStart("2","0")}.${String(parseInt(time%3600%60%1*10))}`;
            try_time.innerHTML = extense;
            
            if(localStorage.getItem("Record") == null)
            {
                localStorage.setItem("Record", time);
                melhor_tempo.innerHTML = extense;
            }
            else if(time < Number(localStorage.getItem("Record"))) {
                localStorage.setItem("Record", time);
                melhor_tempo.innerHTML = extense;
            }
        }

        time = 0;
        localStorage.removeItem("Fase");
        localStorage.removeItem("Tempo");
    }

    // Reiniciar o jogo
    function restartGame()
    {
        end_screen.style.display = "none";
        win_screen.style.display = "none";
        lost_screen.style.display = "none";

        LEVEL = 1;
        createLevel();

        enemy_movement_interval = setInterval(enemyMovementsCollisions, 6);
        PLAYER_FREEZE = false;
        TIMER = setInterval( () => { time += 0.1; localStorage.setItem("Tempo", time) }, 100); 
    }

    // Volta ao menu
    function backToMenu()
    {
        end_screen.style.display = "none";
        win_screen.style.display = "none";
        lost_screen.style.display = "none";
        LEVEL = 1;
        createLevel();
        start_screen.style.display = "flex";
    }
    
    // Controle da música
    audio_control.addEventListener("click", () => {
        if(force_music_pause == false)
        {
            force_music_pause = true;
            background_music.pause();
            audio_control.setAttribute("class", "audio-off");
        }
        else {
            force_music_pause = false;
            background_music.play();
            audio_control.setAttribute("class", "audio-on");
        }
    });

    // Opções do menu inicial
    function mainMenu()
    {
        continue_option.style.display = "initial";
        newgame_option.style.display = "initial";
        config_option.style.display = "initial";
        records_option.style.display = "initial";
        easy_option.style.display = "none";
        medium_option.style.display = "none";
        hard_option.style.display = "none";
        show_color.style.display = "none";
        player_color.style.display = "none";
        apply_color.style.display = "none";
        confirm_color.style.display = "none";
        records_table.style.display = "none";
        back_records.style.display = "none";
    }
    
    continue_option.addEventListener("click", () => {
        start_screen.style.display = "none";
        LEVEL = Number(localStorage.getItem("Fase"));
        if(LEVEL == 0)
        {
            LEVEL++;
        }
        createLevel();
        enemy_movement_interval = setInterval(enemyMovementsCollisions, 6);
        PLAYER_FREEZE = false;
        let tempo_anterior = Number(localStorage.getItem("Tempo"));
        TIMER = setInterval( () => { time += 0.1; localStorage.setItem("Tempo", time + tempo_anterior) }, 100); 
    });

    newgame_option.addEventListener("click", () => {
        start_screen.style.display = "none";
        enemy_movement_interval = setInterval(enemyMovementsCollisions, 6);
        PLAYER_FREEZE = false;
        TIMER = setInterval( () => { time += 0.1; localStorage.setItem("Tempo", time) }, 100); 
    });

    config_option.addEventListener("click", () => {
        continue_option.style.display = "none";
        newgame_option.style.display = "none";
        config_option.style.display = "none";
        records_option.style.display = "none";
        dificulty_option.style.display = "initial";
        colors_option.style.display = "initial";
        clear_option.style.display = "initial";
    });

    dificulty_option.addEventListener("click", () => {
        dificulty_option.style.display = "none";
        colors_option.style.display = "none";
        clear_option.style.display = "none";
        easy_option.style.display = "initial";
        medium_option.style.display = "initial";
        hard_option.style.display = "initial";
    });

    easy_option.addEventListener("click", () => {
        DIFICULDADE = 1;
        localStorage.setItem("Dificuldade", 1);
        console.log("Dificuldade atual: Fácil");
        mainMenu();
    });

    medium_option.addEventListener("click", () => {
        DIFICULDADE = 2;
        localStorage.setItem("Dificuldade", 2);
        console.log("Dificuldade atual: Médio");
        mainMenu();
    });

    hard_option.addEventListener("click", () => {
        DIFICULDADE = 3;
        localStorage.setItem("Dificuldade", 3);
        console.log("Dificuldade atual: Difícil");
        mainMenu();
    });

    colors_option.addEventListener("click", () => {
        dificulty_option.style.display = "none";
        colors_option.style.display = "none";
        clear_option.style.display = "none";
        show_color.style.display = "initial";
        player_color.style.display = "initial";
        apply_color.style.display = "initial";
        confirm_color.style.display = "initial";
    });

    apply_color.addEventListener("click", () => {
        show_color.style.backgroundColor = player_color.value;
        player.style.backgroundColor = player_color.value;
        localStorage.setItem("Cor", player_color.value);
    });

    confirm_color.addEventListener("click", () => {
        mainMenu();
    });

    clear_option.addEventListener("click", () => {
        melhor_tempo.innerHTML = "--";
        localStorage.removeItem("Record");
        console.log("Recordes apagados do Local Storage.");
        dificulty_option.style.display = "none";
        colors_option.style.display = "none";
        clear_option.style.display = "none";
        mainMenu();
    });

    records_option.addEventListener("click", () => {
        continue_option.style.display = "none";
        newgame_option.style.display = "none";
        config_option.style.display = "none";
        records_option.style.display = "none";
        records_table.style.display = "initial";
        back_records.style.display = "initial";
    });

    back_records.addEventListener("click", () => {
        mainMenu();
    });