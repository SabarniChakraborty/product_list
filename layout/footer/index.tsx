import { Box, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import React from 'react'
import Link from 'next/link';


var footerLinks = [
    {
      id: 1,
      title: "Home",
      link: "/home"
    },
    {
      id: 2,
      title: "About",
      link: "/about"
    },
    {
      id: 3,
      title: "Products",
      link: "/productlist"
    },
    {
      id: 4,
      title: "Create",
      link: "/create"
    }
  ]
const Footer : React.FC = () => {
  return (
    <>
    <Box
      component="footer"
      // position={'static'}
      sx={{
        background: 'linear-gradient(to right, #333, #333)',
        color: 'white',
        paddingTop: 2,
        paddingBottom: 2,
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={4} alignItems="center" justifyContent="space-between">
          
          <Grid item xs={12} md={3} justifyContent="center" className='footer-links'>
            {footerLinks.map((link) => (
              <Link key={link.id} href={link.link} color="inherit" style={{ marginRight: 3,textDecoration: 'none' }}>
                {link.title}
              </Link>
            ))}
          </Grid>

         
          <Grid item>
            <IconButton href="https://facebook.com" target="_blank" color="inherit" sx={{ '&:hover': { color: '#1877f2' } }}>
              <Facebook />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" color="inherit" sx={{ '&:hover': { color: '#1da1f2' } }}>
              <Twitter />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" color="inherit" sx={{ '&:hover': { color: '#e1306c' } }}>
              <Instagram />
            </IconButton>
            <IconButton href="https://linkedin.com" target="_blank" color="inherit" sx={{ '&:hover': { color: '#0077b5' } }}>
              <LinkedIn />
            </IconButton>
          </Grid>

        
          <Grid item>
            <Link href="/terms" color="inherit">
              Terms & Conditions
            </Link>
          </Grid>
        </Grid>

        
        <Toolbar sx={{ justifyContent: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: 2 }}>
          <Typography variant="body2" color="inherit">
            © 2024 Your Company. All rights reserved.
          </Typography>
        </Toolbar>
      </Container>
    </Box>
    </>
  )
}

export default Footer