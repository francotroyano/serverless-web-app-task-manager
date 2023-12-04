/*
const task = { id: "ljahsdlajhds", nameTask: "Sample Task 1", descriptionTask: "Description for Sample Task 1", toogle: false };

const tasks = [
    { id: "ljahsdlajhds", nameTask: "Sample Task 1", descriptionTask: "Description for Sample Task 1", toogle: false },
    { id: "23fdsdfedwe3", nameTask: "Sample Task 2", descriptionTask: "Description for Sample Task 2", toogle: true },
    
];

taskJSON = JSON.stringify(tasks);
console.log (taskJSON);
l = taskJSON.length;
console.log (l);
*/


console.log("hola mundo")
// comentario

/*
comentario
*/

console.log("Hola mundo!!!")

// Variables

let variable1 = 1
let variable2 = 2
const constante1 = 3
const constante2 = "hola"

function nombreDeLaFuncion(){
    console.log("hola98293847298374")
}

nombreDeLaFuncion()

function test(){
    console.log(nombre)
}
var nombre = "Juan"
nombre = "Sandra"

test()

let nombre2 = "Antonio"
nombre2 = "Ana"
console.log(nombre2)
console.log(typeof nombre2)
 

function test2(){
    var a = 1
    var b = 2
}

nombre2=4
console.log(nombre2)

console.log(typeof nombre2)

nombre2 = 4.3
console.log(nombre2)

console.log(nombre2 + " " + nombre)

let myNumber2 = 6.5
console.log(myNumber2)
console.log(typeof myNumber2)

let logico = false
console.log(logico)
console.log(typeof logico)

logico = true
console.log(logico)


// Constantes

const UNA_CONSTANTE = "esto es una constante"
console.log (UNA_CONSTANTE)


// UNA_CONSTANTE = "otro texto"

// Tipos de datos primitivos que faltan

let prueba = null
console.log(prueba)
console.log(typeof prueba)

let prueba2 = undefined
console.log(prueba2)
console.log(typeof prueba2)

console.log(prueba+5.5)

let v1
console.log(v1)

// Control de flujo

let edad = 18
let pelo = "moreno"
if (edad == 10 && pelo == "moreno"){
    console.log(edad)
}else if (edad == 18 && pelo == "moreno"){
    console.log("es 18 y pelo moreno")
}else {
    console.log("no es 10")
}


let myNull = null
if (myNull==null){
    console.log("es true")
}

// funciones

function suma(a, b){
    console.log("mi función")
    return a+b
}

let x = suma(2, 3)

console.log(x) 

// estructuras

let lista = ["paco", "yo", 32]
console.log (lista)

console.log(lista[0])

let seeeet = new Set(["yo", "tu", "el", "nosotros", "vosotros", "yo"])
console.log(seeeet)

let oish = new Map([["nombre", "Juan"], ["edad", 32]])
console.log(oish)

oish.set("nombre", "Paco")
console.log(oish)

oish.set("huahsdu", "ajsdhakjds")
console.log(oish)

// bucle

for (const value of lista) {
    console.log(value)
}

// clases

class ClaseAlumno {
    constructor (nombre, edad){
        this.nombre = nombre
        this.edad = edad
    }
}

let alumno = new ClaseAlumno("Juan", 32)

console.log(alumno)
console.log(alumno.nombre)
console.log(alumno.edad)

//enum

const MyEnum = {
    A: 1, B: 2, C: 3
}

const MyEnum2 = MyEnum.A
console.log(MyEnum2)

