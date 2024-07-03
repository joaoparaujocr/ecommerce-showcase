import { create } from 'zustand'
import { Product } from '../interfaces/Product'

export type Item = Pick<Product, 'id' | 'price' | 'title'> & { amount: number, totalPrice: number, image: string }

type CartState = {
  items: Item[]
}

type CartActions = {
  addItemToCart: (item: Omit<Item, 'amount' | 'totalPrice'>) => void
  addOneMoreUnit: (id: number) => void
  removeOneUnit: (id: number) => void
  removeItem: (id: number) => void
  cleanCart: () => void
}

export type CartStore = CartState & CartActions

const useStoreCart = create<CartStore>((set) => ({
  items: [],
  addItemToCart: (addItem: Omit<Item, 'amount' | 'totalPrice'>) => {
    set((state) => {
      const previousItems = state.items
      const searchItemIndex = previousItems.findIndex((item) => item.id === addItem.id)

      if (searchItemIndex >= 0) {
        const oldItem = previousItems[searchItemIndex];
        const amountItems = oldItem.amount + 1
        const newItem: Item = { ...oldItem, amount: amountItems, totalPrice: oldItem.price * (amountItems) }

        previousItems.splice(searchItemIndex, 1, newItem)

        return { ...state, items: previousItems }
      }

      return { ...state, items: [...previousItems, { ...addItem, amount: 1, totalPrice: addItem.price }] }
    })
  },
  addOneMoreUnit: (id: number) => {
    set((state) => {
      const previousItems = state.items
      const searchItemIndex = previousItems.findIndex((item) => item.id === id)

      const oldItem = previousItems[searchItemIndex];
      const amountItems = oldItem.amount + 1
      const newItem: Item = { ...oldItem, amount: amountItems, totalPrice: oldItem.price * (amountItems) }

      previousItems.splice(searchItemIndex, 1, newItem)

      return { ...state, items: previousItems }
    })
  },
  removeOneUnit: (id: number) => {
    set((state) => {
      const previousItems = state.items
      const searchItemIndex = previousItems.findIndex((item) => item.id === id)

      const oldItem = previousItems[searchItemIndex];
      const amountItems = oldItem.amount - 1

      if (amountItems <= 0) {
        previousItems.splice(searchItemIndex, 1)
        return { ...state, items: previousItems }
      }

      const newItem: Item = { ...oldItem, amount: amountItems, totalPrice: oldItem.price * (amountItems) }
      previousItems.splice(searchItemIndex, 1, newItem)

      return { ...state, items: previousItems }
    })
  },
  removeItem: (id: number) => {
    set((state) => {
      const newItems = state.items.filter(item => item.id !== id)

      return { ...state, items: newItems }
    })
  },
  cleanCart: () => set((state) => ({ ...state, items: [] }))

}));

export default useStoreCart;