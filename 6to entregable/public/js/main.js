const socket = io();

const form = document.getElementById('productSend');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const prodData = {
    title: form[0].value,
    price: form[1].value,
    thumbnail: form[2].value,
  };
  socket.emit('newProd', prodData);
  form.reset();
});

const compileTemplate = async (prod) => {
  // funcion fetch para traer el template de la tabla, la manejo de manera asincronica
  const templateFetched = await fetch('template/products.hbs'); //aguardo a fetchear la plantilla
  const toText = await templateFetched.text(); //obtengo el texto de la llamada al servidor
  const compiledTemplate = Handlebars.compile(toText); // compilo con handlebars
  const html = compiledTemplate({ prod }); //paso a rellenar la plantilla con la data que voy a pasarle por parametro
  document.getElementById('listContainer').innerHTML = html; //selecciono el elemento donde voy a ubicar mi plantilla con datos
};

socket.on('products', (products) => {
  compileTemplate(products);
});

//
//Validacion de Email  y evento para deshabilitar botones e input de mensaje
const regex =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const chat = document.getElementById('chatForm');
const emailField = document.getElementById('emailInput');
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
    sender: emailField.value,
    msg: msgField.value,
  };
  socket.emit('newMessage', chatContent);
  msgField.value = '';
  msgField.focus
});

const innerDiv = (messages) => {
  return messages.map((msg) => {
      return (`<p>
      <b style="color:white;">${msg.sender}</b>
      <span style="color:white;">${msg.date}</span>
      <i style="color:green;">${msg.msg}</i>
      </p>
      `)
    })
    .join(' ');
};

socket.on('messages', (messages) => {
  console.log(messages);
  const data = innerDiv(messages);
  document.getElementById('msgContainer').innerHTML = data;
});