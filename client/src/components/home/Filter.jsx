import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { filterAndOrder, filtrarPorActividad, filtrarPorContinente, loadCountries, loadingState } from '../../redux/actions';

import style from './css/filterandorder.module.css'

export default function Filter() {
  const [activities, setActivities] = useState([])

  const dispatch = useDispatch();

  useEffect(() =>{
    async function cargarActividades(){
      try{
        const response = await axios.get('/activity')
        if(response)setActivities(response.data)
      }catch(e){
        console.log(e)
      }
    }
    cargarActividades()
  }, [dispatch])


  return (
    <>
      <select className={style.button} name="filtPorContinente" id="filtPorContinente" onChange={(e) => { 
          if(e.target.value !== 'sel'){
            dispatch(filtrarPorContinente(e.target.value))
            dispatch(loadingState(true))
            dispatch(filterAndOrder(true))
            document.getElementById('filtPorActividad').value="sel"
          }
          else {
            dispatch(loadCountries())
            dispatch(loadingState(true))
            dispatch(filterAndOrder(true))
            document.getElementById('filtPorContinente').value="sel"
            document.getElementById('filtPorActividad').value="sel"
          }
        }
      }>
        <option value="sel">Filtro continente</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
        <option value="Antarctic">Antarctic</option>
      </select>

      <select className={style.button} name="filtPorActividad" id="filtPorActividad"  onChange={(e) => { 
          if(e.target.value !== 'sel'){
            dispatch(filtrarPorActividad(e.target.value))
            dispatch(loadingState(true))
            dispatch(filterAndOrder(true))
            document.getElementById('filtPorContinente').value="sel"
          }
          else {
            dispatch(loadCountries())
            dispatch(loadingState(true))
            dispatch(filterAndOrder(true))
            document.getElementById('filtPorContinente').value="sel"
            document.getElementById('filtPorActividad').value="sel"
          }
        }
      }>
      <option value="sel">Filtro actividad</option>
        {
          activities?.map(e => {
            return <option key={e} value={e}>{e}</option>
          })
        }
      </select>

      <button className={style.botonReset} onClick={(e) => {
          dispatch(loadCountries())
          dispatch(loadingState(true))
          dispatch(filterAndOrder(true))
          document.getElementById('filtPorContinente').value="sel"
          document.getElementById('filtPorActividad').value="sel"
          document.getElementById('ordenPoblacion').value="sel"
          document.getElementById('ordenAlfabetico').value="sel"
          document.getElementById('pages').value="1"
        }
      }>
      BORRAR FILTROS</button>
    </>
  )
}