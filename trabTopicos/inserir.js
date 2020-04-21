$(document).ready(function(){
    setup();
});

function inserir(){
    
    //desabilitar botão de salvar para evitar duplo clique
    var btnInserir = document.getElementById('inserir');
    btnInserir.disabled = true;

    var nome = $("#titulo").val();
    var receitatxt = $("#receita").val();

    var receita = {
        nome: nome,
        receita: receitatxt
    }

    var request = saveIndexedDb(receita);
            
    request.onsuccess = function(event){
        console.log("receita Inserida => ", event.target.result);

        alert("Inserido com Sucesso");
    }

    request.onerror = function(event){
        console.log("Erro ao Inserir Receita");
        alert("Ocorreu um erro ao Inserir.")
    }

    setTimeout(function(){ btnInserir.disabled = false}, 5000);
    window.location.reload(true);
};