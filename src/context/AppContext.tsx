import React, { createContext, useContext, useState, ReactNode } from "react"
import { Page, PageDirection } from "../utils/types"
import pageNavigation from "../utils/pageNavigation"

interface AppContextType {
  matrixSize: number
  setMatrixSize: (matrixSize: number) => void
  inputs: string[]
  setInputs: (inputs: string[]) => void
  display: string | null
  setDisplay: (display: string | null) => void
  currentPage: Page
  setCurrentPage: (currentPage: Page) => void
  handleNavigate: (currentPage: Page, direction: PageDirection) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [matrixSize, setMatrixSize] = useState<number>(2)
  const [inputs, setInputs] = useState<string[]>([])
  const [display, setDisplay] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<Page>("Home")

  const handleNavigate = (currentPage: Page, direction: PageDirection) => {
    const nextPage = pageNavigation(currentPage, direction)
    setCurrentPage(nextPage)
  }

  return (
    <AppContext.Provider
      value={{
        matrixSize,
        setMatrixSize,
        inputs,
        setInputs,
        display,
        setDisplay,
        currentPage,
        setCurrentPage,
        handleNavigate,
      }}>
      {children}
    </AppContext.Provider>
  )
}
