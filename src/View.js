class View{

    constructor() {

        this.starfield = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight,constText._starfield.key);

        this.stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', {font: '84px Arial', fill: '#fff'});
        this.stateText.anchor.setTo(0.5, 0.5);
        this.stateText.visible = false;

        this.scoreString = 'Score : ';
        this.scoreText = game.add.text(10, 50, this.scoreString + score, {font: '34px Arial', fill: '#fff'});

        this.levelString = 'Level : ';
        this.levelText = game.add.text(10, 10, this.levelString + level, {font: '34px Arial', fill: '#fff'});

        this.explosions = game.add.group();
        this.explosions.createMultiple(30, constText._kaboom.key);
        this.explosions.forEach(setupInvader, this);

    }

    BackGroundMusic(name,type){

        this.backgroundMusic = game.add.audio(name);
        this.backgroundMusic.loop = type;
        this.backgroundMusic.play();

    }

}

function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add(constText._kaboom.key);

}