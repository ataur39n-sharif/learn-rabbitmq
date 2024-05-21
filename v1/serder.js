const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (err0, conn) => {
    if(err0) throw err0

    const queueName = 'Queue1'
    conn.createChannel((err1, ch) => {
        if(err1) throw err1

        ch.assertQueue(queueName, {durable: false})
        ch.sendToQueue(queueName, Buffer.from('New message send from queue 1.'))
        console.log(' [x] Sent "New message send from queue 1."')

        setTimeout(() => {
            conn.close()
            process.exit(0)
        }, 500)
    })

})