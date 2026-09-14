// Flat 15x15 board — types: NORMAL, TWD, WLD, LTT, LTD, STAR
export const BOARD_LAYOUT: string[] = new Array(225).fill('NORMAL');

export const setPremiumSquare = (index: number, type: string) => {
  BOARD_LAYOUT[index] = type;
};

// Triple Word
setPremiumSquare(0, 'TWD');
setPremiumSquare(7, 'TWD');
setPremiumSquare(14, 'TWD');
setPremiumSquare(105, 'TWD');
setPremiumSquare(119, 'TWD');
setPremiumSquare(210, 'TWD');
setPremiumSquare(217, 'TWD');
setPremiumSquare(224, 'TWD');

// Double Word
setPremiumSquare(16, 'WLD');
setPremiumSquare(28, 'WLD');
setPremiumSquare(32, 'WLD');
setPremiumSquare(42, 'WLD');
setPremiumSquare(48, 'WLD');
setPremiumSquare(56, 'WLD');
setPremiumSquare(64, 'WLD');
setPremiumSquare(70, 'WLD');
setPremiumSquare(154, 'WLD');
setPremiumSquare(160, 'WLD');
setPremiumSquare(168, 'WLD');
setPremiumSquare(176, 'WLD');
setPremiumSquare(182, 'WLD');
setPremiumSquare(192, 'WLD');
setPremiumSquare(196, 'WLD');
setPremiumSquare(208, 'WLD');

// Triple Letter
setPremiumSquare(20, 'LTT');
setPremiumSquare(24, 'LTT');
setPremiumSquare(76, 'LTT');
setPremiumSquare(80, 'LTT');
setPremiumSquare(84, 'LTT');
setPremiumSquare(88, 'LTT');
setPremiumSquare(136, 'LTT');
setPremiumSquare(140, 'LTT');
setPremiumSquare(144, 'LTT');
setPremiumSquare(148, 'LTT');
setPremiumSquare(200, 'LTT');
setPremiumSquare(204, 'LTT');

// Double Letter
setPremiumSquare(3, 'LTD');
setPremiumSquare(11, 'LTD');
setPremiumSquare(36, 'LTD');
setPremiumSquare(38, 'LTD');
setPremiumSquare(45, 'LTD');
setPremiumSquare(52, 'LTD');
setPremiumSquare(59, 'LTD');
setPremiumSquare(92, 'LTD');
setPremiumSquare(96, 'LTD');
setPremiumSquare(98, 'LTD');
setPremiumSquare(102, 'LTD');
setPremiumSquare(108, 'LTD');
setPremiumSquare(116, 'LTD');
setPremiumSquare(122, 'LTD');
setPremiumSquare(126, 'LTD');
setPremiumSquare(128, 'LTD');
setPremiumSquare(132, 'LTD');
setPremiumSquare(165, 'LTD');
setPremiumSquare(172, 'LTD');
setPremiumSquare(179, 'LTD');
setPremiumSquare(186, 'LTD');
setPremiumSquare(188, 'LTD');
setPremiumSquare(213, 'LTD');
setPremiumSquare(221, 'LTD');

// Center star
setPremiumSquare(112, 'STAR');
