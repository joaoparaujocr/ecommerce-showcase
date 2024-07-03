import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchInput from '../SearchInput';
import Badge from '@mui/material/Badge';
import useStoreCart, { Item } from '../../store/storeCart';
import Drawer from '@mui/material/Drawer';
import Image from "next/image";
import { Button, Divider, List, ListItem, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from 'react';
import { formatNumberToReal } from '../../lib/formatNumberToReal';

const ListItemCart = ({ image, title, amount, id}: Item) => {
  const { addOneMoreUnit, removeOneUnit, removeItem } = useStoreCart(state => state)

  return (
    <ListItem alignItems="center" sx={{ justifyContent: 'space-between' }}>
      <Stack flexDirection="row" gap={2} justifyContent="start" width="100%">
        <Stack padding="unset">
          <Image alt={title} style={{ borderRadius: '8px' }} src={image} width={80} height={80}/>
        </Stack>
        <Stack justifyContent="space-between" alignItems="start">
          <Typography sx={{ textOverflow: 'ellipsis', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden',  display: '-webkit-box', }}>{title}</Typography>
          <Stack flexDirection='row' alignItems="center" justifyContent="start" gap={1}>
            <IconButton size='small' onClick={() => removeOneUnit(id)}>
              <RemoveIcon fontSize='inherit'/>
            </IconButton>
            {amount}
            <IconButton size='small' onClick={() => addOneMoreUnit(id)}>
              <AddIcon fontSize='inherit' />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
      <IconButton disableRipple onClick={() => removeItem(id)}>
        <DeleteOutlineIcon />
      </IconButton>
    </ListItem>
  )
}

export default function DrawerAppBar() {
  const { items, cleanCart } = useStoreCart(state => state)
  const [openCart, setOpenCart] = useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const closeDrawer = () => {
    setOpenCart(false)
  }

  const openDrawer = () => {
    setOpenCart(true)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <SearchInput />
            <IconButton color="primary" onClick={openDrawer}>
              <Badge badgeContent={items.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='right'
        open={openCart}
        onClose={closeDrawer}
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
           <Stack  paddingX={2} paddingBottom={4}>
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
    </Box>
  );
}
