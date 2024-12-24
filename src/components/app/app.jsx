import { useState, useEffect } from 'react'
import styles from './App.module.css'
import { API_URL } from '../../utils/constants'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

export default function App() {
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetch(API_URL)
    .then(res => res.json())
    .then(item => setData(item.data))
    .catch(error => console.log(`Не могу получить данные: ${error}`))
  }, [])

  function handleModal() {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients isModalOpen={isModalOpen} handleModal={handleModal} data={data} />
        <BurgerConstructor isModalOpen={isModalOpen} handleModal={handleModal} data={data} />
      </main>
    </>
  )
}
