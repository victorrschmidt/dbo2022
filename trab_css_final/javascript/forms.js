// Valores globais do form
let form = document.querySelector("#form");
let display_erros = document.querySelector("#display_erros");
let nome = document.querySelector("#nome");
let cpf = document.querySelector("#cpf");
let senha = document.querySelector("#senha");
let conf_senha = document.querySelector("#conf_senha");
let profissao;
let estado;
let anos;
// Variáveis para erros
let erros = 0;
let erro_nome; 
let erro_cpf;
let erro_senha;
let erro_conf_senha;
let erro_profissao;
let erro_anos;
// Armazenar valores
let info_nome; 
let info_cpf; 
let info_senha;
let info_profissao;
let info_estado;
let info_anos;
// Etapa do form
let etapa = 1;
let wait = true;

form.addEventListener("submit", (e) => { verifyForm(e) });

    function verifyForm(e) {
        
        if(etapa == 1) {
            // Remover mensagens de erro
            if(document.querySelector("#erro_nome") != null) {
                document.querySelector("#erro_nome").remove();
                nome.style.borderColor = "black";   
            }
            if(document.querySelector("#erro_cpf") != null) {
                document.querySelector("#erro_cpf").remove();
                cpf.style.borderColor = "black";
            }
            if(document.querySelector("#erro_senha") != null) {
                document.querySelector("#erro_senha").remove();
                senha.style.borderColor = "black"; 
            }
            if(document.querySelector("#erro_conf_senha") != null) {
                document.querySelector("#erro_conf_senha").remove();
                conf_senha.style.borderColor = "black"; 
            }

            erros = 0;
            verifyNome(e);
            verifyCpf(e);
            verifySenha(e);
            verifyConfSenha(e);
            setFocus();
    
            if(erros == 0) { // Passou para o segundo form
                etapa = 2;
                // Guardar valores
                info_nome = nome.value;
                info_cpf = cpf.value;
                info_senha = senha.value;
                // Remover elementos do form
                nome.remove();
                cpf.remove();
                senha.remove();
                document.querySelector("#label_nome").remove();
                document.querySelector("#f1l1").remove();
                document.querySelector("#f1l2").remove();
                document.querySelector("#f2l1").remove();
                document.querySelector("#f2l2").remove();
                document.querySelector("#f3l1").remove();
                document.querySelector("#f3l2").remove();
                document.querySelector("#label_cpf").remove();
                document.querySelector("#small_cpf").remove();
                document.querySelector("#label_senha").remove();
                document.querySelector("#small_senha").remove();
                document.querySelector("#grupo_form_4").remove();
                // Criar novos elementos
                // Profissão
                let new_label = document.createElement("label");
                let lines = document.createTextNode("Profissão");
                new_label.appendChild(lines);
                lines = document.createElement("br");
                new_label.setAttribute("id","label_profissao");
                let new_input = document.createElement("input");
                new_input.setAttribute("type","text");
                new_input.setAttribute("id","profissao");
                new_input.setAttribute("name","profissao");
                new_input.setAttribute("placeholder","Qual sua profissão?");
                new_label.setAttribute("for","profissao");
                document.querySelector("#grupo_form_1").appendChild(new_label);
                document.querySelector("#grupo_form_1").appendChild(lines);
                document.querySelector("#grupo_form_1").appendChild(new_input);
                lines = document.createElement("br");
                document.querySelector("#grupo_form_1").appendChild(lines);
                // Estado
                new_label = document.createElement("p");
                new_label.style.marginBottom = "7px";
                lines = document.createTextNode("Estado");
                new_label.appendChild(lines);
                document.querySelector("#grupo_form_2").appendChild(new_label);
                new_input = document.createElement("input");
                new_input.setAttribute("class","radio");
                new_input.setAttribute("type","radio");
                new_input.setAttribute("name","estado");
                new_input.setAttribute("id","rs");
                new_input.setAttribute("value","RS");
                document.querySelector("#grupo_form_2").appendChild(new_input);
                new_label = document.createElement("label");
                lines = document.createTextNode("RS");
                new_label.appendChild(lines);
                new_label.setAttribute("for","rs");
                document.querySelector("#grupo_form_2").appendChild(new_label);

                new_input = document.createElement("input");
                new_input.setAttribute("class","radio");
                new_input.setAttribute("type","radio");
                new_input.setAttribute("name","estado");
                new_input.setAttribute("id","sc");
                new_input.setAttribute("value","SC");
                document.querySelector("#grupo_form_2").appendChild(new_input);
                new_label = document.createElement("label");
                lines = document.createTextNode("SC");
                new_label.appendChild(lines);
                new_label.setAttribute("for","sc");
                document.querySelector("#grupo_form_2").appendChild(new_label);

                new_input = document.createElement("input");
                new_input.setAttribute("class","radio");
                new_input.setAttribute("type","radio");
                new_input.setAttribute("name","estado");
                new_input.setAttribute("id","pr");
                new_input.setAttribute("value","PR");
                document.querySelector("#grupo_form_2").appendChild(new_input);
                new_label = document.createElement("label");
                lines = document.createTextNode("PR");
                new_label.appendChild(lines);
                new_label.setAttribute("for","pr");
                document.querySelector("#grupo_form_2").appendChild(new_label);

                // Anos de experiência
                new_label = document.createElement("label");
                lines = document.createTextNode("Anos de experiência");
                new_label.appendChild(lines);
                lines = document.createElement("br");
                new_label.setAttribute("id","label_anos");
                new_input = document.createElement("input");
                new_input.setAttribute("type","number");
                new_input.setAttribute("id","anos");
                new_input.setAttribute("name","anos");
                new_input.setAttribute("placeholder","Anos de experiência na área");
                new_label.setAttribute("for","anos");
                document.querySelector("#grupo_form_3").appendChild(new_label);
                document.querySelector("#grupo_form_3").appendChild(lines);
                document.querySelector("#grupo_form_3").appendChild(new_input);
                lines = document.createElement("br");
                document.querySelector("#grupo_form_3").appendChild(lines);
                new_label = document.createElement("small");
                lines = document.createTextNode("De 0 a 50 anos");
                new_label.appendChild(lines);
                new_label.setAttribute("id","small_anos");
                document.querySelector("#grupo_form_3").appendChild(new_label);
                
                // Atribuir valor às variáveis
                profissao = document.querySelector("#profissao");
                anos = document.querySelector("#anos");
            }
        }

        if(etapa == 2) {
            // Remover mensagens de erro
            if(document.querySelector("#erro_profissao") != null) {
                document.querySelector("#erro_profissao").remove();
                profissao.style.borderColor = "black";   
            }
            if(document.querySelector("#erro_estado") != null) {
                document.querySelector("#erro_estado").remove();
                document.querySelector("#grupo_form_2").style.border = "none";
            }
            if(document.querySelector("#erro_anos") != null) {
                document.querySelector("#erro_anos").remove();
                anos.style.borderColor = "black"; 
            }
            if(!(wait)) {
                erros = 0;
                verifyProfissao(e);
                verifyEstado(e);
                verifyAnos(e);
                setFocus();

                if(erros === 0) {
                    // Armazenar valores
                    info_profissao = profissao.value;
                    info_estado = estado;
                    info_anos = anos.value;

                    // Remover elementos                
                    document.querySelector("#fieldset").remove();
                    display_erros.remove();
                    // Adicionar dados 
                    let conf_div = document.createElement("div");
                    conf_div.setAttribute("id","confirmar_dados");
                    form.insertBefore(conf_div, form.firstChild);

                    new_label = document.createElement("h1");
                    lines = document.createTextNode("As informações estão corretas?");
                    new_label.appendChild(lines);
                    form.insertBefore(new_label, form.firstChild);
                    
                    let data = document.createElement("div");
                    data.setAttribute("id","data");
                    conf_div.appendChild(data);
                    let data_title = document.createElement("p");
                    new_label = document.createElement("b");
                    lines = document.createTextNode("Dados do usuário:");
                    new_label.appendChild(lines);
                    data_title.appendChild(new_label);
                    data.appendChild(data_title);
                    new_label = document.createElement("p");
                    lines = document.createTextNode(`Nome: ${info_nome}`);
                    new_label.appendChild(lines);
                    data.appendChild(new_label);
                    new_label = document.createElement("p");
                    lines = document.createTextNode(`CPF: ${info_cpf}`);
                    new_label.appendChild(lines);
                    data.appendChild(new_label);
                    new_label = document.createElement("p");
                    lines = document.createTextNode(`Senha: ${info_senha}`);
                    new_label.appendChild(lines);
                    data.appendChild(new_label);
                    new_label = document.createElement("p");
                    lines = document.createTextNode(`Profissão: ${info_profissao}`);
                    new_label.appendChild(lines);
                    data.appendChild(new_label);
                    new_label = document.createElement("p");
                    lines = document.createTextNode(`Estado: ${info_estado}`); 
                    new_label.appendChild(lines);
                    data.appendChild(new_label);
                    new_label = document.createElement("p");
                    lines = document.createTextNode(`Anos de experiência: ${info_anos}`); 
                    new_label.appendChild(lines);
                    data.appendChild(new_label);
                    new_label = document.createElement("img");
                    new_label.setAttribute("src","../../img/design/user_icon.png");
                    new_label.setAttribute("height","256px");
                    new_label.setAttribute("width","256px");
                    new_label.setAttribute("id","user_icon");
                    new_label.setAttribute("alt","usuario");
                    conf_div.appendChild(new_label);

                    // Modificar button
                    let btn = document.querySelector("#main_button");
                    btn.removeChild(btn.firstChild);
                    lines = document.createTextNode("Confirmar");
                    btn.appendChild(lines);
                }
            }
            wait = false;
        }
        e.preventDefault();
    }
    
    // Funções de verificação

    // Verificar nome
    function verifyNome(e) {
        
        if(nome.value.trim() == "") {
            
            let erro_p = document.createElement("p");
            erro_p.setAttribute("id","erro_nome");
            erro_p.style.color = "red";
            erro_p.style.marginBottom = "5px";
            let erro_txt = document.createTextNode("*O campo 'Nome' é obrigatório.");
            erro_p.appendChild(erro_txt);
            display_erros.appendChild(erro_p);
            nome.style.borderColor = "red";
            erro_nome = true;
            erros++;
        }  
    }
    
    // Verificar CPF
    function verifyCpf(e) {
    
        let nan_error = false;
    
        if(cpf.value.trim().length == 11) { 

            for(let i of cpf.value){  // A função também verifica se foram digitados apenas números.
                if(isNaN(i)){
                    nan_error = true;
                    break;
                }
            }
        }

        if(cpf.value.trim().length != 11 || nan_error) {

            let erro_p = document.createElement("p");
            erro_p.setAttribute("id","erro_cpf");
            erro_p.style.color = "red";
            erro_p.style.marginBottom = "5px";
            let erro_txt;

            if(cpf.value.trim() == "") {
                erro_txt = document.createTextNode("*O campo 'CPF' é obrigatório.");
            } 
            else if(nan_error) {
                erro_txt = document.createTextNode("*Digite apenas números no campo 'CPF'.");
            }
            else {
                erro_txt = document.createTextNode("*O campo 'CPF' deve conter 11 caracteres.");
            }

            erro_p.appendChild(erro_txt);
            display_erros.appendChild(erro_p);
            cpf.style.borderColor = "red";
            erro_cpf = true;
            erros++;
        }
    }
    
    // Verificar senha
    function verifySenha(e) {
        
        if(senha.value.trim().length < 8) {
            
            let erro_p = document.createElement("p");
            erro_p.setAttribute("id","erro_senha");
            erro_p.style.color = "red";
            erro_p.style.marginBottom = "5px";
            let erro_txt;

            if(senha.value.trim() == "") {
                erro_txt = document.createTextNode("*O campo 'Senha' é obrigatório.");
            }
            else {
                erro_txt = document.createTextNode("*O campo 'Senha' deve conter no mínimo 8 caracteres.");
            }

            erro_p.appendChild(erro_txt);
            display_erros.appendChild(erro_p);
            senha.style.borderColor = "red";
            erro_senha = true;
            erros++;
        }  
    }

    // Verificar confirmação de senha
    // OBS: Esta função só cria uma mensagem de erro caso o campo 'senha' tenha sido preenchido
    function verifyConfSenha(e) {
        
        if(!(erro_senha) && conf_senha.value != senha.value) {
            
            let erro_p = document.createElement("p");
            erro_p.setAttribute("id","erro_conf_senha");
            erro_p.style.color = "red";
            let erro_txt;

            if(conf_senha.value.trim() == "") {
                erro_txt = document.createTextNode("*O campo 'Confirmar senha' é obrigatório.");
            }
            else {
                erro_txt = document.createTextNode("*As senhas dos campos 'Senha' e 'Confirmar senha' não conferem." );
            }

            erro_p.appendChild(erro_txt);
            display_erros.appendChild(erro_p);
            conf_senha.style.borderColor = "red";
            erro_conf_senha = true;
            erros++;
        }  
    }
    
    // Focar no input com erro (na ordem dos inputs)
    function setFocus() {
        if(erro_anos){
            anos.focus();
        }
        if(erro_profissao){
            profissao.focus();
        }
        if(erro_conf_senha){
            conf_senha.focus();
        }
        if(erro_senha){
            senha.focus();
        }
        if(erro_cpf){
            cpf.focus();
        }
        if(erro_nome){
            nome.focus();
        }
        erro_nome = false;
        erro_cpf = false;
        erro_senha = false;
        erro_conf_senha = false;
        erro_profissao = false;
        erro_anos = false;
    }
    
    // Verificar profissão
    function verifyProfissao(e) {
        
        if(profissao.value.trim() == "") {
            
            let erro_p = document.createElement("p");
            erro_p.setAttribute("id","erro_profissao");
            erro_p.style.color = "red";
            erro_p.style.marginBottom = "5px";
            let erro_txt = document.createTextNode("*O campo 'Profissão' é obrigatório.");
            erro_p.appendChild(erro_txt);
            display_erros.appendChild(erro_p);
            profissao.style.borderColor = "red";
            erro_profissao = true;
            erros++;
        }  
    }
    
    // verificar estado
    function verifyEstado(e) {
        
        let valores = document.querySelectorAll("input[name='estado']");

            for(let valor of valores) {
                if(valor.checked) {
                    estado = valor.value;
                    break;
                }
            }

        if(estado === undefined) {

            let erro_p = document.createElement("p");
            erro_p.setAttribute("id","erro_estado");
            erro_p.style.color = "red";
            erro_p.style.marginBottom = "5px";
            let erro_txt = document.createTextNode("*O campo 'Estado de residência' é obrigatório.");
            erro_p.appendChild(erro_txt);
            display_erros.appendChild(erro_p);
            document.querySelector("#grupo_form_2").style.border = "solid red 1px";
            erros++;
        }
    }
    
    // verificar anos
    function verifyAnos(e) {
        
        if(anos.value < 0 || anos.value > 50 || anos.value == "") {
            
            let erro_p = document.createElement("p");
            erro_p.setAttribute("id","erro_anos");
            erro_p.style.color = "red";
            erro_p.style.marginBottom = "5px";
            let erro_txt;

            if(anos.value < 0 || anos.value > 50) {
                erro_txt = document.createTextNode("*O campo 'Anos de experiência' deve receber um valor entre 0 e 50."); 
            }
            else {
                erro_txt = document.createTextNode("*O campo 'Anos de experiência' é obrigatório.");
            }
            erro_p.appendChild(erro_txt);
            display_erros.appendChild(erro_p);
            anos.style.borderColor = "red";
            erro_anos = true;
            erros++;
        }  
    }

