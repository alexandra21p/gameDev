'use strict';

class Preload {
    preload(game) {

        // Add preload sprite
        var tmpPreload = this.game.cache.getImage('preloader');
        this.loadingSprite = this.add.sprite(
            (game.width - tmpPreload.width) / 2,
            (game.height - tmpPreload.height) / 2,
            'preloader'
        );

        // run preload sprite
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.loadingSprite);

        // Load game assets here
        this.load.image('nyan_cat_logo', 'assets/nyan_cat_logo.png');
        this.load.image('blue', 'assets/blue.jpeg');
        this.load.image('nyan_cat_sprite', 'assets/nyan_cat_sprite.png');
        this.load.image('banana', 'assets/banana.png');
        this.load.image('melon', 'assets/melon.png');
        this.load.image('burger', 'assets/burger.png');
        this.load.image('cookie', 'assets/cookie.png');
        this.load.image('pizza', 'assets/pizza.png');
        this.load.image('apple', 'assets/apple.png');
        this.load.image('doge', 'assets/doge.png');
        this.load.image('pepe', 'assets/pepe.png');
        this.load.image('nyan_sprites', 'assets/nyan_sprites.png');

        game.time.advancedTiming = true;
    }

    onLoadComplete() {
        this.game.state.start('menu', true, false);
    }
}

export default Preload;
