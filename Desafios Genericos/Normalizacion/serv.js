import { normalize, schema, denormalize } from "normalizr";
import util from 'util';

const originalData = {
  Id: '999',
  posts: [
    {
      id: '123',
      author: {
        id: '1',
        nombre: 'Pablo',
        apellido: 'Perez',
        DNI: '20442654',
        direccion: 'CABA 123',
        telefono: '1567876547',
      },
      title: 'My awesome blog post',
      comments: [
        {
          id: '324',
          commenter: {
            id: '2',
            nombre: 'Nicole',
            apellido: 'Gonzalez',
            DNI: '20442638',
            direccion: 'CABA 456',
            telefono: '1567811543',
          },
        },
        {
          id: '325',
          commenter: {
            id: '3',
            nombre: 'Pedro',
            apellido: 'Mei',
            DNI: '20446938',
            direccion: 'CABA 789',
            telefono: '1567291542',
          },
        },
      ],
    },
    {
      id: '1123',
      author: {
        id: '2',
        nombre: 'Nicole',
        apellido: 'Gonzalez',
        DNI: '20442638',
        direccion: 'CABA 456',
        telefono: '1567811543',
      },
      title: 'My awesome blog post',
      comments: [
        {
          id: '1324',
          commenter: {
            id: '1',
            nombre: 'Pablo',
            apellido: 'Perez',
            DNI: '20442654',
            direccion: 'CABA 123',
            telefono: '1567876547',
          },
        },
        {
          id: '1325',
          commenter: {
            id: '3',
            nombre: 'Pedro',
            apellido: 'Mei',
            DNI: '20446938',
            direccion: 'CABA 789',
            telefono: '1567291542',
          },
        },
      ],
    },
    {
      id: '2123',
      author: {
        id: '3',
        nombre: 'Pedro',
        apellido: 'Mei',
        DNI: '20446938',
        direccion: 'CABA 789',
        telefono: '1567291542',
      },
      title: 'My awesome blog post',
      comments: [
        {
          id: '2324',
          commenter: {
            id: '2',
            nombre: 'Nicole',
            apellido: 'Gonzalez',
            DNI: '20442638',
            direccion: 'CABA 456',
            telefono: '1567811543',
          },
        },
        {
          id: '2325',
          commenter: {
            id: '1',
            nombre: 'Pablo',
            apellido: 'Perez',
            DNI: '20442654',
            direccion: 'CABA 123',
            telefono: '1567876547',
          },
        },
      ],
    },
  ],
};

//Define esquema de usuario
const user = new schema.Entity('users');

//Define esquema de comentarios
const comment = new schema.Entity('comments', {
    commenter: user});

//Define esquema de articulos
const article = new schema.Entity('articles', {
    author: user,
    comments: [comment]});

//Define esquema de post (array de articulos)
const post = new schema.Entity('posts', {
    posts: [article]
})


const print = (object)=>{
    console.log(util.inspect(object, false, 12, true));
}

console.log(' ---objeto sin Normalizar--- ');
console.log(JSON.stringify(originalData).length);
console.log(' ---objeto normalizado--- ');
const normalizedData = normalize(originalData, post);
print(normalizedData);
console.log(JSON.stringify(normalizedData).length);
