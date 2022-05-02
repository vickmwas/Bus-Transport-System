import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './RoutesPage.css';
import axios from 'axios';
import Button from '../../components/Button';
import { trimmed } from '../../helpers';
import InputTextField from '../../components/InputText';
import SelectElement from '../../components/Select';

const RoutesPage = (props) => {
    const [route, setRoute] = useState({
      name: '',
      zone: '',
      destination: [],
      bus: '',
      time: ''
    });
    const [routes, setUser ] = useState({
      name: '',
      detination: '',
      time: '',
      zone: '',
      bus: ''
    });
    const [error, setError] = useState('');
    const [bus, setBus] = useState('');

    const handleRouteAction = (e) => {
      //debugger;
      let nameAttribute  = e.target.getAttribute("name");
      if(nameAttribute == "destination" ){
        var selectedoptions = e.target.selectedOptions;
        var values = Array.from(selectedoptions).map(obj => obj.value);
        route[nameAttribute] = values;
      }
      else{
        route[nameAttribute] = e.target.value;
      }
      
      
      let selected = e.target.value;
      // setBus(selectedBus);

      console.log(`Selected = ${selected}`)
  };


    const handleChange = ({ target }) => {
        const { name, value } = target;
    
        if (error) {
          setError('');
        }
    
        setRoute({
          ...route,
          [name]: value
        });
    };
    useEffect(() => {
        // remove the current state from local storage
        // so that when a person logs in they dont encounter
        // the previous state which wasnt cleared
        localStorage.removeItem('state');
    }, []);


   

    const submit = () => {
        const { time, name, destination, zone, bus } = route;

    
        const routeInfo = {
          name,
          time,
          zone,
          destination,
          bus
        }
    
        if (!routeInfo.name || !routeInfo.time || !routeInfo.zone || !routeInfo.bus || !routeInfo.destination ) {
          console.log(routeInfo)
          setError('All fields are required');
          return;
        }
        
        console.log(routeInfo)
        // debugger;
        axios.post('/api/busstop/addroute/', routeInfo)   
          .then(res => {
            alert("Yay! Bus stop route added succesfully!");
            //window.location.href = "/";
          })
          .catch((err) => {
            debugger
            setError(err.message);
            console.log(err);
        });
    };
    
    return(
        <div className="Page">
            <div className="Form">
                <div className="FormTitle">Add Route</div>
        
                <InputTextField
                    required
                    type="datetime-local"
                    name="time"
                    //value={route.time}
                    placeholder="Time"
                    onChange={handleRouteAction}
                />
                <SelectElement
                    
                    name="bus"
                    //value={route.bus}
                    placeholder="Select a Bus"
                    onChange={handleRouteAction}
                    options = {[
                      {
                        "key" : "0",
                        "value" : "Select a Bus"
                      },
                      {
                        "key" : "1",
                        "value" : "Bus 1"
                      },
                      {
                        "key" : "2",
                        "value" : "Bus 2"
                      },
                      {
                        "key" : "3",
                        "value" : "Bus 3"
                      }
                    ]}
                />  
                
                <SelectElement
                    
                    name="name"
                    //value={route.name}
                    placeholder="Select a Departure"
                    onChange={handleRouteAction}
                    options = {[
                      {
                        "key" : "0",
                        "value" : "Select Departure "
                      },
                      {
                        "key" : "1",
                        "value" : "Kimironko"
                      },
                      {
                        "key" : "2",
                        "value" : "Zindiro"
                      },
                      {
                        "key" : "3",
                        "value" : "Kwa Nayinzira"
                      },
                      {
                        "key" : "4",
                        "value" : "CMU"
                      },
                      {
                        "key" : "5",
                        "value" : "Remera"
                      }, {
                        "key" : "6",
                        "value" : "Kicukiro"
                      }, {
                        "key" : "7",
                        "value" : "Kigali Town"
                      }
                    ]}
                /> 
                <SelectElement
                    
                    name="destination"
                    //value={route.destination}
                    placeholder="Select a list of Destinations"
                    onChange={handleRouteAction}
                    multiple
                    options = {[
                      {
                        "key" : "0",
                        "value" : "Select Destinations "
                      },
                      {
                        "key" : "1",
                        "value" : "Kimironko"
                      },
                      {
                        "key" : "2",
                        "value" : "Zindiro"
                      },
                      {
                        "key" : "3",
                        "value" : "KWa Naindira"
                      },
                      {
                        "key" : "4",
                        "value" : "CMU"
                      },
                      {
                        "key" : "5",
                        "value" : "Remera"
                      }, {
                        "key" : "6",
                        "value" : "Kicukiro"
                      }, {
                        "key" : "7",
                        "value" : "Kigali Town"
                      }
                    ]}
                /> 

                  <SelectElement
                    
                    name="zone"
                    //value={route.zone}
                    placeholder="Select a Zone"
                    onChange={handleRouteAction}
                    options = {[
                      {
                        "key" : "1",
                        "value" : "Select a Zone"
                      },
                      {
                        "key" : "1",
                        "value" : "Zone 1"
                      },
                      {
                        "key" : "2",
                        "value" : "Zone 2"
                      },
                      {
                        "key" : "3",
                        "value" : "Zone 3"
                      }
                    ]}
                />  
                
                
        
                {error && (
                    <div className="Error">
                    {error}
                    </div>
                )}
        
                <Button
                    label="ADD ROUTE"
                    onClick={submit}
                />
               
            </div>
        </div>
    )

}
export default connect(  )(withRouter(RoutesPage));