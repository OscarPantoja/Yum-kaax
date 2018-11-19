const express = require('express');

const routerCrops = express.Router();

const useCaseCrops = require('../useCases/crops');

routerCrops.get('/',async(req,res)=>{
    try {
        const allCrops = await useCaseCrops.getAllCrops();
        res.json({
        success:true,
        message:"Crops in data base",
        payload:{
            allCrops
        }
    });
    } catch (error) {
        res.status(404);
        res.json({
            success:false,
            message:"We can not show the information",
            error:[
                error
            ]
        });
    }
});

routerCrops.post('/',async(req,res)=>{
    try {
        const cropData = req.body;
        const newCrop = await useCaseCrops.newCrop(cropData);
        res.json({
            success:true,
            message:"Crop created",
            payload:{
                crop:newCrop
            }
        });
    } catch (error) {
        res.status(404);
        res.json({
            success:false,
            message:"We can not create the crop",
            error:[
                error
            ]
        });
    }
});

routerCrops.put('/',async(req,res)=>{
    try {
        const putCrop = req.body;
        const cropPut = await useCaseCrops.updateCrop(putCrop);
        //console.log(cropPut);
        res.json({
        success:true,
        message:"Crops updated",
        payload:{
            cropPut
        }
    });
    } catch (error) {
        res.status(404);
        res.json({
            success:true,
            message:"User can not be updated",
            error:[
                error
            ]
        });
    }
});

routerCrops.delete('/:id',async(req,res)=>{
    try {
        const { id } = req.params;
        const deleteCrop = await useCaseCrops.deleteCropId(id);
        res.json({
            success:true,
            message:"Crops Eliminated",
            payload:{
                deleteCrop
            }
        });
    } catch (error) {
        res.status(404);
        res.json({
            success:true,
            message:"The crops wasn´t eliminated",
            error:[
                error
            ]
        });
    }
});

module.exports = {
    routerCrops
}