chrome.alarms.create({delayInMinutes: 10000});

chrome.alarms.onAlarm.addListener(function() {
  alert("Time's up!");
});      