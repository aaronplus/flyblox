import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import Link from 'next/link'
import Rating from '~/components/elements/Rating'
import { toFixed } from '../../common/helpers'

const ModuleDetailTopInformation = ({
  product,
  productQuantity,
  pricesInTokens
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: 'GET_PRICES_ACC_TO_TOKENS',
      payload: { price: product?.sellingPrice }
    })
  }, [product?.sellingPrice])
  // Views
  let priceView

  if (product.is_sale) {
    priceView = (
      <h4 className='ps-product__price sale'>
        <del className='mr-2'>&{product.sale_price}</del>${product.price}
      </h4>
    )
  } else {
    priceView = <h4 className='ps-product__price'>${product.price}</h4>
  }
  return (
    <header>
      <h1>{product.name}</h1>
      <div className='ps-product__meta'>
        <p>
          <b>Seller:</b> {product.seller?.username}
          {/* <Link href='/shop'>
            <a className='ml-2 text-capitalize'>{product.vendor}</a>
          </Link> */}
        </p>
        {/* <div className='ps-product__rating'>
          <Rating />
          <span>(1 review)</span>
        </div> */}
        <p>
          <b>Availablity:</b> {/* {productQuantity} */}
          <span style={{ color: productQuantity > 0 ? '#7CC57A' : '#ef2626' }}>
            {productQuantity > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </p>

        <p>
          {product?.freeInternationally == true ? 
            <>
              <b>
                Display Ships Globally
              </b>
            </>
           : 
          <>
              <b>Ships to</b>{" "}
              <span style={{ color: productQuantity > 0 ? '#7CC57A' : '#ef2626' }}>
                {product?.countryOfSale} 
              </span>
              {" "}<b>Only</b>
          </>
          }
        </p>
        
      </div>
      <h4 className='ps-product__price'>${product.sellingPrice}</h4>
      <div className='mb-2'>
        <table>
          {pricesInTokens?.map(priceInToken => (
            <tbody key={priceInToken?._id}>
              <tr>
                <td >
                  {priceInToken?.name == "Ethereum" && (
                    <img
                      src='/static/img/payment-method/eth.png'
                      alt='FlyBlox'
                      width='25px'
                    />

                  )}
                  {priceInToken?.name == "Tether" && (
                    <img
                      src='/static/img/payment-method/usdt.png'
                      alt='FlyBlox'
                      width='25px'
                    />
                  )}
                  {priceInToken?.name == "WBTC" && (
                    <img
                      src='/static/img/payment-method/bnb.png'
                      alt='FlyBlox'
                      width='25px'
                    />

                  )}
                  {priceInToken?.name == "HEX" && (
                    <img
                      src='/static/img/payment-method/hex.png'
                      alt='FlyBlox'
                      width='25px'
                    />

                  )}
                </td>
                <td width='60'>
                  <strong>{priceInToken?.name}:</strong>
                </td>
                <td>{toFixed(priceInToken?.amount, 8)}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      {/* {priceView} */}
    </header>
  )
}

const mapStateToProps = state => ({
  pricesInTokens: state.tokens.pricesAccToTokens
})

export default connect(mapStateToProps)(ModuleDetailTopInformation)
