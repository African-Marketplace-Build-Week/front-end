import React, { useState } from 'react'
import { marketplaceArray } from '../data/Data'

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






     
    return (
      <div className='form-container'>
      <form className='new-item-form1'>
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

 <button onClick={onChange}>submit</button>
  </form>

  <div className='your-items'>
    <h2>Your Items: </h2>
  </div>
      </div>
    );
  }

