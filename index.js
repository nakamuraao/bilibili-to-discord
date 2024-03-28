//直播 發文 視頻
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });
const config = require('./config.json');
const { checkUserLive, userLiveData } = require('./function/liveFunction');

client.once('ready', async () => {
    const now = new Date();
    const time = now.toTimeString();
    console.log(`${time}`);
    console.log(`以 ${client.user.tag} 登入`);
    let roomId = ['1'];

    setInterval( async () => {
        if (checkUserLive(config.bilibili_id)){
            let data = await userLiveData(config.bilibili_id);
            if (roomId[0].toString() !== `${data.data.room_id}`){
                const embed = new EmbedBuilder()
                    .setTitle(data.data.title)
                    .setDescription(`開始時間：${data.data.live_time}`)
                    .setColor('#f69bbe')
                    .setURL(`https://live.bilibili.com/${data.data.room_id}`)
                    .setImage(data.data.user_cover)
                    .setAuthor({ name: 'みけねこ_Official', iconURL: 'https://i0.hdslb.com/bfs/face/30fc01d286521f11d46389ace862fb9aeb4f32b2.jpg@240w_240h_1c_1s_!web-avatar-space-header.avif', url: 'https://space.bilibili.com/3546644974930059?share_medium=android&share_source=copy_link&bbid=XU9129596131987611F93DF1D7D23871FFDA7&ts=1711597997039' })
                    .setFooter({ text: 'Bilibili', iconURL: 'https://play-lh.googleusercontent.com/IPPHiII0GMURiVumaN0zT9iJRj8OTCP65xllc8ptBQNAhYhlv67ZRsGGxcIhRHbM5c45' });
                const channel = client.channels.cache.get(config.notification_channel);
                await channel.send({content: `<@&${config.notif_role}>`, embeds: [embed]});
                roomId.pop();
                roomId.push(`${data.data.room_id}`);
            };
        }   
    },5*60*1000);
});

client.on('messageCreate', async msg => {
    const now = new Date();
    const time = now.toTimeString();
    if (msg.content === `<@${config.cid}>` && msg.author.id === config.oid) msg.reply(`${time}, 功能正常`);
});


client.login(config.token);