import { Stack, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Stack sx={{ backgroundColor: '#343434', width: '100%', color: 'white', padding: '20px 10px', marginTop: '20px' }} component="footer">
      <Typography textAlign="center">Todos os direitos reservados</Typography>
    </Stack>
  )
}