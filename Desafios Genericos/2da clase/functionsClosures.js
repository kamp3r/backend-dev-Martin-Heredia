const arr = ["perro", "gato", "loro"]

function mostrarLista(datos){
    if(datos.length == 0){
        console.warn('Lista vacia')
    }else{
        console.log(datos)
    }
}

// (function (){
//     const num = [1,2,3]
//     if(num.length == 0){
//         console.warn('Lista vacia')
//     }else{
//         console.log(num)
//     }
// })()

function crearMultiplicador(num){
    return function (num2){
        return num * num2
    }
}


function duplicar(num){
    return function (){
        return num * 2
    }
}

function triplicar(num){
    return function (){
        return num * 3
    }
}

console.log(triplicar(crearMultiplicador(5)(2))())

