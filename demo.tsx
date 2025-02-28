"use client"
import { useState } from "react"
import { ToastProvider, useToast } from "./toast-context"
import { ToastContainer } from "./animated-toast"
import { Carousel } from "./carousel"
import { DollarSign, Ruler, Link as LinkIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  RiTwitterXFill,  // X (구 트위터) 아이콘
  RiFacebookFill,   // 페이스북 아이콘
  RiInstagramLine
} from 'react-icons/ri'

const FlowersAndSaintsUI = () => {
  const { addToast } = useToast()
  const [showSalaryForm, setShowSalaryForm] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [resultData, setResultData] = useState<any>(null)
  const [age, setAge] = useState("")
  const [income, setIncome] = useState("")
  const [ageForSubmit, setAgeForSubmit] = useState("")
  const [incomeForSubmit, setIncomeForSubmit] = useState("")

  const items = [
    {
      Icon: DollarSign,
      title: "💰 월급 배틀 💰",
      description: "내 월급이 상위 몇 %일까? 🤑",
      action: () => {
        setShowSalaryForm(true)
      },
    },
  ]

  const handleSalarySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:8000/run-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ age: ageForSubmit, income: incomeForSubmit }),
      })
      const data = await response.json()
      setResultData(data)
      setShowResult(true)
      setShowSalaryForm(false)
    } catch (error) {
      addToast("서버 통신 에러가 발생했습니다.", "error")
    }
  }

  const handleShare = async (platform: 'twitter' | 'facebook' | 'copy') => {
    const shareUrl = window.location.href
    const shareText = `내 위치 분석 결과: ${resultData?.message}`

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`)
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`)
        break
      case 'copy':
        try {
          await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
          addToast("링크가 복사되었습니다!", "success")
        } catch (err) {
          addToast("링크 복사에 실패했습니다.", "error")
        }
        break
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-pink-100 p-4 sm:p-8">
      <h1 className="text-2xl sm:text-4xl font-bold text-indigo-800 mb-8 font-figtree text-center">내 위치는 어디쯤? 🤔</h1>
      
      <AnimatePresence mode="wait">
        {!showSalaryForm && !showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md px-2"
          >
            <Carousel items={items} />
          </motion.div>
        )}

        {showSalaryForm && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSalarySubmit}
            className="bg-white p-4 sm:p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-md backdrop-blur-sm bg-white/90 mx-4"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 border-b pb-4"
            >
              💰 월급 실력 💰 몇 단인가요? 👀
            </motion.h2>
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="relative"
              >
                <label className="text-sm font-medium text-gray-700 mb-2 block">연령</label>
                <input 
                  type="number"
                  value={age} 
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setAge(value);
                    // 연령대 자동 변환
                    let ageRange = "";
                    if (value >= 20 && value <= 24) ageRange = "20~24세";
                    else if (value >= 25 && value <= 29) ageRange = "25~29세";
                    else if (value >= 30 && value <= 34) ageRange = "30~34세";
                    else if (value >= 35 && value <= 39) ageRange = "35~39세";
                    else if (value >= 40 && value <= 44) ageRange = "40~44세";
                    else if (value >= 45 && value <= 49) ageRange = "45~49세";
                    else if (value >= 50 && value <= 54) ageRange = "50~54세";
                    else if (value >= 55 && value <= 59) ageRange = "55~59세";
                    else if (value >= 60 && value <= 64) ageRange = "60~64세";
                    else if (value >= 65) ageRange = "65세 이상";
                    setAgeForSubmit(ageRange); // 백엔드로 보낼 형식의 값 저장
                  }}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                  required
                  min="20"
                  max="59"
                  placeholder="나이를 입력하세요 (20세 이상)"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="relative"
              >
                <label className="text-sm font-medium text-gray-700 mb-2 block">월 소득 (만원)</label>
                <input 
                  type="number"
                  value={income} 
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setIncome(value);
                    // 소득구간 자동 변환
                    let incomeRange = "";
                    if (value < 85) incomeRange = "85만원 미만";
                    else if (value < 150) incomeRange = "85～150만원 미만";
                    else if (value < 250) incomeRange = "150～250만원 미만";
                    else if (value < 350) incomeRange = "250～350만원 미만";
                    else if (value < 450) incomeRange = "350～450만원 미만";
                    else if (value < 550) incomeRange = "450～550만원 미만";
                    else if (value < 650) incomeRange = "550～650만원 미만";
                    else if (value < 800) incomeRange = "650～800만원 미만";
                    else if (value < 1000) incomeRange = "800～1000만원 미만";
                    else incomeRange = "1000만원 이상";
                    setIncomeForSubmit(incomeRange); // 백엔드로 보낼 형식의 값 저장
                  }}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                  required
                  min="0"
                  placeholder="월 소득을 만원 단위로 입력하세요"
                />
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="flex gap-3 mt-8"
            >
              <button 
                type="submit"
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                확인하기
              </button>
              <button 
                type="button"
                onClick={() => setShowSalaryForm(false)}
                className="flex-1 bg-gray-100 text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                돌아가기
              </button>
            </motion.div>
          </motion.form>
        )}

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 sm:p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-xl backdrop-blur-sm bg-white/90 mx-4"
          >
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 border-b pb-4"
            >
              ✨ 당신의 위치는... 두구두구! ✨
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mb-6 sm:mb-8 text-base sm:text-lg text-gray-700"
            >
              <p className="text-lg sm:text-xl font-medium text-gray-800 mb-4">
                {resultData?.message}
              </p>
              
              <div className="bg-indigo-50 p-4 sm:p-6 rounded-xl">
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-sm sm:text-base"><strong>동년배들의 평균 월급은요~</strong> {resultData?.data?.average}만원이에요! 🎯</p>
                  <p className="text-sm sm:text-base"><strong>중위 소득은?</strong> {resultData?.data?.mean}만원이네요 📊</p>
                  <p className="text-sm sm:text-base"><strong>내 위치는?</strong> {resultData?.data?.position === "상위" ? "와우!" : "힘내요!"} {resultData?.data?.position} {resultData?.data?.percentage}%에 있어요! 
                    {resultData?.data?.position === "상위" ? " 🎉" : " 💪"}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="flex flex-col gap-3 sm:gap-4"
            >
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 sm:p-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-200 hover:scale-[1.05] active:scale-[0.98]"
                >
                  <RiTwitterXFill size={20} className="sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 sm:p-3 bg-[#4267B2] text-white rounded-xl hover:bg-[#365899] transition-all duration-200 hover:scale-[1.05] active:scale-[0.98]"
                >
                  <RiFacebookFill size={20} className="sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="p-2 sm:p-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 hover:scale-[1.05] active:scale-[0.98]"
                >
                  <LinkIcon size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>
              
              <button
                onClick={() => {
                  setShowResult(false)
                  setAge("")
                  setIncome("")
                }}
                className="w-full mt-2 sm:mt-4 bg-gray-100 text-gray-600 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-gray-200 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                처음으로
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  )
}

export default function Demo() {
  return (
    <ToastProvider>
      <FlowersAndSaintsUI />
    </ToastProvider>
  )
}

