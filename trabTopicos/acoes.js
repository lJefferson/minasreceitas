
//Aguardando página ser carregada
$(document).ready(function(){
    
    setup();

    $("#cards").fadeOut(500,function(){
        
        $(".carregar").fadeIn(500, function(){
            
            var id = "";
            
            if(id == ""){
                id = true;
            }
            console.log(id);
            
            var retorno = getAllIndexedDb();
            
        });
        
    });
    
});

function renderAll(retorno){

    //Limpa o que tem em conteúdo						
    $("#cards").html("");
    
    var json = JSON.stringify(retorno)

    if(json == "[]"){
        $("#cards").append("<h2 class='detalhe-title title-diminuir col-md-12 col-sm-12'>Você ainda não possui receitas registradas!</h2>")
    }
    else{
        //Loop para processar o JSON
        $.each(JSON.parse(json), function (key, item) {
        $("#cards").append(template_receitas(item['ID'],item['nome']))
        });
    }

    $(".carregar").fadeOut(500, function(){                
        $("#cards").fadeIn(500);        
    });		
}

//Função para montar template:
var template_receitas = function(id,nome){
    return "<div class='card col-md-3 col-sm-12'>"+
        "<div class='card-body'>"+
        "<h5 class='card-title'>"+ nome +"</h5>"+
        "</div>"+
    
        "<div class='id-template'>"+
        id+
        "</div>"+
    
        "<div class='row foot-card'>"+
            "<div class='btn-card2'>"+
            "<a onclick='detalhe("+id+")' class='btn btn-danger'>Ver Receita</a>"+
            "</div>"+
        "</div>"+
    "</div>";
}


function detalhe(id){
            
            window.localStorage.setItem('id', id );
            window.location = 'detalhe_receita.html';
        
};