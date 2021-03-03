import React from 'react'

export default function MarketItemList(props) {

    
    return (
      <div className='item-card'>
      <div className='item-div'>
      <h3 className='itemName'>{props.name}</h3>
      </div>
      <div className='item-div'>
      <p className='category'>{props.category}</p>
        </div>
        <div className='item-div flex-div'>
          <div className={props.demand}> in {props.demand} demand</div>
          <div className='expires-in'> expires in {props.expires} days</div>
        </div>
        <div className='item-div other'>
        <p><span className='seller'>Inventory:</span> <br /> 
        {props.inventory}</p>
        </div>
        <div className='item-div other'>
        <p><span className='seller'>Marketplace:</span> <br /> 
        {props.marketName}</p>
        </div>
        <div className='item-div other'>
        <p><span className='seller'>Seller:</span> <br /> 
        {props.sellerName}</p>
        </div>
        <div className='item-div flex-div'>
        <div className='purchase'>purchase</div>
          <div className='contact-seller'>contact seller</div>
        </div>
      </div>
    );
  }