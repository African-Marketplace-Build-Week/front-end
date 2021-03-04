import React from 'react'
import { marketplaceArray } from '../data/Data'
import MarketItemList from './MarketItemList'
import NewItem from './NewItem'
import '../styles/dashboard.css'
import { useHistory, Link } from "react-router-dom";


export default function Home(props) {
  const { push } = useHistory();
    console.log(marketplaceArray)
    return (
      <div className='dashboard-container'>
        <div className='nav-bar-dashboard'>
      <h1 className='title-h1'> <span className='hello'>Hello!</span> Welcome to the African Marketplace.</h1>  <br /></div>
      <div className='cards-container'>
  <div className="market-container">
      {marketplaceArray.length > 0 && marketplaceArray.map((item) => <MarketItemList 
    key={item.id} 
    {...item} />)}
      </div>
      <div className='new-item-form'>
        <NewItem />
        <div className='home-link'>
        <Link className='homeBtn' to="/">Home</Link>
        </div>
      </div>
      
      </div>
      </div>
      
    );
  }