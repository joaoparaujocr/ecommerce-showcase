import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Drawer from '@mui/material/Drawer'
import { Button, Divider, List, Stack } from '@mui/material'
import { formatNumberToReal } from '../../../lib/formatNumberToReal'
import ListItemCart from './ListItemCart'
import useStoreCart, { Item } from '../../../store/storeCart'

interface DrawerCartProps {
  open: boolean
  onClose: () => void
  items: Item[]
}

const DrawerCart = ({ items, onClose, open }: DrawerCartProps) => {
  const { cleanCart } = useStoreCart(state => state)

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { justifyContent: 'space-between' }
      }}
    >
      <Box sx={{ width: 350, padding: '16px 24px' }} flexDirection="column" justifyContent="space-between">
        <Stack>
          <Typography component="h2" sx={{ fontSize: '2rem', textAlign: 'center' }}>
            Meu carrinho
          </Typography>

          <Stack>
            {items.length > 0 ? (
              <List>
                {items.map(item => <ListItemCart {...item} />)}
              </List>
            ) :
              <Typography textAlign="center">Seu carrinho está vazio</Typography>
            }
          </Stack>
        </Stack>
      </Box>
      {items.length > 0 && (
        <Stack paddingX={2} paddingBottom={4}>
          <Divider />
          <Stack flexDirection='row' justifyContent="space-between" alignItems="center" paddingY={2}>
            <Typography>Total:</Typography>
            <Typography>{formatNumberToReal(items.reduce((prev, current) => {
              return current.totalPrice + prev;
            }, 0))}</Typography>
          </Stack>
          <Button variant='contained' onClick={cleanCart}>
            Esvaziar Carrinho
          </Button>
        </Stack>
      )}
    </Drawer>
  )
}

export default DrawerCart