import { Outlet } from 'react-router-dom'
import styles from './ingredient.module.css'

export default function Ingredient() {
  return (
    <div className={styles.ingredient_wrapper}>
      <Outlet />
    </div>
  )
}