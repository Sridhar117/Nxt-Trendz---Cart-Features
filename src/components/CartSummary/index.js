import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const initialCartValue = 0
      const totalCartValue = cartList.reduce(
        (previousValue, currentValue) => previousValue + currentValue.price,
        initialCartValue,
      )
      return (
        <div>
          <h1>
            Order Total: <span>{totalCartValue}</span>
          </h1>
          <p>{cartList.length} items in cart</p>
          <button type="button">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
