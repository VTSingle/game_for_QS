class Player{

    constructor() {

        this.player = game.add.sprite(WINDOW_WIDTH/2, WINDOW_HEIGHT/2, constText._ship.key);
        this.player.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.player, Phaser.Physics.ARCADE);

    }

    die(){

        badAliens.aliens.kill();
        player.player.kill();
        view.stateText.text=" GAME OVER \n    Press F5";
        view.stateText.visible = true;
    }

    fireBullet(){

        wep.fire();

    }

}