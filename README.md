# Preentrega #2 - Programación BackEnd avanzado I.

## Este proyecto es una preentrega la cual fue realizada para el curso de Programación de BackEnd avanzado I de CoderHouse.
En dicho proyecto, veremos el uso de rutas dinamicas, las cuales fueron establecidas bajo **LocalHost** con el puerto establecido en **8080**. A su vez, tambien utilizaremos las funciones que nos proporciona Socket.io junto a Handlebars para un manejo y renderizado del flujo de datos más eficiente.
Tambien, utilizaremos Postman para poder manejar inicialmente la subida y bajada de datos a la lista de productos o de carritos en su respectiva área.

## Las rutas del Proyecto:
Dentro del proyecto, encontraremos con varias rutas, estas siendo del tipo Get, Post, Put y Delete para proporcionar una experiencia de manejo en el flujo de datos más rapida.


## **Rutas de Products**:

1. Ruta Get para la creación de un producto: (http://localhost:8080/api/products)
  - Formato del Product:
    {                                                                                                                                                                               
    "title": "Example-title",                                                                                                                                                              
    "description": "Example-Description",                                                                                                                                                        
    "code": "Example-code",
    "price": 1,                                                                                                                                                        
    "stock": 1,                                                                                                                                                                 
    "category": "Example-Category",
    "thumbnail": "Example-thumbnail"                                                                                                                                                         
  }
  
2. Ruta Get - Obtención de la lista de productos generados (http://localhost:8080/api/products)
   Formato de busquedas:
     - products/:pid - Producto Individual con su respectivo ID.
     - products?limit=x - Lista de productos con un limite de visualización de los mismos.

3. Ruta Put - Actualización de un producto según su ID (http://localhost:8080/api/products/:pid)
   - Formato del producto:                                                                                                                                                        
    {                                                                                                                                                                               
    "title": "Example-title",                                                                                                                                                              
    "description": "Example-Description",
    "code": "Example-code",                                                                                                                                                        
    "price": 1,                                                                                                                                                        
    "stock": 1,                                                                                                                                                                 
    "category": "Example-Category",                                                                                                                                                       
    "thumbnail": "Example-thumbnail"
  }

4. Ruta Delete -  Eliminación de un producto seleccionado (http://localhost:8080/api/products/:pid)
   - products/:pid - Producto a Eliminar determinado por su respectivo ID en la lista de productos generados.


## **Rutas del Carrito**:

1. Ruta Post - Creación de un Nuevo Carrito (http://localhost:8080/api/cart)

2. Ruta Post - Agregar un Nuevo Producto a un determinado Carrito (http://localhost:8080/api/cart/:cid/product/:pid)
   - CID: Es el ID determinado del carrito al que desea agregar el producto.
   - PID: Es el ID determinado del producto el cual desea agregar al carrito.

3. Ruta Get - Obtención de la lista de los Carritos tanto individual como general (http://localhost:8080/api/cart/)
   Formato de busqueda:
   - cart/carts - Lista general de los Carritos y sus Productos.
   - cart/:CID - Lista de los productos dentro de un Carrito determinado.
  
4. Ruta Delete - Eliminación de un Carrito Seleccionado (http://localhost:8080/api/cart/:CID)
   - cart/:cid - Determina el Carrito a Eliminar por su respectivo ID en la lista de Carritos generados.
