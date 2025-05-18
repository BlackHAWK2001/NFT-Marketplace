import NFT from '../models/NFTSchema/NFT.models.js';
import Auction from '../models/NFTSchema/Auction.models.js';
import client from '../config/redis.js';
import producer from '../../kafkaClient.js';
import User from '../models/UserSchema/User.models.js';

async function getAllNFTs(req,res) {
    const {price,auctionEndTime,likes} = req.query;
    try {
        const filter = {};
        if (price) filter.price = { $lte: price };
        if (auctionEndTime) filter.auctionEndTime = { $lte: new Date(auctionEndTime) };
        if (likes) filter.likes = { $gte: likes };

        const cacheKey = `allNFTs:${price || 'none'}:${auctionEndTime || 'none'}:${likes || 'none'}`;
        const cachedNFTs = await client.get(cacheKey);
        if (cachedNFTs) {
            return res.status(200).json({ data: JSON.parse(cachedNFTs) });
        }
        
        const nfts = await NFT.find(filter);

        await client.set(cacheKey, JSON.stringify(nfts), { EX: 600 });
        res.status(200).json(nfts);
    } catch (err) {
        res.status(500).json({ message: 'Error in getAllNFTs controller', error: err });
    }
}

// NFT
async function getNFT(req,res) {
    try {
        const nftId = req.params.id;
        const cachedNft = await client.get(`nft:${nftId}`);
        if(cachedNft) {
            return res.status(200).json({data:JSON.parse(cachedNft)});
        }
        const nft = await NFT.findById(nftId);
        if(!nft) {
            return res.status(404).json({ message: 'NFT is not found' });
        }

        await client.set(`nft:${nftId}`,JSON.stringify(nft),{EX:600});
        res.status(200).json(nft);
    } catch (err) {
        res.status(500).json({ message: 'Error in getNFT controller', error: err });
    }
}

//  NFT
async function createNFT(req, res) {
    const { name, description, price, auctionEndTime, image, collection } = req.body; //  title
    try {
        
        if (!name || !price || !auctionEndTime) {
            return res.status(400).json({ message: 'Name, price, and auctionEndTime are required fields.' });
        }

      

        
        const newNFT = new NFT({
            name,
            description,
            price,
            auctionEndTime,
            image,
            collection,
            creator: req.user?.id || null,
        });

        
        await newNFT.save();

        res.status(201).json(newNFT);
    } catch (err) {
        res.status(500).json({ message: 'Error in createNFT controller', error: err.message });
    }
}



async function updateNFT(req,res) {
    const {name,description,price,auctionEndTime,collection,image} = req.body;
    try {
        const updatedNFT = await NFT.findByIdAndUpdate(req.params.id, { name,description, price, auctionEndTime,collection,image }, { new: true });
        if(!updatedNFT) {
            return res.status(404).json({ message: 'NFT is not found' });
        }
        res.status(200).json(updatedNFT);
    } catch (err) {
        res.status(500).json({ message: 'Error in updateNFT controller', error: err });
    }
}


async function deleteNFT(req,res) {
    try {
        const deletedNFT = await NFT.findByIdAndDelete(req.params.id);
        if(!deletedNFT) {
            return res.status(404).json({ message: 'NFT is not found' });
        }
        res.status(200).json({message:'Delete NFT successfull!'});
    } catch (err) {
        res.status(500).json({ message: 'Error in deleteNFT controller', error: err });
    }
}


async function likeNFT(req,res) {
    try {
        const nft = await NFT.findById(req.params.id);
        if (!nft) {
            return res.status(404).json({ message: 'NFT is not found' });
        }
    
        if (nft.likes.includes(req.user.id)) {
            return res.status(400).json({ message: 'You already like this NFT!' });
        }
    
        nft.likes.push(req.user.id);
        await nft.save();
    
        const nftOwner = await User.findById(nft.creator);
        if (!nftOwner) {
            return res.status(404).json({ message: 'User who created NFT not found' });
        }
    
        console.log('NFT owner before update:', nftOwner);
    
        if (!nftOwner.nftLikes) {
            nftOwner.nftLikes = [];
        }
    
        nftOwner.nftLikes.push({ nftId: nft.id, timestamp: new Date() });
        console.log('Updated nftLikes:', nftOwner.nftLikes);
    
        await nftOwner.save();
        console.log('NFT owner saved successfully');
    
        const message = {
            topic: 'nft-likes',
            messages: JSON.stringify({ nftId: nft.id, userId: req.user.id }),
        };
    
        producer.send([message], (err, data) => {
            if (err) {
                console.error('Error sending message to Kafka:', err);
            } else {
                console.log('Message sent to Kafka:', data);
            }
        });
    
        res.status(200).json(nft);
    } catch (err) {
        console.error('Error in likeNFT controller', err);  
        res.status(500).json({ message: 'Error in likeNFT controller', error: err });
    }
}


async function unlikeNFT(req,res) {
    try {
        const nft = await NFT.findById(req.params.id);
        if(!nft) {
            return res.status(404).json({ message: 'NFT is not found' });
        }

        nft.likes = nft.likes.filter(like => like.toString() !== req.user.id);
        await nft.save();
        res.status(200).json(nft);
    } catch (err) {
        res.status(500).json({ message: 'Error in unlikeNFT controller', error: err });
    }
}

export {getAllNFTs,getNFT,createNFT,updateNFT,deleteNFT,likeNFT,unlikeNFT};