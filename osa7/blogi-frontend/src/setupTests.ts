import '@testing-library/jest-dom/extend-expect'

let savedItems: { [name: string]: string } = {}

const localStorageMock = {
  setItem: (key: string, item: string): void => {
    savedItems[key] = item
  },
  getItem: (key: string): string => savedItems[key],
  clear: (): void => { savedItems = {} }
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })
