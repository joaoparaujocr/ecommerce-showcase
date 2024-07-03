import { create } from 'zustand'
import { Product } from '../interfaces/Product'
import { StaticImageData } from 'next/dist/shared/lib/get-img-props'

export type Item = Pick<Product, 'id' | 'price' | 'title'> & { amount: number, totalPrice: number, image: string | StaticImageData }

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
      const alreadyExists = previousItems.find((item) => item.id === addItem.id)

      if (alreadyExists) {
        const amountItems = alreadyExists.amount + 1
        const newItems = previousItems.map(item => {
          if (item.id === addItem.id) {
            return { ...item, amount: amountItems, totalPrice: alreadyExists.price * amountItems }
          }
          return item;
        })

        return { ...state, items: newItems }
      }

      return { ...state, items: [...previousItems, { ...addItem, amount: 1, totalPrice: addItem.price }] }
    })
  },
  addOneMoreUnit: (id: number) => {
    set((state) => {
      const previousItems = state.items
      const searchItem = previousItems.find((item) => item.id === id)

      if (searchItem) {
        const amountItems = searchItem.amount + 1
        const newItems = previousItems.map(item => {
          if (item.id === id) {
            return { ...item, amount: amountItems }
          }

          return item
        })

        return { ...state, items: newItems }
      }

      return { ...state }
    })
  },
  removeOneUnit: (id: number) => {
    set((state) => {
      const previousItems = state.items
      const searchItem = previousItems.find((item) => item.id === id)

      if (searchItem) {
        const amountItems = searchItem.amount - 1

        if (amountItems <= 0) {
          const newItems = previousItems.filter(item => item.id !== id)

          return { ...state, items: newItems }
        }

        const newItems = previousItems.map(item => {
          if (item.id === id) {
            return { ...item, amount: amountItems }
          }

          return item
        })

        return { ...state, items: newItems }
      }

      return { ...state }
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