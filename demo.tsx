"use client"
import { useState } from "react"
import { ToastProvider, useToast } from "./toast-context"
import { ToastContainer } from "./animated-toast"
import { Carousel } from "./carousel"
import { DollarSign, Ruler } from "lucide-react"

const FlowersAndSaintsUI = () => {
  const { addToast } = useToast()
  const [showSalaryForm, setShowSalaryForm] = useState(false)
  const [showHeightForm, setShowHeightForm] = useState(false)
  const [age, setAge] = useState("")
  const [income, setIncome] = useState("")
  const [gender, setGender] = useState("")
  const [height, setHeight] = useState("")

  const items = [
    {
      Icon: DollarSign,
      title: "연봉 통계",
      description: "당신의 연봉 수준은?",
      action: () => {
        setShowSalaryForm(true)
        setShowHeightForm(false)
      },
    },
    {
      Icon: Ruler,
      title: "키 통계",
      description: "당신의 키는 어느 정도?",
      action: () => {
        setShowHeightForm(true)
        setShowSalaryForm(false)
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
        body: JSON.stringify({ age, income }),
      })
      const data = await response.json()
      addToast(data.message, "info")
    } catch (error) {
      addToast("서버 통신 에러가 발생했습니다.", "error")
    }
  }

  const handleHeightSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // 키 관련 API 구현 예정
    addToast("키 통계 기능은 준비 중입니다.", "info")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-pink-100 p-8">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8 font-figtree">My Position</h1>
      
      {!showSalaryForm && !showHeightForm && <Carousel items={items} />}

      {showSalaryForm && (
        <form onSubmit={handleSalarySubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">연봉 통계 확인</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">연령대</label>
            <select 
              value={age} 
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">선택하세요</option>
              <option value="20~29세">20~29세</option>
              <option value="30~39세">30~39세</option>
              <option value="40~49세">40~49세</option>
              <option value="50~59세">50~59세</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">소득구간</label>
            <select 
              value={income} 
              onChange={(e) => setIncome(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">선택하세요</option>
              <option value="85만원 미만">85만원 미만</option>
              <option value="85～150만원 미만">85~150만원 미만</option>
              <option value="150～250만원 미만">150~250만원 미만</option>
              <option value="250～350만원 미만">250~350만원 미만</option>
              <option value="350～450만원 미만">350~450만원 미만</option>
              <option value="450～550만원 미만">450~550만원 미만</option>
              <option value="550～650만원 미만">550~650만원 미만</option>
              <option value="650～800만원 미만">650~800만원 미만</option>
              <option value="800～1000만원 미만">800~1000만원 미만</option>
              <option value="1000만원 이상">1000만원 이상</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button 
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              확인하기
            </button>
            <button 
              type="button"
              onClick={() => setShowSalaryForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              돌아가기
            </button>
          </div>
        </form>
      )}

      {showHeightForm && (
        <form onSubmit={handleHeightSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">키 통계 확인</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">성별</label>
            <select 
              value={gender} 
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">선택하세요</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">키 (cm)</label>
            <input 
              type="number" 
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-2 border rounded"
              required
              min="100"
              max="250"
            />
          </div>
          <div className="flex gap-2">
            <button 
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              확인하기
            </button>
            <button 
              type="button"
              onClick={() => setShowHeightForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              돌아가기
            </button>
          </div>
        </form>
      )}

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

