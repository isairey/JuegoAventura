import Phaser from "phaser";

export default class CityScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("CityScene");
  }

  preload() {
    // 👤 Monito (persona)
    this.load.image(
      "player",
      "https://labs.phaser.io/assets/sprites/phaser-dude.png"
    );
  }

  create() {
  this.cameras.main.setBackgroundColor("#6cc46c");

  const size = 800;

  this.physics.world.setBounds(0, 0, size * 10, size * 10);
  this.cameras.main.setBounds(0, 0, size * 10, size * 10);

  const g = this.add.graphics();

  // 🌿 suelo base
  g.fillStyle(0x6cc46c);
  g.fillRect(0, 0, size * 10, size * 10);

  // 🏙️ CREAR GRID DE CIUDAD REAL
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const px = x * size;
      const py = y * size;

      // 🛣️ calles cruzando
      g.fillStyle(0x2a2a2a);
      g.fillRect(px + 300, py, 200, size);
      g.fillRect(px, py + 300, size, 200);

      // 🏢 edificios (bloques)
      g.fillStyle(0xd6b37a);

      g.fillRect(px + 50, py + 50, 200, 200);
      g.fillRect(px + 450, py + 50, 200, 200);
      g.fillRect(px + 50, py + 450, 200, 200);
      g.fillRect(px + 450, py + 450, 200, 200);

      // 🌳 zonas verdes
      g.fillStyle(0x4caf50);
      g.fillRect(px + 250, py + 250, 300, 300);
    }
  }

  // 👤 jugador
  this.player = this.physics.add.sprite(400, 400, "player");

  this.player.setScale(1.5);
  this.player.setCollideWorldBounds(true);
  this.player.setDepth(10);

  this.cursors = this.input.keyboard.createCursorKeys();

  this.cameras.main.startFollow(this.player);
  this.cameras.main.setZoom(1.5);
}

  update() {
    const speed = 200;

    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    }

    if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    }

    if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    }
  }
}