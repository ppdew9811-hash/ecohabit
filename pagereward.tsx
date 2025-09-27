'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Logo } from '@/components/logo'
import { ArrowLeft, Star, Gift, Check, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

interface Reward {
  id: string
  name: string
  description: string
  icon: string
  points: number
  category: 'tree' | 'voucher' | 'merchandise' | 'donation'
  availability: number
  claimed: boolean
}

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  points: number
  joinDate: string
}

const availableRewards: Reward[] = [
  {
    id: '1',
    name: 'Tanam 1 Pohon',
    description: 'Kami akan menanam 1 pohon atas nama Anda di hutan konservasi',
    icon: '🌳',
    points: 1000,
    category: 'tree',
    availability: 50,
    claimed: false
  },
  {
    id: '2',
    name: 'Voucher Makanan Rp 50k',
    description: 'Voucher makanan untuk restoran partner ramah lingkungan',
    icon: '🍽️',
    points: 500,
    category: 'voucher',
    availability: 20,
    claimed: false
  },
  {
    id: '3',
    name: 'Voucher Belanja Rp 75k',
    description: 'Voucher belanja untuk produk ramah lingkungan',
    icon: '🛍️',
    points: 750,
    category: 'voucher',
    availability: 15,
    claimed: false
  },
  {
    id: '4',
    name: 'Tumbler EHA Limited Edition',
    description: 'Tumbler eksklusif EcoHabit Tracker dengan desain unik',
    icon: '🥤',
    points: 300,
    category: 'merchandise',
    availability: 30,
    claimed: false
  },
  {
    id: '5',
    name: 'Tas Kanvas Eco-Friendly',
    description: 'Tas kanvas ramah lingkungan untuk belanja sehari-hari',
    icon: '👜',
    points: 400,
    category: 'merchandise',
    availability: 25,
    claimed: false
  },
  {
    id: '6',
    name: 'Donasi Kebersihan Pantai',
    description: 'Donasi untuk program pembersihan pantai dan laut',
    icon: '🏖️',
    points: 200,
    category: 'donation',
    availability: 100,
    claimed: false
  },
  {
    id: '7',
    name: 'Voucher Transportasi Umum',
    description: 'Voucher untuk transportasi umum selama 1 minggu',
    icon: '🚌',
    points: 150,
    category: 'voucher',
    availability: 40,
    claimed: false
  },
  {
    id: '8',
    name: 'Bibit Tanaman Herbal',
    description: 'Paket bibit tanaman herbal untuk ditanam di rumah',
    icon: '🌿',
    points: 250,
    category: 'tree',
    availability: 35,
    claimed: false
  }
]

export default function RewardsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [rewards, setRewards] = useState<Reward[]>(availableRewards)
  const [claimedRewards, setClaimedRewards] = useState<string[]>([])

  useEffect(() => {
    const userData = localStorage.getItem('eha_user')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Load claimed rewards
    const claimed = localStorage.getItem('eha_claimed_rewards')
    if (claimed) {
      const claimedList = JSON.parse(claimed)
      setClaimedRewards(claimedList)

      // Update rewards with claimed status
      setRewards(rewards.map(reward => ({
        ...reward,
        claimed: claimedList.includes(reward.id)
      })))
    }
  }, [])

  const handleClaimReward = (reward: Reward) => {
    if (!user) return

    if (user.points < reward.points) {
      alert('Poin Anda tidak cukup untuk menukar reward ini!')
      return
    }

    if (reward.claimed) {
      alert('Anda sudah menukar reward ini!')
      return
    }

    const confirmClaim = confirm(
      `Apakah Anda yakin ingin menukar ${reward.points} poin dengan ${reward.name}?`
    )

    if (confirmClaim) {
      // Deduct points from user
      const updatedUser = {
        ...user,
        points: user.points - reward.points
      }
      localStorage.setItem('eha_user', JSON.stringify(updatedUser))
      setUser(updatedUser)

      // Mark reward as claimed
      const newClaimedRewards = [...claimedRewards, reward.id]
      localStorage.setItem('eha_claimed_rewards', JSON.stringify(newClaimedRewards))
      setClaimedRewards(newClaimedRewards)

      // Update rewards list
      setRewards(rewards.map(r =>
        r.id === reward.id ? { ...r, claimed: true } : r
      ))

      // Save to history
      const history = JSON.parse(localStorage.getItem('eha_reward_history') || '[]')
      history.push({
        id: reward.id,
        name: reward.name,
        points: reward.points,
        claimedAt: new Date().toISOString()
      })
      localStorage.setItem('eha_reward_history', JSON.stringify(history))

      alert(`Selamat! Anda berhasil menukar ${reward.name}. Tim kami akan menghubungi Anda segera.`)
    }
  }

  const categoryColors = {
    tree: 'bg-green-100 text-green-700',
    voucher: 'bg-blue-100 text-blue-700',
    merchandise: 'bg-purple-100 text-purple-700',
    donation: 'bg-orange-100 text-orange-700'
  }

  const categoryLabels = {
    tree: 'Lingkungan',
    voucher: 'Voucher',
    merchandise: 'Merchandise',
    donation: 'Donasi'
  }

  if (!user) {
    return <div>Loading...</div>
  }

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
            <h1 className="font-semibold text-green-800">Reward Store</h1>
          </div>
          <Logo size="sm" />
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* User Points Card */}
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Poin Anda</h2>
                <p className="text-purple-100">
                  Tukarkan dengan hadiah menarik
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Star className="h-6 w-6 text-yellow-300" />
                  <span className="text-3xl font-bold">{user.points}</span>
                </div>
                <p className="text-xs text-purple-100">Poin Tersedia</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Claimed Rewards Summary */}
        {claimedRewards.length > 0 && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-green-700">
                <Gift className="h-5 w-5" />
                <span className="font-medium">
                  Anda telah menukar {claimedRewards.length} reward
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rewards Grid */}
        <div className="space-y-3">
          {rewards.map((reward) => (
            <Card
              key={reward.id}
              className={`transition-all duration-200 ${
                reward.claimed
                  ? 'bg-gray-50 border-gray-200'
                  : user.points >= reward.points
                    ? 'hover:shadow-md border-green-200'
                    : 'opacity-60 border-gray-200'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{reward.icon}</div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-semibold ${
                        reward.claimed ? 'text-gray-500' : 'text-gray-800'
                      }`}>
                        {reward.name}
                      </h3>
                      {reward.claimed && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          <Check className="h-3 w-3 mr-1" />
                          Ditukar
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-3">
                      {reward.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={categoryColors[reward.category]}
                        >
                          {categoryLabels[reward.category]}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Tersisa: {reward.availability}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="border-orange-200 text-orange-600"
                        >
                          <Star className="h-3 w-3 mr-1" />
                          {reward.points}
                        </Badge>

                        {!reward.claimed ? (
                          <Button
                            size="sm"
                            onClick={() => handleClaimReward(reward)}
                            disabled={user.points < reward.points}
                            className={
                              user.points >= reward.points
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gray-400 cursor-not-allowed"
                            }
                          >
                            <ShoppingBag className="h-3 w-3 mr-1" />
                            Klaim
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="secondary"
                            disabled
                            className="bg-gray-100 text-gray-500"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Ditukar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-2 text-blue-700">
              <span className="text-lg">💡</span>
              <div>
                <h3 className="font-semibold text-sm">Tips Mengumpulkan Poin</h3>
                <p className="text-xs mt-1">
                  Lakukan aktivitas ramah lingkungan setiap hari untuk mengumpulkan poin lebih cepat.
                  Aktivitas dengan poin tertinggi: menanam pohon (+50 poin)!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
