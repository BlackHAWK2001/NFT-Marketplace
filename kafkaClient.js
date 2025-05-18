import kafka from 'kafka-node'; 
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9093' }); 
const producer = new Producer(client);

producer.on('ready', () => {
    console.log('Kafka Producer is ready');
    
    
    producer.send([{
        topic: 'auction-bids',
        messages: JSON.stringify({ userId: 1, bidAmount: 100 }),
        partition: 0
    }], (err, data) => {
        if (err) {
            console.error('Error sending message:', err);
        } else {
            console.log('Message sent:', data);
        }
    });
});

producer.on('error', (err) => {
    console.error('Error in Kafka Producer:', err);
});

export default producer;