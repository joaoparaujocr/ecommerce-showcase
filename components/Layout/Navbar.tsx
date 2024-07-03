import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchInput from '../SearchInput';
import Badge from '@mui/material/Badge';
import useStoreCart from '../../store/storeCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import useStoreSearch from '../../store/storeSearch';
import DrawerCart from './DrawerCart';

export default function DrawerAppBar() {
  const { items } = useStoreCart(state => state)
  const { changeSearch } = useStoreSearch(state => state)
  const [openCart, setOpenCart] = useState(false)

  const setSearch = (value: string) => {
    changeSearch(value)
  }

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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            MUI
          </Typography>
          <Box sx={{ display: 'flex', gap: '10px', marginLeft: '10px' }}>
            <SearchInput value={setSearch} />
            <IconButton color="primary" onClick={openDrawer}>
              <Badge badgeContent={items.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <DrawerCart items={items} onClose={closeDrawer} open={openCart} />
    </Box>
  );
}
