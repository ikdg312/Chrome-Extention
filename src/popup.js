const DoGetStorage = {//seter geter
  get: async function () {
          return new Promise(resolve => {
                  console.log("DoStorageGet...");
                  chrome.storage.local.get(['chatlist'], function (value) {
                          if (typeof value === 'undefined') {

                          } else {
                            console.log(value.chatlist);
                            resolve(value);
                          }
                  });
          });
  }
  ,
  set: async function (chatlistobj) {
          return new Promise(resolve => {
                  console.log("DoStorageSet...");
                  chrome.storage.local.get('chatlist', function (value) {
                          if (typeof value.chatlist === 'undefined') {
                                  console.log("undefinedでした");
                                  value.chatlist = chatlistobj;
                          } else {
                                  value.chatlist.chatlist = [];
                                  value.chatlist = chatlistobj;
                          }//多分毎回全データが追加され、同じものがいっぱいある状態に。
                          //同じものがあるかのヴァリデーションチェックが必要。
                          chrome.storage.local.set({ 'chatlist': value.chatlist });
                          console.log("Saving...");
                  });
          });
  }
}

var readChatlist = (list) => {
        list = list['chatlist'].chatlist;
        let opt = document.createElement("option");
        let tmp = document.getElementById("exampleFormControlSelect1");
        // while (tmp.firstChild) {
        //         tmp.removeChild(tmp.firstChild);
        //        };
        console.log(list);
        console.log(list.length);
        for (var i = 0; i < list.length; i++) {
                opt = document.createElement("option");
                opt.value = list[i].rid;  //rid
                opt.text = list[i].label;   //ラベル
                tmp.appendChild(opt);
        }
}

$('#exampleFormControlSelect1').click(function(){
        chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, {message: 'resetRID'}, function(code){
                  if(code = 0){
                    alert('取得できませんでした');
                    return;
                  }
                 readChatlist(await DoGetStorage.get());
                });
              });
})
window.onload = () => {

};