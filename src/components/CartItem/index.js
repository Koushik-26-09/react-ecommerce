import { Component } from 'react'
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs'
import './index.css'

class CartItem extends Component {
  render() {
    const {
      product,
      incrementQuantity,
      decrementQuantity,
      removeItem,
    } = this.props

    const { id, title, brand, price, quantity, imageUrl } = product

    return (
      <li className="cart-item">
        <img src={imageUrl} alt={title} className="cart-item-img" />
        <div className="cart-item-details">
          <p className="cart-item-title">{title}</p>
          <p className="cart-item-brand">{brand}</p>
          <p className="cart-item-price">Rs {price}/-</p>
          <div className="cart-quantity">
            <button
              onClick={() => decrementQuantity(id)}
              className="quantity-btn"
              data-testid="minus"
            >
              <BsDashSquare />
            </button>
            <p className="quantity">{quantity}</p>
            <button
              onClick={() => incrementQuantity(id)}
              className="quantity-btn"
              data-testid="plus"
            >
              <BsPlusSquare />
            </button>
          </div>
          <button onClick={() => removeItem(id)} className="remove-btn">
            Remove
          </button>
        </div>
      </li>
    )
  }
}

export default CartItem
