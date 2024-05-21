const amqp = require('amqplib')

async function send() {
    try {
        const conn = await amqp.connect('amqp://localhost')
        const ch = await conn.createChannel()
        const queueName = 'Queue1'
        await ch.assertQueue(queueName, { durable: false })
        ch.sendToQueue(queueName, Buffer.from('New message send from queue 1.'))
        console.log(' [x] Sent "New message send from queue 1."')
        setTimeout(() => {
            conn.close()
            process.exit(0)
        }, 500)
    } catch (error) {
        throw error;
    }
}

send()