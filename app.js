// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const { Session } = require('inspector');
const { isString } = require('util');
const venom = require('venom-bot');
const dialogflow= require("./dialogflow");


venom
  .create({
    session: 'name', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });



function start(client) {
  client.onMessage(async(message) => {
      typo=typeof(message.body);
      session=message.from;
      
      // console.log(typo);
      // console.log(message.body);
      // console.log(message.type);      

      console.log(message)
      console.log(message.type)
      // console.log(message.isGroupMsg) || message.isGroupMsg === false
    
    if (message.type=='chat' ){
            
            let payload= await dialogflow.sendToDialogFlow(message.body,session);
            let responses=payload.fulfillmentMessages;
            console.log(payload)
    
            for (const response of responses) {
                if(response.message==="text"){
                    await sendMessageToWhatsapp(client, message, response);
                }else if(response.message==="payload"){
                    
                    console.log("deberia mandar una imagen");
                    console.log(response.payload.fields.media.stringValue)
                    client
                    .sendImage(message.from,response.payload.fields.media.stringValue);                
                }    
            }
            
    }else{
        client
            .sendText(message.from,"holaaaa")
    }    
  });
}

function sendMessageToWhatsapp(client, message, response) {
    return new Promise((resolve, reject) => {
        client
            .sendText(message.from, response.text.text[0])
            .then((result) => {
                // console.log('Result: ', result); //return object success
                resolve(result);
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro);
                reject(erro);
            });
    });
    
}

