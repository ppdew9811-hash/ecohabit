'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Logo } from '@/components/logo'
import {
  ArrowLeft,
  User,
  Lock,
  Phone,
  Bell,
  History,
  Gift,
  Trash2,
  Save
} from 'lucide-react'
import Link from 'next/link'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  points: number
  joinDate: string
  phone?: string
}

interface NotificationSettings {
  dailyReminder: boolean
  weeklyReport: boolean
  rewardUpdates: boolean
  leaderboardUpdates: boolean
}

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [activeSection, setActiveSection] = useState<'profile' | 'security' | 'notifications' | 'history'>('profile')

  // Form states
  const [phoneNumber, setPhoneNumber] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Notification preferences
  const [notifications, setNotifications] = useState<NotificationSettings>({
    dailyReminder: true,
    weeklyReport: true,
    rewardUpdates: true,
    leaderboardUpdates: false
  })

  // History data
  const [activityHistory, setActivityHistory] = useState<Array<{date: string, activity: string, points: number}>>([])
  const [rewardHistory, setRewardHistory] = useState<Array<{id: string, name: string, points: number, claimedAt: string}>>([])

  useEffect(() => {
    const userData = localStorage.getItem('eha_user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setPhoneNumber(parsedUser.phone || '')
    }

    // Load notification settings
    const savedNotifications = localStorage.getItem('eha_notifications')
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    }

    // Load history data
    const rewards = localStorage.getItem('eha_reward_history')
    if (rewards) {
      setRewardHistory(JSON.parse(rewards))
    }

    // Load recent activity history (mock data)
    setActivityHistory([
      { date: '2024-01-29', activity: 'Menggunakan tumbler', points: 20 },
      { date: '2024-01-29', activity: 'Naik transportasi umum', points: 25 },
      { date: '2024-01-28', activity: 'Buang sampah di daur ulang', points: 15 },
      { date: '2024-01-28', activity: 'Menanam pohon', points: 50 },
      { date: '2024-01-27', activity: 'Menghemat air', points: 15 }
    ])
  }, [])

  const updatePhone = () => {
    if (!user || !phoneNumber) return

    if (phoneNumber.length < 10) {
      alert('Nomor telepon tidak valid')
      return
    }

    const updatedUser = { ...user, phone: phoneNumber }
    localStorage.setItem('eha_user', JSON.stringify(updatedUser))
    setUser(updatedUser)
    alert('Nomor telepon berhasil diperbarui!')
  }

  const updatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Harap isi semua field password')
      return
    }

    if (newPassword.length < 6) {
      alert('Password baru minimal 6 karakter')
      return
    }

    if (newPassword !== confirmPassword) {
      alert('Konfirmasi password tidak cocok')
      return
    }

    // In real app, verify current password here
    alert('Password berhasil diubah!')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const updateNotifications = (key: keyof NotificationSettings, value: boolean) => {
    const updated = { ...notifications, [key]: value }
    setNotifications(updated)
    localStorage.setItem('eha_notifications', JSON.stringify(updated))
  }

  const clearAllData = () => {
    const confirm = window.confirm(
      'Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan.'
    )

    if (confirm) {
      localStorage.removeItem('eha_activities')
      localStorage.removeItem('eha_reward_history')
      localStorage.removeItem('eha_claimed_rewards')
      setActivityHistory([])
      setRewardHistory([])
      alert('Semua data riwayat berhasil dihapus!')
    }
  }

  const handleLogout = () => {
    const confirm = window.confirm('Apakah Anda yakin ingin keluar?')
    if (confirm) {
      localStorage.removeItem('eha_user')
      window.location.reload()
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  const menuItems = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Keamanan', icon: Lock },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'history', label: 'Riwayat', icon: History }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-green-600">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="font-semibold text-green-800">Pengaturan</h1>
          </div>
          <Logo size="sm" />
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* User Info Card */}
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">
                  {user.firstName[0]}{user.lastName[0]}
                </span>
              </div>
              <div>
                <h2 className="font-bold">{user.firstName} {user.lastName}</h2>
                <p className="text-green-100 text-sm">{user.email}</p>
                <p className="text-green-100 text-xs">
                  Bergabung: {new Date(user.joinDate).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Navigation */}
        <Card>
          <CardContent className="p-2">
            <div className="grid grid-cols-4 gap-1">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  size="sm"
                  className="flex flex-col gap-1 h-auto py-3"
                  onClick={() => setActiveSection(item.id as 'profile' | 'security' | 'notifications' | 'history')}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profile Section */}
        {activeSection === 'profile' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <User className="h-5 w-5" />
                Informasi Profil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nama Lengkap</Label>
                <Input
                  value={`${user.firstName} ${user.lastName}`}
                  disabled
                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={user.email}
                  disabled
                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <Button onClick={updatePhone} size="sm">
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Total Poin</Label>
                <Input
                  value={`${user.points.toLocaleString()} poin`}
                  disabled
                  className="bg-gray-50"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Section */}
        {activeSection === 'security' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Lock className="h-5 w-5" />
                Keamanan Akun
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Password Saat Ini</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Password Baru</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button onClick={updatePassword} className="w-full">
                <Lock className="h-4 w-4 mr-2" />
                Ubah Password
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Notifications Section */}
        {activeSection === 'notifications' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Bell className="h-5 w-5" />
                Preferensi Notifikasi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Pengingat Harian</p>
                  <p className="text-sm text-gray-600">Reminder untuk aktivitas eco-friendly</p>
                </div>
                <Switch
                  checked={notifications.dailyReminder}
                  onCheckedChange={(checked) => updateNotifications('dailyReminder', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Laporan Mingguan</p>
                  <p className="text-sm text-gray-600">Ringkasan progress mingguan</p>
                </div>
                <Switch
                  checked={notifications.weeklyReport}
                  onCheckedChange={(checked) => updateNotifications('weeklyReport', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Update Reward</p>
                  <p className="text-sm text-gray-600">Notifikasi reward baru tersedia</p>
                </div>
                <Switch
                  checked={notifications.rewardUpdates}
                  onCheckedChange={(checked) => updateNotifications('rewardUpdates', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Update Leaderboard</p>
                  <p className="text-sm text-gray-600">Perubahan ranking Anda</p>
                </div>
                <Switch
                  checked={notifications.leaderboardUpdates}
                  onCheckedChange={(checked) => updateNotifications('leaderboardUpdates', checked)}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* History Section */}
        {activeSection === 'history' && (
          <div className="space-y-4">
            {/* Activity History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <History className="h-5 w-5" />
                  Riwayat Aktivitas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {activityHistory.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{item.activity}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        +{item.points}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reward History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Gift className="h-5 w-5" />
                  Riwayat Reward
                </CardTitle>
              </CardHeader>
              <CardContent>
                {rewardHistory.length > 0 ? (
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {rewardHistory.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(item.claimedAt).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                          -{item.points}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Belum ada reward yang ditukar
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <Trash2 className="h-5 w-5" />
                  Manajemen Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="destructive"
                  onClick={clearAllData}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Hapus Semua Riwayat
                </Button>

                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                >
                  Keluar dari Akun
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
