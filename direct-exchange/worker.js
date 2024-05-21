const amqp = require('amqplib')

const worker = async () => {
    try {
        const cnn = await amqp.connect('amqp://localhost')
        const ch = await cnn.createChannel()

        const exchangeName = 'direct-exchange'

        const msg = process.argv.slice(2).join(' ') || 'Hello World!'
        const routeKey = process.argv[2] || 'info'

        ch.assertExchange(exchangeName, 'direct', { durable: false })
        ch.publish(exchangeName, routeKey, Buffer.from(msg))

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
