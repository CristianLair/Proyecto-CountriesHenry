import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { addActividad, filterAndOrder, loadCountries, loadingState } from '../../../redux/actions'

import style from './css/activity.module.css'

export default function Activity() {

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name: '',
        dificultad: 1,
        duracion: 1,
        temporada: 'seleccionar',
        pais: []
    })

    const [error, setError] = useState({
        name: '',
        dificultad: '',
        duracion: '',
        temporada: '',
        pais: '',
    })

    const [bPaises, setBPaises] = useState([])//Paises buscados
    const [countryNames, setCountryNames] = useState([])//nombre de los paises buscados que se van a agregar a la actividad (uso temporal)

    function handleChange(e){
        const { name, value } = e.target;

        switch(name){
            case 'name':{
                setError({
                    ...error,
                    name: value.length < 3 ? 'El nombre es demasiado corto (3 o mas letras)' : '' 
                })
                break;
            }

            case 'dificultad':{
                setError({
                    ...error,
                    dificultad: value < 1 || value > 5 ? 'La dificultad varía entre 1 y 5' : '' 
                })
                break;
            }
            
            case 'duracion':{
                setError({
                    ...error,
                    duracion: value < 1 || value > 2000 ? 'La duración no puede ser mas de 2000 horas ni menor a 0 horas' : '' 
                })
                break;
            }
            
            case 'temporada':{
                setError({
                    ...error,
                    temporada: value === 'seleccionar' ? 'Elige una temporada!' : '' 
                })
                break;
            }

            default:{
                break;
            }
        }
        
        setInput({
            ...input,
            [name]: value
        })

    }
    
    function validarForm(){
        let valid = true;
        
        if(input.pais.length === 0) valid = false //arreglo con los noombres de los paises

        if(input.name.length <= 2) valid = false

        if(input.dificultad === 0 || input.dificultad > 5) valid = false

        if(input.duracion === 0 || input.duracion > 2000) valid = false

        if(input.temporada === '' || input.temporada === 'seleccionar') valid = false
        
        return valid;
    }

    async function buscarPais(e){
        try {
            const resultados = await axios.get(`/countries?name=${e.target.value}`)
            setBPaises(resultados.data)
        } catch (error) {
            console.log(error);
        }
    }

    function agregarPais(idPais, namePais){
        setInput({
            ...input,
            pais: input.pais.indexOf(idPais) === -1 ? [...input.pais, idPais] : [...input.pais]
        })
        setCountryNames([...countryNames, {name: namePais, ID: idPais}])
    }

    async function handleSubmit(e){
        e.preventDefault()
        if(validarForm()){
            try {
                const resp = await axios.get('/activity')
                const act = resp.data;
                console.log(input.pais);
                if(!act.length || act.indexOf(input.name) === -1){
                    dispatch(addActividad(input.name, input.dificultad, input.duracion, input.temporada, input.pais))
                    dispatch(loadingState(false))
                    dispatch(filterAndOrder(true))
                    dispatch(loadCountries())
                    setInput({
                        name: '',
                        dificultad: 0,
                        duracion: 0,
                        temporada: 'seleccionar',
                        pais: []
                    })
                    setBPaises([])
                    setCountryNames([])
                    document.getElementById('bpais').value = '';
                }else{
                    alert("ERROR: La actividad con ese nombre ya existe!");
                }
            } catch (error) {
                alert("ERROR: reintenta más tarde! ("+ error +")");
            }
        }else{
            alert("ERROR: Faltan completar algunos campos!");
        }
    }

    
    function deleteCountry(event, countryID){// prueba desde front como es un delete. A integrar post PI correction
        console.log(countryID);
        setInput(prev => {
            return {
                ...prev,
                pais: input.pais.filter(e => e !== countryID)
            }
        });
    }

    useEffect(()=>{
        document.title = "Agregar actividad";
    }, [dispatch])
    
    return (
      <>
        <Link className={style.button} to='/home'>back</Link>
        <form className={style.container} method="POST" onSubmit={handleSubmit}>
            <h1>Agregar actividad Turística</h1>

            <label htmlFor="name">Nombre de la actividad (3 letras o más):</label>
            <input type="text" name="name" id="name" placeholder='Ingresa un nombre' value={input.name} onChange={handleChange} />
            {error.name.length ? <span>{error.name}</span> : null }

            <label htmlFor="dificultad">Dificultad de la actividad (1 - 5):</label>
            <select name="dificultad" id="dificultad" value={input.dificultad} onChange={handleChange}>
                <option value="seleccionar">Seleccionar...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            {error.dificultad.length ? <span>{error.dificultad}</span> : null }

            <label htmlFor="duracion">Duración de la actividad (0 - 2001 horas):</label>
            <input type="number" min='0' max='2001' name="duracion" id="duracion" placeholder='Ingresa una duración' value={input.duracion} onChange={handleChange} />
            {error.duracion.length ? <span>{error.duracion}</span> : null }

            <label htmlFor='temporada'>Temporada de la actividad:</label>
            <select name="temporada" id="temporada" value={input.temporada} onChange={handleChange}>
                <option value="seleccionar">Seleccionar...</option>
                <option value="invierno">Invierno</option>
                <option value="otonio">Otoño</option>
                <option value="primavera">Primavera</option>
                <option value="verano">Verano</option>
            </select>
            {error.temporada.length ? <span>{error.temporada}</span> : null }
            <br />
            <label htmlFor="bpais">¿En que país está la actividad?</label>
            <input type="text" id="bpais" name="bpais" placeholder='Escribe el nombre de algún país a agregar...' onChange={buscarPais}/>
            {bPaises.length > 0 ?
            <>
            <h4>Paises encontrados</h4>
                <div className={style.contenedorBuscador}>
                    <div id="paisesContainer">
                        <ul className={style.lista}>
                            {bPaises?.map(e=>{
                                return (
                                        <li key={e.ID}>{e.name} <span className={style.addButton} onClick={(evento) => agregarPais(e.ID, e.name)}>Agregar</span></li>
                                    )
                                }) 
                            }
                        </ul>
                    </div>
                </div>
            </>
            : null
            }
            <hr />
            {input.pais.length > 0 ?
                <>
                    <h4>Paises con la actividad</h4>
                    <div className={style.contenedorPaises}>
                        <div id="paisesContainer">
                            <ul className={style.lista}>
                                {
                                    input.pais?.map(e => <li key={e}>{countryNames.find(el => el.ID === e).name} <span className={style.deleteCountry} onClick={ev => deleteCountry(ev, e)}>X</span></li>)
                                }
                            </ul>
                        </div>
                    </div>
                </>
            : null
            }
            <button type="submit">Agregar actividad</button>
        </form>
    </>
  )
}