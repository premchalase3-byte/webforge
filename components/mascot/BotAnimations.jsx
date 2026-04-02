export const BOT_ANIMATIONS = {

  idle: {
    y: [0, -8, 0],
    transition: {
      repeat: Infinity,
      duration: 2
    }
  },

  thinking: {
    rotate: [-5, 5, -5],
    transition: {
      repeat: Infinity,
      duration: 1
    }
  },

  building: {
    y: [0, -20, 0],
    transition: {
      repeat: Infinity,
      duration: 0.6
    }
  },

  happy: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.6
    }
  }

};