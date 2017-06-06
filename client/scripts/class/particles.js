
class Particules {
    constructor(game, particule, groupColision, groupParticules) {
        this.game = game;
        this.particule = particule;
        this.groupColision = groupColision;
        this.groupParticules = groupParticules;
        this.generateSprite();
    }

    generateSprite(){
        var part =  this.generateRandomImage();
        this.sprite = this.game.add.sprite(this.particule.x, this.particule.y, part);
        if (part == 'cookie'|| part == 'burger') {
            this.sprite.scale.setTo(0.2, 0.2);
        }
        else if (part == 'pizza' || part == 'apple')  this.sprite.scale.setTo(0.065, 0.065);
        else this.sprite.scale.setTo(0.1, 0.1);

        this.sprite.smoothed = false;
        this.sprite.animations.add('fly', [0,1,2,3,4,5], 10, true);
        this.sprite.play('fly');


        this.game.physics.p2.enable(this.sprite, false);

        this.setColision();

        this.sprite.id = this.particule.id;
        this.sprite.mass = this.particule.mass;
    }

    generateRandomImage(){
        var color = ['pizza', 'apple', 'burger', 'cookie', 'banana', 'melon'];
        return color[this.game.rnd.integerInRange(0, 5)];
    }


    setColision(){
        this.sprite.body.static = true;
        this.sprite.body.setCircle(this.sprite.width / 2);
        this.sprite.body.fixedRotation = true;
        this.sprite.body.setCollisionGroup(this.groupColision[2]);
        this.sprite.body.collides([this.groupColision[0], this.groupColision[1]]);
    }

    move(particle){
        if(this.sprite.alive){
            this.sprite.kill();
        }
        this.particule = particle;
        this.generateSprite();
    }
}

export default Particules;