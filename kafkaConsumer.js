import kafka from 'kafka-node'; 
import User from './src/models/UserSchema/User.models.js';
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9093' }); 
const consumer = new Consumer(
    client,
    [
        { topic: 'auction-bids', partition: 0 },
        { topic: 'nft-likes', partition: 0 },
        { topic: 'wallet-transfers', partition: 0 }
    ],
    {
        autoCommit: true,
        fromOffset: 'earliest'
    }
);


consumer.on('message', async (message) => {
    console.log('Received message:', message);
    
    try {
        const parsedMessage = JSON.parse(message.value);
        console.log('Parsing was successful:', parsedMessage);
        
    
        switch (message.topic) {
            case 'auction-bids':
                handleAuctionBid(parsedMessage);
                break;
            case 'nft-likes':
                handleNftLike(parsedMessage);
                break;
            case 'wallet-transfers':
                handleWalletTransfer(parsedMessage);
                break;
            default:
                console.log('Unknown topic:', message.topic);
            }
    } catch (err) {
        console.error('Error parsing message:', err);
    }
});

    



consumer.on('error', (err) => {
    console.error('Error in Kafka Consumer:', err);
});

consumer.on('offsetOutOfRange', (err) => {
    console.error('Offset out of range:', err);
});


function handleAuctionBid(data) {
    console.log('Handling auction bid:', data);
    
}

function handleNftLike(data) {
    console.log('Handling NFT like:', data);
   
}

function handleWalletTransfer(data) {
    console.log('Handling wallet transfer:', data);
   
}

export default consumer;


