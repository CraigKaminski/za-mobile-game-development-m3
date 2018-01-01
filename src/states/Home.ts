export class Home extends Phaser.State {
  private message: string;

  public init(message: string) {
    this.message = message;
  }

  public create() {
    const background = this.add.sprite(0, 0, 'backyard');
    background.inputEnabled = true;
    background.events.onInputDown.add(() => {
      this.state.start('Game');
    });

    const style = {
      font: '35px Arial',
      fill: '#fff',
    };

    this.add.text(30, this.world.centerY + 200, 'TOUCH TO START', style);

    if (this.message) {
      this.add.text(60, this.world.centerY - 200, this.message, style);
    }
  }
}
