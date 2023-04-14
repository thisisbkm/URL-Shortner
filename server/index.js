let {shorturl} = require('./database');
const {nanoid} = require('nanoid');
const express = require('express');
const URL = require('url').URL;
require('dotenv').config()
const port = process.env.PORT;
const path = require('path')
const cors = require('cors');
const app = express();
app.use("/src", express.static(path.resolve(__dirname+"/../client/src")));
app.use(express.json());
app.use(cors());
app.post("/api/short",async (req, res)=>{
    const urlId = nanoid(5);
    const body = req.body.url;
    if(body==undefined) res.json({"KeyError": "The key for the original url must be url"});
    else{
        try{
            const check = await shorturl.findOne({oriUrl:body});
            if(check!=null){ 
                check.clicks+=1;
                res.json(check);
                await check.save();
            }
            else{
                try{
                    new URL(body);
                    let doc = new shorturl({
                        oriUrl:body,
                        shoUrl:urlId
                    })
                    doc.save().then((doc)=>res.json(doc));
                }
                catch{
                    res.json({error:"Please Enter a valid url"});
                }
            }
        }catch(err){
            res.json({"error":"Some Error Occured"})
        }
    }
})

app.get("/:id",async (req, res)=>{
    const id = req.params.id;
    const url = await shorturl.findOne({shoUrl:id});
    if(url!=null){
        // console.log(url.oriUrl);
        
        res.redirect(url.oriUrl);
    }else
    res.sendFile(path.resolve(__dirname,"../client/404.html"));
})


app.get("/clicks/:id", async (req, res)=>{
    const id = req.params.id;
    const url = await shorturl.findOne({shoUrl:id});
    if(url!=null){
        url.clicks+=1;
        res.json(url);
        await url.save();
    }else{
        res.json({"error": "shorturl doesn't exist!"});
    }
})


app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname,"../client","index.html"));
})

app.listen(port, ()=>{
    console.log(`Sever started on ${port}`);
})