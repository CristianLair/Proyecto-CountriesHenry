import React from 'react'

import { useDispatch } from 'react-redux'

import { filterAndOrder, loadCountries, loadingState, ordenAlfabetico, ordenCantidadPoblacion } from '../../redux/actions';

import style from './css/filterandorder.module.css';

export default function Ordenar() {
  const dispatch = useDispatch();
  
  return (
    <>
      <select className={style.button} name="ordenAlfabetico" id="ordenAlfabetico" onChange={(e) => {
          if(e.target.value !== 'sel'){
            dispatch(ordenAlfabetico(e.target.value))
            dispatch(loadingState(false))
            dispatch(filterAndOrder(true))
            document.getElementById('ordenPoblacion').value="sel"
          } else {
            dispatch(loadCountries())
            dispatch(loadingState(false))
            dispatch(filterAndOrder(true))
            document.getElementById('ordenPoblacion').value="sel"
            document.getElementById('ordenAlfabetico').value="sel"
          }
        }
      }>
        <option value="sel">Orden Alfabetico</option>
        <option value="asc">A - Z</option>
        <option value="desc">Z - A</option>
      </select>
      
      <select className={style.button} name="ordenPoblacion" id="ordenPoblacion" onChange={(e) => {
          if(e.target.value !== 'sel'){
            dispatch(ordenCantidadPoblacion(e.target.value))
            dispatch(loadingState(false))
            dispatch(filterAndOrder(true))
            document.getElementById('ordenAlfabetico').value="sel"
          } else {
            dispatch(loadCountries())
            dispatch(loadingState(false))
            dispatch(filterAndOrder(true))
            document.getElementById('ordenPoblacion').value="sel"
            document.getElementById('ordenAlfabetico').value="sel"
          }
        }
      }>
        <option value="sel">Orden Poblacion</option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </>
  )
}