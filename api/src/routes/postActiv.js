const { Router } = require('express');
const fs = require('fs');
const { Activity } = require("../db");

const route = Router()

const crearActividad = async (name, dificultad, duracion, temporada, idPais) => {
    try {
        const act = await Activity.create({
            name,
            dificultad,
            duracion,
            temporada
        }) 
        await act.addCountry(idPais)
        console.log("Actividad: "+ name +" agregada al pais "+ idPais);
    } catch (e) {
        console.log(e);
    }
}

route.post('/', (req, res) => {
    const { name, dificultad, duracion, temporada, idPais } = req.body;

    if(name && dificultad && duracion && temporada && idPais.length > 0){
        idPais.forEach((e) =>{
            crearActividad(name, dificultad, duracion, temporada, e)
        })

        return res.status(201).json({
            msg: `Actividad '${name}' creada correctamente!`
        });
    }
    else{
        return res.status(400).send({
            msg: "Faltan algunos campos para agregar la actividad"
        })
    }
})

route.get('/', async (req, res) => {
    
    const result = await Activity.findAll();

    let array = []

    if(result){
        for(let i = 0; i < result.length; i++){
            if(array.indexOf(result[i].name) === -1){ // si no encuentra repetidos no los pushea al array
                array.push(result[i].name)
            }
        }
    }

    res.send(array);
})

module.exports = route;