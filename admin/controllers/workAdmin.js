const works = require('../Models/work')

exports.addWorks = async (req,res)=>{
    console.log("inside addWorks");
    const {title,image,content} = req.body
    console.log(title,image,content);
    try{
        const existingwork = await works.findOne({title})
        if(existingwork){
            res.status(401).json("Already exists!!!")
        }else{
            const newWork = new works({
                title,image,content
            })
            await newWork.save()
            res.status(200).json(newWork)
        }
    }catch(err){
        res.status(404).json("Something Error")
    }
}

exports.getWorks = async (req,res)=>{
    console.log("inside getWorks!!");
    try{
        const result = await works.find()
        res.status(200).json(result)
    }catch(err){
        res.status(404).json("Something Error")
    }
}

exports.updateWorks = async (req,res)=>{
    console.log("inside updateWorks");
    const {id} = req.params
    const {title,image,content} = req.body
    try{
        const result = await works.findByIdAndUpdate({_id:id},
            {title,image,content},
        {new:true})
        await result.save()
        res.status(200).json(result)
    }catch(err){
        res.status(404).json("Something Error!")
    }
}

exports.deleteWork = async (req,res)=>{
    console.log("inside deleteWork");
    const {id} = req.params
    try{
        const result = await works.findByIdAndDelete({_id:id})
        res.status(200).json(result)

    }catch(err){
        res.status(404).json("Something Error!")
    }
}