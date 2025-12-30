'use server'

import { createClient } from "@/app/utils/supabase/server"
import { redirect } from "next/navigation"
import { loginSchema } from "@/app/utils/schemas/auth"

/**
 * Autentica a un usuario en el sistema utilizando email y contraseña
 *
 * @param formdata - FormData que contiene los campos 'email' y 'password'
 * @returns Un objeto con la propiedad 'error' si ocurre algún problema,
 *          o redirige a /dashboard si el login es exitoso
 */
export async function login(formdata: FormData) {
    const data = {
        email: formdata.get("email") as string,
        password: formdata.get("password") as string,
    }

    const validation = loginSchema.safeParse(data);
    if (!validation.success) {
        return { error: validation.error.issues[0].message };
    }
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword(validation.data);

    if (error) {
        return { error: error.message };
    }

    redirect("/dashboard");
}

/**
 * Cierra la sesión del usuario actual y limpia las cookies de autenticación
 *
 * Después de cerrar sesión, redirige automáticamente a la página de login.
 * Esta función solo puede ser llamada desde el servidor.
 */
export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/auth/login");
}
