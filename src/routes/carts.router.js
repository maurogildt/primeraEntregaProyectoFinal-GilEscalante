import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const router = Router()

const cartManager = new CartManager()

router.post('/', async(req,res)=>{
    if(await cartManager.createCarts()){
        return res.status(200).send({status:"Success",message:"Cart Created"})
    }else{
        return res.status(400).send({status:"Error",message:"The Cart Already Exist"})
    }
})

router.get('/:cid', async(req,res)=>{
    const {cid} = req.params
    const cart = await cartManager.getCartById(cid)
    if(cart === Error) return res.status(400).send({status:"Error", message:"Id Cart Doesn't exist"})
    res.status(200).send(cart)
})

/* router.get('/:cid/product/:pid',async(req,res)=>{
    const {cid} = req.params
    const {pid} = req.params
    const cart = await cartManager.addProductToCart(cid,pid)
    res.status(200).send(cart)
}) */

export default router