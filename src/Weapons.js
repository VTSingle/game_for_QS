class Weapons {

    constructor(name){
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(30, name);
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);

    }

    create(name){

        this.bullets.create(cordAlienX,  cordAlienY,name);

    }

    fire(){

        if (game.time.now > bulletTime)
        {
            let bullet = this.bullets.getFirstExists(false);

            if (bullet)
            {
                bullet.reset(player.player.x, player.player.y);
                bullet.body.velocity.y = BULLET_SPEED;
                bulletTime = game.time.now + 200;
            }

        }
    }

}

class NewWeaponFire extends Weapons{

    constructor(){

        super(constText._bulletBIG.key);

    }

    collisionHandlerWithFireWeapon(bullet, newWeaponFire){

        scoreBullets = 5;
        wep = new Weapons(constText._bulletBIG.key);
        newWeaponFire.kill();
        newWeaponFire.visible = false;
        CheckTakeFire = true;

    }

    DieAlienFire(alien) {

        alien.kill();
        wep.fire();

    }

}
class NewWeaponBomb extends Weapons{

    constructor(){

        super(constText._bomb.key);

    }

    collisionHandlerWithBombWeapon(bullet, newWeaponBomb){

        scoreBullets = 6;
        wep = new Weapons(constText._bomb.key);
        newWeaponBomb.kill();
        newWeaponBomb.visible = false;
        CheckTakeBomb = true;

    }
    DieAlienBomb(bullet,alien) {
        alien.kill();
        badAliens.aliens.forEach(function (item) {
            if (game.physics.arcade.distanceBetween(bullet, item) < DIST_BOMB) {
                item.kill();
            }
        });
    }

}