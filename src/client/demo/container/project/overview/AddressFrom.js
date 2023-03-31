import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AddressFrom() {
  const [dât, setDât] = useState([]);
  const [province, setProvince] = useState('');
  const [district, seTdistrict] = useState('');
  const [Village, setVillage] = useState('');
  const [location, setLocation] = useState('');

  const getData = async () => {
    try {
      const res = await axios.get('https://provinces.open-api.vn/api/');
      console.log('res', res);
    } catch (error) {}
  };
  useEffect(() => {}, []);
  return <div>AddressFrom</div>;
}

export default AddressFrom;
