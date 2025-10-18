import { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Header from '../Header'
import CartSummary from '../CartSummary'
import './index.css'

class Checkout extends Component {
  state = {
    cartItems: null,
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    orderPlaced: false,
  }

  componentDidMount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || []
    this.setState({ cartItems })
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { name, email, address, cardNumber, cartItems } = this.state

    if (!name || !email || !address || !cardNumber) {
      alert('Please fill all fields')
      return
    }

    console.log('Order Details:', { name, email, address, cardNumber, cartItems })
    localStorage.removeItem('cart')
    this.setState({ orderPlaced: true })
  }

  render() {
    const {
      cartItems,
      name,
      email,
      address,
      cardNumber,
      orderPlaced,
    } = this.state

    if (cartItems === null) return null
    if (cartItems.length === 0 && !orderPlaced) return <Redirect to="/products" />

    if (orderPlaced) {
      return (
        <>
          <Header />
          <div className="order-success">
            <h1>Order Placed Successfully!</h1>
            <Link to="/products" className="shop-more-btn">
              Shop More
            </Link>
          </div>
        </>
      )
    }

    return (
      <>
        <Header />
        <div className="checkout-container">
          <h1>Checkout</h1>
          <div className="checkout-content">
            <form className="checkout-form" onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <label>
                Address:
                <textarea
                  name="address"
                  value={address}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <label>
                Card Number:
                <input
                  type="text"
                  name="cardNumber"
                  value={cardNumber}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <button type="submit" className="place-order-btn">
                Place Order
              </button>
            </form>
            <CartSummary cartItems={cartItems} />
          </div>
        </div>
      </>
    )
  }
}

export default Checkout
