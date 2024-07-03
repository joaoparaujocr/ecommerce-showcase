import type { InferGetStaticPropsType } from 'next'
import { getProducts } from '../axios'
import Layout from '../components/Layout'
import Grid from '@mui/material/Grid'
import ListItemProduct from '../components/ListItemProduct'
import Box from '@mui/material/Box'
import useStoreSearch from '../store/storeSearch'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const { search, changeSearch } = useStoreSearch(state => state)
  const router = useRouter()

  useEffect(() => {
    if (router.query.title) {
      changeSearch(router.query.title as string)
    }
  }, [router.query])

  const { data: productsSearch, isLoading } = useQuery({
    queryKey: [QUERY_KEYS, search],
    queryFn: () => getProducts({ params: { title: search } })
  })

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, marginTop: '84px' }}>
        <Grid container spacing={2} justifyContent="center" alignItems={isLoading ? 'center' : 'unset'}>
          {isLoading ? (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          ) : productsSearch?.data.map(product => (
            <ListItemProduct key={product.id} {...product} />
          ))}
        </Grid>
      </Box>
    </Layout>
  )
}
