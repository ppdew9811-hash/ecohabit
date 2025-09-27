'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Logo } from '@/components/logo'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [step, setStep] = useState(1) // 1: phone, 2: code, 3: new password
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate sending SMS code
    setTimeout(() => {
      alert(`Kode verifikasi telah dikirim ke ${phone}`)
      setStep(2)
      setIsLoading(false)
    }, 1000)
  }

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate code verification
    setTimeout(() => {
      if (code === '123456') { // Demo code
        setStep(3)
      } else {
        alert('Kode verifikasi salah. Gunakan 123456 untuk demo.')
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword.length < 6) {
      alert('Password minimal 6 karakter')
      return
    }

    if (newPassword !== confirmPassword) {
      alert('Konfirmasi password tidak cocok')
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      alert('Password berhasil diubah! Silakan login dengan password baru.')
      window.location.href = '/auth/login'
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-green-800">
              Reset Password
            </CardTitle>
            <CardDescription className="text-green-600">
              {step === 1 && "Masukkan nomor telepon Anda"}
              {step === 2 && "Masukkan kode verifikasi"}
              {step === 3 && "Buat password baru"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-green-700">Nomor Telepon</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="border-green-200 focus:border-green-400"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? 'Mengirim...' : 'Kirim Kode Verifikasi'}
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-green-700">Kode Verifikasi</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Masukkan 6 digit kode"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  maxLength={6}
                  className="border-green-200 focus:border-green-400 text-center text-lg tracking-widest"
                />
                <p className="text-xs text-green-600">
                  Kode telah dikirim ke {phone}
                </p>
                <p className="text-xs text-blue-600">
                  Demo: gunakan kode 123456
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? 'Memverifikasi...' : 'Verifikasi Kode'}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full text-green-600"
                onClick={() => setStep(1)}
              >
                Ubah Nomor Telepon
              </Button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-green-700">Password Baru</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Minimal 6 karakter"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="border-green-200 focus:border-green-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-green-700">Konfirmasi Password Baru</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Ulangi password baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border-green-200 focus:border-green-400"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? 'Mengubah...' : 'Ubah Password'}
              </Button>
            </form>
          )}

          <div className="text-center">
            <Link
              href="/auth/login"
              className="text-sm text-green-600 hover:text-green-800 underline"
            >
              Kembali ke halaman login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
