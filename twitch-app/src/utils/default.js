// default channels
const defaultChannels = ['freecodecamp', 'test_channel', 'ESL_SC2', 'vkjnjk'];
const hasLocalStorage = typeof (Storage) !== undefined;
const channelStorage = hasLocalStorage ? localStorage.getItem('twitchViewerMK') : null;
const userChannels = channelStorage
  ? channelStorage
    .replace(/(Map\s{\s)|(")|(:\s\[object\sObject\])|(\s})/g, '')
    .split(', ')
  : defaultChannels;

export default userChannels;
