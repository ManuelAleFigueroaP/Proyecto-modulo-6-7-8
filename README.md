# Proyecto Modulo 6 - Base Backend Node.js + Express

## Descripcion
Este proyecto implementa una base backend academica/profesional con Node.js y Express usando arquitectura modular. Cumple con los requisitos de servidor funcional, rutas publicas, contenido estatico, persistencia simple en archivo plano y documentacion clara.

## Requisitos
- Node.js v18 o superior
- npm (se instala junto con Node.js)

## Instalacion
1. Clona o descarga el proyecto.
2. En la raiz, instala dependencias:
   ```bash
   npm install
   ```
3. Crea tu archivo de entorno a partir del ejemplo:
   ```bash
   copy .env.example .env
   ```

## Scripts Disponibles
- `npm start`: ejecuta el servidor en modo normal.
- `npm run dev`: ejecuta el servidor con nodemon (recarga automatica).

## Eleccion Del Archivo Principal
Se eligio `index.js` como punto de entrada porque es una convencion simple y clara para proyectos academicos de Express, facilitando la lectura inicial y el arranque del servidor.

## Estructura Del Proyecto
```text
.
|-- config/
|-- controllers/
|   |-- home.controller.js
|   `-- status.controller.js
|-- logs/
|   `-- log.txt
|-- middlewares/
|   `-- logger.middleware.js
|-- public/
|   `-- index.html
|-- routes/
|   |-- index.routes.js
|   `-- status.routes.js
|-- services/
|   `-- log.service.js
|-- utils/
|-- .env.example
|-- .gitignore
|-- index.js
|-- package.json
`-- README.md
```

## Justificacion De La Estructura
- `routes`: define endpoints y delega logica.
- `controllers`: contiene la logica de respuesta HTTP.
- `middlewares`: centraliza comportamiento transversal (logging).
- `services`: encapsula logica reutilizable (persistencia en logs).
- `public`: recursos estaticos.
- `logs`: persistencia simple en archivo plano (`fs.appendFile`).
- `config` y `utils`: preparadas para crecimiento futuro.

## Ejemplos De Uso
Servidor local por defecto en `http://localhost:3000`.

- Abrir pagina principal (HTML):
  - `GET /`
- Ver estado del servicio (JSON):
  - `GET /status`
- Recurso estatico:
  - `GET /public/index.html`

Ejemplo de respuesta en `/status`:
```json
{
  "ok": true,
  "service": "modulo-6-backend-base",
  "environment": "development",
  "timestamp": "2026-03-20T00:00:00.000Z"
}
```

## Rutas Disponibles
- `GET /` -> responde HTML desde `public/index.html`.
- `GET /status` -> responde JSON con estado de servicio.

## Persistencia En Archivo Plano
Cada acceso a `GET /` se registra en `logs/log.txt` usando `fs.appendFile()`, incluyendo fecha, hora y ruta accedida.

## Escalabilidad Futura
La arquitectura queda lista para:
- autenticacion y autorizacion,
- integracion con base de datos,
- ORM,
- CRUD completo,
- JWT,
- carga de archivos,
- API RESTful modular.

## Estado De Entrega
Proyecto preparado para ejecucion local y publicacion en GitHub.
