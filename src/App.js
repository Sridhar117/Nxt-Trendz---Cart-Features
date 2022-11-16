import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({cartList: filteredCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state

    const updatedCartList = cartList.map(eachCartItem => {
      if (eachCartItem.id === id) {
        return {...eachCartItem, quantity: eachCartItem.quantity + 1}
      }
      return eachCartItem
    })

    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const findIncrementItem = cartList.find(eachCart => eachCart.id === id)
    if (findIncrementItem.quantity > 1) {
      const updatedCartItemList = cartList.map(eachCartItem => {
        if (eachCartItem.id === id) {
          return {...eachCartItem, quantity: eachCartItem.quantity - 1}
        }
        return eachCartItem
      })
      this.setState({cartList: updatedCartItemList})
    } else {
      this.deleteCartItem(id)
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            removeAllCartItems: this.removeAllCartItems,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
