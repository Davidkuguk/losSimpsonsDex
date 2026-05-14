# Memoria de pruebas - LosSimpsonsDex

## Ejecucion de tests

Comando ejecutado en el proyecto Angular:

```bash
npm test -- --watch=false
```

Resultado:

- 3 archivos de test ejecutados.
- 10 pruebas superadas.
- 0 errores.

## Pruebas unitarias en Angular

Archivo: `src/app/core/simpson.service.spec.ts`

- Comprueba que `SimpsonService` se crea correctamente.
- Comprueba que el servicio devuelve la lista inicial de personajes.
- Comprueba que se puede anadir un personaje valido.
- Comprueba que se puede eliminar un personaje existente.
- Comprueba que no se anaden personajes con datos vacios.

## Pruebas de integracion en Angular

Archivos:

- `src/app/core/simpson.service.spec.ts`
- `src/app/features/simpson/simpsons-dex-page/simpsons-dex-page.component.spec.ts`

Comprobaciones:

- Se simula una peticion `GET api/personajes` con `HttpTestingController`.
- Se verifica que el servicio recibe los datos mockeados correctamente.
- Se verifica que `SimpsonsDexPageComponent` reacciona a los datos recibidos y los muestra en la plantilla.

## Uso de mocks

En Angular se usa:

- `provideHttpClientTesting()`
- `HttpTestingController`

Los tests no dependen de un backend real ni de datos reales en una base de datos.

## Parte Laravel

En este workspace solo aparece el proyecto Angular `losSimpsonsDex`. No hay proyecto Laravel, controlador, modelo ni rutas API locales sobre los que crear pruebas PHPUnit.
