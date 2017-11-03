let constText,newWeaponFire,newWeaponBomb,player,wep,view,checkCollisionHandler,badAliens,fireButton,cursors;
const WINDOW_WIDTH = window.innerWidth-20;
const WINDOW_HEIGHT = window.innerHeight-20;
let game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO, 'phaser-example');

class GameState {
    constructor() {

    }
    preload() {
        game.load.image(constText._starfield.key, constText._starfield.url);
        game.load.image(constText._bullet.key, constText._bullet.url);
        game.load.image(constText._bulletBIG.key, constText._bulletBIG.url);
        game.load.image(constText._bomb.key, constText._bomb.url);
        game.load.image(constText._invader.key, constText._invader.url);
        game.load.image(constText._invader2.key, constText._invader2.url);
        game.load.image(constText._ship.key, constText._ship.url);
        game.load.image(constText._kaboom.key, constText._kaboom.url);
        game.load.audio(constText._Cosmos.key, constText._Cosmos.url);
        game.load.audio(constText._mBomb.key, constText._mBomb.url);
    }
    create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        view = new View();
        view.BackGroundMusic(constText._Cosmos.key,true);
        wep = new Weapons(constText._bullet.key);
        player = new Player(wep);
        newWeaponFire = new NewWeaponFire(constText._bulletBIG.key);
        newWeaponBomb = new NewWeaponBomb(constText._bomb.key);
        checkCollisionHandler = new CheckCollisionHandler();
        badAliens = new BadAliens();
        badAliens.createAliens(levelUpX,levelUpY);

        cursors = game.input.keyboard.createCursorKeys();
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    update() {
        view.starfield.tilePosition.y += SPEED_BACKGROUND;
        if (player.player.alive)
        {
            player.player.body.velocity.setTo(0, 0);
            if (cursors.left.isDown && (player.player.x >= CHECK_LEFT_MAX_POSITION_SHIP))
            {
                player.player.body.velocity.x = -PLAYER_SPEED;
            }
            if (cursors.right.isDown && (player.player.x <= CHECK_RIGHT_MAX_POSITION_SHIP))
            {
                player.player.body.velocity.x = PLAYER_SPEED;
            }
            if (cursors.up.isDown)
            {
                player.player.body.velocity.y = -PLAYER_SPEED;
            }
            if (cursors.down.isDown && (player.player.y <= CHECK_DOWN_MAX_POSITION_SHIP))
            {
                player.player.body.velocity.y = PLAYER_SPEED;
            }
            if (fireButton.isDown)
            {
                player.fireBullet();
            }
            badAliens.aliens.forEach(function (item) {
                if(item.body.y >= window.innerHeight)
                    player.die();
            });
            game.physics.arcade.overlap(player.player, badAliens.aliens, player.die, null, this);
            game.physics.arcade.overlap(wep.bullets, badAliens.aliens, checkCollisionHandler.CollisionHandler, null, this);
            game.physics.arcade.overlap(player.player, newWeaponFire.bullets, newWeaponFire.collisionHandlerWithFireWeapon, null, this);
            game.physics.arcade.overlap(player.player, newWeaponBomb.bullets, newWeaponBomb.collisionHandlerWithBombWeapon, null, this);
        }
    }
}
class LoadJSON{
    preload(){
        game.load.json('constStrings', 'conf.json');
    }
    create(){
        constText = game.cache.getJSON('constStrings');
        game.state.start('StartScript');
    }
}

class StartScript{
    preload(){
        game.load.script(constText._constAndVarieb.key, constText._constAndVarieb.url);
        game.load.script(constText._view.key, constText._view.url);
        game.load.script(constText._player.key, constText._player.url);
        game.load.script(constText._weapons.key, constText._weapons.url);
        game.load.script(constText._checkCollisionHandler.key, constText._checkCollisionHandler.url);
        game.load.script(constText._badAliens.key, constText._badAliens.url);
    }
    create() {
        game.state.start('GameState');
    }
}

game.state.add('LoadJSON', LoadJSON);
game.state.add('StartScript', StartScript);
game.state.add('GameState', GameState);
game.state.start('LoadJSON');