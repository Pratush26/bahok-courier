"use client"
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'

export default function ThemeToggle() {
const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null;

  return (
    <div>
      <button onClick={() => setTheme(theme==="dark"? "light":"dark")} className='flex items-center justify-center'>
        {theme==="dark" ?
        <Image src={"/sun.svg"} height={20} width={20} alt='theme indicator'/>
        :
        <Image src={"/moon.svg"} height={20} width={20} alt='theme indicator'/>}
      </button>
    </div>
  )
}
