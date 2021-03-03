import React from 'react'
import { marketplaceArray } from '../data/Data'
import MarketItemList from './MarketItemList'
import NewItem from './NewItem'
import '../styles/dashboard.css'


export default function Home(props) {
    console.log(marketplaceArray)
    return (
      <div className='dashboard-container'>
      <h1 className='title-h1'> <span className='hello'>Hello!</span> Welcome to the African Marketplace.</h1> <br />
      <div className='cards-container'>
  <div className="market-container">
      {marketplaceArray.length > 0 && marketplaceArray.map((item) => <MarketItemList 
    key={item.id} 
    {...item} />)}
      </div>
      <div className='new-item-form'>
        <NewItem />
      </div>
      </div>
      </div>
    );
  }