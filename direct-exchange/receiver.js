const amqp = require('amqplib')

const receiver = async () => {
    try {
        const conn = await amqp.connect('amqp://localhost')
        const ch = await conn.createChannel()

        const exchangeName = 'direct-exchange'
        await ch.assertExchange(exchangeName, 'direct', { durable: false })
        const q = await ch.assertQueue('', { exclusive: true })

        console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q)

        const args = process.argv.slice(2)

        console.log('args',{
            args,
            a: process.argv
        });

        args.forEach((arg) => {
            ch.bindQueue(q.queue, exchangeName, arg)
        })

        ch.consume(q.queue, (msg) => {
            console.log({
                routeKey: msg.fields.routingKey,
                msg: msg.content.toString()
            })

        }, { noAck: true })
        
    } catch (error) {
        throw error;
    }
}

receiver()