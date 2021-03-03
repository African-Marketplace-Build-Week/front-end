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
  e.preventDefault();
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
onchange={onChange}
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

 <button type='submit'>submit</button>
  </form>

  <div className='your-items'>
    <h2>Your Items: </h2>
    <p> { item.itemName } </p>
  </div>
      </div>
    );
  }

