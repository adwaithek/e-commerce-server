const express=require('express')



const cors=require('cors')

const dataService=require('./services/dataService')
const { application } = require('express')
//to parse JSON




const app=express()
app.use(express.json())

app.listen(3000,()=>{
    console.log('listenign port 3000');
})
app.use(cors({
    origin:'http://localhost:4200'
}))

//api to get all products
app.get('/all-products',(req,res)=>{
    dataService.getProducts()
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//api to add wishlist item

app.post('/addtowishlist',(req,res)=>{
dataService.addtowishlist(req.body.id,req.body.title,req.body.price,req.body.image,req.body.description).then(
    (result)=>{
    res.status(result.statusCode).json(result)
})
})

//api to get wishlist item

app.get('/getwishlist',(req,res)=>{
    dataService.getwishlist()
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.delete('/deletewish/:id',(req,res)=>{
    dataService.deletewish(req.params.id).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }

    )
})
