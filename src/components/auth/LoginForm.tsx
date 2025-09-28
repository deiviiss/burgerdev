'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { login } from '@/actions/auth/login'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const loginSchema = z.object({
  email: z.string({
    required_error: 'El correo electrónico es requerido',
    message: 'Correo electrónico no válido'
  }).email({
    message: 'Correo electrónico no válido'
  }),
  password: z.string({
    required_error: 'La contraseña es requerida',
    message: 'Contraseña no válida'
  }).min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  })
})

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValuesForm = {
    email: '',
    password: ''
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: defaultValuesForm,
    resolver: zodResolver(loginSchema)
  })
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true)

    const { email, password } = values

    try {
      const { ok, message } = await login(email, password)

      if (!ok) {
        toast.error(message)
        setIsSubmitting(false)
        return
      }

      toast.success(message)
      setIsSubmitting(false)
      // router.push("/admin")
      window.location.replace('/admin')
    } catch (error) {
      toast.error('Error al iniciar sesión')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full" autoComplete="off">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <Card>
            <CardHeader>
              <div className="mx-auto w-24 h-24 mb-4 rounded-full bg-black p-3">
                <Image
                  src="/images/logo-form.webp"
                  alt="burger dev"
                  width={96}
                  height={96}
                  className="object-contain mx-auto"
                  priority
                />
              </div>
              <CardTitle className="text-2xl text-center font-bold text-primary mb-2">Panel de Administración</CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                Burger Dev
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder='Ingresa tu usuario'
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Contraseña'
                        {...field}
                        value={field.value}
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => { setShowPassword(!showPassword) }}
                      className="absolute right-3 top-2/3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className='space-y-3 flex-col'>
              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full'
              >
                {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </form>
    </Form>
  )
}
