chrome.alarms.create({delayInMinutes: 10000});

chrome.browserAction.onClicked.addListener(function () {
  readChatlist();
});