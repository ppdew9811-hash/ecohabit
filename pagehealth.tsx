'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Logo } from '@/components/logo'
import { ArrowLeft, Footprints, Droplets, Plus, Target, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface HealthData {
  steps: number
  stepsGoal: number
  water: number
  waterGoal: number
  date: string
}

interface WeeklyData {
  day: string
  steps: number
  water: number
}

export default function HealthPage() {
  const [todayData, setTodayData] = useState<HealthData>({
    steps: 0,
    stepsGoal: 10000,
    water: 0,
    waterGoal: 8,
    date: new Date().toDateString()
  })

  const [waterInput, setWaterInput] = useState('')
  const [stepsInput, setStepsInput] = useState('')

  // Mock weekly data
  const [weeklyData] = useState<WeeklyData[]>([
    { day: 'Sen', steps: 8500, water: 6.5 },
    { day: 'Sel', steps: 12000, water: 8.2 },
    { day: 'Rab', steps: 9500, water: 7.0 },
    { day: 'Kam', steps: 11200, water: 8.5 },
    { day: 'Jum', steps: 7800, water: 6.8 },
    { day: 'Sab', steps: 13500, water: 9.2 },
    { day: 'Min', steps: todayData.steps, water: todayData.water }
  ])

  useEffect(() => {
    // Load today's health data
    const today = new Date().toDateString()
    const savedData = localStorage.getItem(`eha_health_${today}`)

    if (savedData) {
      setTodayData(JSON.parse(savedData))
    } else {
      // Simulate getting steps from health app
      const simulatedSteps = Math.floor(Math.random() * 8000) + 2000
      setTodayData(prev => ({ ...prev, steps: simulatedSteps }))
    }
  }, [])

  const saveHealthData = (data: HealthData) => {
    localStorage.setItem(`eha_health_${data.date}`, JSON.stringify(data))
  }

  const addWater = () => {
    const amount = parseFloat(waterInput)
    if (amount > 0 && amount <= 2) {
      const newData = {
        ...todayData,
        water: todayData.water + amount
      }
      setTodayData(newData)
      saveHealthData(newData)
      setWaterInput('')

      // Give eco points for drinking water
      if (newData.water >= newData.waterGoal) {
        const userData = localStorage.getItem('eha_user')
        if (userData) {
          const user = JSON.parse(userData)
          user.points += 5 // Bonus points for meeting water goal
          localStorage.setItem('eha_user', JSON.stringify(user))
        }
      }
    } else {
      alert('Masukkan jumlah air antara 0.1 - 2.0 liter')
    }
  }

  const addSteps = () => {
    const steps = parseInt(stepsInput)
    if (steps > 0 && steps <= 5000) {
      const newData = {
        ...todayData,
        steps: todayData.steps + steps
      }
      setTodayData(newData)
      saveHealthData(newData)
      setStepsInput('')
    } else {
      alert('Masukkan jumlah langkah antara 1 - 5000')
    }
  }

  const stepProgress = Math.min((todayData.steps / todayData.stepsGoal) * 100, 100)
  const waterProgress = Math.min((todayData.water / todayData.waterGoal) * 100, 100)

  const weeklyAvgSteps = Math.round(
    weeklyData.reduce((sum, day) => sum + day.steps, 0) / weeklyData.length
  )
  const weeklyAvgWater = (
    weeklyData.reduce((sum, day) => sum + day.water, 0) / weeklyData.length
  ).toFixed(1)

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
            <h1 className="font-semibold text-green-800">Eco-Health Tracker</h1>
          </div>
          <Logo size="sm" />
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Today's Overview */}
        <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <CardContent className="pt-6">
            <h2 className="text-lg font-bold mb-1">Kesehatan Hari Ini</h2>
            <p className="text-blue-100 text-sm mb-4">
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <Footprints className="h-6 w-6 mx-auto mb-1" />
                <div className="text-2xl font-bold">{todayData.steps.toLocaleString()}</div>
                <div className="text-xs text-blue-100">Langkah</div>
              </div>
              <div className="text-center">
                <Droplets className="h-6 w-6 mx-auto mb-1" />
                <div className="text-2xl font-bold">{todayData.water.toFixed(1)}L</div>
                <div className="text-xs text-blue-100">Air Minum</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Steps Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Footprints className="h-5 w-5" />
              Tracking Langkah
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Progress hari ini</span>
                <span className="text-sm font-semibold">
                  {todayData.steps.toLocaleString()} / {todayData.stepsGoal.toLocaleString()}
                </span>
              </div>
              <Progress value={stepProgress} className="h-3" />
              <p className="text-xs text-gray-500 mt-1">
                {stepProgress >= 100 ? 'Target tercapai! 🎉' : `${(100 - stepProgress).toFixed(0)}% lagi untuk mencapai target`}
              </p>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Tambah langkah"
                value={stepsInput}
                onChange={(e) => setStepsInput(e.target.value)}
                type="number"
                className="flex-1"
              />
              <Button onClick={addSteps} disabled={!stepsInput}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700">
                <Target className="h-4 w-4" />
                <span className="text-sm font-medium">Info Kesehatan</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Berjalan kaki ramah lingkungan dan baik untuk kesehatan. 10,000 langkah per hari
                dapat membakar sekitar 300-500 kalori!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Water Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Droplets className="h-5 w-5" />
              Tracking Konsumsi Air
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Progress hari ini</span>
                <span className="text-sm font-semibold">
                  {todayData.water.toFixed(1)}L / {todayData.waterGoal}L
                </span>
              </div>
              <Progress value={waterProgress} className="h-3" />
              <p className="text-xs text-gray-500 mt-1">
                {waterProgress >= 100 ? 'Target tercapai! 💧' : `${(todayData.waterGoal - todayData.water).toFixed(1)}L lagi untuk mencapai target`}
              </p>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Tambah air (L)"
                value={waterInput}
                onChange={(e) => setWaterInput(e.target.value)}
                type="number"
                step="0.1"
                className="flex-1"
              />
              <Button onClick={addWater} disabled={!waterInput}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Add Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newData = { ...todayData, water: todayData.water + 0.25 }
                  setTodayData(newData)
                  saveHealthData(newData)
                }}
                className="flex-1"
              >
                +250ml
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newData = { ...todayData, water: todayData.water + 0.5 }
                  setTodayData(newData)
                  saveHealthData(newData)
                }}
                className="flex-1"
              >
                +500ml
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newData = { ...todayData, water: todayData.water + 1 }
                  setTodayData(newData)
                  saveHealthData(newData)
                }}
                className="flex-1"
              >
                +1L
              </Button>
            </div>

            <div className="bg-cyan-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-cyan-700">
                <Droplets className="h-4 w-4" />
                <span className="text-sm font-medium">Tips Hidrasi</span>
              </div>
              <p className="text-xs text-cyan-600 mt-1">
                Minum air yang cukup membantu konsentrasi dan energi. Gunakan tumbler
                untuk mengurangi sampah botol plastik!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <TrendingUp className="h-5 w-5" />
              Progress Mingguan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Steps Chart */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Langkah (dalam ribuan)</h4>
              <div className="flex items-end gap-1 h-20">
                {weeklyData.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-blue-500 rounded-t"
                      style={{
                        height: `${(day.steps / 15000) * 100}%`,
                        minHeight: '4px'
                      }}
                    />
                    <span className="text-xs text-gray-500 mt-1">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Water Chart */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Konsumsi Air (Liter)</h4>
              <div className="flex items-end gap-1 h-16">
                {weeklyData.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-cyan-500 rounded-t"
                      style={{
                        height: `${(day.water / 10) * 100}%`,
                        minHeight: '4px'
                      }}
                    />
                    <span className="text-xs text-gray-500 mt-1">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Summary */}
            <div className="bg-purple-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-purple-700 mb-2">Rata-rata Mingguan</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-purple-600">
                    {weeklyAvgSteps.toLocaleString()}
                  </div>
                  <div className="text-xs text-purple-500">Langkah/hari</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-600">{weeklyAvgWater}L</div>
                  <div className="text-xs text-purple-500">Air/hari</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
