import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import style from './css/countrydetail.module.css'
import { clearDetail } from '../../../redux/actions'

export default function CountryDetail() {
  const pais = useSelector(state => state.countryDetail)
  const dispatch = useDispatch()

  useEffect(() => {
    return function (){
      dispatch(clearDetail())
    }
  },[dispatch])

  try {
    return (
      <>
        <Link className={style.button} to='/home'>back</Link>
        <div className={style.container}>
            <img src={pais.urlImg} alt="argentina" />
            <h1>{pais.name}</h1>
            <p>Código: {pais.ID}</p>
            <p>Capital: {pais.capital}</p>
            <p>Superficie: {pais.area / 1000} km2</p>
            <p>Población: {pais.poblacion}</p>
            {pais.activities.length > 0 ? <p>Actividades</p> : null}
            <ul>{pais.activities?.map(a => {
              return <li className={style.actDetail} key={a.ID}>Nombre: {a.name} <br /> Dificultad: {a.dificultad} <br /> Duración {a.duracion} horas <br /> Temporada: {a.temporada}</li>
            })}</ul>
        </div>
      </>
    ) 
  } catch (e) {
    return (
    <>
      <Link className={style.button} to='/home'>back</Link>
      <center>
        <h1>Ha ocurrido un error...</h1>
      </center>
    </>)
  }
}