# Intranet Jardín Infantil

## Descripción del proyecto
Este proyecto corresponde al desarrollo de una aplicación web tipo intranet para un Jardín Infantil, creada con React, TypeScript y Vite.
El sistema permite administrar información interna mediante distintos módulos, incluyendo autenticación de usuarios, gestión de comunicados, reuniones y actividades.
La aplicación utiliza rutas protegidas, contexto global y almacenamiento local mediante localStorage para mantener la información persistente.


## Tecnologías utilizadas
* React
* TypeScript
* Vite
* React Router DOM
* Context API
* CSS
* localStorage

## Funcionalidades implementadas:

### Sistema de autenticación
* Login con validación de credenciales
* Mensajes de error
* Contexto global mediante AuthContext
* Cierre de sesión
* Persistencia de sesión
* Rutas protegidas

### Dashboard principal
* Visualización de información general
* Resumen de comunicados
* Resumen de reuniones
* Resumen de actividades

### Módulo de comunicados
Permite:
* Crear comunicados
* Visualizar comunicados
* Editar comunicados
* Eliminar comunicados
* Buscar comunicados
* Ver detalle mediante ruta dinámica

### Módulo de reuniones
Permite:
* Crear reuniones
* Visualizar reuniones
* Editar reuniones
* Eliminar reuniones
* Buscar reuniones

### Módulo de actividades
Permite:
* Crear actividades
* Visualizar actividades
* Editar actividades
* Eliminar actividades
* Buscar actividades

## Estructura del proyecto
src/
├── components/
├── context/
├── pages/
├── routes/
├── styles/
├── types/
├── App.tsx
├── main.tsx

## Cómo ejecutar el proyecto:
### Entrar a la carpeta
cd intranet-jardin

### Instalar dependencias
npm install

### Ejecutar proyecto
npm run dev

## Usuario de prueba
Usuario:
admin

Contraseña:
1234