// Minecraft Interactive JavaScript
// Created: 2025-12-14 16:15:40 UTC

class MinecraftGame {
  constructor() {
    this.playerHealth = 20;
    this.playerHunger = 10;
    this.inventory = [];
    this.position = { x: 0, y: 64, z: 0 };
    this.blocks = {
      STONE: 'stone',
      DIRT: 'dirt',
      GRASS: 'grass',
      OAK_LOG: 'oak_log',
      DIAMOND: 'diamond'
    };
  }

  // Initialize the game
  init() {
    console.log('🎮 Minecraft Game Initialized');
    console.log(`Player spawned at: X:${this.position.x} Y:${this.position.y} Z:${this.position.z}`);
    this.displayStatus();
  }

  // Display current player status
  displayStatus() {
    console.log(`
    ╔════════════════════════════════╗
    ║     MINECRAFT PLAYER STATUS     ║
    ╠════════════════════════════════╣
    ║ Health: ${'❤️'.repeat(this.playerHealth / 2)} (${this.playerHealth}/20)
    ║ Hunger: ${'🍖'.repeat(this.playerHunger)} (${this.playerHunger}/10)
    ║ Position: X:${this.position.x} Y:${this.position.y} Z:${this.position.z}
    ║ Inventory Items: ${this.inventory.length}
    ╚════════════════════════════════╝
    `);
  }

  // Mine a block
  mineBlock(blockType) {
    if (this.blocks[blockType]) {
      this.inventory.push(blockType);
      console.log(`⛏️  Mined ${blockType}! Total in inventory: ${this.inventory.length}`);
      return true;
    }
    console.log('❌ Invalid block type');
    return false;
  }

  // Eat food to restore hunger
  eatFood(amount = 1) {
    this.playerHunger = Math.min(10, this.playerHunger + amount);
    console.log(`🍎 Ate food! Hunger: ${this.playerHunger}/10`);
  }

  // Take damage
  takeDamage(damage) {
    this.playerHealth = Math.max(0, this.playerHealth - damage);
    console.log(`💥 Took ${damage} damage! Health: ${this.playerHealth}/20`);
    if (this.playerHealth === 0) {
      console.log('💀 You have died! Game Over.');
    }
  }

  // Heal the player
  heal(amount = 1) {
    this.playerHealth = Math.min(20, this.playerHealth + amount);
    console.log(`🏥 Healed! Health: ${this.playerHealth}/20`);
  }

  // Move player
  move(dx, dy, dz) {
    this.position.x += dx;
    this.position.y += dy;
    this.position.z += dz;
    console.log(`🚶 Moved to: X:${this.position.x} Y:${this.position.y} Z:${this.position.z}`);
  }

  // List inventory
  showInventory() {
    if (this.inventory.length === 0) {
      console.log('📦 Your inventory is empty');
      return;
    }
    console.log('📦 Inventory:');
    const itemCount = {};
    this.inventory.forEach(item => {
      itemCount[item] = (itemCount[item] || 0) + 1;
    });
    Object.entries(itemCount).forEach(([item, count]) => {
      console.log(`   - ${item}: ${count}`);
    });
  }

  // Craft item
  craftItem(recipe) {
    console.log(`🔨 Crafting ${recipe}...`);
    console.log(`✅ Successfully crafted ${recipe}!`);
  }

  // Build block
  buildBlock(blockType) {
    if (this.inventory.includes(blockType)) {
      this.inventory = this.inventory.filter(item => item !== blockType);
      console.log(`🧱 Built ${blockType}! Inventory updated.`);
      return true;
    }
    console.log(`❌ You don't have ${blockType} in your inventory`);
    return false;
  }
}

// Game Demo
const game = new MinecraftGame();
game.init();
game.mineBlock('DIAMOND');
game.mineBlock('OAK_LOG');
game.mineBlock('STONE');
game.showInventory();
game.move(10, 0, 5);
game.takeDamage(4);
game.heal(2);
game.eatFood(2);
game.displayStatus();
game.craftItem('Wooden Pickaxe');
game.buildBlock('OAK_LOG');
game.showInventory();
game.displayStatus();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MinecraftGame;
}
