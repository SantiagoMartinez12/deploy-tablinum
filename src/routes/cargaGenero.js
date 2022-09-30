///////////////////////////////////////////////////////////////////
/////// LLENADO DE TABLA DE TEMPERAMENTOS DESDE LA API   //////////
//////////////////////////////////////////////////////////////////

const expres = require('express')
const {Router} = require('express')
const {conn} = require('../db')
const rutas = Router()  
const axios = require('axios')
const {Op, ARRAY} = require('sequelize');


const {  especimen, generoespecie} = conn.models


module.exports = async()=>{
    
        var generos=[];
        var especies=['sp.'];
        var tablaGenero=[];
        var tablaEspecies=['sp.'];
              
        const catalogo =  await especimen.sequelize.query('select genero, especie from especimens' )
        const catalogoB =  await especimen.sequelize.query('select genero, especie from bochons' )
        const tablaGeneroEspecie =  await generoespecie.findAll()
        const catalog=catalogo[0]
        const catalogB=catalogoB[0]

       
       tablaGeneroEspecie.map(e=>{
        if(!tablaGenero.includes(e.genero)){
          tablaGenero.push(e.genero);
        }
        if(!tablaEspecies.includes(e.especie)){
          tablaEspecies.push(e.especie);
        }
       })
       

         catalog.map(e=>{
           if(!generos.includes(e.genero) && !tablaGenero.includes(e.genero)){ //INSERTO NUEVO GENERO (y todas sus especies) 
             generoespecie.create({
               genero: e.genero,
               especie:['sp.']
               })
             generos.push(e.genero)

        //     //BUSCO TODAS LAS ESPECIES DE ESE GENERO y creo el ARRAY para insrtar
             for(i=0;catalog.length>i;i++){
                if(catalog[i].genero==e.genero) {
                 if(!especies.includes(catalog[i].especie.toLowerCase()) && !tablaEspecies.includes(catalog[i].especie.toLowerCase())){
               
                    especies.push(catalog[i].especie.toLowerCase())
                 }
                
                }
               
             }
            //update de Tabla con las especies del genero correspondiente
            generoespecie.update({
              especie: especies,
                  }, {
                where: {
                    genero: e.genero,
                }
            });
            
           }
          especies=['sp.'];
     
         })
    
         catalogB.map(e=>{
             if(!generos.includes(e.genero) && !tablaGenero.includes(e.genero)){ //INSERTO NUEVO GENERO (y todas sus especies) 
               generoespecie.create({
                 genero: e.genero,
                 especie:['sp.']
                 })
               generos.push(e.genero)
  
          //     //BUSCO TODAS LAS ESPECIES DE ESE GENERO y creo el ARRAY para insrtar
               for(i=0;catalog.length>i;i++){
                  if(catalog[i].genero==e.genero) {
                   if(!especies.includes(catalog[i].especie.toLowerCase()) && !tablaEspecies.includes(catalog[i].especie.toLowerCase())){
                 
                      especies.push(catalog[i].especie.toLowerCase())
                   }
                  
                  }
                 
               }
              //update de Tabla con las especies del genero correspondiente
              generoespecie.update({
                especie: especies,
                    }, {
                  where: {
                      genero: e.genero,
                  }
              });
              
             }
            especies=['sp.'];
       
           })
      

    
};
