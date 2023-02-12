import Sortie from "./Sortie.js";
import ObstacleAnimeClignotant from "./ObstacleAnimeClignotant.js";
import ObstacleAnime from "./ObstacleAnime.js";
import Obstacle from "./ObstacleClass.js";
import ObstacleTexture from "./ObstacleTexture.js";
import Coin from "./Coin.js";
import ObstacleS from "./ObstacleS.js";


let tabNiveaux = [];

function creerLesNiveaux(assets) {

    let sortieLevel1 = new Sortie(750, 550, 30, 'yellow');

    let level1 = {
        objetsGraphiques: [
            sortieLevel1,
            new Obstacle(250, 0, 30, 300, 'green'),
            new ObstacleAnime(450, 0, 30, 100, 'green', 3),
           // new ObstacleAnimeClignotant(350, 0, 30, 100, 'red', 1),
            new Coin(100, 100, 50, 50, assets.coin, 10),
            new Coin(200, 150, 50, 50, assets.coin, 10),
            new Coin(400, 300, 50, 50, assets.coin, 10),
            new Coin(500, 200, 50, 50, assets.coin, 10),
            new ObstacleS(550,10,80,80,assets.g1,1,2),
            new ObstacleS(300,300,80,80,assets.g2,2,1),
        ],
        temps: 90,
        sortie : sortieLevel1,
        titre : "Niveau 1",
        description: "Souffre petit padawan !",
        background: "background",
        musique: "xmas"
    }
    tabNiveaux.push(level1);

    let sortieLevel2 = new Sortie(750, 100, 30, "orange");
    let url ='https://img.freepik.com/free-vector/seamless-japanese-inspired-geometric-pattern_53876-80353.jpg';
    let level2 = {
        objetsGraphiques: [
            sortieLevel2,
            new Obstacle(250, 0, 30, 300, 'green'),
            new ObstacleAnime(450, 0, 30, 100, 'green', 3),
            new ObstacleAnime(450, 0, 30, 300, 'green', 1),
            new ObstacleTexture(0, 350, 100, 30, url, 1),
            new ObstacleTexture(0, 450, 100, 30, url, 3),
            new Coin(200, 150, 50, 50, assets.coin, 10),
            new Coin(400, 300, 50, 50, assets.coin, 10),
            new Coin(300, 10, 50, 50, assets.coin, 10),
            new Coin(550, 180, 50, 50, assets.coin, 10),
            new ObstacleS(550,10,80,80,assets.g1,1,2),
            new ObstacleS(450,500,80,80,assets.g2,1,2),
            new ObstacleS(300,300,80,80,assets.g2,2,1),
        ],
        sortie: sortieLevel2,
        temps: 80,
        titre : "Niveau 2",
        description: "Ne te laisse pas faire !",
        background: "background",
        musique: "humbug"
    }
    tabNiveaux.push(level2);

    let sortieLevel3 = new Sortie(550, 150, 30, "blue");
    let level3 = {
        objetsGraphiques: [
            sortieLevel3,
            new Obstacle(250, 0, 30, 300, 'green'),
            new Obstacle(650, 0, 30, 300, 'green'),
            new ObstacleAnime(450, 0, 30, 100, 'green', 3),
            new ObstacleAnime(450, 0, 30, 300, 'green', 1),
            new ObstacleTexture(0, 350, 100, 30, url, 3),
            new ObstacleTexture(0, 450, 100, 30, url, 3),
            new ObstacleTexture(750, 550, 300, 30, url, 6),
            new Coin(100, 100, 50, 50, assets.coin, 10),
            new Coin(200, 150, 50, 50, assets.coin, 10),
            new Coin(400, 300, 50, 50, assets.coin, 10),
            new Coin(300, 10, 50, 50, assets.coin, 10),
            new Coin(550, 180, 50, 50, assets.coin, 10),
            new ObstacleS(550,10,80,80,assets.g1,1,2),
            new ObstacleS(450,500,80,80,assets.g2,1,2),
            new ObstacleS(450,250,80,80,assets.g1,2,1),
            new ObstacleS(300,300,80,80,assets.g2,2,1),
        ],
        sortie: sortieLevel3,
        temps: 70,
        titre : "Niveau 3",
        description: "Ne te laisse pas faire !",
        background: "background",
        musique: "humbug"
    }
    tabNiveaux.push(level3);

    let sortieLevel4 = new Sortie(750, 550, 30, 'yellow');
    let level4 = {
        objetsGraphiques: [
            sortieLevel4,
            new Obstacle(250, 0, 30, 300, 'green'),
            new Obstacle(650, 0, 30, 300, 'green'),
            new ObstacleAnime(450, 0, 30, 100, 'green', 3),
            new ObstacleAnimeClignotant(350, 0, 30, 100, 'red', 1),
            new ObstacleAnime(450, 0, 30, 300, 'green', 1),
            new ObstacleTexture(0, 350, 100, 30, url, 3),
            new ObstacleTexture(400, 350, 100, 30, url, 1),
            new ObstacleTexture(750, 550, 300, 30, url, 6),
            new Coin(100, 100, 50, 50, assets.coin, 10),
            new Coin(200, 150, 50, 50, assets.coin, 10),
            new Coin(400, 300, 50, 50, assets.coin, 10),
            new Coin(300, 10, 50, 50, assets.coin, 10),
            new Coin(550, 180, 50, 50, assets.coin, 10),
            new ObstacleS(550,10,80,80,assets.g1,1,2),
            new ObstacleS(450,500,80,80,assets.g2,1,2),
            new ObstacleS(450,250,80,80,assets.g1,2,1),
            new ObstacleS(300,300,80,80,assets.g2,2,1),
        ],
        sortie: sortieLevel4,
        temps: 60,
        titre : "Niveau 4",
        description: "Ne te laisse pas faire !",
        background: "background",
        musique: "humbug"
    }
    tabNiveaux.push(level4);

    let sortieLevel5 = new Sortie(750, 550, 30, 'yellow');
    let level5 = {
        objetsGraphiques: [
            sortieLevel5,
            new Obstacle(250, 0, 30, 300, 'green'),
            new Obstacle(650, 0, 30, 300, 'green'),
            new ObstacleAnime(450, 0, 30, 100, 'green', 3),
            new ObstacleAnimeClignotant(350, 0, 30, 100, 'red', 1),
            new ObstacleAnime(450, 0, 30, 300, 'green', 1),
            new ObstacleTexture(0, 350, 100, 30, url, 3),
            new ObstacleTexture(400, 350, 100, 30, url, 1),
            new ObstacleTexture(0, 450, 100, 30, url, 3),
            new ObstacleTexture(750, 550, 300, 30, url, 6),
            new Coin(100, 100, 50, 50, assets.coin, 10),
            new Coin(200, 150, 50, 50, assets.coin, 10),
            new Coin(400, 300, 50, 50, assets.coin, 10),
            new Coin(300, 10, 50, 50, assets.coin, 10),
            new Coin(550, 180, 50, 50, assets.coin, 10),
            new ObstacleS(550,10,80,80,assets.g1,1,2),
            new ObstacleS(450,500,80,80,assets.g2,1,2),
            new ObstacleS(450,250,80,80,assets.g1,2,1),
            new ObstacleS(300,300,80,80,assets.g2,2,1),
        ],
        sortie: sortieLevel5,
        temps: 50,
        titre : "Niveau 5",
        description: "Ne te laisse pas faire !",
        background: "background",
        musique: "humbug"
    }
    tabNiveaux.push(level5);
}

export { creerLesNiveaux, tabNiveaux }