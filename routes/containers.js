const {Containers} = require('../models/containers');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const containersList = await Containers.find();

    if(!containersList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(containersList);
})

router.get('/:id', async(req,res)=>{
    const containers = await Containers.findById(req.params.id);

    if(!containers) {
        res.status(500).json({message: 'The containers with the given ID was not found.'})
    } 
    res.status(200).send(containers);
})


// CREATE
router.post('/', async (req,res)=>{
    let containers = new Containers({
        no_container: req.body.no_container,
        size: req.body.size,
        type: req.body.type,
        slot: req.body.slot,
        row: req.body.row,
        tier: req.body.tier,
    })
    containers = await containers.save();

    if(!containers)
    return res.status(400).send('the containers cannot be created!')

    res.send(containers);
})

// UPDATE
router.put('/:id',async (req, res)=> {
    const containers = await Containers.findByIdAndUpdate(
        req.params.id,
        {
            no_container: req.body.no_container,
            size: req.body.size,
            type: req.body.type,
            slot: req.body.slot,
            row: req.body.row,
            tier: req.body.tier,
        },
        { new: true}
    )

    if(!containers)
    return res.status(400).send('the containers cannot be updated!')

    res.send(containers);
})

// DELETE
router.delete('/:id', (req, res)=>{
    Containers.findByIdAndRemove(req.params.id).then(containers =>{
        if(containers) {
            return res.status(200).json({success: true, message: 'the containers is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "containers not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;