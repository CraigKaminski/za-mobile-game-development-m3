export class Boot extends Phaser.State {
  public init() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }

  public preload() {
    this.load.image('preloadBar', 'images/bar.png');
    this.load.image('logo', 'images/logo.png');
  }

  public create() {
    this.stage.backgroundColor = '#fff';

    this.state.start('Preload');
  }
}
