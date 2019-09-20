import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {

  const [colorList, setColorList] = useState([]);

 // fetch your colors data from the server when the component mounts
 // set that data to the colorList state property

  useEffect(() => {
  // call withAuth fn >> find endpoint of /friends >> udpate state to the response
    axiosWithAuth().get('/api/colors')
    // res.data = arr of objects (colors with hex code, color, id)
    .then(res => setColorList(res.data))
    .catch(err => console.log('BublePage Error caught', err))
  }, [])

   return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
