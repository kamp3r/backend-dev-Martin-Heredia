# process-object

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)

## About <a name = "about"></a>

Desafio - Balance de carga

## Getting Started <a name = "getting_started"></a>

Para poder utilizar este despliegue, deberás instalar con npm i, para poder instalar los módulos correspondientes para la correcta ejecución del servidor

## Usage <a name = "usage"></a>

Este servidor puede correr en modo fork y cluster de las siguientes maneras:

###Con nodemon

```bash
nodemon server.js PUERTO MODO(cluster, fork)
```

###Con forever

```bash
forever server.js PUERTO MODO(cluster, fork)
```

###Con PM2 (FORK)

```bash
pm2 start server.js --name="server1" --watch -- --PUERTO
```

###Con PM2 (CLUSTER)

```bash
pm2 start server.js --name="server2" --watch -i NUMERO (cantidad de instancias de clusters que se desean utilizar)
```

###Con NGINX

Config 1:

```bash
    start nginx
    pm2 start server.js --name="server1" --watch -- -- 8080
    pm2 start server.js --name="server2" --watch -- -- 8081
```
Config 2:

Se debera ir a la carpeta nginx1.21.6 comentar el METODO 1, y descomentar el METODO 2.
Comentando con CTRL + K y CTRL + C 
Descomentando con CTRL + K y CTRL + U

Con PM2
```bash
    start nginx
    pm2 start server.js --name="server1" --watch -- -- 8081
    pm2 start server.js --name="server2" --watch -- -- 8082
    pm2 start server.js --name="server3" --watch -- -- 8083
    pm2 start server.js --name="server4" --watch -- -- 8084
    pm2 start server.js --name="server5" --watch -- -- 8085
```

Con Cluster Nativo: (si tiene limitaciones de CPU CORES, recomendable hacerlo en fork mode)

```bash
    start nginx
    nodemon server.js 8081 cluster
    nodemon server.js 8082 cluster
    nodemon server.js 8083 cluster
    nodemon server.js 8084 cluster
    nodemon server.js 8085 cluster
```