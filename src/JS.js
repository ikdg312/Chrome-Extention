window.onload = function(){
        chrome.alarms.create("no1", { "Data.now() +  1"})
  
  }

window.onAlarm = function(){
        alert('aaaa')

}