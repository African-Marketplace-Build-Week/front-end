import React, { useState } from 'react'
import { marketplaceArray } from '../data/Data'
import YourItem from './YourItem'

const initialValues = {
        category: "",
        itemName: "",
        sellerName: "",
        marketName:"",
        expires: "7",
        inventory: "",
        demand: "low",
}

export default function MarketItemList(props) {
const [item, setItem] = useState(initialValues);

const onChange = (e) => {
  setItem({
    ...item,
    [e.target.name]: e.target.value,
  });
  console.log(item)

};

const onSubmit = (e) => {
  e.preventDefault();
  return (
    <YourItem />
  )
}
 
    return (
      <div className='form-container'>
      <form onSubmit={onSubmit} className='new-item-form1'>
<h2>Add new Item: </h2>
<input 
type='text'
name='itemName'
onChange={ onChange }
placeholder='Item Name...'
 />


<select className='select-category' 
name='category' 
onChange={onChange}>

  <option value=''>- select -</option>
  <option value='Animal Products'>Animal Products</option>
  <option value='Beans'>Beans</option>
  <option value='Cereals-Maize'>Cereals-Maize</option>
  <option value='Cereals-Other'>Cereals-Other</option>
  <option value='Cereals-Rice'>Cereals-Rice</option>
  <option value='Fruits'>Fruits</option>
  <option value='Peas'>Peas</option>
  <option value='Roots & Tubers'>Roots & Tubers</option>
  <option value='Seeds & Nuts'>Seeds & Nuts</option>
  <option value='Vegetables'>Vegetables</option>
</select>

<input 
type='text'
name='inventory'
onChange={onChange}
placeholder='Inventory...'
 />

<input 
type='text'
name='marketName'
onChange={onChange}
placeholder='Market Name...'
 />

<input 
type='text'
name='sellerName'
onChange={onChange}
placeholder='Seller Name...'
 />

 <button type='submit' onClick={onChange}>submit</button>
  </form>

  <div className='your-items'>
    <h3>Preview Item here:</h3>
  <div className='hideMe'>
  <div className='item-card'>
      <div className='item-div'>
      <h3 className='itemName'>{item.itemName}</h3>
      </div>
      <div className='item-div'>
      <p className='category'>{item.category}</p>
        </div>
        <div className='item-div flex-div'>
          <div className={item.demand}> in {item.demand} demand</div>
          <div className='expires-in'> expires in {item.expires} days</div>
        </div>
        <div className='item-div other'>
        <p><span className='seller'>Inventory:</span> <br /> 
        {item.inventory}</p>
        </div>
        <div className='item-div other'>
        <p><span className='seller'>Marketplace:</span> <br /> 
        {item.marketName}</p>
        </div>
        <div className='item-div other'>
        <p><span className='seller'>Seller:</span> <br /> 
        {item.sellerName}</p>
        </div>
        <div className='item-div flex-div'>
        <div className='purchase'>purchase</div>
          <div className='contact-seller'>contact seller</div>
        </div>
      </div>
  </div>
      </div>
      </div>
    );
  }

