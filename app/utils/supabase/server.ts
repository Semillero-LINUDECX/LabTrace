import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * Crea y configura una instancia del cliente de Supabase para uso en el servidor
 *
 * Esta función inicializa un cliente de Supabase con soporte para Server-Side Rendering (SSR)
 * que gestiona automáticamente las cookies de autenticación.
 *
 * @returns Una promesa que resuelve a un cliente de Supabase configurado con gestión de cookies
 *
 * @throws Error si las variables de entorno NEXT_PUBLIC_SUPABASE_URL o
 *         NEXT_PUBLIC_SUPABASE_ANON_KEY no están definidas
 */
export async function createClient() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll (cookiesToSet){
                    try{
                        cookiesToSet.forEach(({name, value, options}) =>
                        cookieStore.set(name, value, options))
                    } catch {
                        // Manejar errores de configuración de cookies si es necesario
                    }
                }
            }
        }
    )
}
