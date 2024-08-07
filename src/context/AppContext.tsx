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
  currentPage: Page,
  query: string,
  setQuery: (query: string) => void
  setCurrentPage: (currentPage: Page) => void
  handleNavigate: (currentPage: Page, direction: PageDirection) => void
  handleClear: () => void
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
  const [query, setQuery] = useState<string>("")

  const handleNavigate = (currentPage: Page, direction: PageDirection) => {
    const nextPage = pageNavigation(currentPage, direction)
    setCurrentPage(nextPage)
  }

  const handleClear = () => {
    setMatrixSize(2)
    const emptyArray = Array(matrixSize * matrixSize).fill("")
    setInputs(emptyArray)
    setQuery("")

    const url = new URL(window.location.href)
    url.searchParams.delete("inputs")
    window.history.pushState({}, '', url)
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
        query,
        setQuery,
        handleNavigate,
        handleClear,
      }}>
      {children}
    </AppContext.Provider>
  )
}
