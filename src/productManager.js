//const fs = require("fs")
import fs from "fs"

class ProductManager{
    constructor(path){
        this.productos = [];
        this.path = path;
    }


    validarCampos(parametro){
        if(parametro === "" || parametro === null){
            console.log("Todos los capos son requeridos")
        }
    }

 

    addProductos(producto){
        
        if(producto.codigo == "" || producto.titulo == "" ||producto.precio == "" || producto.stock == ""){
            console.log("Todos los capos son requeridos")
        }else{
            let largo = this.productos.length
            producto.id = largo + 1
            this.productos.push(producto)
            fs.writeFileSync(this.path, JSON.stringify(this.productos))
        }
        
 
    }

    getProducts(){
        if (fs.existsSync(this.path)) {
            let archivo = fs.readFileSync(this.path)
            let contenido = JSON.parse(archivo)
            return contenido
        }
        //this.productos.forEach((productos) => (productos.codigo + "-" + productos.descripcion + "-" + productos.precio));
    }

    getProductById(cod){
        if (fs.existsSync(this.path)) {
            let Producto = fs.readFileSync(this.path)
            let producto = JSON.parse(Producto)
            if (producto.some(products => products.id == cod)) {
                let artBuscado = producto.filter(products => products.id == cod)
                return artBuscado;
            }
            else {
                return ("El producto no existe")
            }
        }
        //const artBuscado = this.productos.filter((el) => el.id === cod).map(((el) => el.descripcion + " - "+ "Cantidad= " + el.stock))
        //return artBuscado
    }


    updateProduct(modificar_producto){

        let modificar = this.productos.find(e => e.id === modificar_producto.id)

        if(modificar){
            modificar.codigo = modificar_producto.codigo
            modificar.titulo = modificar_producto.titulo
            modificar.descripcion = modificar_producto.descripcion
            modificar.precio = modificar_producto.img
            modificar.img = modificar_producto.precio
            modificar.stock = modificar_producto.stock

            fs.writeFileSync(this.path, JSON.stringify(this.productos))
            console.log("Producto modificado")

        }else console.log("No se puede midificar")
    }

    deleteProduct(id){
        let borrar_producto = this.productos.find(e => e.id === id)

        if(borrar_producto){
            let posicion_arry = id - 1

            const eliminar = this.productos.splice(posicion_arry, posicion_arry)

            console.log(this.productos)

            fs.writeFileSync(this.path, JSON.stringify(this.productos))
        }else console.log("El procusto no existe")
    }

}


export const producto = new ProductManager("./src/data.json")

/*producto.addProductos({
    codigo: "ED01",
    titulo: "VRTX Modelo 2",
    descripcion: "Simulador de soldadura",
    img: "Imagen",
    precio: 2500,
    stock: 9,
    id: ""

})

producto.addProductos({
    codigo: "ED02",
    titulo: "Invertec 275TP",
    descripcion: "Soldadora MIG/TIG",
    img: "Imagen",
    precio: 500,
    stock: 5,
    id: ""

})

producto.addProductos({
    codigo: "",
    titulo: "Invertec 275TP",
    descripcion: "Soldadora MIG/TIG",
    img: "Imagen",
    precio: 500,
    stock: 5,
    id: ""

})


producto.updateProduct({
    codigo: "ED01",
    titulo: "VRTX Modelo 5",
    descripcion: "Simulador de soldadura",
    img: "Imagen",
    precio: 2500,
    stock: 9,
    id: 1
})


producto.getProducts()

producto.getProductById(2)*/