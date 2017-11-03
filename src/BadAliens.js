class BadAliens{

    constructor(){
        this.aliens = game.add.group();
        this.aliens.enableBody = true;
        this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
    }

    createAliens(levelUpX, levelUpY) {
        for (let y = 0; y <  levelUpX*Math.random() * 2; y++)
        {
            for (let x = 0; x < levelUpY*Math.random() * 2; x++)
            {
                let alien,invader;

                invader = Math.floor(Math.random() * (2));
                if(invader === 0) {
                    alien = this.aliens.create(game.rnd.integerInRange(MIN_LEFT_POSITION_ALIENS, MAX_RIGHT_POSITION_ALIENS),  -50, constText._invader.key);
                }
                if(invader === 1){
                    alien = this.aliens.create(game.rnd.integerInRange(MIN_LEFT_POSITION_ALIENS, MAX_RIGHT_POSITION_ALIENS), -50, constText._invader2.key);
                }
                game.add.tween(alien).to( { y: window.innerHeight }, game.rnd.integerInRange(15000, 20000), Phaser.Easing.Linear.None, true, 0, 1000, false);
            }
        }
    }

}
