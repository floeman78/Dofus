
import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from "@mui/system";
import axios from 'axios';
import Ajouter from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

function Body() {

    const [ressource, setRessource] = React.useState(undefined);
    const [isLoadRessources, setIsLoadRessources] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [urlDialog, setUrlDialog] = React.useState(undefined);
    const [nomDialog, setNomDialog] = React.useState(undefined);
    const [ressources, setRessources] = React.useState(undefined);


    useEffect(() => {
      axios.get(`http://localhost:3000/api/item`).then(function (reponse) {
        console.log("Je peux load");
        setRessources(reponse.data);
        console.log(ressources + "")
        setIsLoadRessources(true);
    });
    }, []);


      const handleChangeRessource = (event) => {
        setRessource(event.target.value);
      };

      const handleChangeNom = (event) => {
        setNomDialog(event.target.value);
      };

      const handleChangeUrl = (event) => {
        setUrlDialog(event.target.value);
      };


      

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleAjouter = () => {

        if (nomDialog && urlDialog){
          let jsonRessource = {
            "nom" : nomDialog,
            "imageUrl" : urlDialog
          }

          axios({
            method: 'post',
            url: 'http://localhost:3000/api/item',
            data: jsonRessource
        })
        .then(function (reponse) {
            console.log("Objet créé");
        })
        .catch(function (erreur) {
            console.log(erreur);
        });

      
        }

        
        setOpen(false);
      };

    return (
        <Box >
          {isLoadRessources? 
            <Box sx={{display:"flex",justifyContent:"center"}}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={ressource}
                onChange={handleChangeRessource}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {ressources?.forEach((r) => {
                  <MenuItem value={r.id}>Test</MenuItem>
                })}
              </Select>
            </FormControl>
                <Ajouter onClick={handleClickOpen} fontSize="large" sx={{marginTop:"50px"}}/>
            </Box>
          : "" }





            <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nouvelle ressource</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Création d'une ressource
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id=""
            label="Nom"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangeNom}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Image url"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangeUrl}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleAjouter}>Ajouter</Button>
        </DialogActions>
      </Dialog>
        </Box>
    );
  }
  
  export default Body;
  