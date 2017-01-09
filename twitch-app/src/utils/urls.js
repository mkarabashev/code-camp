// data url
export const defLogo = 'https://placeholdit.imgix.net/~text?txtsize=14&txt=150%C3%97150&w=150&h=150';
export const baseUrl = 'https://api.twitch.tv/kraken/';
export const makeUrl = (type, name) => `${baseUrl}${type}/${name}`;
export const config = { headers: {'Client-ID': '98ibvwgmychg1ukcezfyhkw4buj75v2'} }
