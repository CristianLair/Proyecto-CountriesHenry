import React from 'react'
import { Link } from 'react-router-dom'
//import SearchBar from './SearchBar'

import style from './css/navbar.module.css'

export default function NavBar() {
  return (
    <div className={style.navbarcontainer}> 
      <Link className={style.button} to="/">Ir a Inicio</Link>
      <span style={{fontSize: '35px', fontWeight: '600', cursor: 'pointer'}}>Countries PI</span>
      <Link to="/activity" className={style.button}>Agregar actividad</Link>
    </div>
  )
}