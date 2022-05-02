import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveUser from '../../redux/actions/saveUser';
import { isValidEmail, isValidUsername, trimmed } from '../../helpers';
import Button from '../Button';
import InputTextField from '../InputText';
import SelectElement from '../../components/Select';
import Navbar from '../Navbar';
import {locationRoutes, buses, zones} from '../../helpers/routes';


const RequestRidePage = (props) => {
  const [route, setRoute] = useState({
    name: '',
    zone: '',
    destination: [],
    bus: '',
    time: ''
  });
  const [details, setDetails] = useState({
    departureLocation: '',
    destinationLocation: '',
    numberOfSits: '',
    disabledPeople: '',
  });

  const [error, setError] = useState('');

  const [pickupTime, onDateTimeChange] = useState(new Date());

  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (error) {
      setError('');
    }

    setDetails({
      ...details,
      [name]: value
    });
  };

  const handleRequestRide = () => {
    const {
      departureLocation,
      destinationLocation,
      numberOfSits,
      disabledPeople} = details;

    //* Trim user details

    if (!pickupTime || !departureLocation || !destinationLocation || !numberOfSits || 
      !disabledPeople) {
      setError('All fields are required');
      return;
    }

    const rideDetails = { ...details, pickupTime, passenger: localStorage.getItem('id') };

    console.log(rideDetails)

    axios.post('/api/rides/request', rideDetails)
      .then(res => {
        console.log(res.data);
        
        // props.saveUser(res.data);
        alert('Your ride has been requested')
        window.location.href = "/passenger/my-rides";
      })
      .catch((err) => {
        setError('Process failed.');
        
        console.log(err);
      });
  };
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

  const searchBuses = () => {
    const {
      departureLocation,
      destinationLocation,
      numberOfSits,
      disabledPeople} = details;

    //* Trim user details

    if (!pickupTime || !departureLocation || !destinationLocation || !numberOfSits || 
      !disabledPeople) {
      setError('All fields are required');
      return;
    }

    const rideDetails = { ...details, pickupTime, passenger: localStorage.getItem('id') };

    console.log(JSON.stringify(rideDetails));

    axios.post('/api/bus/search', rideDetails)
    .then(res => {
      console.log(res.data);
      
      // props.saveUser(res.data);
      // alert('Your ride has been requested')
      // window.location.href = "/passenger/my-rides"
    })
    .catch((err) => {
      setError('Process failed.');
      
      console.log(err);
    });
    
    
  };


  const handleCancel = () => {
    setError('Request cancelled');
    setTimeout(() => setError(''), 2000);
  }

  useEffect(() => {
    // remove the current state from local storage
    // so that when a person logs in they dont encounter
    // the previous state which wasnt cleared
    localStorage.removeItem('state');
  }, []);

  return (
    <div className="RequestRidePage Page">
      <Navbar />
      <div className="Form">
        <div className="FormTitle">Request ride</div>

                  <InputTextField
                    required
                    type="datetime-local"
                    name="time"
                    //value={route.time}
                    placeholder="Time"
                    onChange={handleRouteAction}
                />

        
                <SelectElement
                    name="name"
                    //value={route.name}
                    placeholder="Select a Departure"
                    onChange={handleRouteAction}
                    options = {locationRoutes}
                /> 

                <SelectElement
                    
                    name="destination"
                    //value={route.destination}
                    placeholder="Select a list of Destinations"
                    onChange={handleRouteAction}
                    options = {locationRoutes}
                /> 


        <InputTextField
          required
          type="number"
          name="numberOfSits"
          value={details.numberOfSits}
          placeholder="Number of seats"
          onChange={handleChange}
        />

        <InputTextField
          required
          type="number"
          name="disabledPeople"
          value={details.disabledPeople}
          placeholder="Disabled people"
          onChange={handleChange}
        />

          <Button
            label="Search Buses"
            onClick={searchBuses}
          />

        

        {error && (
          <div className="Error">
            {error}
          </div>
        )}

        <Button
          label="request ride"
          onClick={handleRequestRide}
        />

        <Button
          label="cancel"
          className="CancelBtn"
          onClick={handleCancel}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => (
  { user: state.user }
);

const mapDispatchToProps = {
  saveUser
};

RequestRidePage.propTypes = {
  saveUser: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RequestRidePage));
