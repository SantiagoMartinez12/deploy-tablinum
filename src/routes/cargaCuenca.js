///////////////////////////////////////////////////////////////////
/////// LLENADO DE TABLA DE TEMPERAMENTOS DESDE LA API   //////////
//////////////////////////////////////////////////////////////////

const expres = require('express')
const {Router} = require('express')
const {conn} = require('../db')
const rutas = Router()  
const axios = require('axios')
const {Op, ARRAY} = require('sequelize');


const {  especimen, formacioncuenca} = conn.models


module.exports = async()=>{
         var cuencas=[];
        var formaciones=[]

        var tablaCuenca=[];
        var tablaFormacion=[];

        const catalog =  await especimen.findAll()
        const tablaFormacionCuenca=  await formacioncuenca.findAll()

       tablaFormacionCuenca.map(e=>{
        if(!tablaCuenca.includes(e.cuenca)){
          tablaCuenca.push(e.cuenca);
        }
        if(!tablaFormacion.includes(e.formacion)){
          tablaFormacion.push(e.formacion);
        }
       })

        catalog.map(e=>{

          if(!cuencas.includes(e.cuenca)&&!tablaCuenca.includes(e.cuenca)){ //INSERTO NUEVO periodo (y todas sus ESPOCAS) 
            formacioncuenca.create({
              cuenca: e.cuenca,
              })
              cuencas.push(e.cuenca)

            //BUSCO TODOS LOS PERIODOS DE ESE APECO y creo el ARRAY para insErtar
            for(i=0;catalog.length>i;i++){
               if(catalog[i].cuenca==e.cuenca) {
                if(!formaciones.includes(catalog[i].formacion)&&!tablaFormacion.includes(catalog[i].formacion)){
                  formaciones.push(catalog[i].formacion)
                }

               }

            }
            //update de Tabla con las especies del genero correspondiente
            formacioncuenca.update({
              formacion: formaciones,
                  }, {
                where: {
                    cuenca: e.cuenca,
                }
            });

          }
          formaciones=[];

        })
    };
