# Proyecto Final - BackEnd 2

## A cerca del Proyecto

#### Descripcion 

El proyecto es un servidor basado en NODE/EXPRESS usando como persistencia MONGO DB, maneja rutas que nos permiten mnejar las sesiones, los usuarios, los productos y los carritos de compras.

El servidor esta dividido en Capas, bien definidas que nos ayudarán posteriormente a la escalabilidad, las estructura se detalla a continuacion :

Estructura de Capas del Servidor:

  1. Capa de Enrutamiento (/src/routers):
	Se encargan de recibir las solicitudes HTTP y devolver las respuestas, a qui en este proyecto se usan controladores para manejar esas solicitudes.
	Aquí es donde se definen las rutas que manejan peticiones como GET, POST, PUT, DELETE.
  
  2. Capa de Controladores (/src/controllers):
  Esta capa solo se encarga de recibir la solicitud, activar el servicio correspondiente y esperar una respuesta  
	
  3. Capa de Servicios (/src/services):
	Procesa los datos antes de enviarlos a la capa de almacenamiento. Esta capa interactúan con el modelo de datos (base de datos) y pueden hacer cálculos o procesar la información.

  4. Capa de Datos (/src/dao):
	Define la estructura de los datos, como los esquemas de la Base de datos (MOONGODB en este caso), y los manager para poder realizar los CURDs correspondientes  

  5. Capa de Middleware (/src/middleware):
	Incluye funciones que se ejecutan antes de que se llegue a las rutas

  6. Capa de Vistas (/public):
  esta capa contiene basicamente el front con el que probar el servidor, la capara de Enrutamiento sirve la ruta public (/), en el que se encuentra el html, js, y css del front.  


## Uso y prueba de Servidor 

#### Instalacion y ejecucion  
Antes de utilizarlo deberias descargarlo y guardar el repositorio en una carpeta en tu computadora, o simplemente clonar el repositirio, luego desde una ventana de comando deberias posicionarte en la carpeta del proyecto, y ejecutar lo siguiente 

```
npm install
```
con esto nos aseguramos de que se instalen todas las dependencias que usa el proyecto.

Una vez instalado todo, devemos crear el archivo de entorno .env con la siguiente estructura :

```
PORT=
DATABASE_URI=
SECRET_KEY=
JWT_SECRET=

BASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET= 
GITHUB_CALLBACK=

GOOGLE_EMAIL=
GOOGLE_PASSWORD=
```
una vez creado el archivo .env y completado todos sus valores, procederemos a ejecutar el servidor para que quede activo con el siguiente comando :

```
npm run dev
```

si todo fue bien deberiamos tener el siguiente mensaje :
```
server ready on port 9000
Server on mode dev
mongodb connected
```

Una vez levantado el servidor y sin errores podemos probarlo


#### Uso a travez de los endpoints 

Aqui vamos a usar el proyecto a travez de los end points, esto es util para usarlo desde un front o para pobarlo desde PostMan o Thunder Client por ejemplo.

Hay que tener en cuenta que el servidor esta usando un custom router, en el cual estan definidas todas las politicas de permisos, ya sean PUBLIC, USER o ADMIN, la politica PUBLIC deja pasar, por lo que si una ruta tiene esa politaca asignada no va a verificar nada y va a ejecutarla, si tiene USER solo va a ejecutar lo que le tenga permitdo hacer el usuario y si es ADMIN solo va a ejecutar lo que le tenga permitido al administrador. 

Vamos a enumerar los enpoints y la ayuda para usarlos 

como se puede apreciar cada seccion o coleccion tiene una ruta base, las mismas son 

```
api/users

api/products

api/carts

api/sessions

```
##### Usuarios
para la ruta de usuarios podemos crear un usuario con lo siguiente (solo ADMIN)
```
Metodo : POST
Direccion: localhost:9000/api/users

JSON

{
  "firstName":"Juan Pablo",
  "lastName":"Chiantore",
  "email":"jchiantore@ecommerse.com.ar"
  }

```
Podemos Modificar un atributo o todos del usuario (ADMIN y USER)

```
Metodo : PUT
Direccion: localhost:9000/api/users/672131191139853a148a6972

JSON

{
  "firstName":"Pablo",
  "lastName":"Chiantore",
  "email":"jp@ecommerse.com.ar"
  }

```
podemos eliminar un usuario (ADMIN y USER)

```
Metodo : DELETE
Direccion: localhost9000/api/users/672131191139853a148a6972
```

Tambien podemos obtener todos los usuarios mediante 

```
Metodo : GET
Direccion: localhost:9000/api/users (ADMIN)
```

En algunas ocaciones es necesario recuperar o resetear la password de usuario, para esto hay dos rutas una para avisar que se olvido la passwor y generar un codigo de restauracion, y la otra para validad presisamente ese codigo y guardar la nueva contraseña, veamos el proceso en orden 

