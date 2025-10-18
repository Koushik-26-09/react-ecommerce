import {Component} from 'react'
import './index.css'

class SimilarProductItem extends Component {
  render() {
    const {productData} = this.props
    const {id, imageUrl, title, style, price, brand, rating} = productData

    return (
      <li
        className="similar-product-item"
        data-testid={`similar-product-item-${id}`}
      >
        <img
          src={imageUrl}
          alt={`similar product ${title}`}
          className="similar-product-image"
        />
        <p
          className="similar-product-title"
          data-testid={`similar-product-title-${id}`}
        >
          {title}
        </p>
        <p className="similar-product-style">{style}</p>
        <p className="similar-product-price">Rs {price}/-</p>
        <p
          className="similar-product-brand"
          data-testid={`similar-product-brand-${id}`}
        >
          {brand}
        </p>
        <p className="similar-product-rating">Rating: {rating}</p>
      </li>
    )
  }
}

export default SimilarProductItem
