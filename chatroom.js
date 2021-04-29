// http://localhost:8000/messages


const yo = require('yo-yo')


const http = require('http')
const fs = require('fs')

let MessageCounter = 0

let server = http.createServer(function (request, response) {
    let myPath = new URL(`http://localhost:8000${request.url}`)
    if (request.method === 'GET') {
        if (myPath.pathname === '/messages') {
            fs.readFile('messages.json', 'utf8', (err, data) => {
                if (err) {
                    response.end(err)
                    
                } else {
                    response.end(data)
                }
            })
            //if the user doesn't use /messages correctly
        } else {
            response.end('The path was not valid.')
        }
    }
    else if (request.method === 'POST') {
        if (myPath.pathname === '/messages') {
            let body = '';
            let name = 'mark'
            request.on('data', chunk => {
                body += chunk.toString()
            });
            request.on('end', () => {
                let date_ob = new Date();
                // make dict here
                let output = {username: name, message:body, date:date_ob, id:MessageCounter}
                MessageCounter++
                output = JSON.stringify(output) + '\n'

                fs.appendFile('messages.json', output, err => {
                    if (err) {
                        console.log(err)
                        return
                    }else {
                        console.log('File written successfully\n')
                        response.end('Written Successfully')
                    }
                })

            });
        }
    }
})
server.listen(8000)
