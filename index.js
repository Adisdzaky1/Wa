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





async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('session')
const sock = makeWASocket({
logger: pino({ level: "silent" }),
printQRInTerminal: !usePairingCode,
auth: state,
browser: [ "Ubuntu", "Chrome", "20.0.04" ],
});


const code = await sock.requestPairingCode(number.trim())
console.log(`success ${code}`);




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
console.log(`Bad Session File, Please Delete Session and Scan Again`);
process.exit();
  } else if (reason === DisconnectReason.connectionClosed) {
console.log("Connection closed, reconnecting....");
connectToWhatsApp();
  } else if (reason === DisconnectReason.connectionLost) {
console.log("Connection Lost from Server, reconnecting...");
connectToWhatsApp();
  } else if (reason === DisconnectReason.connectionReplaced) {
console.log("Connection Replaced, Another New Session Opened, Please Restart Bot");
process.exit();
  } else if (reason === DisconnectReason.loggedOut) {
console.log(`Device Logged Out, Please Delete Folder Session yusril and Scan Again.`);
process.exit();
  } else if (reason === DisconnectReason.restartRequired) {
console.log("Restart Required, Restarting...");
connectToWhatsApp();
  } else if (reason === DisconnectReason.timedOut) {
console.log("Connection TimedOut, Reconnecting...");
connectToWhatsApp();
  } else {
console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
connectToWhatsApp();
  }
} else if (connection === 'connecting') {
console.log(`Connecting...`);
} else if (connection === "open") {
console.log(`Connected`);
}
// console.log('Connected...', update)
});
}














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
connectToWhatsApp();
app.listen(3000, () => {
    console.log('WhatsApp gateway is running on port 3000');
});
