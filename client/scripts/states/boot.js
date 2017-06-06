'use strict';

class Boot {
    preload() {
        this.load.image('preloader', 'assets/loading.gif');
    }

    create() {
        this.game.stage.backgroundColor = "#1D1B1F";
        this.game.state.start('preload');
    }
}

export default Boot;
