import React from 'react'

import './OrderItem.css';

const OrderItem = ({item}) => {
    return (
        <div className = "order-item">
            <div className = "row">
                <div className = "col-md-4">
                    <img src = {item.image} className = "order-item__image" />
                </div>
                <div className = "col-md-8">
                    <h3>{item.name}</h3>
                    <p>{item.qty}</p>
                    <h4>{item.price}</h4>
                </div>
            </div>
        </div>
    )
}

export default OrderItem;
