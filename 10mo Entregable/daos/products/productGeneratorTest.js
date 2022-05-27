import { faker } from '@faker-js/faker'

faker.locale = 'es'

export const productGenerator = (qty)=>{
    let products = []
    for(let i = 0; i < qty; i++){
        products.push({
            id: i +1,
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        })
    }
    return products
}