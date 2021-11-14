import express from 'express'

const MQTT = express.Router()

MQTT.post('/webhook', async (req, res) => {

    const data = req.body;
    console.log(data)
    res.send("{}");
})


export {MQTT}