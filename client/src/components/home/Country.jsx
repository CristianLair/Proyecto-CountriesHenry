import React from 'react'

import style from './css/country.module.css'

export default function Country(props) {
  return (
    <div className={style.card}>
      <img src={props.urlImg} alt={props.name}/>
      <p>{props.name}</p>
      <p>{props.continent}</p>
    </div>
  )
}