window.onload =  function (){
  inicioJogo();

  function config(){
    let Tema = {
      canvas : "url(http://4.bp.blogspot.com/-Z2W82Y9MQ8Y/UbTkttrmwJI/AAAAAAAAAco/1ITlWYfji1E/s640/Modelo_Fusion-sonic.jpg)",
      body :"#0000FF" 
    }

    localStorage.setItem(Tema.JSON.stringfy(Tema));


    let TemaD = {
      canvas : "url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/da033e72-0c02-4f60-a051-5fbf5205e7e8/d2uolv5-34388794-cda3-4698-a432-327f020d3e49.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RhMDMzZTcyLTBjMDItNGY2MC1hMDUxLTVmYmY1MjA1ZTdlOFwvZDJ1b2x2NS0zNDM4ODc5NC1jZGEzLTQ2OTgtYTQzMi0zMjdmMDIwZDNlNDkuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.zQTrsdfP575Sa01y1adtCnWmmk0QN-pJvpr4coNLQdI)",
      body : "red"
    }
    localStorage.setItem(TemaD.JSON.stringfy(TemaD));
  }



  }
  document.querySelector ("#direita").addEventListener ("click",function(){
    direita();
    setTimeout(parar, 2000);
  });
   document.querySelector ("#esquerda").addEventListener ("click",function(){
    esquerda();
    setTimeout(parar, 2000);
  }); 
  document.querySelector ("#subir").addEventListener ("click",function(){
    subir();
    setTimeout(parar, 2000);
   
  });
 document.querySelector ("#descer").addEventListener ("click",function(){
    descer();
    setTimeout(parar, 2000);
  });
  document.querySelector ("#retry").addEventListener ("click", function () {
   reload();
  });

}
var personagemObj;


var obstaculo = [];

var pontos

function inicioJogo(){
  areaJogo.start();
  personagemObj = new componente("yellow", 10, 120, 25, 25); 
  pontos = new componente ("yellow", 0,40,  'consolas', '30px', 'texto');
// obstaculo = new componente('brown',150,90,60,10);

}
let areaJogo = {
     canvas: document.createElement("canvas"),
     start: function(){
       this.canvas.height = 300,
       this.context = this.canvas.getContext("2d");
       document.body.insertBefore(this.canvas, document.body.childNodes[0]);
       this.frame = 0;
       this.intervalo = setInterval(atualizaAreaJogo, 20);
     },
       limpar: function()
       {
         this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
        
       }, 
         parar : function(){
         clearInterval(this.interval);
       }
       

     

}
function contarIntervalo(n){
  if((areaJogo.frame / n) % 1 == 0){
    return true;
  }
  else {
    return false;
  }
}

 function componente(cor, x, y, largura, altura, tipo){
   this.tipo = tipo,
   this.altura = altura,
   this.largura = largura,
   this.x = x,
   this.y = y,
   this.velocidadeX = 0,
   this.velocidadeY = 0,
   this.texto = 0,
   this.atualiza = function(){
     contexto = areaJogo.context;
     if (this.tipo == 'texto'){
       contexto.font = this.altura + " " + this.largura;
       contexto.fillStyle = cor
       contexto.fillText(this.texto, this.x, this.y);


     }
     else{
       contexto.fillStyle = cor, 
     contexto.fillRect(this.x, this.y, this.altura, this.largura);
     }
     
   },
   this.novaPosicao = function (){
     this.x += this.velocidadeX;
     this.y += this.velocidadeY;
   },
   this.bater = function (obj){
     //posição do personagem
     let esquerda = this.x;
     let direita = this.x + this.largura;
     let superior = this.y;
     let inferior = this.y + this.altura;
     //posição do obstaculo
     let objEsquerda = obj.x;
     let objDireita = obj.x + obj.altura;
     let objSuperior = obj.y;
     let objInferior = obj.y + obj.largura;

     let batida = true;

     if(
       (inferior < objSuperior) || (superior > objInferior) ||
       (direita < objEsquerda)  || (esquerda > objDireita)
     ){
       batida = false;
     }
     return batida;

   }
 }
 function atualizaAreaJogo(){
   let x,y;

   for (i = 0; i < obstaculo.length; i ++){
     if(personagemObj.bater(obstaculo[i])){
     areajogo.parar();
     return;
   }

   }
   
   
   areaJogo.limpar();
   areaJogo.frame +=1;
   if (areaJogo.frame == 1 || contarIntervalo(150)){
     x = areaJogo.canvas.width;
     minAltura = 20;
     maxAltura = 200;
     altura = Math.floor (Math.random()*(maxAltura-minAltura+1)+minAltura);
     minVazio = 50;
     maxVazio = 200;
     Vazio = Math.floor (Math.random()*(maxVazio-minVazio+1)+minVazio);
     obstaculo.push( new componente('#4b3621',x,0,altura,10));
     obstaculo.push( new componente('#4b3621',x,altura + Vazio, x - altura - Vazio,10));

   }
   for(i = 0;i <  obstaculo.length; i++){
     obstaculo[i].x += -1;
     obstaculo[i].atualiza();
   } 

   pontos.texto = "pontos:" + areaJogo.frame;
   pontos.atualiza(); 
   personagemObj.novaPosicao();
   personagemObj.atualiza();

   }

   

 
 
function subir(){
  personagemObj.velocidadeY -= 1;
  
}

function descer(){
  personagemObj.velocidadeY += 1;
}

function direita(){
  personagemObj.velocidadeX += 1;
}

function esquerda(){
  personagemObj.velocidadeX -= 1;
}

function parar(){
  personagemObj.velocidadeX = 0;
  personagemObj.velocidadeY = 0;
}

function reload(){
  location.reload();
}