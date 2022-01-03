import Card from '../UI/Card'
import MealItem from './OrderItem/OrderItem'

import styles from './AvailableOrders.module.css'

const DUMMY_CANDY = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
]

const AvailableMeals = () => {
  // Helper constant
  const candyList = DUMMY_CANDY.map(candy => (
    <MealItem
      id={candy.id}
      key={candy.id}
      name={candy.name}
      description={candy.description}
      price={candy.price}
    />
  ))

  // Return some jsx code
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{candyList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
