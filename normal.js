const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect
  .create()
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  

    client.onMessage((message) => {
        let description = "choose a option"
        let test2 = "test 2"
        let row = `{"title": "${test2}", "description": "Description 2"}`
        
        
        let final = JSON.parse(row)        
        
        let prueba = [final,final,]        
        // console.log(prueba)

        
        client.sendListMessage('5215521119099@c.us', {
            buttonText: 'Click here',
            description: 'Choose one option',            
            sections: [
              {
                title: 'Section 1',                
                rows: [                    
                    { title: 'test 2', description: 'Description 2'},
                    { title: 'test 2', description: 'Description 2'},                
                ],                                
              },
            ],
          });
    
    });
}







  // Example
