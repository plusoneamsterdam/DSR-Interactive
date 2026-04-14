// let swatchHSL = [];

// for (let i = 0; i < 10; i++) {
//   swatchHSL[i] = [];
//   for (let j = 0; j < 10; j++) {
//     swatchHSL[i][j] = [];
//   }
// }

// // black yellow
// // base
// // swatchHSL[0][0][0] = [0, 0, 80];
// // swatchHSL[0][0][1] = [0, 0, 0];
// // // colourful
// // swatchHSL[0][1][0] = [0, 0, 70];
// // swatchHSL[0][1][1] = [0, 0, 10];
// // swatchHSL[0][1][2] = [0, 0, 10];
// // swatchHSL[0][1][3] = [48, 100, 50]; // Y
// // swatchHSL[0][1][4] = [48, 100, 50]; // Y
// // // neutral
// // swatchHSL[0][2][0] = [0, 0, 80];
// // swatchHSL[0][2][1] = [0, 0, 80];
// // swatchHSL[0][2][2] = [0, 0, 80];
// // swatchHSL[0][2][3] = [48, 0, 50];
// // swatchHSL[0][2][4] = [48, 0, 60];

// // classic 
// // base
// swatchHSL[0][0][0] = [0, 0, 97];
// // swatchHSL[1][0][0] = [24, 33, 97];
// swatchHSL[0][0][1] = [0, 0, 0];
// // colourful
// swatchHSL[0][1][0] = [0, 0, 100];
// swatchHSL[0][1][1] = [228, 28, 17]; // D
// swatchHSL[0][1][2] = [12, 71, 44]; // R
// swatchHSL[0][1][3] = [48, 81, 59]; // Y
// swatchHSL[0][1][4] = [229, 38, 33]; // B 
// // neutral
// swatchHSL[0][2][0] = [0, 0, 97];
// swatchHSL[0][2][1] = [228, 0, 97];
// swatchHSL[0][2][2] = [12, 0, 83];
// swatchHSL[0][2][3] = [30, 6, 87];
// swatchHSL[0][2][4] = [229, 0, 83];

// // gold 
// // base
// // swatchHSL[2][0][0] = [0, 0, 97];
// // swatchHSL[2][0][1] = [0, 0, 0];
// // // colourful
// // swatchHSL[2][1][0] = [0, 0, 97];
// // swatchHSL[2][1][1] = [228, 28, 17]; // D
// // swatchHSL[2][1][2] = [12, 71, 44]; // R
// // swatchHSL[2][1][3] = [51, 56, 33]; // GOLD
// // swatchHSL[2][1][4] = [229, 38, 33]; // B 
// // // neutral
// // swatchHSL[2][2][0] = [0, 0, 97];
// // swatchHSL[2][2][1] = [228, 0, 97];
// // swatchHSL[2][2][2] = [12, 0, 83];
// // swatchHSL[2][2][3] = [30, 6, 87];
// // swatchHSL[2][2][4] = [229, 0, 83];

// // green 
// // base
// // swatchHSL[3][0][0] = [44, 10, 79];
// // swatchHSL[3][0][1] = [0, 0, 0];
// // // colourful
// // swatchHSL[3][1][0] = [50, 3, 61];
// // swatchHSL[3][1][1] = [228, 28, 17]; // D
// // swatchHSL[3][1][2] = [127, 25, 19]; // Green
// // swatchHSL[3][1][3] = [46, 84, 48]; // Y
// // swatchHSL[3][1][4] = [213, 31, 25]; // B 
// // // neutral
// // swatchHSL[3][2][0] = [44, 10, 79];
// // swatchHSL[3][2][1] = [228, 10, 79];
// // swatchHSL[3][2][2] = [44, 10, 79];
// // swatchHSL[3][2][3] = [40, 4, 85];
// // swatchHSL[3][2][4] = [213, 4, 85];

// // inverse 
// // base
// swatchHSL[1][0][0] = [228, 28, 17]; // D
// swatchHSL[1][0][1] = [0, 0, 100];
// // colourful
// swatchHSL[1][1][0] = [0, 0, 97];
// swatchHSL[1][1][1] = [0, 0, 97];
// swatchHSL[1][1][2] = [12, 71, 44]; // R
// swatchHSL[1][1][3] = [48, 81, 59]; // Y
// swatchHSL[1][1][4] = [229, 38, 33]; // B 
// // neutral
// swatchHSL[1][2][0] = [228, 28, 17]; // D
// swatchHSL[1][2][1] = [228, 28, 17]; // D
// swatchHSL[1][2][2] = [30, 6, 87];
// swatchHSL[1][2][3] = [0, 0, 83];
// swatchHSL[1][2][4] = [0, 0, 83];

const palettes = {
  classic: {
    base: [
      [0, 0, 97],
      [0, 0, 0]
    ],
    colorful: [
      [0, 0, 100],
      [228, 28, 17], // dark
      [12, 71, 44],  // red
      [48, 81, 59],  // yellow
      [229, 38, 33]  // blue
    ],
    neutral: [
      [0, 0, 97],
      [228, 0, 97],
      [12, 0, 83],
      [30, 6, 87],
      [229, 0, 83]
    ]
  },

  blackYellow: {
    base: [
      [0, 0, 80],
      [0, 0, 0]
    ],
    colorful: [
      [0, 0, 70],
      [0, 0, 10],
      [0, 0, 10],
      [48, 100, 50], // Y
      [48, 100, 50]  // Y
    ],
    neutral: [
      [0, 0, 80],
      [0, 0, 80],
      [0, 0, 80],
      [48, 0, 50],
      [48, 0, 60]
    ]
  },

  blueWhite: {
    base: [
      [228, 28, 17],// dark blue instead of black
      [0, 0, 100]
    ],
    colorful: [
      [0, 0, 97],
      [0, 0, 97],
      [12, 71, 44],
      [48, 81, 59],
      [229, 38, 33]
    ],
    neutral: [
      [228, 28, 17],
      [228, 28, 17],
      [30, 6, 87],
      [0, 0, 83],
      [0, 0, 83]
    ]
  }
};