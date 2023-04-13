// Supports ES6
// import { create, Whatsapp } from '@wppconnect-team/wppconnect';
const wppconnect = require('@wppconnect-team/wppconnect');
const dialogflow= require("./dialogflow");

wppconnect
  .create()
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
    client.onMessage(async(message) => {
        typo=typeof(message.body);
        session=message.from;
        
        // console.log(session)
        // console.log(typo);
        // console.log(message.body);
        // console.log(message.type);
  
        // console.log(message)
        // console.log(message.type)
        // console.log(message.isGroupMsg) || message.isGroupMsg === false
      
      if (message.type=='chat' ){
              
              let payload= await dialogflow.sendToDialogFlow(message.body,session);
              let responses=payload.fulfillmentMessages;
            //   console.log(payload.fulfillmentMessages)
      
              for (const response of responses) {
                    // console.log(response)
                    // console.log(response.payload.fields)
                  if(response.text){
                      await sendMessageToWhatsapp(client, message, response);
                  }else if(response.payload){
                        // if(response.payload)
                    //   if(response.message)
                    //   console.log("deberia mandar una imagen");
                    //   console.log(response.payload.fields.media.stringValue)
                    //   client
                    //   .sendImage(message.from,response.payload.fields.media.stringValue);
                    // console.log(response.payload.fields.opciones.listValue.values[0].structValue.fields.opcion1.stringValue)

                    let numRes = (response.payload.fields.opciones.listValue.values).length

                    console.log(numRes)
                    // console.log(numRes.length)

                    let title1 = response.payload.fields.opciones.listValue.values[0].structValue.fields.opcion1.stringValue
                    let title2 = ''
                    

                    

                      client.sendListMessage('5215521119099@c.us', {
                        buttonText: 'Click here',
                        description: 'Choose one option',            
                        sections: [
                          {
                            title: 'Section 1',                
                            rows: [                    
                                { title: `${title1}`, description: 'Description 2'},
                                { title: 'test 2', description: 'Description 2'},                
                            ],                                
                          },
                        ],
                      });
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