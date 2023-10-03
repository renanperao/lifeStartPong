//Posicionameto e Tamanho da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//Velociade da Bolinha
let velocidadeXbolinha = 6;
let velocidadeYbolinha = 6;

//Variaveis da Raquete
let xRaquete = 5;
let yRaquete = 150;
let alturaRaquete = 90;
let comprimentoRaquete = 10;

//Variaveis do Oponente
let xOponente = 585;
let yOponente = 150;
let velocidadeDoOponente;

let colidiu = false

let chanceDeErrar = 0;

//Sons do Jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("soundtrack.mp3");
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

//Placar do Jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//cria a area de trabalho
function setup() {
  createCanvas(600, 400); 
  trilha.loop();

}

//the magic is here
function draw() {
  background(0);
  mostrarBolinha();
  mecherBolinha();
  identificarBordas();
  mostrarRaquete(xRaquete, yRaquete);
  movimentoRaquete();
  //toqueRaquete();
  colisaoRaqueteAlt(xRaquete, yRaquete);
  mostrarRaquete(xOponente, yOponente);
  movimentoOponente();
  colisaoRaqueteAlt(xOponente, yOponente)
  incluiPlacar();
  marcarPontos();
  calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
  }

function mostrarBolinha(){
  circle (xBolinha, yBolinha, diametro)
}

function mecherBolinha(){
  xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeYbolinha;
}

function identificarBordas(){
  if (xBolinha + raio> width || xBolinha - raio< 0){
    velocidadeXbolinha *=-1}
  
  if (yBolinha + raio> height || yBolinha - raio< 0){
    velocidadeYbolinha *=-1;
  }
  }

function mostrarRaquete(x,y){
  rect(x, y, comprimentoRaquete, alturaRaquete)
}

function movimentoRaquete() {
  if (keyIsDown(DOWN_ARROW) && yRaquete + alturaRaquete < height) {
    yRaquete += 10;
  }

  if (keyIsDown(UP_ARROW) && yRaquete > 0) {
    yRaquete -= 10;
  }
}

function toqueRaquete() {
  if (xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    velocidadeXbolinha *= -1;
  }
}

function movimentoOponente(){
  velocidadeDoOponente = yBolinha - yOponente - comprimentoRaquete / 2 - 70;
  yOponente += velocidadeDoOponente + chanceDeErrar
  calculaChanceDeErrar
}

function colisaoRaqueteAlt(x,y){
  colidiu = 
    collideRectCircle(x,y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
        velocidadeXbolinha *= -1;
        raquetada.play()
  }

}

function limiteRaquete() {
  if (yRaquete < 0) {
    yRaquete = 0;
  }
  else if (yRaquete > 400 - raqueteComprimento) {
    yRaquete = 400 - raqueteComprimento;
  }
  else if (yRaqueteOponente < 0) {
    yRaqueteOponente = 0;
  }
  else if (yRaqueteOponente > 400 - raqueteComprimento) {
    yRaqueteOponente = 400 - raqueteComprimento;
  }
}


function incluiPlacar(){
    stroke(255)
    textAlign(CENTER);
    textSize(16);
    fill(color(255,140,0))
    rect(150,10,40,20)
    fill(255)
    text(meusPontos,170, 25)
    fill(color(255,140,0))
    rect(450,10,40,20)
    fill(255)
    text(pontosDoOponente,470, 25)
}

function marcarPontos(){
  if (xBolinha > 590){
    meusPontos += 1
    ponto.play()
  }
  
  if (xBolinha < 10){
    pontosDoOponente += 1
    ponto.play()
  }
} 

function movimentoOponente() {
    let diferencaY = yBolinha - yOponente - comprimentoRaquete / 2;
    if (random(0, 100) < chanceDeErrar) {
        diferencaY = random(-7, 7); 
    }
    yOponente += diferencaY * 0.05;
}


function calculaChanceDeErrar() {
    if (pontosDoOponente >= meusPontos) {
        chanceDeErrar = 30; 
    } else {
        chanceDeErrar = 60; 
    }
}

 function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 10
    }
   if (xBolinha + raio > 600){
     xBolinha = 580
   }
}
