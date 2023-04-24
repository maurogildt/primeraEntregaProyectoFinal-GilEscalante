import fs from 'fs'

export default class CartManager {
    constructor() {
        this.path = './src/files/Carts.json'
    }
    createCarts = async() =>{
        if(fs.existsSync(this.path)){
            return console.log("The Cart Already Exist")
        }else{
            const carts = [{id:1,products:[]}]
            await fs.promises.writeFile(this.path,JSON.stringify(carts,null,'\t'))
            return carts
        }
    }
    getCartById = async(cartId)=>{
        const data = await fs.promises.readFile(this.path,'utf-8')
        const carts = JSON.parse(data)
        const cartFound = carts.find(cart=>cart.id==cartId)
        if(cartFound){
            return cartFound
        }else{
            const Error = [{Error: "Cart Doesn't exist"}]
            return Error
        }
    }
/*     addProductToCart = async(cartId,productId)=>{
        const cart = await this.getCartById(cartId)
        console.log(cart,"cart")
        const productsIndex = cart.products.findIndex(products=> products.product == productId)
        if(!productsIndex){
            const productIndex = cart.products[productsIndex].product.findIndex(product=> products.id == productId)
            console.log(cart.products[productsIndex].product,"cart.products.product")
        }else{
            cart.products = [{product: productId, quantity: 1}]
            console.log(cart)
        }
    } */
}