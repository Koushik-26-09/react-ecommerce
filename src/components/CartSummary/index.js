import {Component} from 'react'
import './index.css'

class CartSummary extends Component {
  render() {
    const {cartItems} = this.props
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )
    const tax = subtotal * 0.05
    const total = subtotal + tax

    return (
      <div className="cart-summary">
        <p>Subtotal: Rs {subtotal}</p>
        <p>Tax (5%): Rs {tax.toFixed(2)}</p>
        <p>Total: Rs {total.toFixed(2)}</p>
      </div>
    )
  }
}

export default CartSummary
