import React from 'react';
import "./App.css";
import Navbar from './File Managers/Navbar';
import {Routes, Route } from 'react-router-dom';
import File from './File Managers/File';
import Video from './File Managers/Video';
import Image from './File Managers/Image';
import Home from './File Managers/Home';
import VideoUpload from './File Managers/VideoUpload';
// import VideoUpload from './File Managers/VideoUpload';

// import FormInput from './File Managers/FormInput';

const App = () => {
  return (
	<>
<Navbar/>

	<Routes>
		<Route path='/' element={<Home/>}/>
<Route  path='/image' element={<Image/>}/>
<Route  path='/file' element={<File/>}/>
<Route  path='/video' element={<Video/>}/>
	</Routes>
{/* <FormInput/>  */}

	</> 
  )
}

export default App;