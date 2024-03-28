const { EmbedBuilder } = require('discord.js')

async function getRoomDetail(rid) {
    let response = await fetch(`https://api.live.bilibili.com/room/v1/Room/get_info?room_id=${rid}`);
    const data = await response.json();
    return data;
};

async function userLiveData(bili_id) {
    const response = await fetch(`https://api.live.bilibili.com/room/v1/Room/getRoomInfoOld?mid=${bili_id}`);
    const data = await response.json();
    return getRoomDetail(data.data.roomid);
};

async function checkUserLive(bili_id) {
    const response = await fetch(`https://api.live.bilibili.com/room/v1/Room/getRoomInfoOld?mid=${bili_id}`);
    const data = await response.json();
    if ((data.code != 0)||(data.data.roomStatus == 0)) return false;
    else return true;
};

/*async function getLiveStatus(uids) {
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ uids: uids })
    };
    const response = await fetch('https://api.live.bilibili.com/room/v1/Room/get_status_info_by_uids', request);
    const data = await response.json();
    if (data.code != 0) {
        console.log(`Error getLiveStatus: ${data.code}`);
        return;
    }
}*/

module.exports = {getRoomDetail, checkUserLive, userLiveData};