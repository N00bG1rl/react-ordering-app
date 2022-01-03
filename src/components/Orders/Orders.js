import { Fragment } from 'react'

import OrdersSummary from './OrdersSummary'
import AvailableOrders from './AvailableOrders'

const Orders = () => {
  return (
    <Fragment>
      <OrdersSummary />
      <AvailableOrders />
    </Fragment>
  )
}

export default Orders
