const { Router } = require('express');
const { Country, Activity } = require('../db');
const { Op } = require("sequelize");
const axios = require('axios')

const route = Router();


const getApiInfo = async () =>{
    const inf = await axios.get('https://restcountries.com/v3/all')
    const mapeoData = await inf.data.map(c =>{
        return {
            id: c.cca3,
				nombre: c.name,
			    bandera: c.flag[1],
		 		continente: c.region,
		 		capital: c.capital ? c.capital[0] : "Undifined capital",
		 		subregion: c.subregion ? c.subregion : "Undifined subregion",
		 		area: c.area ? c.area.toString() : null,
		 		poblacion: c.population ? c.population.toString() : 0
        }
        
    })
    return mapeoData
}

const miInfo = async ()=>{
    return await Country.findAll({
        include: {
            model: Activity,
            attribiutes : ['name'],
            through:{
                attribiutes :[],
            }
        }
    })
}

const getinfoAll = async ()=>{
    const apiInfo = await getApiInfo();
    const miInfoData = await miInfo();
    const allData = apiInfo.concat(miInfoData)
    return allData

}

route.get('/', async(req,res)=>{
    const {name} = req.query;
    if(name){
        const resultado = await Country.findAll({
            where: {
                name:{
                    [Op.iLike]: `%${name}%`
                }
            },
            include: Activity 
        })

        if(resultado.length === 0){
            return res.status(404).json({
                msg: "País no encontrado"
            })
        }

        res.status(200).json(resultado)
    }
    else{
        const resultado = await Country.findAll({
            include: {
                model: Activity,
                attributes: ["name"]
            }
        })
        res.status(200).send(resultado)
    }
})

route.get('/:idPais', async (req, res) => {
    const  idPais  = req.params.idPais.toUpperCase()

    const existe = await Country.findAll({
        where:{
            ID: idPais
        },
        include: Activity
    })

    if(existe){
        res.json(existe)
    }
    else return res.status(404).json({
        msg: "País no encontrado"
    })
})

module.exports = route