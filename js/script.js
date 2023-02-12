import Joueur from './JoueurClasse.js';
import Obstacle from './ObstacleClass.js';
import ObstacleAnime from './ObstacleAnime.js';
import ObstacleAnimeClignotant from './ObstacleAnimeClignotant.js';
import ObstacleTexture from './ObstacleTexture.js';
import { ajouteEcouteurSouris, ajouteEcouteursClavier, inputState, mousePos } from './ecouteurs.js';
import { circRectsOverlap, rectsOverlap } from './collisions.js';
import { loadAssets } from './assets.js';
import Coin from './Coin.js';
import { creerLesNiveaux, tabNiveaux } from './levels.js';
import Timer from './Timer.js';


let canvas, ctx;
let assets;
let timer;
let gameState = 'menuStart';
let joueur, sortie;
let niveau = 0;
let score = 0;
let tableauDesObjetsGraphiques = [];

// Bonne pratique : on attend que la page soit chargée
// avant de faire quoi que ce soit
window.onload = init;

function init(event) {
    console.log("Page chargée et les éléments HTML sont prêts à être manipulés");
    canvas = document.querySelector('#myCanvas');
    //console.log(canvas);
    // pour dessiner, on utilise le contexte 2D
    ctx = canvas.getContext('2d');

    // chargement des assets (musique,  images, sons)
    loadAssets(startGame);

    //startGame();
}

function startGame(assetsLoaded) {
    assets = assetsLoaded;
    timer = new Timer("decompte");
    // On crée les niveaux
    creerLesNiveaux(assets);

    // appelée quand tous les assets sont chargés
    console.log("StartGame : tous les assets sont chargés");
    //assets.backinblack.play();

   // On va prendre en compte le clavier
   ajouteEcouteursClavier();
   ajouteEcouteurSouris();

    demarreNiveau(niveau);
    requestAnimationFrame(animationLoop);
}

function demarreNiveau(niveau) {
    if(niveau > tabNiveaux.length-1)  {
        console.log("PLUS DE NIVEAUX !!!!!");
        niveau--;
        return;
    } 
     // sinon on passe au niveau suivant
    timer.stop();
    timer.setTime(tabNiveaux[niveau].temps);
    timer.start();
    timer.getTime();
    if(timer.getTime <= 0){
        gameState = 'gameOver';
    }
    // On initialise les objets graphiques qu'on va utiliser pour le niveau
    // courant avec les objets graphiques dans tabNiveaux[niveau]   
    tableauDesObjetsGraphiques = [...tabNiveaux[niveau].objetsGraphiques];  
    // On crée le joueur   
     joueur = new Joueur(0, 50, 50, 50, assets.joueur, 3);
     sortie = tabNiveaux[niveau].sortie;
     // et on l'ajoute au tableau des objets graphiques
     tableauDesObjetsGraphiques.push(joueur);

     // on démarre la musique du niveau
     let nomMusique = tabNiveaux[niveau].musique; 
     //assets[nomMusique].play();
}

function creerDesObstaclesLevel1() {
    tableauDesObjetsGraphiques.push(new Obstacle(250, 0, 30, 300, 'green'));
    tableauDesObjetsGraphiques.push(new ObstacleAnime(450, 0, 30, 100, 'green', 3));
    tableauDesObjetsGraphiques.push(new ObstacleAnimeClignotant(350, 0, 30, 100, 'red', 1));
    let url ='https://img.freepik.com/free-vector/seamless-japanese-inspired-geometric-pattern_53876-80353.jpg';
    tableauDesObjetsGraphiques.push(new ObstacleTexture(0, 350, 100, 30, url, 1));
    tableauDesObjetsGraphiques.push(new ObstacleTexture(0, 450, 100, 30, url, 3));
}

function dessinerLesObjetsGraphiques(ctx) {
    tableauDesObjetsGraphiques.forEach(o => {
        o.draw(ctx);
    });
    /*
    for(let i = 0; i < tableauDesObstacles.length; i++) {
        tableauDesObstacles[i].draw(ctx);
    }
    */
}

