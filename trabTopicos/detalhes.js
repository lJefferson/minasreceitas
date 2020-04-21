$(document).ready(function(){

    var id = window.localStorage.getItem('id');
    setTimeout(function(){ getItemIndexedDb(id);}, 1000);
            
});

document.addEventListener("DOMContentLoaded", function() {
    setup();
  });


function renderItem(receita){
    //Limpa o que tem em conteúdo						
    $("#cards").html("");
    
    var json2 = JSON.stringify(receita)

    //Loop para processar o JSON
    $.each(JSON.parse(json2), function (key, item) {
        $("#cards").append(template_receita(item['ID'],item['nome'],item['receita']));	
    });
}

//Função para montar template:
var template_receita = function(id,nome,receita){
    return "<div class='row'>"+
                    "<div class='col-md-12 col-sm-12 '>"+
                        "<div class='row'>"+
                            "<h2 class='detalhe-title title-diminuir col-md-12 col-sm-12'>"+ nome +"</h2>"+
                            "<br>"+
                            "<br>"+
                            "<br>"+
                            
                            "<div class='col-md-12 col-sm-12'>"+
                            "<h5 col-md-12 col-sm-12'>Ingredientes: </h5>"+
                            "<br>"+
                            "<br>"+
                            "<p class='texto'>"+
                                receita+
                            "</p>"+    
                            "</div>"+
                        "</div>"+

                    "</div>"+

                "<div class='id-template'>"+
                    id+
                "</div>"+

                
                    "<div class='bt-voltar'>"+
                        "<a class='btn btn-danger' href='index.html'>Voltar</a>"+
                    "</div>"+
                
            "</div>";
}