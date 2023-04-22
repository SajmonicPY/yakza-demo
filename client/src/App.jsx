import React from 'react'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';

import {logo} from './assets';
import {Home, CreatePost, CreateSpeech} from './pages';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter className="flex-grow">
        <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
          <Link to='/'>
            <img src={logo} alt='logo' className='w-28 ojbect-contain'/>
          </Link>
          <div className="flex justify-end space-x-4">
            <Link to='/create-post' className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
              Text to image
            </Link>
            <Link to='/create-speech' className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
              Text to Speech
            </Link>
          </div>
        </header>
        <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh - 73px)]'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/create-post' element={<CreatePost />}/>
            <Route path='/create-speech' element={<CreateSpeech />}/>
          </Routes>
        </main>
      </BrowserRouter>
      <footer className='text-center py-4 bg-[#f9fafe] bottom-0 w-full fixed'>
        Made with <span className='text-red-500'>&#10084;</span> by Yakza Team
      </footer>
    </div>
  )
}


export default App