var y = 0;
let ximg = 0;
function animationLoop() {
    // On va exécuter cette fonction 60 fois par seconde
    // pour créer l'illusion d'un mouvement fluide
    // 1 - On efface le contenu du canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (gameState) {
        case 'menuStart':
            afficheMenuStart(ctx);
            break;
        case 'gameOver':
            afficheGameOver(ctx);
            break;
        case 'ecranDebutNiveau':
            afficheEcranDebutNiveau(ctx);
            break;
        case 'gamerestart':
            afficherestart(ctx);
                break;
        case 'jeuEnCours':

            let backgroundImageName = tabNiveaux[niveau].background;
            let imgBackGround = assets[backgroundImageName];
            if (imgBackGround.pattern) {
                let pattern = ctx.createPattern(imgBackGround, 'repeat');
                ctx.save();
                ctx.fillStyle = pattern;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.restore();
            } else {
                ctx.drawImage(imgBackGround, 0, 0, canvas.width, canvas.height);
            }

            tableauDesObjetsGraphiques.forEach(o => {
                o.draw(ctx);
            });
            afficheScore(ctx);
            afficheVie(ctx);
            timer.draw(ctx, 150, 30);
            

            //briqueBleue1.draw(ctx);

            // 3 - on déplace les objets
            testeEtatClavierPourJoueur();
            joueur.move();
            //joueur.followMouse()
            joueur.testeCollisionAvecBordsDuCanvas(canvas.width, canvas.height);
           // detecteCollisionJoueurAvecObstacles();
            detecteCollisionJoueurAvecObstaclesEtPieces();
            detecteCollisionJoueurAvecSortie();
            break;
    }

    // 4 - On rappelle la fonction d'animation
    requestAnimationFrame(animationLoop);
}

function afficheScore(ctx) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, 10, 30);
    ctx.restore();
}

function afficheVie() {
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.fillText("Vies: " + joueur.nbVies, 700, 30);
    ctx.restore();
}

function afficheEcranDebutNiveau(ctx) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "30px Arial";
    ctx.fillText("Félicitations pour avoir terminé votre niveau "+niveau+"!", 50, 250);
    if (inputState.space) {
        gameState = 'jeuEnCours';
    }
    ctx.restore();
}


function afficheMenuStart(ctx) {
    ctx.save()
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "50px Arial";
    ctx.fillText("Press space to start", 190, 100);
    ctx.strokeText("Press space to start", 190, 100);
    if (inputState.space) {
        gameState = 'jeuEnCours';
    }
    ctx.restore();
}
function afficheGameOver(ctx) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "60px Arial";
    ctx.fillText("GAME OVER", 190, 100);
    ctx.fillText("Press space to start", 190, 200);
    ctx.strokeText("GAME OVER", 190, 100);
    ctx.strokeText("Press space to start", 190, 200);
    if(inputState.space){
        niveau=0;
        demarreNiveau(niveau);
        score=0;
        gameState = 'jeuEnCours';
    }
    ctx.restore();
}
function testeEtatClavierPourJoueur() {
    if(inputState.space) {
        // on saute
        joueur.saute();
    } else {
        joueur.vx = 0;
        
        if (inputState.left) {
            joueur.vx = -5;
        } else {
            if (inputState.right) joueur.vx = 5;
        }
        joueur.vy = 0;
        if (inputState.up) {
            joueur.vy = -5;
        } else {
            if (inputState.down) joueur.vy = 5;
        }
    }
}


function detecteCollisionJoueurAvecObstaclesEtPieces() {
    let collisionExist = false;
    // On va tester si le joueur est en collision avec un des obstacles
    tableauDesObjetsGraphiques.forEach((o, index) => {
        if (o instanceof Obstacle) {
            if (rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, o.x, o.y, o.l, o.h)) {
                collisionExist = true;
                assets.plop.play();
            }
        } else if(o instanceof Coin) {
            if (rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, o.x, o.y, o.l, o.h)) {
                // collision avec une pièce
                score += o.nbPoints;
                joueur.nbVies ++;
                assets.victory.play();
                // splice supprime un élément d'un tableau
                // 1er paramètre : l'index de l'élément à supprimer, 
                // 2ème paramètre : le nombre d'éléments à supprimer
                tableauDesObjetsGraphiques.splice(index, 1);
            }
        }
    });

    if (collisionExist) {
        joueur.couleur = 'red';
        //gameState = 'gameOver';
        joueur.x =0;
        joueur.y =50;
        joueur.nbVies -- ;
        if(joueur.nbVies <= 0){
        gameState = 'gameOver';}
    } else {
        joueur.couleur = 'green';
    }
}

function detecteCollisionJoueurAvecSortie() {
    joueur.drawBoundingBox(ctx);
    sortie.drawBoundingBox(ctx);
    if (circRectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, sortie.x, sortie.y, sortie.r)&&joueur.nbVies>0) {
        joueur.x = 0;
        joueur.y = 0;
        gameState = 'ecranDebutNiveau';
        niveauSuivant();
        sortie.couleur = 'lightgreen';
        assets.victory.play();
    }
}

function niveauSuivant() {
    // Passe au niveau suivant....
    // todo.....
    console.log("Niveau suivant !");
    // on arre^te la musique du niveau courant
    let nomMusique = tabNiveaux[niveau].musique; 
    assets[nomMusique].stop();    
    // et on passe au niveau suivant
    niveau++;
    demarreNiveau(niveau);
    score=0;
}
