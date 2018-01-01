export class Preload extends Phaser.State {
  private logo: Phaser.Sprite;
  private preloadBar: Phaser.Sprite;

  public preload() {
    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('apple', 'images/apple.png');
    this.load.image('arrow', 'images/arrow.png');
    this.load.image('backyard', 'images/backyard.png');
    this.load.image('candy', 'images/candy.png');
    this.load.spritesheet('pet', 'images/pet.png', 97, 83, 5, 1, 1);
    this.load.image('rotate', 'images/rotate.png');
    this.load.image('toy', 'images/rubber_duck.png');
  }

  public create() {
    this.state.start('Home');
  }
}
