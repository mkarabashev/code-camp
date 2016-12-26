export const evalHeight = browserHeight => browserHeight < 600 ? (browserHeight - 50) : 600;

export const evalTickNum = browserWidth => Math.floor((browserWidth <= 480 ? browserWidth : 0.8 * browserWidth) / 100);
