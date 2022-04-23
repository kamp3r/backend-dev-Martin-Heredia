
export const productsKnexConfig = ({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        port: 3306,
        password: '',
        database: 'products_db'
},
    pool: {min: 0 , max: 7}
});

export const chatKnexConfig = ({
    client: "sqlite3",
    connection: {
        filename: "./db/chat.sqlite"
    },
    useNullAsDefault: true
});


