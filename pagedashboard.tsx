'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Logo } from '@/components/logo'
import {
  CheckSquare,
  Gift,
  Activity,
  Trophy,
  Settings,
  Leaf,
  LogOut,
  Star
} from 'lucide-react'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  points: number
  joinDate: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [currentView, setCurrentView] = useState('home')
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('eha_user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('eha_user')
    window.location.reload()
  }

  const navigationItems = [
    { id: 'home', label: 'Beranda', icon: Leaf, color: 'bg-green-500' },
    { id: 'checklist', label: 'Checklist Harian', icon: CheckSquare, color: 'bg-blue-500' },
    { id: 'rewards', label: 'Reward Store', icon: Gift, color: 'bg-purple-500' },
    { id: 'health', label: 'Eco-Health', icon: Activity, color: 'bg-orange-500' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, color: 'bg-yellow-500' },
    { id: 'settings', label: 'Pengaturan', icon: Settings, color: 'bg-gray-500' }
  ]

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <Logo size="sm" />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-green-600 hover:text-green-800"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Welcome Card */}
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">
                  Halo, {user.firstName}! 👋
                </h1>
                <p className="text-green-100 text-sm">
                  Selamat datang kembali di EHA
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-300" />
                  <span className="text-2xl font-bold">{user.points}</span>
                </div>
                <p className="text-xs text-green-100">Poin Total</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center p-3">
            <div className="text-2xl font-bold text-green-600">5</div>
            <div className="text-xs text-gray-600">Aktivitas Hari Ini</div>
          </Card>
          <Card className="text-center p-3">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-xs text-gray-600">Streak Hari</div>
          </Card>
          <Card className="text-center p-3">
            <div className="text-2xl font-bold text-purple-600">3</div>
            <div className="text-xs text-gray-600">Badge</div>
          </Card>
        </div>

        {/* Navigation Menu */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-green-800">Menu Utama</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start h-12 hover:bg-green-50"
                onClick={() => {
                  if (item.id === 'checklist') router.push('/checklist')
                  else if (item.id === 'rewards') router.push('/rewards')
                  else if (item.id === 'health') router.push('/health')
                  else if (item.id === 'leaderboard') router.push('/leaderboard')
                  else if (item.id === 'settings') router.push('/settings')
                  else setCurrentView(item.id)
                }}
              >
                <div className={`p-2 rounded-lg ${item.color} mr-3`}>
                  <item.icon className="h-4 w-4 text-white" />
                </div>
                <span className="flex-1 text-left">{item.label}</span>
                <span className="text-green-600">→</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Today's Achievement */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-green-800 flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Pencapaian Hari Ini
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Menggunakan tumbler</span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                +20 poin
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Buang sampah di tempat daur ulang</span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                +15 poin
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Naik transportasi umum</span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                +25 poin
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Tip */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 text-sm">Tips Hari Ini</h3>
                <p className="text-xs text-blue-600 mt-1">
                  Tahukah kamu? Menggunakan tumbler dapat menghemat hingga 500 gelas plastik per tahun!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
