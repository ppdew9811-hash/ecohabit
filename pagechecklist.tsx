'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Logo } from '@/components/logo'
import { ArrowLeft, Save, Star, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface Activity {
  id: string
  name: string
  icon: string
  points: number
  description: string
  category: 'waste' | 'transport' | 'energy' | 'water' | 'nature'
  completed: boolean
}

const ecoActivities: Activity[] = [
  {
    id: '1',
    name: 'Buang sampah di tempat daur ulang',
    icon: '♻️',
    points: 15,
    description: 'Memisahkan sampah organik dan anorganik',
    category: 'waste',
    completed: false
  },
  {
    id: '2',
    name: 'Menggunakan tumbler/botol minum sendiri',
    icon: '🥤',
    points: 20,
    description: 'Mengurangi penggunaan botol plastik sekali pakai',
    category: 'waste',
    completed: false
  },
  {
    id: '3',
    name: 'Naik transportasi umum/sepeda',
    icon: '🚌',
    points: 25,
    description: 'Mengurangi emisi karbon dengan transportasi ramah lingkungan',
    category: 'transport',
    completed: false
  },
  {
    id: '4',
    name: 'Mematikan lampu saat tidak digunakan',
    icon: '💡',
    points: 10,
    description: 'Menghemat energi listrik',
    category: 'energy',
    completed: false
  },
  {
    id: '5',
    name: 'Menggunakan tas belanja sendiri',
    icon: '🛍️',
    points: 15,
    description: 'Mengurangi penggunaan kantong plastik',
    category: 'waste',
    completed: false
  },
  {
    id: '6',
    name: 'Menanam atau merawat tanaman',
    icon: '🌱',
    points: 50,
    description: 'Berkontribusi untuk lingkungan hijau',
    category: 'nature',
    completed: false
  },
  {
    id: '7',
    name: 'Menghemat air saat mandi/cuci',
    icon: '🚿',
    points: 15,
    description: 'Mengurangi konsumsi air berlebihan',
    category: 'water',
    completed: false
  },
  {
    id: '8',
    name: 'Membawa bekal makanan sendiri',
    icon: '🍱',
    points: 20,
    description: 'Mengurangi kemasan makanan sekali pakai',
    category: 'waste',
    completed: false
  },
  {
    id: '9',
    name: 'Menggunakan kertas bekas untuk coret-coretan',
    icon: '📝',
    points: 10,
    description: 'Memanfaatkan kembali kertas bekas',
    category: 'waste',
    completed: false
  },
  {
    id: '10',
    name: 'Edukasi orang lain tentang lingkungan',
    icon: '📢',
    points: 30,
    description: 'Menyebarkan kesadaran lingkungan',
    category: 'nature',
    completed: false
  }
]

export default function ChecklistPage() {
  const [activities, setActivities] = useState<Activity[]>(ecoActivities)
  const [totalPoints, setTotalPoints] = useState(0)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    // Load today's activities from localStorage
    const today = new Date().toDateString()
    const savedActivities = localStorage.getItem(`eha_activities_${today}`)

    if (savedActivities) {
      const parsed = JSON.parse(savedActivities)
      setActivities(parsed)
      calculatePoints(parsed)
    }
  }, [])

  const calculatePoints = (activityList: Activity[]) => {
    const points = activityList
      .filter(activity => activity.completed)
      .reduce((sum, activity) => sum + activity.points, 0)
    setTotalPoints(points)
  }

  const handleActivityToggle = (activityId: string) => {
    const updatedActivities = activities.map(activity => {
      if (activity.id === activityId) {
        return { ...activity, completed: !activity.completed }
      }
      return activity
    })

    setActivities(updatedActivities)
    calculatePoints(updatedActivities)
    setHasChanges(true)
  }

  const handleSave = () => {
    const today = new Date().toDateString()
    localStorage.setItem(`eha_activities_${today}`, JSON.stringify(activities))

    // Update user points
    const userData = localStorage.getItem('eha_user')
    if (userData) {
      const user = JSON.parse(userData)
      const savedActivities = localStorage.getItem(`eha_activities_${today}`)
      let previousPoints = 0

      if (savedActivities) {
        const oldActivities = JSON.parse(savedActivities)
        previousPoints = oldActivities
          .filter((a: Activity) => a.completed)
          .reduce((sum: number, a: Activity) => sum + a.points, 0)
      }

      user.points = user.points - previousPoints + totalPoints
      localStorage.setItem('eha_user', JSON.stringify(user))
    }

    setHasChanges(false)
    alert(`Aktivitas berhasil disimpan! Anda mendapat ${totalPoints} poin hari ini.`)
  }

  const categoryColors = {
    waste: 'bg-green-100 text-green-700',
    transport: 'bg-blue-100 text-blue-700',
    energy: 'bg-yellow-100 text-yellow-700',
    water: 'bg-cyan-100 text-cyan-700',
    nature: 'bg-emerald-100 text-emerald-700'
  }

  const categoryLabels = {
    waste: 'Limbah',
    transport: 'Transport',
    energy: 'Energi',
    water: 'Air',
    nature: 'Alam'
  }

  const completedCount = activities.filter(a => a.completed).length

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
            <h1 className="font-semibold text-green-800">Checklist Harian</h1>
          </div>
          <Logo size="sm" />
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Progress Card */}
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Progress Hari Ini</h2>
                <p className="text-green-100">
                  {completedCount} dari {activities.length} aktivitas selesai
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-300" />
                  <span className="text-2xl font-bold">{totalPoints}</span>
                </div>
                <p className="text-xs text-green-100">Poin Hari Ini</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 bg-green-400 rounded-full h-2">
              <div
                className="bg-yellow-300 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / activities.length) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Activities List */}
        <div className="space-y-3">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className={`transition-all duration-200 ${
                activity.completed
                  ? 'bg-green-50 border-green-200 shadow-sm'
                  : 'hover:shadow-md'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={activity.id}
                    checked={activity.completed}
                    onCheckedChange={() => handleActivityToggle(activity.id)}
                    className="mt-1"
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{activity.icon}</span>
                      <h3 className={`font-medium ${
                        activity.completed ? 'text-green-700 line-through' : 'text-gray-800'
                      }`}>
                        {activity.name}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      {activity.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <Badge
                        variant="secondary"
                        className={categoryColors[activity.category]}
                      >
                        {categoryLabels[activity.category]}
                      </Badge>

                      <div className="flex items-center gap-1">
                        {activity.completed && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        <Badge
                          variant={activity.completed ? "default" : "outline"}
                          className={activity.completed ? "bg-green-500" : ""}
                        >
                          +{activity.points} poin
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Save Button */}
        {hasChanges && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <Button
                onClick={handleSave}
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                <Save className="h-4 w-4 mr-2" />
                Simpan Aktivitas ({totalPoints} poin)
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Daily Limit Notice */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-700">
              <span>ℹ️</span>
              <p className="text-sm">
                <strong>Catatan:</strong> Setiap aktivitas hanya bisa dilakukan 1 kali per hari.
                Kembali besok untuk mendapat poin lebih banyak!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
