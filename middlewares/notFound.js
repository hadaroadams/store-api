const notFound =(req,res)=>{
    return res.status(404).send("Routes Does not exits")
}

module.exports = notFound