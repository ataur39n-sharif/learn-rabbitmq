const amqp = require('amqplib')

async function receive() {
    try {
        const conn = await amqp.connect('amqp://localhost')
        const ch = await conn.createChannel()
        const queueName = 'Queue1'
        await ch.assertQueue(queueName, { durable: false })
        ch.consume(queueName, (msg) => {
            console.log(' [x] Received "%s"', msg.content.toString())
        }, { noAck: true })
    } catch (error) {
        throw error;
    }
}
receive()