# MiInventarioExpress

Aplicación web para la gestión de productos con autenticación de usuarios y chat en tiempo real, desarrollada con Node.js, Express, MongoDB y Socket.io.

---

## Información del Estudiante

- **Nombre:** Jostin Matamoros
- **Carrera:** Software
- **Materia:** Programación Web.
- **Docente:** Jose Roberto Jaime Carriel.
- **Fecha de inicio:** 27/10/2025

---

## Objetivo del Proyecto

Desarrollar una aplicación web funcional y segura que permita:

- Registrar, consultar, editar y eliminar productos (CRUD)
- Autenticación de usuarios con sesiones
- Carga de imágenes para productos
- Comunicación en tiempo real mediante chat entre usuarios autenticados

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- Express-session
- Bcrypt
- Multer
- Express-validator
- Socket.io
- Handlebars (HBS)
- Dotenv

---

##  Estructura del Proyecto (hasta el paso 2)
MiInventarioExpress/ 
├── index.js 
├── package.json 
├── package-lock.json 
├── .gitignore


---

##  Instrucciones básicas de uso

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/miinventarioexpress.git
   cd miinventarioexpress
2. npm install (Instala las dependencias)
3. MONGO_URI=mongodb://localhost:27017/miinventario (Crea un archivo .env con la URI de MongoDB)
4. node index.js (Ejecuta el servidor)
5. Abre tu navegador en http://localhost:3000


## Estructura del Proyecto (Paso 3)
El proyecto sigue el patrón MVC (Modelo-Vista-Controlador) para mantener una arquitectura organizada y escalable:
├── models/         # Esquemas de Mongoose
├── routes/         # Rutas de Express
├── controllers/    # Lógica de negocio
├── views/          # Plantillas Handlebars (HBS)
├── public/         # Archivos estáticos (CSS, JS, imágenes)
├── uploads/        # Imágenes subidas por los usuarios
├── index.js        # Archivo principal del servidor

## CRUD de Productos (Paso 4)
Se implementó un sistema completo de CRUD para productos:
1.Crear: Formulario para añadir nuevos productos
2.Listar: Vista principal con todos los productos registrados
3.Actualizar: Edición de productos existentes
4.Eliminar: Opción para borrar productos

La lógica se gestiona con Express y los datos se almacenan en MongoDB.

## Esquema de Producto (Paso 5)
El modelo Producto fue creado con Mongoose, incluyendo los siguientes campos:
-nombre: { type: String, required: true },
-precio: { type: Number, required: true },
-descripcion: { type: String },
-imagen: { type: String } // ruta del archivo subido

Este esquema permite almacenar información básica y una imagen por producto.

## Carga de Imágenes con Multer (Paso 6)
Se integró Multer para permitir la carga de imágenes al crear o actualizar productos. La configuración incluye:

-Carpeta de destino: /uploads
-Validación de tipo: solo imágenes (.jpg, .png, .jpeg)
-Validación de tamaño: límite de 2MB
-Las imágenes se almacenan localmente y se muestran en la vista de productos.

## Autenticación de Usuarios (Paso 7)
Se implementó un sistema básico de autenticación:
-Registro: Crea un nuevo usuario con nombre, email y contraseña
-Login: Verifica credenciales y crea sesión
-Logout: Cierra sesión y redirige al login

Tecnologías utilizadas:

-bcrypt: para encriptar contraseñas
-express-session: para manejar sesiones de usuario
-Middleware personalizado: protege rutas privadas como /productos

## Paso 8: Validaciones con express-validator y control de errores
Se implementaron validaciones en los formularios de registro y creación/edición de productos utilizando express-validator. Esto garantiza que los datos enviados por el usuario cumplan con los requisitos mínimos antes de ser procesados.

Validaciones aplicadas:

* Campos obligatorios (nombre, email, contraseña, nombreProducto, precio)
Formato de email válido
Contraseña con longitud mínima
Precio numérico y positivo

* En caso de errores:
Se muestran mensajes claros en la vista correspondiente
Los datos ingresados se conservan para facilitar la corrección

## Paso 9: Diseño de vistas con Handlebars
Se utilizaron plantillas Handlebars (.hbs) para construir una interfaz clara y funcional:
productos.hbs: lista todos los productos con opciones para editar y eliminar
formulario.hbs: formulario reutilizable para crear y editar productos
login.hbs y registro.hbs: formularios de autenticación con control de errores
chat.hbs: interfaz de chat en tiempo real con bienvenida personalizada y botón de retorno
Las vistas incluyen estilos CSS personalizados y condicionales para mostrar contenido según el estado de sesión del usuario.

## Paso 10: Módulo de chat en tiempo real con Socket.io
Se integró Socket.io para permitir comunicación en tiempo real entre usuarios autenticados:
Al iniciar sesión, el nombre del usuario se guarda en la sesión
En la vista de chat, los usuarios pueden enviar mensajes que se transmiten instantáneamente a todos los conectados
Cada mensaje incluye el nombre del remitente
Se validó que solo usuarios autenticados puedan acceder al chat
La conexión se gestiona desde el servidor (index.js) y se refleja dinámicamente en el cliente (chat.hbs).

## Paso 11: Pruebas manuales con Postman, navegador y consola
Se realizaron pruebas exhaustivas para validar cada funcionalidad:

🔹 Postman
Registro de usuario (POST /registro)
Inicio de sesión (POST /login)
Creación de producto (POST /productos)
Edición y eliminación (PUT /productos/:id, DELETE /productos/:id)

🔹 Navegador
Flujo completo de usuario: registro → login → productos → chat
Verificación visual de vistas, enlaces y formularios
Prueba de chat en tiempo real entre múltiples pestañas

🔹 Consola
Logs de conexión de usuarios y mensajes en tiempo real
Verificación de errores de sesión, WebSocket y MongoDB
Confirmación de datos emitidos y recibidos por Socket.io

## Paso 12: Validación final y checklist
Antes de finalizar el desarrollo, se realizó una validación integral:

[x] Todas las rutas funcionan correctamente

[x] Las vistas se renderizan con datos dinámicos

[x] Las sesiones se gestionan correctamente

[x] El chat transmite mensajes en tiempo real

[x] No hay errores en consola ni en el navegador

[x] MongoDB almacena los datos esperados

## Enlace al repositorio:
https://github.com/alexander06j/MiInventarioExpress.git
