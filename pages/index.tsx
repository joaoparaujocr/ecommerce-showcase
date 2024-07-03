import type { InferGetStaticPropsType } from 'next'
import axios from '../axios'
import Layout from '../components/Layout'
import { Product } from '../interfaces/Product'
import Grid from '@mui/material/Grid';
import ListItemProduct from '../components/ListItemProduct'
import Box from '@mui/material/Box';

export async function getStaticProps() {
  const { data } = await axios.get<Product[]>('/products');

  return { props: { products: data } }
}

export default function Home({ products}: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, marginTop: '84px' }}>
        <Grid container spacing={2} justifyContent="center">
          {products.map(product => (
            <ListItemProduct key={product.id} {...product} />
          ))}
        </Grid>
      </Box>
    </Layout>
  )
}
