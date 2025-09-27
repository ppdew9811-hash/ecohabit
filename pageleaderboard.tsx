'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Logo } from '@/components/logo'
import { ArrowLeft, Trophy, Medal, Award, Star, Crown, Leaf } from 'lucide-react'
import Link from 'next/link'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  points: number
  joinDate: string
}

interface LeaderboardUser extends User {
  rank: number
  badge: string
  badgeColor: string
  weeklyPoints: number
}

interface UserBadge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  requirement: string
  earned: boolean
  earnedDate?: string
}

export default function LeaderboardPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'badges'>('leaderboard')

  // Mock leaderboard data
  const [leaderboardData] = useState<LeaderboardUser[]>([
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Green',
      email: 'sarah@students.unnes.ac.id',
      points: 2850,
      rank: 1,
      badge: 'Eco Hero',
      badgeColor: 'bg-yellow-500',
      weeklyPoints: 450,
      joinDate: '2024-01-01'
    },
    {
      id: '2',
      firstName: 'Ahmad',
      lastName: 'Pratama',
      email: 'ahmad@students.unnes.ac.id',
      points: 2650,
      rank: 2,
      badge: 'Green Guardian',
      badgeColor: 'bg-green-500',
      weeklyPoints: 380,
      joinDate: '2024-01-05'
    },
    {
      id: '3',
      firstName: 'Maya',
      lastName: 'Sari',
      email: 'maya@students.unnes.ac.id',
      points: 2400,
      rank: 3,
      badge: 'Nature Lover',
      badgeColor: 'bg-emerald-500',
      weeklyPoints: 320,
      joinDate: '2024-01-10'
    },
    {
      id: '4',
      firstName: 'Budi',
      lastName: 'Santoso',
      email: 'budi@students.unnes.ac.id',
      points: 2100,
      rank: 4,
      badge: 'Eco Warrior',
      badgeColor: 'bg-blue-500',
      weeklyPoints: 290,
      joinDate: '2024-01-15'
    },
    {
      id: '5',
      firstName: 'Siti',
      lastName: 'Nurhaliza',
      email: 'siti@students.unnes.ac.id',
      points: 1900,
      rank: 5,
      badge: 'Green Starter',
      badgeColor: 'bg-purple-500',
      weeklyPoints: 250,
      joinDate: '2024-01-20'
    }
  ])

  const [userBadges] = useState<UserBadge[]>([
    {
      id: '1',
      name: 'First Step',
      description: 'Melakukan aktivitas eco-friendly pertama',
      icon: '👣',
      color: 'bg-green-100 text-green-700',
      requirement: '1 aktivitas',
      earned: true,
      earnedDate: '2024-01-21'
    },
    {
      id: '2',
      name: 'Weekly Warrior',
      description: 'Menyelesaikan 7 hari berturut-turut',
      icon: '🔥',
      color: 'bg-orange-100 text-orange-700',
      requirement: '7 hari streak',
      earned: true,
      earnedDate: '2024-01-28'
    },
    {
      id: '3',
      name: 'Point Collector',
      description: 'Mengumpulkan 1000 poin',
      icon: '⭐',
      color: 'bg-yellow-100 text-yellow-700',
      requirement: '1000 poin',
      earned: true,
      earnedDate: '2024-02-05'
    },
    {
      id: '4',
      name: 'Tree Planter',
      description: 'Menanam atau merawat tanaman 10 kali',
      icon: '🌱',
      color: 'bg-emerald-100 text-emerald-700',
      requirement: '10x menanam',
      earned: false
    },
    {
      id: '5',
      name: 'Eco Master',
      description: 'Mencapai 5000 poin total',
      icon: '🏆',
      color: 'bg-purple-100 text-purple-700',
      requirement: '5000 poin',
      earned: false
    },
    {
      id: '6',
      name: 'Green Influencer',
      description: 'Mengajak 5 orang bergabung',
      icon: '📢',
      color: 'bg-blue-100 text-blue-700',
      requirement: '5 referral',
      earned: false
    }
  ])

  useEffect(() => {
    const userData = localStorage.getItem('eha_user')
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
  }, [])

  const getCurrentUserRank = () => {
    if (!currentUser) return 0

    // Add current user to leaderboard for ranking
    const allUsers = [...leaderboardData, {
      ...currentUser,
      rank: 0,
      badge: currentUser.points >= 2000 ? 'Eco Warrior' : 'Green Starter',
      badgeColor: currentUser.points >= 2000 ? 'bg-blue-500' : 'bg-purple-500',
      weeklyPoints: 150
    }]

    // Sort by points and assign ranks
    allUsers.sort((a, b) => b.points - a.points)
    return allUsers.findIndex(user => user.id === currentUser.id) + 1
  }

  const earnedBadgesCount = userBadges.filter(badge => badge.earned).length

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-orange-500" />
      default:
        return <Trophy className="h-4 w-4 text-gray-400" />
    }
  }

  if (!currentUser) {
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
            <h1 className="font-semibold text-green-800">Leaderboard</h1>
          </div>
          <Logo size="sm" />
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* User Rank Card */}
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Peringkat Anda</h2>
                <p className="text-indigo-100">
                  {currentUser.firstName} {currentUser.lastName}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">#{getCurrentUserRank()}</div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4" />
                  <span>{currentUser.points} poin</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex bg-white rounded-lg p-1 shadow-sm">
          <Button
            variant={activeTab === 'leaderboard' ? 'default' : 'ghost'}
            className="flex-1"
            onClick={() => setActiveTab('leaderboard')}
          >
            <Trophy className="h-4 w-4 mr-2" />
            Ranking
          </Button>
          <Button
            variant={activeTab === 'badges' ? 'default' : 'ghost'}
            className="flex-1"
            onClick={() => setActiveTab('badges')}
          >
            <Award className="h-4 w-4 mr-2" />
            Badge ({earnedBadgesCount})
          </Button>
        </div>

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-3">
            {leaderboardData.map((user) => (
              <Card
                key={user.id}
                className={`transition-all duration-200 ${
                  user.rank <= 3 ? 'border-yellow-200 shadow-md' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getRankIcon(user.rank)}
                    </div>

                    <Avatar>
                      <AvatarFallback className={user.badgeColor}>
                        {user.firstName[0]}{user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {user.firstName} {user.lastName}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={`${user.badgeColor} text-white text-xs`}
                        >
                          {user.badge}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          +{user.weeklyPoints} minggu ini
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {user.points.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">poin</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Current User Card (if not in top 5) */}
            {getCurrentUserRank() > 5 && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8">
                      <span className="font-bold text-blue-600">#{getCurrentUserRank()}</span>
                    </div>

                    <Avatar>
                      <AvatarFallback className="bg-blue-500">
                        {currentUser.firstName[0]}{currentUser.lastName[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {currentUser.firstName} {currentUser.lastName} (Anda)
                      </h3>
                      <Badge variant="secondary" className="bg-blue-500 text-white text-xs">
                        Green Starter
                      </Badge>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {currentUser.points.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">poin</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div className="space-y-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-800">Badge Collection</CardTitle>
                <p className="text-sm text-gray-600">
                  Anda telah meraih {earnedBadgesCount} dari {userBadges.length} badge
                </p>
              </CardHeader>
            </Card>

            {userBadges.map((badge) => (
              <Card
                key={badge.id}
                className={`transition-all duration-200 ${
                  badge.earned
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 opacity-60'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">
                      {badge.earned ? badge.icon : '🔒'}
                    </div>

                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        badge.earned ? 'text-gray-800' : 'text-gray-500'
                      }`}>
                        {badge.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {badge.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className={badge.earned ? badge.color : 'bg-gray-100 text-gray-500'}
                        >
                          {badge.requirement}
                        </Badge>

                        {badge.earned && badge.earnedDate && (
                          <span className="text-xs text-green-600">
                            Diraih: {new Date(badge.earnedDate).toLocaleDateString('id-ID')}
                          </span>
                        )}
                      </div>
                    </div>

                    {badge.earned && (
                      <div className="text-green-500">
                        <Award className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Motivational Card */}
        <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Leaf className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-800">Terus Semangat!</h3>
                <p className="text-sm text-green-600">
                  Setiap aktivitas ramah lingkungan yang Anda lakukan berkontribusi
                  untuk planet yang lebih hijau. Mari naik peringkat bersama!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
