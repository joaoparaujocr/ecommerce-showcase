import { Product } from "../interfaces/Product";
import Image from "next/image";
import ImageDefault from '../public/default.png';
import { isValidUrl } from "../lib/isValidURL";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { formatNumberToReal } from "../lib/formatNumberToReal";
import useStoreCart from "../store/storeCart";

export default function ListItemProduct({ title, price, description, images, id }: Product) {
  const image = images[0];
  const validImage = isValidUrl(image) ? image : ImageDefault
  const { addItemToCart } = useStoreCart(state => state)

  return (
    <Grid container item sx={{ width: 'unset' }} flexDirection="column">
      <Stack maxWidth={240} gap={1}>
        <Stack padding="unset" position="relative">
          <Image alt={description} style={{ borderRadius: '8px' }} src={validImage} width={240} height={240}/>
          <Fab size="small" sx={{ position: 'absolute', right: -4, bottom: -10 }} onClick={() => addItemToCart({ id, price, image, title })}>
            <AddShoppingCartIcon />
          </Fab>
        </Stack>
        <Stack>
          <Box>
            <Typography>{formatNumberToReal(price)}</Typography>
            <Typography>{title}</Typography>
          </Box>
        </Stack>
      </Stack>
    </Grid>
  )
}