import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useLocation } from 'react-router-dom'
import Paginate from '../components/Paginate'

function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { error, loading, products, page, pages } = productList

  const location = useLocation()
  const keyword = new URLSearchParams(location.search).get('keyword') || ''
  const new_page = new URLSearchParams(location.search).get('page')

  const [currentKeyword, setCurrentKeyword] = useState(keyword)

  useEffect(() => {
    if (currentKeyword !== keyword) {
      setCurrentKeyword(keyword)
      dispatch(listProducts(keyword, 1))
    } else {
      dispatch(listProducts(keyword, new_page))
    }
  }, [dispatch, keyword, new_page, currentKeyword])

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <h2>
          <Loader />
        </h2>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  )
}

export default HomeScreen
