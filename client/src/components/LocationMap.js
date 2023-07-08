import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LocationMap = () => {
  const [locations, setLocations] = useState({ status: "ok", data: [] });
  const [activeTab, setActiveTab] = useState('map');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getAllLocation');
      setLocations(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const renderMap = () => {
    // Load the Google Maps API asynchronously
    const script = document.createElement('script');
    script.src =  'https://maps.googleapis.com/maps/api/js?key=Your_Api_Key';
    script.async = true;
    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 2,
      });

      if (Array.isArray(locations)) {
        locations.forEach((location) => {
          const marker = new window.google.maps.Marker({
            position: { lat: location.latitude, lng: location.longitude },
            map,
            title: 'Location',
          });
        });
      }
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    renderMap();
  }, [locations]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (activeTab === 'map') {
      return <div id="map" style={{ height: '400px', width: '100%' }} />;
    } else if (activeTab === 'table') {
      if (Array.isArray(locations)) {
        return (
          <table  class="table table-striped table-bordered">
            <thead class="thead-dark">
              <tr>
                <th>Date & Time</th>
                <th>Location Name</th>
                
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location._id}>
                  <td>{location.currentDateTime}</td>
                  <td>{location.locationName}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        );
      } else {
        return <p>No locations found.</p>;
      }
    }
  };

  return (
    <div>
      <nav>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'map' ? 'active' : ''}`}
              onClick={() => handleTabChange('map')}
            >
              Map
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'table' ? 'active' : ''}`}
              onClick={() => handleTabChange('table')}
            >
              Table
            </button>
          </li>
        </ul>
      </nav>
      {renderContent()}
      <p className="forgot-password text-right">
        <a href="/userHome">Back To Home</a>
      </p>
    </div>
  );
};

export default LocationMap;

