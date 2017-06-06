
class Player {
    constructor(game, socket, groupColision) {
        this.game = game;
        this.socket = socket;
        this.groupColision = groupColision;

        this.id = socket.io.engine.id;
        this.mass = 20;
        this.speed_base = 5000;
        this.speed = this.speed_base / this.mass;
        this.x = this.game.world.randomX;
        this.y = this.game.world.randomY;

        this.scaleX = 0.3;
        this.scaleY = 0.3;

        this.generateSprite();
    }

    generateSprite(){
        this.sprite = this.game.add.sprite(this.x, this.y, 'nyan_cat_sprite');
        this.sprite.scale.setTo(this.scaleX, this.scaleY);

        //this.sprite.smoothed = false;
        //this.sprite.animations.add('run', [0,1,2,3,4,5,6,7,8,9,10,11], 10, true);
        //this.sprite.play('run');

        this.game.physics.p2.enable(this.sprite, false);

        this.setColision();

        this.sprite.mass = this.mass;
        this.sprite.speed_base = 5000;
        this.sprite.speed = this.sprite.speed_base / this.sprite.mass;

        this.game.camera.follow(this.sprite);
    }


    setColision(){
        this.sprite.body.setCircle(this.sprite.width / 2);
        this.sprite.body.fixedRotation = true;
        this.sprite.body.setCollisionGroup(this.groupColision[0]);
        this.sprite.body.collides(this.groupColision[1], this.enemyCallback, this);
        this.sprite.body.collides(this.groupColision[2], this.particulesCallback, this);
    }

    enemyCallback(body1, body2){
        console.log('my player: ', this.sprite.mass, this.scaleX, this.sprite.width);
        console.log('enemy: ', body2.sprite.mass, body2.sprite.width);
        if(body2.sprite.alive && this.sprite.mass - (this.sprite.mass * 0.2) > body2.sprite.mass){
            this.mass += body2.sprite.mass;
            this.speed = this.sprite.speed_base / this.sprite.mass;
            this.x = this.sprite.x;
            this.y = this.sprite.y;

            this.scaleX += body2.sprite.scaleX;
            this.scaleY += body2.sprite.scaleY;

            this.sprite.kill();
            this.generateSprite();

            var enemy = {
                id: body2.sprite.id,
                username: body2.sprite.username,
                speed: body2.sprite.speed,
                mass: body2.sprite.mass,
                x: body2.sprite.x,
                y: body2.sprite.y,
                scaleX: body2.sprite.scaleX,
                scaleY: body2.sprite.scaleY,
                height: body2.sprite.height,
                width: body2.sprite.width,
                killed: body2.sprite.killed
            };

            body2.sprite.kill();
            this.socket.emit('kill_player', enemy);
        }
        else if(this.sprite.alive && body2.sprite.mass - (body2.sprite.mass * 0.2) > this.sprite.mass){
            this.sprite.kill();
            this.socket.emit('kill_player', this.toJson());
        }
    }

    particulesCallback(body1, body2){
        if(body2.sprite.alive){
            this.mass += body2.sprite.mass;
            this.speed = this.sprite.speed_base / this.sprite.mass;
            this.x = this.sprite.x;
            this.y = this.sprite.y;
            this.scaleX = this.scaleX + 0.02;
            this.scaleY = this.scaleY + 0.02;

            this.sprite.kill();
            this.generateSprite();

            body2.sprite.kill();
            this.socket.emit('update_particles', body2.sprite.id);
        }
    }

    toJson () {
        return {
            id: this.sprite.id,
            username: this.sprite.username,
            speed: this.sprite.speed,
            mass: this.sprite.mass,
            x: this.sprite.x,
            y: this.sprite.y,
            height: this.sprite.height,
            width: this.sprite.width
        };
    }

    update(game){
        game.physics.arcade.moveToPointer(this.sprite, this.speed);

        //game.debug.text('speed: ' + this.sprite.speed, 32, 120);
        game.debug.text(this.sprite.mass, this.sprite.x - game.camera.x - 10, this.sprite.y - game.camera.y+ 5);

        this.socket.emit('move_player', this.toJson());
    }
}

export default Player;