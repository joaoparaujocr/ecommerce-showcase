import type { InferGetStaticPropsType } from 'next'
import { getProducts } from '../axios'
import Layout from '../components/Layout'
import Grid from '@mui/material/Grid'
import ListItemProduct from '../components/ListItemProduct'
import Box from '@mui/material/Box'
import useStoreSearch from '../store/storeSearch'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants'

export async function getStaticProps() {
  const { data } = await getProducts();

  return { props: { products: data } }
}

export default function Home({ products }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { search } = useStoreSearch(state => state)

  const { data: productsSearch } = useQuery({
    queryKey: [QUERY_KEYS, search],
    queryFn: () => getProducts({ params: { title: search } }),
    enabled: !!search
  })

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, marginTop: '84px' }}>
        <Grid container spacing={2} justifyContent="center">
          {productsSearch?.data && !!search ? productsSearch?.data.map(product => (
            <ListItemProduct key={product.id} {...product} />
          )) : products.map(product => (
            <ListItemProduct key={product.id} {...product} />
          ))}
        </Grid>
      </Box>
    </Layout>
  )
}
