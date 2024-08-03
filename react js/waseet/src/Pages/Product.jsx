import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext';
import {useParams} from 'react-router-dom';
import {Breadcrumb} from '../Components/Breadcrumbs/Breadcrumb';
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay';
import { New } from '../Components/New/New.jsx'
import './CSS/Product.css'


export const Product = () => {
  const {data}= useContext(ShopContext)
  const {id} = useParams()
  const product = data.find((item) => item.id === +id);

  return (
      <div>
        <Breadcrumb product = {product} />
        <ProductDisplay product = {product} />
        <div className="discover-more">
          <h1>Discover More</h1>
          <New />
        </div>
      </div>
  )
}
