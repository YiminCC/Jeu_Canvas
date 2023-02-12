import Obstacle  from './ObstacleClass.js';

// bonne pratique : une seule classe exportée par fichier et on l'exporte par 
// defaut
export default class ObstacleS extends Obstacle {
    constructor(x, y, l, h, image, vy, vx) {
        // on appelle le constructeur de la classe mère
        super(x, y, l, h, 'black');
        this.vy = -vy;
        this.vx = -vx;
        this.image=image
    }
    // on hérite de la méthode draw(ctx)
    draw(ctx) {
        this.y += this.vy;
        this.x += this.vx;
        // collision en bas
        if(this.y + this.h > ctx.canvas.height) {
            // On met l'obstacle au point de contact
            this.y = ctx.canvas.height - this.h;
            // et on inverse la vitesse
            this.vy = -this.vy;
        }
        // collision en haut
        if(this.y < 0) {
            // On met l'obstacle au point de contact
            this.y = 0;
            // et on inverse la vitesse
            this.vy = -this.vy;
        }
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

        // on appelle la méthode draw de la classe mère
        ctx.drawImage(this.image, this.x, this.y, this.l, this.h);
    }

}

