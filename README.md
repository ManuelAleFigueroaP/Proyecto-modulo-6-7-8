# Proyecto Modulo 7 - Acceso a Datos en Node.js

## Nombre del proyecto
Modulo 7 Backend - Node.js + Express + PostgreSQL + Sequelize

## Descripcion
Esta es la Parte 2 del proyecto academico/profesional. Se extiende la base del modulo 6 para incorporar acceso a datos real con base relacional, CRUD de usuarios, relaciones entre modelos, transacciones con rollback, validaciones y manejo centralizado de errores.

## Stack usado
- Node.js (v18+)
- Express.js
- PostgreSQL
- Sequelize ORM
- dotenv
- nodemon

## Requisitos previos
1. Node.js v18 o superior
2. PostgreSQL instalado y corriendo
3. Una base de datos creada para el proyecto

## Instalacion
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Crear archivo de entorno:
   ```bash
   copy .env.example .env
   ```
3. Editar `.env` con tus credenciales reales de PostgreSQL.

## Configuracion del .env
Variables importantes:
- `PORT`: puerto del servidor
- `DB_HOST`: host de PostgreSQL
- `DB_PORT`: puerto de PostgreSQL
- `DB_NAME`: nombre de base de datos
- `DB_USER`: usuario de PostgreSQL
- `DB_PASSWORD`: password de PostgreSQL
- `DB_DIALECT`: postgres
- `DB_LOGGING`: `true` o `false`
- `DB_SYNC_ALTER`: si quieres `sequelize.sync({ alter: true })`
- `DB_SYNC_FORCE`: si quieres reconstruir tablas (`force`)

## Creacion de base de datos
Crea la base manualmente en PostgreSQL antes de sincronizar modelos:
```sql
CREATE DATABASE modulo7_db;
```

## Como correr sync (equivalente migracion simple)
```bash
npm run db:sync
```
Este script crea/actualiza tablas `users` y `orders` segun modelos Sequelize.

## Como ejecutar seed
```bash
npm run db:seed
```
Inserta 3 usuarios y 3 pedidos iniciales de ejemplo.

## Scripts disponibles
- `npm start`: inicia servidor normal
- `npm run dev`: inicia servidor con nodemon
- `npm run db:sync`: sincroniza modelos con la base
- `npm run db:seed`: carga datos de ejemplo

## Estructura del proyecto
```text
.
|-- logs/
|   `-- log.txt
|-- public/
|   `-- index.html
|-- src/
|   |-- app.js
|   |-- config/
|   |   `-- database.js
|   |-- controllers/
|   |   `-- user.controller.js
|   |-- middlewares/
|   |   |-- errorHandler.js
|   |   `-- notFound.js
|   |-- models/
|   |   |-- index.js
|   |   |-- order.model.js
|   |   `-- user.model.js
|   |-- routes/
|   |   `-- user.routes.js
|   |-- scripts/
|   |   |-- seed.js
|   |   `-- sync-db.js
|   |-- services/
|   |   |-- transaction.service.js
|   |   `-- user.service.js
|   `-- utils/
|       |-- appError.js
|       `-- validators.js
|-- .env.example
|-- .gitignore
|-- index.js
|-- package-lock.json
|-- package.json
`-- README.md
```

## Rutas disponibles
### Salud y base
- `GET /` -> HTML estatico
- `GET /status` -> estado en JSON

### CRUD usuarios
- `GET /usuarios`
- `GET /usuarios?nombre=Juan Perez`
- `GET /usuarios/:id`
- `POST /usuarios`
- `PUT /usuarios/:id`
- `DELETE /usuarios/:id`

### Relaciones
- `GET /usuarios/:id/pedidos`
- `GET /usuarios/con-pedidos`

### Transaccionalidad
- `POST /usuarios/registro-con-pedido`

## Ejemplos de request/response
### POST /usuarios
Request:
```json
{
  "nombre": "Ana Torres",
  "email": "ana@example.com",
  "password": "123456"
}
```
Response (201):
```json
{
  "ok": true,
  "data": {
    "id": 4,
    "nombre": "Ana Torres",
    "email": "ana@example.com",
    "updatedAt": "2026-03-20T00:00:00.000Z",
    "createdAt": "2026-03-20T00:00:00.000Z"
  }
}
```

### GET /usuarios
Response (200):
```json
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "nombre": "Juan Perez",
      "email": "juan@example.com",
      "createdAt": "2026-03-20T00:00:00.000Z",
      "updatedAt": "2026-03-20T00:00:00.000Z"
    }
  ]
}
```
`password` no se devuelve por estar excluido en el `defaultScope` del modelo `User`.

## Relacion entre modelos
- `User hasMany Order` (alias: `pedidos`)
- `Order belongsTo User` (alias: `usuario`)

Esto permite traer un usuario con sus pedidos en una consulta con `include`.

## Explicacion de la transaccion
La ruta `POST /usuarios/registro-con-pedido` ejecuta una transaccion Sequelize:
1. Crea usuario
2. Crea pedido inicial asociado
3. Si falla el paso 2, se hace `rollback` automatico y no queda nada persistido

Para forzar rollback en pruebas, envia:
```json
{
  "nombre": "Prueba Rollback",
  "email": "rollback@example.com",
  "password": "123456",
  "forceError": true
}
```

## Manejo de errores y validaciones
- Validacion de obligatorios: `nombre`, `email`, `password`
- Validacion de formato de email
- Validacion de existencia en `PUT` y `DELETE`
- Errores centralizados en middleware `errorHandler`
- Mensajes HTTP claros (`400`, `404`, `409`, `500`)

## Justificacion breve de Sequelize
Sequelize permite mapear tablas a modelos JS, manejar relaciones y transacciones con menos codigo repetitivo que SQL manual. Esto mejora mantenibilidad para un proyecto academico que crecera en modulo 8.

## Comparacion SQL vs ORM
Ejemplo SQL manual de `GET /usuarios/:id/pedidos`:
```sql
SELECT u.id, u.nombre, u.email, o.id AS order_id, o.descripcion, o.total
FROM users u
LEFT JOIN orders o ON o.userId = u.id
WHERE u.id = 1;
```

Con Sequelize:
```js
User.findByPk(1, { include: [{ model: Order, as: 'pedidos' }] });
```

Ventaja ORM frente a SQL manual:
- Menos riesgo de errores repetitivos
- Relaciones declaradas una sola vez
- Mejor legibilidad para estudiantes
- Transacciones y validaciones integradas

## Que se hizo en modulo 7
- Conexion PostgreSQL estable
- Modelos `User` y `Order`
- Relacion `1:N`
- CRUD completo de usuarios
- Consultas con relaciones
- Seed inicial con 3 usuarios
- Operacion transaccional con rollback
- Validaciones y errores centralizados

## Como probar en Postman
1. `GET http://localhost:3000/status`
2. `GET http://localhost:3000/usuarios`
3. `POST http://localhost:3000/usuarios`
4. `PUT http://localhost:3000/usuarios/1`
5. `DELETE http://localhost:3000/usuarios/1`
6. `GET http://localhost:3000/usuarios/1/pedidos`
7. `POST http://localhost:3000/usuarios/registro-con-pedido`

## Listo para GitHub
El proyecto queda organizado, documentado y preparado para versionarse y subir al repositorio.
