import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
const Graph = (props) => {

    const [lstPrix, setLstPrix] = React.useState([]);
    const [lstDate, setLstDate] = React.useState([]);
    const [tabRessourcePrix, setTabRessourcePrix] = React.useState([]);
    useEffect(() => {
        console.log(props.donneesRessource);
        let listPrixProvisoire = [];
        let dateTest = [];
        setTabRessourcePrix(props.donneesRessource);
        
        props.donneesRessource.forEach((d) => {
            let dateSub = d.date.substring(5,10)
            listPrixProvisoire.push(d.prix);
            dateTest.push(dateSub);
        })
        setLstDate(dateTest);
        setLstPrix(listPrixProvisoire);
        console.log(lstPrix);
      }, [props.donneesRessource]);


    const data = {
        labels: lstDate,
        datasets: [
          {
            label: "Prix",
            data: lstPrix,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          }
        ]
      };

  return (
    <div>
      <Line data={data} />
    </div>
  )
}

export default Graph

  