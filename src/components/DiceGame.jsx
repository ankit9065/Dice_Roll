import React, { useState, useEffect } from 'react'
import './RollDice.css'
import './Die.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Die = ({ face, rolling }) => (
  <div>
    <FontAwesomeIcon
      icon={['fas', `fa-dice-${face}`]}
      className={`Die ${rolling && 'Die-shaking'}`}
    />
  </div>
)

const RollDice = () => {
  const [dice, setDice] = useState({
    die1: 'one',
    die2: 'one',
    rolling: false,
  })

  const { die1, die2, rolling } = dice

  const sides = ['one', 'two', 'three', 'four', 'five', 'six']

  const roll = () => {
    setDice({
      die1: sides[Math.floor(Math.random() * sides.length)],
      die2: sides[Math.floor(Math.random() * sides.length)],
      rolling: true,
    })
  }

  useEffect(() => {
    if (rolling) {
      const timeoutId = setTimeout(() => {
        setDice((prevDice) => ({ ...prevDice, rolling: false }));
      }, 1000)

      return () => clearTimeout(timeoutId)
    }
  }, [rolling])

  const handleBtn = rolling ? 'RollDice-rolling' : ''

  return (
    <div className='RollDice'>
      <div className='RollDice-container'>
        <Die face={die1} rolling={rolling} />
        <Die face={die2} rolling={rolling} />
      </div>
      <button className={handleBtn} disabled={rolling} onClick={roll}>
        {rolling ? 'Rolling' : 'Roll Dice!'}
      </button>
    </div>
  )
}

export default RollDice;
