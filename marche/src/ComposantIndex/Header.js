import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import logo from '../Images/logo.png';
import logoIop from '../Images/iopLogo.png'

function Header() {
    return (
        <Box sx={{
            width:"100%",
            height:"100%",  
            alignItems:"center", 
            backgroundColor:"rgb(124,124,124)",
            display:"flex",
            justifyContent:"space-between"}}>
            <Box sx={{marginLeft:"40px"}}>
            <img src={logo} width="80px" alt=''/>
            </Box>
                
            <Typography variant="h3" sx={{fontWeight:"bold", color:"white"}}>Ressources Dofus</Typography>
            <Box sx={{marginRight:"40px"}}>
                <img src={logoIop} width="80px" alt=''/>
            </Box>
            
        </Box>
    );
  }
  
  export default Header;
  