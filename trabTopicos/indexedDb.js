
//Variável Global que armazena o banco de dados para realizar as operaçõs
var database;

//Abertura do Banco de Dados IndexedDb
function setup(){

    //Nome do Banco de Dados
    const dbName = "receitas";
    if(!database){
        
        //Abrir o banco de dados
        var open = window.indexedDB.open(dbName, "1")

        //Se abertura ocorreu com sucesso
        open.onsuccess = function(event){
            database = this.result;
            console.log("Banco de dados criado com sucesso => " + database);
        }

        //Se for primeira abertura, cria os indices do banco. 
        //Caso a versão tenha sido alterada no parametro do método open(), atualiza com as novas informações
        open.onupgradeneeded = function(event){
            database = this.result;
            var objectStore = database.createObjectStore("receitas", {keyPath: "ID", autoIncrement : true});

            objectStore.createIndex("ID", "ID", {unique:true});
            objectStore.createIndex("NOME", "NOME", {unique:false});
            objectStore.createIndex("RECEITA", "RECEITA", {unique:false});
        }

    }
}

//Retornar todos os registros do banco de dados
function getAllIndexedDb(){
    var receitas = [];

    //Abre a transação com o banco de dados setado na variável global
    var transaction = database.transaction(["receitas"]);
    //Recupera a collection desejada
    var objectStore = transaction.objectStore("receitas");

    //Cria um cursor na collection para percorrer pelos registros
    var request = objectStore.openCursor();

    //Abertura com sucesso do cursor
    request.onsuccess = function(event){
        
        //Recebe o resultado do cursor 
        var cursor = event.target.result;
        
        if(cursor){
            //Adiciona ao vetor de receitas o valor (JSON) encontrado no cursor
            receitas.push(cursor.value);
            console.log("Cursor Atual => ", cursor.value);
            
            //Prossegue para próxima posição do cursor
            cursor.continue();
        }
        
        //Chamada do método de renderização da página 
        //passando o vetor de receitas preenchido
        renderAll(receitas)
    }
}

//Retornar registro buscando por ID
function getItemIndexedDb(id){

    //Abre a transação com o banco de dados setado na variável global
    var transaction = database.transaction(["receitas"]);
    //Recupera a collection desejada
    var objectStore = transaction.objectStore("receitas");
    
    var detalhe = [];

    //Escolhe o indice a ser percorrido na busca
    var myIndex = objectStore.index("ID"); 

    //Abre o cursor para percorrer no índice escolhido
    myIndex.openCursor().onsuccess = function(event) {

        //Recebe o resultado do cursor
        var cursor = event.target.result;
        
        if(cursor) {

            //Se o valor no indice escolhido é igual ao parâmetro
            if(cursor.value.ID == id){
                //Adiciona ao vetor de receitas o valor (JSON) encontrado no cursor
                detalhe.push(cursor.value);
                console.log("Cursor Atual => ", cursor.value);
            }

            //Prossegue para próxima posição do cursor
            cursor.continue();

        }else{

            //Chamada do método de renderização da página passando os dados
            renderItem(detalhe);
        }
        
    }
}

//Inserir Registro no banco IndexedDb
function saveIndexedDb(receita) {

    var retorno = "";

    //Abre a transação com o banco de dados setado na variável global
    var transaction = database.transaction("receitas", 'readwrite');
    //Recupera a collection desejada
    var objectStore = transaction.objectStore("receitas");

    //Insere o objeto passado por parâmetro
    var request = objectStore.add(receita);
    
    //Retorna o objeto de request para a página que fez a chamada
    return request;
}