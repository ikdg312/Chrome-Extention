'use strict';
let modeflag = 1;       //0:指定時間で実行 それ以外:setDoTime秒後に実行
let setDoTime = 5;     //秒
let setHour = 5;        //時
let setMinutes = 10;    //分
let alarmText = "かきくけこ";
let tagetchat = "0000";

const  DoStorage = {//seter geter
        get: function () {
                console.log("DoStorageGet...");
                chrome.storage.local.get(['chatwork'], function (value) {
                        if (typeof value.chatwork === 'undefined') {
        
                        } else {
                                console.log(value.chatwork);
                        }//多分毎回全データが追加され、同じものがいっぱいある状態に。                
                });
        }
        ,
        set: function (chatlist) {
                console.log("DoStorageSet...");
                        chrome.storage.local.get('chatwork', function (value) {
                        console.log("value " +value.chatwork);
                        if (typeof value.chatwork === 'undefined') {
                                console.log("undefinedでした");
                                value.chatwork = [chatlist];
                        } else {
                                value.chatwork.push(chatlist);
                        }//多分毎回全データが追加され、同じものがいっぱいある状態に。
                        //同じものがあるかのヴァリデーションチェックが必要。
                        chrome.storage.local.set({ 'chatwork': value.chatwork }, function () { });
                        console.log("Saving...");
                });
        }
}

const DoCollectChatList = () => {
        console.log("DoCollectChatList...");
        let label, rid;
        let chatwork = {
                        chatlist: [
                                {
                                        label: label,
                                        rid: rid
                                }
                        ]
        };
        const chatareaElement = document.getElementById("_roomListArea");
        const listitemElements = chatareaElement.getElementsByTagName("li");
        for (let i = 0; i < listitemElements.length; i++) {
                chatwork.chatlist.push(listitemElements[i].getAttribute("aria-label")
                        , listitemElements[i].getAttribute("data-rid"));
        }
        DoStorage.set(chatwork);
        DoStorage.get();
}

const DoSelectChat = (tagetchat) => {
        console.log("DoSelectChat...");
        const chatareaElement = document.getElementById("_roomListArea");
        const listitemElements = chatareaElement.getElementsByTagName("li");
        for (let i = 0; i < listitemElements.length; i++) {
                let chat = listitemElements[i].getAttribute("aria-label");
                if (chat == tagetchat) {
                        listitemElements[i].click();
                }
        }
}

const DoSaveAlarm = (setHour, setMinutes, alarmText) => {//keyを変数にしたい
        chrome.storage.local.set({ "setHour": setHour, "setMinutes": setMinutes, "alarmText": alarmText }, function () {
                console.log("DoSaveAlarm...")
        });
}

const DoLoadAlarm = () => {//keyを変数にしたい
        chrome.storage.local.get(["setHour", "setMinutes", "alarmText"], function (value) {
                var value_data_1 = value.setHour;
                var value_data_2 = value.setMinutes;
                var value_data_3 = value.alarmText;
                console.log("DoLoadAlarm..." + value_data_1 + ", " + value_data_2 + ", " + value_data_3)
        });
}

/**
 *テキストボックスに文字を挿入・テキストの送信をする
 *
 * @param {*} text 送信する文字
 */
const SendChat = (text) => {
        console.log("SendChat...");
        const textarea = document.getElementById('_chatText');
        const placeText = `${text}`;
        textarea.focus();
        document.execCommand('insertText', false, placeText); //テキストを挿入
        //ここに送信ボタン押下DOM追加//
        DoCollectChatList();
}

/**
 *送信確認の通知をする
 *
 * @param {*} alarmText アラーム内容
 * @return {*} true:送信する　false:取り消し
 */
const DoConfirm = (alarmText) => {
        console.log("DoConfirm...");
        if (confirm(alarmText + "　を送信しますか。")) {
                DoSelectChat(tagetchat);
                SendChat(alarmText);
                alert("送信");
                return true;
        } else {
                alert("取り消し");
                return false;
        }
}

//アラームセット
/**
 *指定時刻・指定内容でアラームをセットする
 *
 * @param {*} setHour 時間指定
 * @param {*} setMinutes　分指定
 * @param {*} alarmText　アラーム内容指定
 * @return {*} setTimeout（SendChat：内容指定,　waitTimeS：時刻指定）：waitTimes秒後にSendChatを通知する
 */
const SetTimer = (setHour, setMinutes, alarmText) => {
        console.log("SetTimer...");
        const currentTime = new Date();
        const currentTimeS = (currentTime.getHours() * 60 + currentTime.getMinutes()) * 60 + currentTime.getSeconds();
        const setTimeS = (setHour * 60 + setMinutes) * 60;
        let waitTimeS = setTimeS - currentTimeS;
        if (waitTimeS < 0) waitTimeS += 24 * 60 * 60;

        //実行モード
        if (modeflag == 0) {
                alert(waitTimeS + "秒後の " + setHour + "時" + setMinutes + "分に実行されます");
                return setTimeout(DoConfirm(alarmText), waitTimeS * 1000);
        } else {
                alert(setDoTime + "秒後に実行されます");
                return setTimeout(DoConfirm, setDoTime * 1000, alarmText);
        }
}

window.onload = () => {
        SetTimer(setHour, setMinutes, alarmText);
}