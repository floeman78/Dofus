import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { outlinedInputClasses, Typography } from '@mui/material';
import Graph from './Graph';
function Donnees(props) {
    
    const [prix, setPrix] = React.useState(undefined);
    const [donneesRessource, setDonneesRessource] = React.useState([]);
    const [isloadDonnee, setIsloadDonnee] = React.useState([false]);
    const [date, setDate] = React.useState(undefined);
    const [prixMax, setPrixMax] = React.useState(undefined);
    const [prixMin, setPrixMin] = React.useState(undefined);
    const [prixMoyen, setPrixMoyen] = React.useState(undefined);
    const [open, setOpen] = React.useState(false);
    
    useEffect(() => {
      if (donneesRessource[0]){
        
        let dateT = donneesRessource[donneesRessource.length-1].date.substring(0,10);
        setDate(dateT);

        let tableauPremierMin = donneesRessource.sort(function (a, b) {
          if(a.prix > b.prix) return 1;
          if(a.prix < b.prix) return -1;
        })
        setPrixMin(tableauPremierMin[0].prix);

        let tableauPremierMax = donneesRessource.sort(function (a, b) {
          if(a.prix > b.prix) return -1;
          if(a.prix < b.prix) return 1;
        })

        setPrixMax(tableauPremierMax[0].prix);
        
        let prixM = 0;
        let cpt = 0;
        donneesRessource.forEach((r) => {
          prixM += r.prix;
          cpt ++;
        })

        setPrixMoyen(prixM/cpt);


      
      }
    }, [donneesRessource]);
    
    
    
    useEffect(() => {

      if(props.ressource._id){
      axios.get(`http://localhost:3000/api/itemPrix/`+ props.ressource._id,{
        params : {
          _id: props.ressource._id
        }
      }
      ).then(function (reponse) {
        setDonneesRessource(reponse.data);
        setIsloadDonnee(true);
        
    });}
      }, [props.ressource._id]);

      




      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleChangeNumber = (event) => {
          setPrix(event.target.value);
       }

      

      const handleValider = () => {

      var date = new Date();


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

          axios.get(`http://localhost:3000/api/itemPrix/`+ props.ressource._id,{
        params : {
          _id: props.ressource._id
        }
      }
      ).then(function (reponse) {
        setDonneesRessource(reponse.data);
        setOpen(false);
    });
      })
      .catch(function (erreur) {
          console.log(erreur);
      });



      

      };

    
     

    return (
      <Box>
      {isloadDonnee ? 
        <Box sx={{width:"100%", height:"100%", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <Box sx={{height:"500px", width:"300px", marginLeft:"30px", backgroundColor:"white", borderRadius:"15px", fontWeight:"bold"}}>
                <Typography sx={{textAlign:"center", marginTop:"10px", fontWeight:"bold"}} variant='h5'>{props.ressource.nom}</Typography>
                <Box sx={{border:"1px solid black", width:"90%", margin:"auto", textAlign:"center", marginTop:"10px"}}>
                  <Typography variant='h6' sx={{color:"red", fontWeight:"bold"}}> Derniere modification  </Typography>
                  <Typography sx={{fontWeight:"bold"}}>{donneesRessource[0]? date : " pas de données"}</Typography>
                </Box>
                <Box sx={{border:"1px solid black", width:"90%", margin:"auto", textAlign:"center", marginTop:"15px"}}>
                  <Typography variant='h6' sx={{color:"green", fontWeight:"bold"}}> Prix minimum   </Typography>
                  <Typography sx={{fontWeight:"bold"}}>{donneesRessource[0]? prixMin : " pas de données"}</Typography>
                  <Typography variant='h6' sx={{color:"red", fontWeight:"bold"}}> Prix maximum  </Typography>
                  <Typography sx={{fontWeight:"bold"}}>{donneesRessource[0]? prixMax : " pas de données"}</Typography>
                  <Typography variant='h6' sx={{color:"orange", fontWeight:"bold"}}> Prix moyen  </Typography>
                  <Typography sx={{fontWeight:"bold"}}>{donneesRessource[0]? prixMoyen : " pas de données"}</Typography>
                </Box>
                <Typography variant="h4" sx={{fontWeight:"bold", textAlign:"center", marginTop:"70px"}}>EN ATTENTE</Typography>
            </Box>

            <Box sx={{height:"500px", width:"1000px", backgroundColor:"white", borderRadius:"15px"}}>
            <Box sx={{marginTop:"20px", height:"100px", textAlign:"center"}}>
            <TextField
                id="outlined-number"
                label="Prix"
                type="number"
                onChange={handleChangeNumber}
                InputLabelProps={{
                shrink: true,
          }}/>
          
          <Button sx={{marginTop:"10px", marginLeft:"10px"}} variant="contained" onClick={handleClickOpen}>Valider</Button>
            </Box>
            <Box sx={{width:"80%", margin:"auto",marginTop:"-30px"}}>
              <Graph donneesRessource={donneesRessource}></Graph>
            </Box>
            

            </Box>
            
            <Box sx={{height:"200px", width:"300px", marginRight:"30px", backgroundColor:"white", borderRadius:"15px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <img referrerPolicy="no-referrer" src={props.ressource.imageUrl} width="100px" height="100px" alt=''/>
            </Box>
        </Box>

        :""}

<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{color:"black", fontWeight:"bold"}}>
            Le prix de l'item {props.ressource.nom} est : {prix}
          </DialogContentText>
        </DialogContent>
    
        <DialogActions>
          <Button onClick={handleValider}>Valider</Button>
          <Button onClick={handleClose} autoFocus>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
        </Box>



    );
  }
  
  export default Donnees;
  