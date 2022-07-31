
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
function Donnees(props) {
    
    const [ressource, setRessource] = React.useState("");
    const [prix, setPrix] = React.useState(undefined);

    useEffect(() => {
      
      }, []);



      const handleChangeNumber = (event) => {
          setPrix(event.target.value);
       }

      

      const handleValider = () => {

      var date = new Date();
      var jsonDate = JSON.stringify(date);


      let jsonRessource = {
        "prix" : prix,
        "date" : date,
        "ressource" : props.ressource
      }

      console.log(jsonRessource);

        axios({
          method: 'post',
          url: 'http://localhost:3000/api/itemPrix',
          data: jsonRessource
      })
      .then(function (reponse) {
          console.log("Objet créé");
      })
      .catch(function (erreur) {
          console.log(erreur);
      });
      };



    return (
        <Box sx={{width:"100%", height:"100%", border:"1px solid black", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <Box sx={{height:"500px", width:"300px", marginLeft:"30px", backgroundColor:"white", border:"1px solid black", borderRadius:"15px"}}>

            </Box>

            <Box sx={{height:"400px", width:"800px", backgroundColor:"white", border:"1px solid black", borderRadius:"15px"}}>
            <Box sx={{marginTop:"20px", height:"100px", textAlign:"center"}}>
            <TextField
                id="outlined-number"
                label="Number"
                type="number"
                onChange={handleChangeNumber}
                InputLabelProps={{
                shrink: true,
          }}/>
          <Button sx={{marginTop:"10px", marginLeft:"10px"}} variant="contained" onClick={handleValider}>Valider</Button>
            </Box>
            
            </Box>
            
            <Box sx={{height:"200px", width:"300px", marginRight:"30px", backgroundColor:"white", border:"1px solid black", borderRadius:"15px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <img referrerPolicy="no-referrer" src={props.ressource.imageUrl} width="100px" height="100px" />
            </Box>
        </Box>
    );
  }
  
  export default Donnees;
  