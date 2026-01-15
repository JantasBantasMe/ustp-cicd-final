import { describe, it, expect, vi } from 'vitest'
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  createEmptyBoard,
  getRandomTetromino,
  rotateTetromino,
  checkCollision,
  mergeTetromino,
  clearLines,
  calculateScore,
  calculateLevel,
  getDropSpeed,
  Tetromino,
  TETROMINOES
} from '@/lib/tetris'

// Mock Math.random for predictable tests
const mockMath = Object.create(global.Math)
mockMath.random = vi.fn(() => 0.5)
global.Math = mockMath

describe('Tetris Logic', () => {
  describe('createEmptyBoard', () => {
    it('should create a board with correct dimensions', () => {
      const board = createEmptyBoard()
      expect(board).toHaveLength(BOARD_HEIGHT)
      expect(board[0]).toHaveLength(BOARD_WIDTH)
    })

    it('should create empty cells', () => {
      const board = createEmptyBoard()
      board.forEach(row => {
        row.forEach(cell => {
          expect(cell.filled).toBe(false)
          expect(cell.color).toBe('')
        })
      })
    })
  })

  describe('getRandomTetromino', () => {
    it('should return a valid tetromino', () => {
      const tetromino = getRandomTetromino()
      expect(TETROMINOES[tetromino.type]).toBeDefined()
      expect(tetromino.shape).toEqual(TETROMINOES[tetromino.type].shape.map(row => [...row]))
      expect(tetromino.color).toBe(TETROMINOES[tetromino.type].color)
      expect(tetromino.position).toEqual({
        x: Math.floor(BOARD_WIDTH / 2) - Math.floor(tetromino.shape[0].length / 2),
        y: 0
      })
    })
  })

  describe('rotateTetromino', () => {
    it('should rotate I piece correctly', () => {
      const tetromino: Tetromino = {
        type: 'I',
        shape: TETROMINOES.I.shape,
        color: TETROMINOES.I.color,
        position: { x: 0, y: 0 }
      }
      const rotated = rotateTetromino(tetromino)
      expect(rotated).toEqual([
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
      ])
    })

    it('should rotate O piece (no change)', () => {
      const tetromino: Tetromino = {
        type: 'O',
        shape: TETROMINOES.O.shape,
        color: TETROMINOES.O.color,
        position: { x: 0, y: 0 }
      }
      const rotated = rotateTetromino(tetromino)
      expect(rotated).toEqual(TETROMINOES.O.shape)
    })
  })

  describe('checkCollision', () => {
    it('should detect wall collision', () => {
      const board = createEmptyBoard()
      const tetromino: Tetromino = {
        type: 'I',
        shape: TETROMINOES.I.shape,
        color: TETROMINOES.I.color,
        position: { x: -1, y: 0 }
      }
      expect(checkCollision(board, tetromino)).toBe(true)
    })

    it('should detect floor collision', () => {
      const board = createEmptyBoard()
      const tetromino: Tetromino = {
        type: 'I',
        shape: TETROMINOES.I.shape,
        color: TETROMINOES.I.color,
        position: { x: 0, y: BOARD_HEIGHT }
      }
      expect(checkCollision(board, tetromino)).toBe(true)
    })

    it('should detect piece collision', () => {
      const board = createEmptyBoard()
      board[1][0] = { filled: true, color: 'red' } // Fill where I piece would be
      const tetromino: Tetromino = {
        type: 'I',
        shape: TETROMINOES.I.shape,
        color: TETROMINOES.I.color,
        position: { x: 0, y: 0 }
      }
      expect(checkCollision(board, tetromino)).toBe(true)
    })

    it('should not detect collision when clear', () => {
      const board = createEmptyBoard()
      const tetromino: Tetromino = {
        type: 'I',
        shape: TETROMINOES.I.shape,
        color: TETROMINOES.I.color,
        position: { x: 3, y: 0 }
      }
      expect(checkCollision(board, tetromino)).toBe(false)
    })
  })

  describe('mergeTetromino', () => {
    it('should merge tetromino into board', () => {
      const board = createEmptyBoard()
      const tetromino: Tetromino = {
        type: 'O',
        shape: TETROMINOES.O.shape,
        color: TETROMINOES.O.color,
        position: { x: 0, y: 0 }
      }
      const newBoard = mergeTetromino(board, tetromino)
      expect(newBoard[0][0]).toEqual({ filled: true, color: tetromino.color })
      expect(newBoard[0][1]).toEqual({ filled: true, color: tetromino.color })
      expect(newBoard[1][0]).toEqual({ filled: true, color: tetromino.color })
      expect(newBoard[1][1]).toEqual({ filled: true, color: tetromino.color })
    })
  })

  describe('clearLines', () => {
    it('should clear full lines', () => {
      const board = createEmptyBoard()
      // Fill bottom row
      for (let x = 0; x < BOARD_WIDTH; x++) {
        board[BOARD_HEIGHT - 1][x] = { filled: true, color: 'red' }
      }
      const { newBoard, linesCleared } = clearLines(board)
      expect(linesCleared).toBe(1)
      expect(newBoard.length).toBe(BOARD_HEIGHT)
      // Bottom row should be empty now
      newBoard[BOARD_HEIGHT - 1].forEach(cell => {
        expect(cell.filled).toBe(false)
      })
    })

    it('should not clear partial lines', () => {
      const board = createEmptyBoard()
      // Fill most of bottom row
      for (let x = 0; x < BOARD_WIDTH - 1; x++) {
        board[BOARD_HEIGHT - 1][x] = { filled: true, color: 'red' }
      }
      const { linesCleared } = clearLines(board)
      expect(linesCleared).toBe(0)
    })
  })

  describe('calculateScore', () => {
    it('should calculate score correctly', () => {
      expect(calculateScore(1, 1)).toBe(100)
      expect(calculateScore(2, 1)).toBe(300)
      expect(calculateScore(3, 1)).toBe(500)
      expect(calculateScore(4, 1)).toBe(800)
      expect(calculateScore(1, 2)).toBe(200)
    })
  })

  describe('calculateLevel', () => {
    it('should calculate level correctly', () => {
      expect(calculateLevel(0)).toBe(1)
      expect(calculateLevel(9)).toBe(1)
      expect(calculateLevel(10)).toBe(2)
      expect(calculateLevel(19)).toBe(2)
      expect(calculateLevel(20)).toBe(3)
    })
  })

  describe('getDropSpeed', () => {
    it('should calculate drop speed correctly', () => {
      expect(getDropSpeed(1)).toBe(1000)
      expect(getDropSpeed(2)).toBe(900)
      expect(getDropSpeed(10)).toBe(100)
      expect(getDropSpeed(11)).toBe(100)
    })
  })
})