'use strict';
let modeflag = 0;       //0:指定時間で実行 それ以外:setDoTime秒後に実行
let setDoTime = 10;     //秒
let setHour = 5;        //時
let setMinutes = 10;    //分
let alarmText = "あいうえお";

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
}

/**
 *送信確認の通知をする
 *
 * @param {*} alarmText アラーム内容
 * @return {*} true:送信する　false:取り消し
 */
let DoConfirm = (alarmText) => {
        console.log("DoConfirm...");
        if(confirm(alarmText + "　を送信しますか。")){
                SendChat(alarmText);
                alert("送信");
                return true;
        }else{
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
var SetTimer = (setHour, setMinutes, alarmText) => {
        console.log("SetTimer...");
        const currentTime = new Date();
        const currentTimeS = (currentTime.getHours()*60 + currentTime.getMinutes())*60 + currentTime.getSeconds();
        const setTimeS = (setHour*60 + setMinutes)*60;
        let waitTimeS = setTimeS - currentTimeS;
        if(waitTimeS < 0) waitTimeS += 24*60*60;

        //実行モード
        if(modeflag == 0){
                alert(waitTimeS +"秒後の "+ setHour+"時"+ setMinutes +"分に実行されます");
                return setTimeout(DoConfirm(alarmText),waitTimeS*1000);
        }else{
                alert(setDoTime + "秒後に実行されます");
                return setTimeout(DoConfirm(alarmText),setDoTime*1000);
        }
}

window.onload = () => {
        SetTimer(setHour, setMinutes, alarmText)
}