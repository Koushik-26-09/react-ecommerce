import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import CartItem from '../CartItem'
import CartSummary from '../CartSummary'
import './index.css'

class Cart extends Component {
  state = {
    cartItems: [],
  }

  componentDidMount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || []
    this.setState({cartItems})
  }

  updateLocalStorage = cartItems => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }

  incrementQuantity = id => {
    this.setState(
      prevState => ({
        cartItems: prevState.cartItems.map(item =>
          item.id === id ? {...item, quantity: item.quantity + 1} : item,
        ),
      }),
      () => this.updateLocalStorage(this.state.cartItems),
    )
  }

  decrementQuantity = id => {
    this.setState(
      prevState => ({
        cartItems: prevState.cartItems.map(item =>
          item.id === id && item.quantity > 1
            ? {...item, quantity: item.quantity - 1}
            : item,
        ),
      }),
      () => this.updateLocalStorage(this.state.cartItems),
    )
  }

  removeItem = id => {
    this.setState(
      prevState => ({
        cartItems: prevState.cartItems.filter(item => item.id !== id),
      }),
      () => this.updateLocalStorage(this.state.cartItems),
    )
  }

  render() {
    const {cartItems} = this.state
    const isEmpty = cartItems.length === 0

    return (
      <>
        <Header />
        <div className="cart-container">
          {isEmpty ? (
            <div className="empty-cart">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
                alt="cart"
                className="cart-img"
              />
              <h1>Your Cart is Empty</h1>
              <Link to="/products" className="shop-now-btn">
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="cart-content">
              <ul className="cart-items-list">
                {cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    product={item}
                    incrementQuantity={this.incrementQuantity}
                    decrementQuantity={this.decrementQuantity}
                    removeItem={this.removeItem}
                  />
                ))}
              </ul>
              <CartSummary cartItems={cartItems} />
              <Link to="/checkout" className="checkout-btn">
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default Cart
