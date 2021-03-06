export class Game extends Phaser.State {
  private apple: Phaser.Sprite;
  private backyard: Phaser.Sprite;
  private buttons: Phaser.Sprite[];
  private candy: Phaser.Sprite;
  private funText: Phaser.Text;
  private healthText: Phaser.Text;
  private pet: Phaser.Sprite;
  private rotate: Phaser.Sprite;
  private selectedItem: Phaser.Sprite | null;
  private statsDecreaser: Phaser.TimerEvent;
  private toy: Phaser.Sprite;
  private uiBlocked = false;

  public create() {
    this.backyard = this.game.add.sprite(0, 0, 'backyard');
    this.backyard.inputEnabled = true;
    this.backyard.events.onInputDown.add(this.placeItem, this);

    this.pet = this.game.add.sprite(100, 400, 'pet');
    this.pet.anchor.setTo(0.5);
    this.pet.animations.add('funnyfaces', [1, 2, 3, 2, 1], 7, false);
    this.pet.data = { health: 100, fun: 100 };
    this.pet.inputEnabled = true;
    this.pet.input.enableDrag();

    this.apple = this.game.add.sprite(72, 570, 'apple');
    this.apple.anchor.setTo(0.5);
    this.apple.data = { health: 20 };
    this.apple.inputEnabled = true;
    this.apple.events.onInputDown.add(this.pickItem, this);

    this.candy = this.game.add.sprite(144, 570, 'candy');
    this.candy.anchor.setTo(0.5);
    this.candy.data = { health: -10, fun: 10 };
    this.candy.inputEnabled = true;
    this.candy.events.onInputDown.add(this.pickItem, this);

    this.toy = this.game.add.sprite(216, 570, 'toy');
    this.toy.anchor.setTo(0.5);
    this.toy.data = { fun: 20 };
    this.toy.inputEnabled = true;
    this.toy.events.onInputDown.add(this.pickItem, this);

    this.rotate = this.game.add.sprite(288, 570, 'rotate');
    this.rotate.anchor.setTo(0.5);
    this.rotate.inputEnabled = true;
    this.rotate.events.onInputDown.add(this.rotatePet, this);

    this.buttons = [
      this.apple,
      this.candy,
      this.toy,
      this.rotate,
    ];

    this.selectedItem = null;

    const style = {
      font: '20px Arial',
      fill: '#fff',
    };
    this.game.add.text(10, 20, 'Health:', style);
    this.game.add.text(140, 20, 'Fun:', style);
    this.healthText = this.game.add.text(80, 20, '', style);
    this.funText = this.game.add.text(185, 20, '', style);
    this.refreshStats();

    this.statsDecreaser = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.reduceProperties, this);
  }

  public update() {
    if (this.pet.data.health <= 0 || this.pet.data.fun <= 0) {
      this.pet.frame = 4;
      this.uiBlocked = true;
      this.game.time.events.add(Phaser.Timer.SECOND * 2, this.gameOver, this);
    }
  }

  private clearSelection() {
    this.buttons.forEach((button) => { button.alpha = 1; });

    this.selectedItem = null;
  }

  private pickItem(sprite: Phaser.Sprite, pointer: Phaser.Pointer) {
    if (!this.uiBlocked) {
      this.clearSelection();
      sprite.alpha = 0.4;
      this.selectedItem = sprite;
    }
  }

  private placeItem(sprite: Phaser.Sprite, pointer: Phaser.Pointer) {
    if (this.selectedItem && !this.uiBlocked) {
      const x = pointer.position.x;
      const y = pointer.position.y;
      const newItem = this.game.add.sprite(x, y, this.selectedItem.key);
      newItem.anchor.setTo(0.5);
      newItem.data = this.selectedItem.data;
      this.uiBlocked = true;
      const petMovement = this.add.tween(this.pet);
      petMovement.to({ x, y }, 700);
      petMovement.onComplete.add(() => {
        this.pet.animations.play('funnyfaces');
        this.uiBlocked = false;
        for (const stat in newItem.data) {
          if (newItem.data.hasOwnProperty(stat)) {
            this.pet.data[stat] += newItem.data[stat];
          }
        }
        newItem.destroy();
        this.refreshStats();
      });
      petMovement.start();
    }
  }

  private gameOver() {
    this.state.start('Home', true, false, 'GAME OVER!');
  }

  private reduceProperties() {
    this.pet.data.health -= 10;
    this.pet.data.fun -= 15;
    this.refreshStats();
  }

  private refreshStats() {
    this.healthText.text = this.pet.data.health;
    this.funText.text = this.pet.data.fun;
  }

  private rotatePet(sprite: Phaser.Sprite, pointer: Phaser.Pointer) {
    if (!this.uiBlocked) {
      this.uiBlocked = true;
      this.clearSelection();
      sprite.alpha = 0.4;

      const petRotation = this.game.add.tween(this.pet);
      petRotation.to({ angle: '+720' }, 1000);
      petRotation.onComplete.add(() => {
        this.uiBlocked = false;
        sprite.alpha = 1;
        this.pet.data.fun += 10;
        this.refreshStats();
      });
      petRotation.start();
    }
  }
}
