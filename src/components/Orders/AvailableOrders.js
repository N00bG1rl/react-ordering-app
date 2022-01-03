import Card from '../UI/Card'
import MealItem from './OrderItem/OrderItem'

import styles from './AvailableOrders.module.css'

const DUMMY_ORDER = [
  {
    id: 'm1',
    name: 'Order 1',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Order 2',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Order 3',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Order 4',
    description: 'Healthy...and green...',
    price: 18.99,
  },
]

const AvailableMeals = () => {
  // Helper function
  const orderList = DUMMY_ORDER.map(order => (
    <MealItem
      id={order.id}
      key={order.id}
      name={order.name}
      description={order.description}
      price={order.price}
    />
  ))

  // Return some jsx code
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{orderList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
