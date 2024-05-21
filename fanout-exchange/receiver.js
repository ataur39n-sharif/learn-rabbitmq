const amqp = require('amqplib')

const receiver= async () => {
    try {
        const conn = await amqp.connect('amqp://localhost')
        const ch = await conn.createChannel()

        const exchangeName = 'Exchange1'
        
        await ch.assertExchange(exchangeName, 'fanout', { durable: false })
        const q = await ch.assertQueue('', { exclusive: true })

        console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q)

        await ch.bindQueue(q.queue, exchangeName, '')

        ch.consume(q.queue, (msg) => {
            console.log(' [x] Received "%s"', msg.content.toString())
        }, { noAck: true })
        
    } catch (error) {
        throw error;
    }
}

receiver()