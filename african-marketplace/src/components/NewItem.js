import React, { useState } from 'react'
import { marketplaceArray } from '../data/Data'

const initialValues = {
        category: "",
        name: "",
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
  console.log('Items:', item)
};
    
    return (
      <div className='form-container'>
      <form>
<h2>Add new Item: </h2>
<input 
type='text'
name='name'
onchange={onChange}
placeholder='Item Name...'
 />
<select className='select-category' name='category' onChange={onChange}>

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
      </form>
      </div>
    );
  }