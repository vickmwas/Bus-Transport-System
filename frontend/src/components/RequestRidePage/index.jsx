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
import './styles.css';
import moment from 'moment'


const RequestRidePage = (props) => {

  const [details, setDetails] = useState({
    departureLocation: '',
    destinationLocation: '',
    numberOfSits: '',
    disabledPeople: '',
  });

  const [error, setError] = useState('');

  const [pickupTime, onDateTimeChange] = useState(new Date());
  const [availableBuses, setAvailableBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState('');

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
  const handleSelectField = (e) => {
    //debugger;
    let nameAttribute  = e.target.getAttribute("name");
    if(nameAttribute === "destination" ){
      var selectedoptions = e.target.selectedOptions;
      var values = Array.from(selectedoptions).map(obj => obj.value);
      details[nameAttribute] = values;
    }
    else{
      setDetails({
        ...details,
        [nameAttribute]: e.target.value
      });

      // details[nameAttribute] = e.target.value;
      // debugger;
    }
    
    let selected = e.target.value;
    // setBus(selectedBus);

    console.log(`Selected = ${selected}`)
};

  const searchBuses = async () => {
    const {
      departureLocation,
      destinationLocation,
      numberOfSits,
      disabledPeople} = details;

    //* Trim user details
    console.log(details);

    if (!pickupTime || !departureLocation || !destinationLocation || !numberOfSits || 
      !disabledPeople) {
      setError('All fields are required');
      return;
    }

    const rideDetails = { ...details, pickupTime, passenger: localStorage.getItem('id') };

    console.log(JSON.stringify(rideDetails));

    let buses = [];
    // IF data has been cached, retrieve that data instead.
    if(window.localStorage.getItem('buses')){
      buses = JSON.parse(window.localStorage.getItem('buses'));
      console.log('Buses Already Cached');
      console.log(buses);
    } else {
      // IF not cached, fetch data from the backend
      const res = await axios.post('/api/bus/search', rideDetails);
      buses = res.data.message;
      window.localStorage.setItem('buses', JSON.stringify(buses));
    }

    // Filter the data according to the preset rules
    const filteredBuses = buses
      .filter(busstop => {
          return busstop.name === rideDetails.departureLocation;
      })
      .filter(filtered_bus_stop => {
          return (filtered_bus_stop.destinations).includes(rideDetails.destinationLocation);
      })
      .filter(filtered_bus_stop => {
        let userPickupTime = moment(moment(rideDetails.time).format('LT'), "h:mma")
        let busStopTime = moment(moment(filtered_bus_stop.datetime).format('LT'), "h:mma")
        
        return userPickupTime.isBefore(busStopTime);
    })
    
    setAvailableBuses(filteredBuses);
    
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
            onChange={handleChange}
        />
        
        <SelectElement
            name="departureLocation"
            //value={route.name}
            placeholder="Select a Departure"
            onChange={handleSelectField}
            options = {locationRoutes}
        /> 

        <SelectElement
            
            name="destinationLocation"
            //value={route.destination}
            placeholder="Select a list of Destinations"
            onChange={handleSelectField}
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

          <div className='busesContainer'>
            {availableBuses.length !== 0 && 
              availableBuses.map(bus => (
                <div key={bus.bus} className={`busSelect ${selectedBus === bus.bus ? 'selected' : ''}`} onClick={() => {
                  console.log('hello')
                  setSelectedBus(bus.bus)
                  }}>
                  <span className="busSelectTime">{bus.departure_time}</span><br/>
                  <span className="busName">{bus.bus}</span>
                </div>
              ))
            }

          </div>

        

        {error && (
          <div className="Error">
            {error}
          </div>
        )}

        {(selectedBus !== '') &&  
            <Button
            label="request ride"
            onClick={handleRequestRide}
          />
          }
       

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
