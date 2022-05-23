import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import style from './css/landing.module.css'

import { useDispatch } from 'react-redux';
import { loadCountries, loadingState } from '../../redux/actions';

export default function LandingPage() {    
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = "Countries PI"
        dispatch(loadCountries())
        dispatch(loadingState(true))
    }, [])

  return (
    <div className={style.container}>
      <h1 className={style.title}>Countries PI</h1>
      <br />
      <Link className={style.boton} to='/home'>Explore!</Link>
      <br />
      <a className={style.copyright} href="https://www.wendyperrin.com/" target="_blank" rel="noreferrer">Imagen extraída de wendyperrin</a>
    </div>
  )
}