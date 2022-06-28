const socket = io();


//Validacion de Email  y evento para deshabilitar botones e input de mensaje
const regex =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const chat = document.getElementById('chatForm');
const emailField = document.getElementById('emailInput');
const nameField = document.getElementById('nameInput');
const surnameField = document.getElementById('surnameInput');
const ageField = document.getElementById('ageInput');
const aliasField = document.getElementById('aliasInput');
const avatarField = document.getElementById('avatarInput');
const msgField = document.getElementById('msgInput');
const btnMsg = document.getElementById('sendMsg');

const validateField = () => {
  if (emailField.value === '' || !regex.test(emailField.value)) {
    msgField.disabled = true;
    btnMsg.disabled = true;
  } else {
    msgField.disabled = false;
    btnMsg.disabled = false;
  }
};

emailField.addEventListener('keyup', validateField);

//evento del formulario de mensaje enviado

chat.addEventListener('submit', (e) => {
  e.preventDefault();

  const chatContent = {
    author: {
      id: emailField.value,
      name: nameField.value,
      lastname: surnameField.value,
      age: ageField.value,
      nickname: aliasField.value,
      avatar: avatarField.value,
    },
    message: msgField.value,
    date: new Date().toLocaleString(),
  };
  socket.emit('newMessage', chatContent);
  msgField.value = '';
  msgField.focus;
});

socket.on('incommingMessage', (messages) => {
  const author = new normalizr.schema.Entity('author');
  const post = new normalizr.schema.Entity(
    'post',
    {
      author: author,
    },
    { idAttribute: '_id' }
  );
  const posts = new normalizr.schema.Entity('posts', {
    posts: [post],
  });

  const desnormalized = normalizr.denormalize(
    messages.result,
    posts,
    messages.entities
  );
  console.log(messages);
  console.log(desnormalized);

  const denormalizedSizeData = JSON.stringify(desnormalized).length;
  const normalizedSizeData = JSON.stringify(messages).length;

  const sizeData = (denormalizedSizeData * 100) / normalizedSizeData;

  if(JSON.stringify(messages).length === undefined){
    document.getElementById('tasaCompresion').innerHTML = ``
  }else{
    document.getElementById('tasaCompresion').innerHTML = `tasa de compresion del ${sizeData.toFixed(2)}%`
  }
 
  const insertChat = desnormalized.messages
    .map((message) => {
      return `
      <p>
      <b style="color:white;">${message.author.id}</b>
      <span style="color:white;">${message.date}</span>
      <i style="color:green;">${message.message}</i>
      <img src="${message.author.avatar}" width="25">
      </p>
      `;
    })
    .join(' ');
    document.getElementById('msgContainer').innerHTML = insertChat;
});
