const express=require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const cors=require('cors')
const app=express()
const port=process.env.PORT || 5000

app.use(cors())
app.use(express.json())


// emaJohnDbUser    dbdaJaYCetEW9HOL



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ixgnoqu.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
       const productCollection=client.db('emaJohn').collection('products')
        
       app.get('/products',async(req,res)=>{
             
        const page=parseInt(req.query.page);
        const size=parseInt(req.query.size); 
            const query={}
            const cursor=productCollection.find(query)
            const products=await cursor.skip(page*size).limit(size).toArray()
            const count=await productCollection.estimatedDocumentCount()
            res.send({count,products})
       });
       app.post('/productsByIds',async(req,res)=>{
        const ids=req.body 
        const objectIds=ids.map(id=>ObjectId(id))
        const query={_id:{$in:objectIds}};
        const cursor=productCollection.find(query)
        const products=await cursor.toArray();
        res.send(products)
       })
    }
    finally{

    }
}

run()
.catch(error=>console.error(error.message))




app.get('/',(req,res)=>{
    res.send('ema-john-simple server is running')
})



app.listen(port,()=>{
    console.log(`ema-john-simple server is running on port ${port}`);
})