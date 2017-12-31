export class Game extends Phaser.State {
  private apple: Phaser.Sprite;
  private backyard: Phaser.Sprite;
  private candy: Phaser.Sprite;
  private pet: Phaser.Sprite;
  private rotate: Phaser.Sprite;
  private toy: Phaser.Sprite;

  public init() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }

  public preload() {
    this.game.load.image('apple', 'images/apple.png');
    this.game.load.image('arrow', 'images/arrow.png');
    this.game.load.image('backyard', 'images/backyard.png');
    this.game.load.image('candy', 'images/candy.png');
    this.game.load.spritesheet('pet', 'images/pet.png', 97, 83, 5, 1, 1);
    this.game.load.image('rotate', 'images/rotate.png');
    this.game.load.image('toy', 'images/rubber_duck.png');
  }

  public create() {
    this.backyard = this.game.add.sprite(0, 0, 'backyard');

    this.pet = this.game.add.sprite(100, 400, 'pet');
    this.pet.anchor.setTo(0.5);
    this.pet.data = {
      health: 100,
      fun: 100,
    };

    this.apple = this.game.add.sprite(72, 570, 'apple');
    this.candy = this.game.add.sprite(144, 570, 'candy');
    this.toy = this.game.add.sprite(216, 570, 'toy');
    this.rotate = this.game.add.sprite(288, 570, 'rotate');
  }
}
