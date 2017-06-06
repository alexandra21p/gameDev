
class Enemy {
    constructor(game, enemy, groupColision) {
        this.game = game;
        this.enemy = enemy;
        this.groupColision = groupColision;

        this.scaleX = 0.3;
        this.scaleY = 0.3;

        this.generateSprite();
    }

    generateRandomImage(){
        var pics = ['doge', 'pepe'];
        //return color[this.game.rnd.integerInRange(0, 1)];
        return pics[Math.floor(Math.random() * pics.length)];
    }

    generateSprite(){
        var bmd = this.generateRandomImage();

        this.sprite = this.game.add.sprite(this.enemy.x, this.enemy.y, bmd);
        this.sprite.scale.setTo(this.scaleX, this.scaleY);
        this.game.physics.p2.enable(this.sprite, false);

        this.setColision();

        this.sprite.id = this.enemy.id;
        this.sprite.username = '';
        this.sprite.mass = this.enemy.mass;
        this.sprite.speed_base = 5000;
        this.sprite.speed = this.enemy.speed;
        this.sprite.width = this.enemy.width;
        this.sprite.height = this.enemy.height;
        this.sprite.scaleX = this.scaleX;
    }

    generateCircle(color){
        var bitmapSize = this.enemy.mass * 2;
        var bmd = this.game.add.bitmapData(bitmapSize, bitmapSize);
        bmd.ctx.fillStyle = color;
        bmd.ctx.beginPath();
        bmd.ctx.arc(this.enemy.mass, this.enemy.mass, this.enemy.mass, 0, Math.PI*2, true);
        bmd.ctx.closePath();
        bmd.ctx.fill();
        return bmd;
    }

    setColision(){
        this.sprite.body.static = true;
        this.sprite.body.setCircle(this.sprite.width / 2);
        this.sprite.body.fixedRotation = false;
        this.sprite.body.setCollisionGroup(this.groupColision[1]);
        this.sprite.body.collides([this.groupColision[0], this.groupColision[2]]);
    }

    move(particle){
        if(this.sprite.alive){
            this.sprite.kill();
        }
        this.enemy = particle;
        this.generateSprite();
    }
}

export default Enemy;