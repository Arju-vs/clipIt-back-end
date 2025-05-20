const works = require('../admin/Models/work')

exports.getWorks = async (req,res)=>{
    console.log("inside getWorks!!1");
    try{
        const result = await works.find().sort({ _id: -1 }).limit(3)
        res.status(200).json(result)
    }catch(err){
        res.status(404).json(err)
    }
}

exports.getOneWork = async (req,res)=>{
    console.log("inside getOneWork");
    const {id} = req.params
    try{
        const result = await works.findById({_id:id})
        res.status(200).json(result)
    }catch(err){
        res.status(404).json(err)
    }
}