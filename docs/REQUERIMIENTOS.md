# 📋 Especificación de Requerimientos de Software (SRS)

**Proyecto:** LabTrace (Sistema de Gestión de Inventario y Trazabilidad)
**Versión:** 1.0.0
**Estado:** Borrador Aprobado

## 1. Módulo de Autenticación y Gestión de Usuarios (Core)
*Este módulo es la base de la seguridad y la trazabilidad.*

* **RF-001 | Autenticación y Sesión:** El sistema debe gestionar el inicio de sesión seguro (posible integración con correo institucional o correo/contraseña) y mantener la persistencia de la sesión mediante tokens seguros.
* **RF-002 | Gestión de Roles (RBAC):** El sistema debe manejar los siguientes roles con permisos diferenciados:
    * *Estudiante:* Acceso a consulta y reservas.
    * *Docente/Investigador:* Privilegios de validación y reservas prioritarias.
    * *Admin Semillero:* Gestión del inventario propio de su semillero.
    * *Admin Global/Secretaria:* Acceso total y gestión de sanciones.
* **RF-003 | Perfil de Usuario:** El sistema debe permitir asociar información académica al usuario (Código estudiantil, Semillero al que pertenece).
* **RF-004 | Matriz de Habilidades (Permisos de Equipo):** El sistema debe permitir al administrador asignar "habilidades" o banderas al perfil de un estudiante (ej. `[uso_dron, uso_laser]`) que habiliten el desbloqueo de reservas para equipos críticos específicos.

## 2. Módulo de Gestión de Inventario
*Centraliza la información de los activos físicos.*

* **RF-005 | CRUD de Equipos:** El sistema debe permitir crear, leer, editar y deshabilitar fichas de equipos.
* **RF-006 | Categorización y Propiedad:** El sistema debe permitir clasificar los equipos por origen: "Inventario General (Carrera)" o "Inventario Semillero X", permitiendo filtrar la visualización y restringir la edición según el rol del administrador.
* **RF-007 | Generación de Identificadores (QR):** El sistema debe generar automáticamente un código QR único para cada equipo registrado, el cual, al ser decodificado, direcciona a la URL de gestión/estado de ese equipo específico.
* **RF-008 | Gestión de Estado del Activo:** El sistema debe gestionar los estados del equipo: *Disponible, Ocupado, En Mantenimiento, Dado de Baja*.
* **RF-009 | Alerta de Consumibles:** El sistema debe permitir configurar si un equipo requiere consumibles y mostrar alertas de stock (Bajo/Agotado) basadas en los reportes de los usuarios (no inventario numérico estricto, sino banderas de estado).

## 3. Módulo de Reservas y Agenda
*Lógica de negocio para la asignación de tiempos.*

* **RF-010 | Validación de Disponibilidad:** El sistema debe impedir la creación de reservas solapadas en fecha y hora para un mismo equipo.
* **RF-011 | Ventanas de Prioridad:** El sistema debe restringir la antelación de reserva según el tipo de proyecto:
    * Proyectos de Investigación: Hasta 30 días de antelación.
    * Proyectos Académicos/Personales: Hasta 5 días de antelación.
* **RF-012 | Lógica de Aprobación:** El sistema debe clasificar las reservas en dos estados:
    * *Aprobada Automáticamente:* Para equipos estándar y tiempos cortos.
    * *Pendiente de Aprobación:* Para equipos marcados como "Críticos" o reservas que excedan "X" horas/días.
* **RF-013 | Cancelación por "No-Show":** El sistema debe ejecutar un proceso (cron job o trigger) que libere la reserva y marque una falta al usuario si no se registra el "Check-in" tras 20 minutos de la hora de inicio.

## 4. Módulo de Préstamos y Trazabilidad (Ejecución)
*Captura la evidencia del uso real del equipo.*

* **RF-014 | Registro de Estado Inicial (Check-in):** El sistema debe requerir y almacenar evidencia fotográfica obligatoria y validación de acompañantes antes de liberar el uso del equipo.
* **RF-015 | Generación de Documentos:** El sistema debe componer automáticamente un documento PDF con los datos de la reserva, usuario y equipo, listo para impresión y firma (cumplimiento normativo físico).
* **RF-016 | Registro de Estado Final (Check-out):** El sistema debe registrar el cierre del préstamo capturando: fotos finales, reporte de incidencias (daños) y estado de los consumibles.
* **RF-017 | Historial de Trazabilidad:** El sistema debe permitir visualizar una línea de tiempo inmutable por equipo, mostrando quién lo usó, cuándo y las fotos de evidencia de cada sesión.

## 5. Módulo de Control y Sanciones
*Gestión de incidencias y mantenimiento.*

* **RF-018 | Bloqueo de Morosos:** El sistema debe impedir nuevas reservas a usuarios que tengan un préstamo activo sin cerrar (sin Check-out).
* **RF-019 | Sistema de Sanciones Automáticas:** El sistema debe inhabilitar temporalmente (ej. 1 mes) a usuarios que acumulen 3 faltas de tipo "No-Show".
* **RF-020 | Flujo de Mantenimiento:** El sistema debe cambiar automáticamente el estado de un equipo a "En Mantenimiento" si se reporta una incidencia en el Check-out, y notificar (correo/alerta) al docente responsable del semillero asociado.

---

### Consideraciones Técnicas (Requerimientos No Funcionales Clave)
* **RNF-01 | Optimización de Storage:** El frontend debe implementar algoritmos de compresión de imágenes antes de enviarlas al servidor para garantizar un peso máximo (ej. 200KB) por evidencia, optimizando el almacenamiento en capa gratuita.
* **RNF-02 | Seguridad de Datos (RLS):** La base de datos debe implementar *Row Level Security* (RLS) para asegurar que un estudiante no pueda ver ni modificar reservas o datos de otros estudiantes, ni alterar inventarios de semilleros a los que no pertenece.
