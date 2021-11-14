import React from 'react'
import { Line } from 'react-chartjs-2'
import { Card, CardBody } from 'reactstrap'
import { Display } from './Display'
import { BackgroundColorContext, mappingColors } from "contexts/core/BackgroundColorContext";
import { useMemo, useCallback } from 'react';
  

interface Props {
    title : string,
    measure : number,
    unit : string, 
    date : string,
    labels : Array<String>
    data : Array<number>
}

export const DisplayChart = ({data, date, labels, measure, title, unit} : Props) => {
    const getData = useCallback(
      (labels : Array<String>, color : string, data : Array<number>) => {
         
          
          return {
            labels,
            datasets: [
              {
                label: "Measure",
                fill: false,
                borderColor: color, //primaru
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: color, //primary
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: color, //primaru
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data,
              },
            ],
          };
        },
      [],
    )


    const config = useMemo(() => {
      return {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
    
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.0)",
                zeroLineColor: "transparent",
              },
              ticks: {
                //suggestedMin: 0,
                //suggestedMax: 10,
                padding: 20,
                fontColor: "#9e9e9e",
              },
            },
          ],
    
          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: true,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent",
              },
              ticks: {
                padding: 20,
                fontColor: "#9e9e9e",
              },
            },
          ],
        },
      }

    }, [])

    return (
        <BackgroundColorContext.Consumer>
               {({color}) => ( 

                    <Card>
                        <CardBody>
                            <Display title={title} measure={measure} unit={unit} date={date}/>
                        <div>
                            <Line
                                data={getData(labels, mappingColors[color], data)}
                                options={config}
                            />

                        </div>

                        </CardBody>
                    </Card>
               )}

        </BackgroundColorContext.Consumer>

    )
}
