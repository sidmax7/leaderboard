'use client'

import { useState, useEffect, useRef } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { db } from '../firebaseConfig' // Import Firestore instance
import { collection, getDocs, updateDoc, doc, addDoc, query, orderBy } from 'firebase/firestore'
import { PlusCircle, ChevronUp, Trophy } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type LeaderboardEntry = {
  rank: number
  id: string
  userId: string
  referralCount: number
}

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [newUserId, setNewUserId] = useState('')
  const prevDataRef = useRef<LeaderboardEntry[]>([])

  const fetchLeaderboardData = async () => {
    const leaderboardRef = collection(db, 'leaderboard');
    const q = query(leaderboardRef, orderBy('referralCount', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      userId: doc.data().userId,
      referralCount: doc.data().referralCount,
      rank: 0,
    }));

    let currentRank = 0;
    let prevCount = -1;
    data.forEach((entry, index) => {
      if (entry.referralCount !== prevCount) {
        currentRank = index + 1;
      }
      entry.rank = currentRank;
      prevCount = entry.referralCount;
    });

    setLeaderboardData(data);
  }

  useEffect(() => {
    fetchLeaderboardData()
  }, [])

  const incrementReferralCount = async (id: string) => {
    const docRef = doc(db, 'leaderboard', id)
    await updateDoc(docRef, {
      referralCount: leaderboardData.find(entry => entry.id === id)!.referralCount + 1
    })
    
    prevDataRef.current = leaderboardData;
    await fetchLeaderboardData()
  }

  const addNewUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newUserId.trim() === '') return
    await addDoc(collection(db, 'leaderboard'), {
      userId: newUserId,
      referralCount: 0
    })
    setNewUserId('')
    await fetchLeaderboardData()
  }

  return (
    <div className="min-h-screen animated-gradient flex flex-col items-center justify-center p-8">
      <h1 className="text-6xl font-bold mb-12 text-center text-white drop-shadow-lg">
        <Trophy className="inline-block mr-4 text-yellow-400" />
        Leaderboard
      </h1>
      <div className="max-w-4xl w-full mx-auto bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl mb-12">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white border-opacity-20">
              <TableHead className="text-white font-bold text-xl text-center py-6">Rank</TableHead>
              <TableHead className="text-white font-bold text-xl text-center py-6">User ID</TableHead>
              <TableHead className="text-white font-bold text-xl text-center py-6">Referral Count</TableHead>
              <TableHead className="text-white font-bold text-xl text-center py-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence initial={false}>
              {leaderboardData.map((entry, index) => (
                <motion.tr
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 1
                  }}
                  className="hover:bg-white hover:bg-opacity-10 transition-colors"
                  layout
                  style={{ position: 'relative' }}
                >
                  <TableCell className="font-medium text-white text-center text-2xl">
                    <motion.div layout>{entry.rank}</motion.div>
                  </TableCell>
                  <TableCell className="text-white text-center text-lg">
                    <motion.div layout>{entry.userId}</motion.div>
                  </TableCell>
                  <TableCell className="text-white text-center text-lg font-semibold">
                    <motion.div layout>{entry.referralCount}</motion.div>
                  </TableCell>
                  <TableCell className="text-center">
                    <motion.div layout>
                      <Button 
                        onClick={() => incrementReferralCount(entry.id)}
                        className="bg-white hover:bg-opacity-90 text-pink-500 font-semibold rounded-full px-6 py-3 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                      >
                        <ChevronUp className="w-5 h-5 mr-2" />
                        Increment
                      </Button>
                    </motion.div>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
      <form onSubmit={addNewUser} className="w-full max-w-md">
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Enter new user ID" 
            value={newUserId}
            onChange={(e) => setNewUserId(e.target.value)}
            className="flex-grow bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-100 border-2 border-white border-opacity-30 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-white transition-all duration-300 ease-in-out text-lg"
          />
          <Button 
            type="submit" 
            className="bg-white hover:bg-opacity-90 text-pink-500 font-semibold rounded-full px-8 py-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex items-center text-lg"
          >
            <PlusCircle className="w-6 h-6 mr-2" />
            Add User
          </Button>
        </div>
      </form>
    </div>
  )
}