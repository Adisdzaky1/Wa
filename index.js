const express = require('express');
const { default: makeWASocket, useMultiFileAuthState, makeInMemoryStore } = require('@whiskeysockets/baileys');
const axios = require('axios');
const fs = require('fs');
const pino = require('pino');
const path = require('path');

const app = express();
app.use(express.json());

const usePairingCode = true


app.get('/get-code', async (req, res) => {
const { number } = req.body;

    
const folderName = 'session';

// Menentukan path di mana folder akan dibuat
const dirPath = path.join(__dirname, folderName);

// Membuat folder jika belum ada
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    console.log(`Folder '${folderName}' berhasil dibuat.`);
} else {
    console.log(`Folder '${folderName}' sudah ada.`);
}

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('session')
const sock = makeWASocket({
logger: pino({ level: "silent" }),
printQRInTerminal: !usePairingCode,
auth: state,
browser: [ "Ubuntu", "Chrome", "20.0.04" ],
});


const code = await sock.requestPairingCode(number.trim())
res.json({ status: 'success', message: `${code}` });




sock.ev.on('messages.upsert', async chatUpdate => {
try {
mek = chatUpdate.messages[0]
if (!mek.message) return
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast') return
if (!sock.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
} catch (err) {
console.log(err)
}
})



    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

if (connection === "close") {
  let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
  if (reason === DisconnectReason.badSession) {
res.json({ status: `Bad Session File, Please Delete Session and Scan Again` });
process.exit();
  } else if (reason === DisconnectReason.connectionClosed) {
res.json({ status: "Connection closed, reconnecting...." });
connectToWhatsApp();
  } else if (reason === DisconnectReason.connectionLost) {
res.json({ status: "Connection Lost from Server, reconnecting..." });
connectToWhatsApp();
  } else if (reason === DisconnectReason.connectionReplaced) {
res.json({ status: "Connection Replaced, Another New Session Opened, Please Restart Bot" });
process.exit();
  } else if (reason === DisconnectReason.loggedOut) {
res.json({ status: `Device Logged Out, Please Delete Folder Session yusril and Scan Again.` });
process.exit();
  } else if (reason === DisconnectReason.restartRequired) {
res.json({ status: "Restart Required, Restarting..." });
connectToWhatsApp();
  } else if (reason === DisconnectReason.timedOut) {
res.json({ status: "Connection TimedOut, Reconnecting..." });
connectToWhatsApp();
  } else {
res.json({ status: `Unknown DisconnectReason: ${reason}|${connection}` });
connectToWhatsApp();
  }
} else if (connection === 'connecting') {
res.json({ status: `Connecting...` });
} else if (connection === "open") {
res.json({ status: `Connected` });
}
// console.log('Connected...', update)
});
}

connectToWhatsApp();
});










app.get('/', async (res) => {
    

// Nama folder yang ingin dibuat
const folderName = 'session';

// Menentukan path di mana folder akan dibuat
const dirPath = path.join(__dirname, folderName);

// Membuat folder jika belum ada
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    res.json({ status: `Folder '${folderName}' berhasil dibuat.` });
} else {
    console.log(`Folder '${folderName}' sudah ada.`);
}
});









// Endpoint untuk mengirim pesan teks
app.post('/send-text', async (req, res) => {
    const { number, message } = req.body;
    try {
        await sock.sendMessage(`${number}@s.whatsapp.net`, { text: message });
        res.json({ status: 'success', message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.toString() });
    }
});

// Endpoint untuk mengirim pesan gambar dari URL
app.post('/send-image', async (req, res) => {
    const { number, imageUrl, caption } = req.body;
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');
        await sock.sendMessage(`${number}@s.whatsapp.net`, {
            image: imageBuffer,
            caption: caption
        });
        res.json({ status: 'success', message: 'Image sent successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.toString() });
    }
});

app.listen(3000, () => {
    console.log('WhatsApp gateway is running on port 3000');
});
