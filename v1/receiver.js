const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (err0, conn) => {
    if (err0) throw err0

    const queueName = 'Queue1'
    conn.createChannel((err1, ch) => {
        if (err1) throw err1

        ch.assertQueue(queueName, { durable: false })
        ch.consume(queueName, (msg) => {
            console.log(' [x] Received "%s"', msg.content.toString())
        }, { noAck: true })
    })
})