import React from 'react'
import CreatorInfo from '../../components/Creator/CreatorInfo/CreatorInfo'
import CreatorSingle from '../../components/Creator/CreatorSingle/CreatorSingle'
import Crypter from '../../components/Crypter/Crypter'
import Seller from "../../components/Seller/Seller";
import Wallet from '../../components/Wallet/Wallet';


const Home = () => {
  return (
    <div>
      <CreatorInfo />
      <CreatorSingle />
      <Seller />
      <Crypter />
    </div>
  )
}

export default Home