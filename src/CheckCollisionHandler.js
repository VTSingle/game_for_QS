class CheckCollisionHandler{

    CollisionHandler (bullet, alien) {

        number = game.rnd.integerInRange(-0.1,1.1);
        alien.kill();

        if(scoreBullets%5 !== 0){
            bullet.kill();
            wep = new Weapons(constText._bullet.key, constText._bullet.url);
        }

        scoreBullets += 1;

        view.BackGroundMusic(constText._mBomb.key,false);

        switch(scoreBullets%5) {
            case 0:
                switch (number) {
                    case 0:
                        cordAlienX = alien.x;
                        cordAlienY = alien.y;
                        newWeaponFire.createFire();
                        bullet.kill();
                        break;
                    case 1:
                        cordAlienX = alien.x;
                        cordAlienY = alien.y;
                        newWeaponBomb.createBomb();
                        bullet.kill();
                        break;
                }
                break;
            default:
                bullet.kill();
            break;
        }
        if(CheckTakeFire) {
            newWeaponFire.DieAlienFire(alien);
        }
        CheckTakeFire = false;

        if (CheckTakeBomb){
            newWeaponBomb.DieAlienBomb(bullet,alien);
        }
        CheckTakeBomb = false;

        score += SCORE_FOR_DIE_ALIENS;

        if(score%LEVEL_SCORE === 0) {
            levelUpX += 1;
            levelUpY += 1;
            badAliens.createAliens(levelUpX,levelUpY);
            level += 1;
            view.levelText.text = view.levelString + level;
        }

        view.scoreText.text = view.scoreString + score;
        let explosion = view.explosions.getFirstExists(false);
            explosion.reset(alien.body.x, alien.body.y);
            explosion.play(constText._kaboom.key, 10, false, true);

        if (badAliens.aliens.countLiving() === 0 )
        {

            view.scoreText.text = view.scoreString + score;
            badAliens.aliens.removeAll();
            badAliens.createAliens(levelUpX,levelUpY);
            player.player.revive();
            view.stateText.visible = false;

        }

    }

}