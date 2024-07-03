import ListItem from "@mui/material/ListItem"
import useStoreCart, { Item } from "../../../store/storeCart"
import Stack from "@mui/material/Stack"
import Image from 'next/image'
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { formatNumberToReal } from "../../../lib/formatNumberToReal"

const ListItemCart = ({ image, title, amount, id, price }: Item) => {
  const { addOneMoreUnit, removeOneUnit, removeItem } = useStoreCart(state => state)

  return (
    <ListItem alignItems="center" sx={{ justifyContent: 'space-between' }}>
      <Stack flexDirection="row" gap={2} justifyContent="start" width="100%">
        <Stack padding="unset">
          <Image alt={title} style={{ borderRadius: '8px' }} src={image} width={80} height={80} />
        </Stack>
        <Stack justifyContent="space-between" alignItems="start">
          <Typography sx={{ textOverflow: 'ellipsis', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', display: '-webkit-box', }}>{title}</Typography>
          <Typography fontSize={14}>{formatNumberToReal(price)}</Typography>
          <Stack flexDirection='row' alignItems="center" justifyContent="start" gap={1}>
            <IconButton size='small' onClick={() => removeOneUnit(id)}>
              <RemoveIcon fontSize='inherit' />
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

export default ListItemCart