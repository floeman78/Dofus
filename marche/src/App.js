import Box from '@mui/material/Box';
import Body from './ComposantIndex/Body';
import Header from './ComposantIndex/Header';
import wabbit from './Images/wabbit.jpg';

function App() {
  return (
    <Box sx={{}}>
      <Box sx={{width:"100%", height:"100%", margin:"auto"}}>
          <Box sx={{width:"100%", height:"100px", borderBottom:"1px solid black"}}>
            <Header></Header>
          </Box>
          <Box sx={{width:"100%", height:"836px", backgroundImage: `url(${wabbit})`}}>
            <Body ></Body>
          </Box>
      </Box>
      </Box>
  );
}

export default App;
