# 🛠️ Guía de Contribución y Flujo de Desarrollo

Esta guía establece los estándares técnicos para garantizar que nuestro código sea limpio, escalable y profesional.

> **Regla de Oro:** "Deja el código mejor de lo que lo encontraste."

-----

## ⛔ PROTOCOLO DE SEGURIDAD (CRÍTICO)

**¡Lee esto antes de escribir una línea de código!**

1.  **Credenciales y Variables de Entorno:**
      * **PROHIBIDO** subir archivos `.env`, `.env.local` o similares al repositorio.
      * **NUNCA** subas la `SERVICE_ROLE_KEY` de Supabase. Esa llave da acceso total administrativo y compromete toda la base de datos.
      * Solo la `ANON_KEY` y la `URL` pueden ser públicas (aunque idealmente también van en variables de entorno).
2.  **Datos Reales:**
      * Al hacer pruebas, **NO** uses datos reales de estudiantes (cédulas, correos personales). Usa datos ficticios o "mock data" (`test@example.com`).

-----

## 1. Stack Tecnológico y Estándares

  * **Framework:** Next.js 16 (App Router).
  * **Lenguaje:** TypeScript (Modo estricto). **Prohibido el uso de `any`**.
  * **Base de Datos:** Supabase (PostgreSQL).
  * **Estilos:** Tailwind CSS / CSS Modules (según definición de UI).
  * **Formato:** Prettier + ESLint (configuración en el repo).

-----

## 2. Estrategia de Ramas (Git Flow Simplificado)

Nuestro árbol tiene dos ramas principales y protegidas:

1.  **`main`**: Producción. Código estable y desplegado. **Nadie hace push directo aquí.**
2.  **`develop`**: Integración. Aquí se junta el trabajo de todos los escuadrones para pruebas.

### 🔄 Flujo de Trabajo (Paso a Paso):

1.  **Sincroniza tu entorno:**
    ```bash
    git checkout develop
    git pull origin develop
    ```
2.  **Crea tu rama (Feature Branch):** Nombra la rama según la tarea del GitHub Project:
      * `feat/auth-login` (Nueva funcionalidad)
      * `fix/calendario-reserva` (Corrección de error)
      * `ui/navbar-responsive` (Mejoras visuales)
    ```bash
    git checkout -b feat/nombre-de-la-tarea
    ```
3.  **Desarrolla y confirma (Commit):** (Ver sección de Commits).
4.  **Sube tus cambios:**
    ```bash
    git push origin feat/nombre-de-la-tarea
    ```
5.  **Pull Request (PR):**
      * Abre el PR apuntando hacia **`develop`** (nunca a `main` directamente).
      * Solicita revisión a un compañero de otro escuadrón.
      * **Requisito:** El código debe compilar (`npm run build`) sin errores antes del PR.

-----

## 3. Convenciones de Nombres (Naming Convention)

En desarrollo web con React/Next.js, mezclamos convenciones según el tipo de archivo. Presta mucha atención:

| Tipo de Elemento | Convención | Ejemplo Correcto | Ejemplo Incorrecto |
| :--- | :--- | :--- | :--- |
| **Carpetas** | kebab-case | `components/ui-elements` | `components/UiElements` |
| **Componentes (.tsx)** | **PascalCase** | `NavBar.tsx`, `UserCard.tsx` | `navbar.tsx`, `user_card.tsx` |
| **Hooks / Funciones** | camelCase | `useAuth.ts`, `formatDate.ts` | `UseAuth.ts`, `format_date.ts` |
| **Tablas (Supabase)** | snake\_case | `users_profiles`, `inventory_items` | `UsersProfiles`, `inventoryItems` |
| **Clases CSS** | kebab-case | `btn-primary`, `card-header` | `btnPrimary` |

> **Nota:** Esto es vital porque React trata los componentes que inician con minúscula como etiquetas HTML nativas.

-----

## 4. Protocolo de Commits (Conventional Commits)

Mantén el historial legible. Estructura: `<tipo>(<alcance opcional>): <descripción>`

| Tipo | Uso | Ejemplo |
| :--- | :--- | :--- |
| **feat** | Nueva funcionalidad | `feat(auth): agregar validación de contraseña segura` |
| **fix** | Corrección de bug | `fix(reservas): corregir error en selector de fechas` |
| **ui** | Cambios visuales/CSS | `ui: ajustar padding en modal de confirmación` |
| **refactor** | Mejora de código sin cambiar lógica | `refactor: optimizar consulta a supabase en inventario` |
| **docs** | Documentación | `docs: actualizar readme con pasos de instalación` |
| **chore** | Configuración/Herramientas | `chore: actualizar dependencias de package.json` |

-----

## 5. Checklist para Pull Requests (PR)

Antes de pedir que te revisen el código, asegúrate de cumplir con esto:

  - [ ] **Sin `console.log`:** Elimina los logs de depuración ("hola", "test", objetos) antes de subir.
  - [ ] **Linter Limpio:** Ejecuta `npm run lint` y asegúrate de que no haya advertencias graves.
  - [ ] **Tipado Fuerte:** No has usado `any` en TypeScript. Has definido interfaces para tus props y datos.
  - [ ] **Responsivo:** ¿Tu componente se ve bien en celular?
  - [ ] **Compresión:** Si subiste imágenes estáticas (logos, iconos), verifica que pesen menos de 100kb (usa formato .svg o .webp).

-----

## 6. Configuración del Entorno Local

1.  Clona el repositorio.
2.  Instala dependencias: `pnpm install`
3.  Crea un archivo `.env.local` en la raíz (pídele las claves al líder del proyecto).
4.  Ejecuta el servidor de desarrollo: `pnpm dev`
