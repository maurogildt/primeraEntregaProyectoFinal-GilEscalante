import fs from 'fs' 

export default class ProductManager {
    constructor(){
        this.path = './src/files/Products.json'
    }
    getProducts = async() =>{
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path,'utf-8')
            const products = JSON.parse(data)
            return products
        }
        await fs.promises.writeFile(this.path,'[]')
        return []
    }
    addProducts = async(product) =>{
        const products = await this.getProducts()
        if(products.length==0){
            product.id =1
        }else{
            product.id = products[products.length-1].id+1
        }
        products.push(product)
        await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'))
    }
    getProductById = async(productId) =>{
        const products = await this.getProducts()
        const productFound = products.find(product=>product.id==productId)
        if(productFound){
            return productFound
        }else{
            const Error = [{Error: "Product Doesn't exist"}]
            return Error
        }
    }

    updateProduct = async(id,updateField) =>{
        try {
            const products = await this.getProducts()
            const index = products.findIndex(products=> products.id == id)
            if(index === -1)    return console.log('Product Not Found')
            const productUpdate = Object.assign(await this.getProductById(id), updateField)
            products[index] = productUpdate
            await fs.promises.writeFile(this.path, JSON.stringify(products,null,'\t'))
        } catch (error) {
            const Error = [{Error: "Product Doesn't exist"}]
            return Error
        }
    }

    deleteProduct = async(id)=>{
        try {
            const products = await this.getProducts()
            const index = products.findIndex(products=> products.id == id)
            if(index === -1)    return console.log('Product Not Found')
            products.splice(index,1)
            await fs.promises.writeFile(this.path, JSON.stringify(products,null,'\t'))
        } catch (error) {
            const Error = [{Error: "Product Doesn't exist"}]
            return Error
        }
    }
}