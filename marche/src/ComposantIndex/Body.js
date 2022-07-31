
import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
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
import Donnees from './Donnees';

function Body() {

    const [ressourceId, setRessourceId] = React.useState("");
    const [ressource, setRessource] = React.useState("");
    const [isLoadRessources, setIsLoadRessources] = React.useState(false);
    const [isLoadRessource, setIsLoadRessource] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [urlDialog, setUrlDialog] = React.useState(undefined);
    const [nomDialog, setNomDialog] = React.useState(undefined);
    const [ressources, setRessources] = React.useState(undefined);
    const [test, setTest] = React.useState(undefined);



    useEffect(() => {
      
      var date = new Date();
      var json = JSON.stringify(date);
      console.log(json);  // "2014-01-01T23:28:56.782Z"
      console.log(isLoadRessource);
      axios.get(`http://localhost:3000/api/item`).then(function (reponse) {
        console.log(reponse.data);
        setRessources(reponse.data);
        setIsLoadRessources(true);
    });


    }, []);

    useEffect(() => {
  
      axios.get(`http://localhost:3000/api/item/`+ ressourceId,{
        params : {
          _id: ressourceId
        }
      }
        
      ).then(function (reponse) {
        setRessource(reponse.data);
        setTest(reponse.data)
        setIsLoadRessource(true);
    });
    }, [ressourceId]);





      const handleChangeRessourceId = (event) => {
        console.log(event.target.value);
        setRessourceId(event.target.value);
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
            <Box sx={{display:"flex",justifyContent:"center", color:"black"}}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={ressourceId}
                onChange={handleChangeRessourceId}
              >
                {ressources?.map((r) => {return(
                  <MenuItem key={r._id} sx={{color:"black", fontWeight:"bolder"}} value={r._id}>{r.nom}</MenuItem>
                )
                })}
              </Select>
            </FormControl>
                <Ajouter onClick={handleClickOpen} fontSize="large" sx={{marginTop:"50px"}}/>
            </Box>
          : ""}
          {isLoadRessource? 
          <Box sx={{width:"95%", margin:"auto", height:"600px"}}>
            <Donnees ressource={ressource}/>
          </Box>
          : ""
          }
          

          
          
            
            
             




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
  