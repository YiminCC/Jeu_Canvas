import Obstacle from "./ObstacleClass.js";
// bonne pratique : une seule classe exportée par fichier et on l'exporte par 
// defaut
export default class ObstacleTexture extends Obstacle {
    constructor(x, y, l, h, url_texture, vx) {
        // on appelle le constructeur de la classe mère
        super(x, y, l, h, 'black');

        // On cree une texture et on l'affecte à la couleur
        this.image = new Image();
        this.image.onload = () => {
            this.ready = true;
        }

        this.image.src = url_texture;
        this.vx = -vx;
    }

    draw(ctx) {
        if(this.ready) {
            // on appelle la méthode draw de la classe mère
            this.texture = ctx.createPattern(this.image, 'repeat');
            this.couleur = this.texture;
            this.x +=this.vx;

            if(this.x + this.l > ctx.canvas.width) {
            // On met l'obstacle au point de contact
            this.x = ctx.canvas.width - this.l;
            // et on inverse la vitesse
            this.vx = -this.vx;
        }
        // collision en haut
        if(this.x < 0) {
            // On met l'obstacle au point de contact
            this.x = 0;
            // et on inverse la vitesse
            this.vx = -this.vx;
        }
            super.draw(ctx);
        }
    }
}

