import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const router = Router()

const productManager = new ProductManager()

router.get('/',async (req,res)=>{
    const {limit} = req.query
    if(!limit) return res.status(200).send(await productManager.getProducts())
    const products = await productManager.getProducts()
    res.status(200).send(products.slice(0,limit))
})

router.get('/:pid', async(req,res)=>{
    const {pid} = req.params
    const product = await productManager.getProductById(parseInt(pid))
    if(product === Error) return res.status(400).send({status:"Error", message:"Id Product Doesn't exist"})
    res.status(200).send(product)
})

router.post('/',async(req,res)=>{
    const product = req.body
    if(!product.title||!product.description||!product.code||!product.price||!product.status||!product.stock||!product.category) return res.status(400).send({status:"Error", message:"Incomplete Fields"})
    await productManager.addProducts(product)
    res.status(200).send({status:"Success",message:"Added Product"})
})

router.put('/:pid', async(req,res)=>{
    const {pid} = req.params
    const updateField = req.body
    if(!pid || !updateField) return res.status(400).send({status:"Error",message:"Incomplete Fields"})
    await productManager.updateProduct(pid,updateField)
    res.status(200).send({status:"Success",message:"Updated Product"})
})

router.delete('/:pid', async(req,res)=>{
    const {pid} = req.params
    const deleteProduct = await productManager.deleteProduct(pid)
    if(deleteProduct === undefined) return res.status(400).send({status:"Error", message:"Id Product Doesn't exist"})/// Verificar como devuelve el error deleteProducts
    res.status(200).send({status:"Success",message:"Deleted Product"})
})

export default router