# Truck Load Display 🚚

## Instalación

### Node.js
Instalar Node.js de [nodejs.org](https://nodejs.org/en/download/) utilizando el instalador para Windows.

### Visual Studio Code
Instalar VSCode de [code.visualstudio.com](https://code.visualstudio.com/Download) utilizando el instalador para Windows.

## Configuración del Proyecto

1. Abrir Visual Studio Code.
2. Abrir una nueva terminal en VSCode.

### Instalación de Vite y Dependencias
Ejecutar los siguientes comandos en la terminal:

```bash
npm install vite --proxy http://10.220.51.116:8080
npm install vue --proxy http://10.220.51.116:8080
npm install @tresjs/cientos --proxy http://10.220.51.116:8080/
npm install @tresjs/core three --proxy http://10.220.51.116:8080/  
npm install three --proxy http://10.220.51.116:8080
```

### Iniciar el Servidor de Desarrollo

Una vez que todas las dependencias estén instaladas, ejecutar:

```bash
npm run dev
```
La aplicación será visible en la siguiente dirección:
```bash
http://localhost:5173/
```

Si en algún momento tira el error *running scripts is disabled on this system*, se soluciona escribiendo este comando en **Powershell**:
```bash
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Cómo Usar la Aplicación

### Carga de Datos

Con el botón `Load File` se abre el explorador de archivos, permitiendo la carga de un **.csv** conteniendo la configuración de uno o varios viajes. Este archivo debe contener las siguientes columnas en el mismo orden que son listadas:
1. Material
2. Inicia_x
3. Inicia_z
4. Inicia_y
5. Termina_x
6. Termina_z
7. Termina_y
8. Almacén
9. Tipo_camión
10. Id_viaje
11. Cliente
12. Orden
13. Fragilidad 
14. Tipo_producto
15. Localidad
16. Distancia
17. Peso

### Selección de Viaje

Una vez cargado el archivo con ese formato, seleccionar el número de viaje a visualizar en `Select Trip`.

### Interacciones

#### Rotación y Zoom del Camión

Se puede interactuar con la visualización del camión de las siguientes maneras:

- **Rotación:** Utiliza el ratón y los clicks para rotar la vista del camión y observar los detalles desde diferentes ángulos.
- **Zoom:** Utiliza la rueda del ratón para hacer zoom dentro y fuera de la visualización.

#### Detalles de la Carga

Al hacer clic en una carga específica en el camión, puedes acceder a detalles adicionales sobre esa carga:

- **Clic en la Carga:** Haz clic en una carga para ver información detallada, como el nombre del material, el tipo de producto, su fragilidad, etc.

