import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GameBoard } from '@/components/GameBoard'
import { NextPiece } from '@/components/NextPiece'
import { createEmptyBoard, getRandomTetromino } from '@/lib/tetris'

describe('GameBoard Component', () => {
  it('should render canvas with correct dimensions', () => {
    const board = createEmptyBoard()
    const currentPiece = getRandomTetromino()

    render(<GameBoard board={board} currentPiece={currentPiece} gameOver={false} />)

    const canvas = document.querySelector('canvas') as HTMLCanvasElement
    expect(canvas).toBeInTheDocument()
    expect(canvas.width).toBe(10 * 30) // BOARD_WIDTH * CELL_SIZE
    expect(canvas.height).toBe(20 * 30) // BOARD_HEIGHT * CELL_SIZE
  })

  it('should render game over overlay when gameOver is true', () => {
    const board = createEmptyBoard()

    render(<GameBoard board={board} currentPiece={null} gameOver={true} />)

    const canvas = document.querySelector('canvas') as HTMLCanvasElement
    expect(canvas).toBeInTheDocument()
    // Note: Testing canvas content would require more complex setup
  })
})

describe('NextPiece Component', () => {
  it('should render next piece canvas', () => {
    const nextPiece = getRandomTetromino()

    render(<NextPiece nextPiece={nextPiece} />)

    expect(screen.getByText('NEXT')).toBeInTheDocument()
    const canvas = document.querySelector('canvas') as HTMLCanvasElement
    expect(canvas).toBeInTheDocument()
    expect(canvas.width).toBe(4 * 30) // 4 * CELL_SIZE
    expect(canvas.height).toBe(4 * 30)
  })

  it('should handle null nextPiece', () => {
    render(<NextPiece nextPiece={null} />)

    expect(screen.getByText('NEXT')).toBeInTheDocument()
    const canvas = document.querySelector('canvas') as HTMLCanvasElement
    expect(canvas).toBeInTheDocument()
  })
})