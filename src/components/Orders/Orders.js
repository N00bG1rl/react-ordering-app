import { Fragment } from 'react'

import MealsSummary from './OrdersSummary'
import AvailableMeals from './AvailableOrders'

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  )
}

export default Meals
