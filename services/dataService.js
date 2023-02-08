const db = require('./db')

// get all the products from db

const getProducts =()=>{
    return db.Product.find().then( 
        (result)=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    products:result
                }
            }
            else{
                return{
                    status:false,
                    statusCode:404,
                    message:'No Product Found!'
                }
            }
        }

    )
}
// to add wishlist data
const addtowishlist=(id,title,price,image,description)=>{
    //data added to mongodb--create a modelin db.js

    return db.Wishlist.findOne({id}).then(
        (result)=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    message:"product alredy exist"
                }
            }
            else{
                   const newProduct =new db.Wishlist({id,title,price,image,description})
                   newProduct.save()//TO SAVE THE DATA INTO MONGODB
                   return{
                    status:true,
                    statusCode:200,
                    message:"product added to wishlist"
                   }
            }
        }
    )



}

// to get wishlist
const getwishlist=()=>{
    return db.Wishlist.find().then(
        (result)=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    product:result
                }
            }
            else{
                return{
                    status:false,
                    statusCode:404,
                    message:'your wishlist id empty'
                }
                
            }
        }
    )
}

deletewish=(id)=>{
    return db.Wishlist.deleteOne({id}).then(
        (result)=>{
            if(result){
                // return{
                //status:true,
                //statusCode:200,
                // message:"product delete"
                    
                // }
                return db.Wishlist.find().then(
                    (result)=>{
                        if(result){
                            return{
                                status:true,
                                statusCode:200,
                                Wishlist:result,
                                message:'product  removed succesfully'
                            }
                        }
                        else{
                            return{
                                status:false,
                                statusCode:404,
                                message:'wish-list empty'
                            }
                            
                        }
                    }
                )
            }
            else{
                return{
                    status:false,
                    statusCode:404,
                    message:'product not found'
                }
            }
        }
    )
}


module.exports ={
    getProducts,
 addtowishlist,
 getwishlist,
 deletewish
}