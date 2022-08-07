const { buildSchema } = require('graphql')

const schema = `
  type Product {
    _id: ID!,
    title: String,
    description: String,
    code: String,
    thumbnail: String,
    price: Int,
    stock: Int,
    createdAt: String,
    updatedAt: String
  },
  input ProductInput {
    title: String,
    description: String,
    code: String,
    thumbnail: String,
    price: Int
    stock: Int
  },
  type Query {
    getProducts: [Product],
    getProductBy(_id: ID!): Product
  },
  type Mutation {
    createProduct(data: ProductInput): Product,
    updateProduct(_id: ID!, data: ProductInput): Product,
    deleteProduct(_id: ID!): Product
  }
`
module.exports = buildSchema(schema)