```
Parte uno, generacion y envio del codigo al mail (PUBLIC)

Metodo : POST

Direccion: localhost:9000/api/users/forgotpass/<<email a restaurar>>

esto verifica primero que el usuario exista en la base de datos con ese email, si es asi genera un codigo y lo envia por mail 
```

```
Parte dos, verificacion del codigo (PUBLIC) 

Metodo : POST

Direccion: localhost:9000/api/users/recoverypass/

JSON

{
  password:"<<Nueva Contraseña",
  email:"alguien@algo.com"
  forgotCode:<<Codigo enviado al mail>>
}

Si el codigo enviado conicide con el generado anteriormente u gardado en la base de datos, entonces reemplaza la contraseña antigua por la nueva.
```

##### Productos 

Para el caso de los productos es muy similar.

con la siguiente ruta podemos agregar un producto (ADMIN)

```
Metodo : POST
Direccion: localhost:9000/api/products

JSON

{
  "title":"F-ONE Bandit 19",
  "description":"Easy Ride Kite",
  "code":"11674yt2AAPDF",
  "price":272,
  "status":true,
  "stock":30,
  "category":"kitesurf"
}

```
Podemos Modificar un atributo o todos del Producto (ADMIN)

```
Metodo : PUT
Direccion: localhost:9000/api/products/6724e891ba0a420006254d84

JSON

{
  "title":"F-ONE Bandit 19",
  "description":"Easy Ride Kite",
  "code":"11674yt2AAPDF",
  "price":272,
  "status":true,
  "stock":30,
  "category":"kitesurf"
}

```
podemos eliminar un producto (ADMIN)

```
Metodo : DELETE
Direccion: localhost:9000/api/products/6724e891ba0a420006254d84
```
y para obtener los productos 

```
Metodo : GET

localhost:9000/api/products (PUBLIC)
```

devuelve una lista con todos los productos

##### Cart

con la siguiente ruta podemos agregar un carrito (USER)

```
Metodo : POST
Direccion: localhost:9000/api/carts

JSON

{
  "product_id": "<< _id del producto >>", 
  "user_id": "<< _id del Usuario >>",
  "quantity":1,
}

```
Podemos Modificar un atributo o todos del carrito (USER, ADMIN)

```
Metodo : PUT
Direccion: localhost:9000/api/carts/6724e891ba0a420006254d84

JSON

{
  "product_id": "<< _id del producto >>", 
  "user_id": "<< _id del Usuario >>",
  "quantity":2,
}

```
podemos eliminar un carrito (USER, ADMIN)

```
Metodo : DELETE
Direccion: localhost:9000/api/carts/6724e891ba0a420006254d84
```
y para obtener los carritos de un usuario (USER, ADMIN)

```
Metodo : GET

localhost:9000/api/carts/_idUsuario
```

devuelve una lista los carritos de un usuario

##### Sessions

Con las rutas de las sessions vamos a poder manejar todas las sessiones de los usuarios y la autenticacion de los mismos como asi tambien la verificacion de ese usuario. 

Registro de un usuario (PUBLIC)

```
Metodo : POST
Direccion: localhost:9000/api/sessions/register

JSON

{
  "email":"alguien@algo.com",
  "password":"hola1234"
}

una vez que el usuario haya sido registrado en la base de datos, el servidor va a enviar un correro a la direccion con la que se registro con el codigo para que el usuario pueda hacer su verificacion, es necesaria esa verificacion ya que sin ella no se va a poder loguear 
```

Verificacion del Usuario (PUBLIC)

```
Metodo : POST
Direccion: localhost:9000/api/sessions/verify

JSON

{
  "email":"alguien@algo.com",
  "verifyCode:<<Codigo de verificacion enviado>>
}

Luego de esto si todo esta ok ya podemos iniciar session 

```

Iniciar sesion o login (PUBLIC)

```
Metodo : POST
Direccion: localhost:9000/api/sessions/login

JSON

{
  "email":"alguien@algo.com",
  "password":"hola1234"
}

Si el password es correcto y el usuario esta verificado se guardara un token en la computadora del usuario y a partir de ese momento la session del usuario esta activa y el estado del usuario es on line 
```
Verificar quien esta logueado (USER, ADMIN)

```
Metodo : POST
Direccion: localhost:9000/api/sessions/online


si todo esta bien devolvera el usuario que esta on line, sino devolvera que no esta en linea
```

Cerrar sesion o hacer un logout (USER, ADMIN)

```
Metodo : POST
Direccion: localhost:9000/api/sessions/signout


si todo esta bien devolvera el usuario que esta deslogueado, sino devolvera un error
```



