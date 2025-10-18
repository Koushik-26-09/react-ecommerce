import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProductItemDetails extends Component {
  state = {
    productData: {},
    similarProducts: [],
    quantity: 1,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
      }

      const formattedSimilarProducts = data.similar_products.map(product => ({
        id: product.id,
        imageUrl: product.image_url,
        title: product.title,
        style: product.style,
        price: product.price,
        description: product.description,
        brand: product.brand,
        totalReviews: product.total_reviews,
        rating: product.rating,
        availability: product.availability,
      }))

      this.setState({
        productData: formattedData,
        similarProducts: formattedSimilarProducts,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  incrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  decrementQuantity = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity > 1 ? prevState.quantity - 1 : 1,
    }))
  }

  onClickAddToCart = () => {
    const {productData, quantity} = this.state
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const index = cart.findIndex(item => item.id === productData.id)
    if (index !== -1) {
      cart[index].quantity += quantity
    } else {
      cart.push({...productData, quantity})
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Product added to cart!')
  }

  onClickContinueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="error-image"
      />
      <h1 className="failure-heading">Product Not Found</h1>
      <button
        type="button"
        className="continue-btn"
        onClick={this.onClickContinueShopping}
      >
        Continue Shopping
      </button>
    </div>
  )

  renderProductDetails = () => {
    const {productData, similarProducts, quantity} = this.state
    const {
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
    } = productData

    return (
      <div className="product-details-container">
        <div className="main-product-container">
          <img src={imageUrl} alt="product" className="product-image" />
          <div className="product-info">
            <h1 className="product-title">{title}</h1>
            <p className="product-price">Rs {price}/-</p>
            <div className="rating-review">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="total-reviews">{totalReviews} Reviews</p>
            </div>
            <p className="product-description">{description}</p>
            <p className="product-brand">
              <span className="label">Brand: </span>
              {brand}
            </p>
            <p className="product-availability">
              <span className="label">Availability: </span>
              {availability}
            </p>
            <div className="quantity-container">
              <button
                type="button"
                data-testid="minus"
                onClick={this.decrementQuantity}
                className="quantity-btn"
              >
                <BsDashSquare />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                data-testid="plus"
                onClick={this.incrementQuantity}
                className="quantity-btn"
              >
                <BsPlusSquare />
              </button>
            </div>
            <button
              type="button"
              className="add-to-cart-btn"
              onClick={this.onClickAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <h1 className="similar-products-heading">Similar Products</h1>
        <ul className="similar-products-list">
          {similarProducts.map(product => (
            <SimilarProductItem key={product.id} productData={product} />
          ))}
        </ul>
      </div>
    )
  }

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderProductDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details">{this.renderSwitch()}</div>
      </>
    )
  }
}

export default ProductItemDetails
