const mongoose = require('mongoose');
const Element = require('../models/element')

module.exports = {
    createElement: async(req, res) =>{
        try {
           const {name,JSCode,HTMLCode, CSSCode} = req.body;
           await findOne({name:name},((err,element)=>{
               if(err){
               return res.status(404).json({message:"Internal error"})
               }
               else if(!element){
                   dataObj = {
                      name:name,
                      JSCode:JSCode,
                      HTMLCode:HTMLCode,
                      CSSCode:CSSCode 
                   }
                    const  element = new ELement(dataObj);
                    element.save((err,data)=>{
                        if(err){
                            return res.status(404).json({message:"Internal error"})
                        }else{

                            return res.status(200).json({message:"SuccesFully Created",data})
                        }
                    })
                } 
                ))
            
        } catch (err) {
            console.log(err);
            return res.status(500).json({message:"Server err"}) 
        }
    }
}