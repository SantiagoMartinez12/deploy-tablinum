///////////////////////////////////////////////////////////////////
/////// LLENADO DE TABLA DE TEMPERAMENTOS DESDE LA API   //////////
//////////////////////////////////////////////////////////////////

const expres = require('express')
const {Router} = require('express')
const {conn} = require('../db')
const rutas = Router()  
const axios = require('axios')
const {Op, ARRAY} = require('sequelize');


const {  especimen, filo} = conn.models


module.exports = async()=>{
   
        var filogen=[];
   
        var tablaFilo=[];
        const catalog =  await especimen.sequelize.query('select posicionfilo from especimens')
        const tablaFilogenesis =  await filo.findAll()
        tablaFilogenesis.map(e=>{
         
        if(!tablaFilo.includes(e.filo)){
          tablaFilo.push(e.filo);
        }
       
       })



        catalog[0].map(e=>{
        if(e.posicionfilo.length>0 ){
           for(i=0; e.posicionfilo.length > i; i++){
            if(!filogen.includes(e.posicionfilo[i])&& !tablaFilo.includes(e.posicionfilo[i])){
             filo.create({
              filo: e.posicionfilo[i],
              })
              filogen.push(e.posicionfilo[i])
            }

           }
  

          
        }
     
        })

    
};
