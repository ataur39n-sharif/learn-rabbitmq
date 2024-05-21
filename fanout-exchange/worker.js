const amqp = require('amqplib')

const worker = async () => {
    try {
        const cnn = await amqp.connect('amqp://localhost')
        const ch = await cnn.createChannel()

        const exchangeName = 'Exchange1'

        const msg = process.argv.slice(2).join(' ') || 'Hello World!'

        ch.assertExchange(exchangeName, 'fanout', { durable: false })
        ch.publish(exchangeName, '', Buffer.from(msg))

        console.log(` [x] Sent %s`, msg);
        
        setTimeout(() => {
            ch.close()
            cnn.close()
            process.exit(0)
        }, 500)
    } catch (error) {
        throw error;
    }
}


worker()
