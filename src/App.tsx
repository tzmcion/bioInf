import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home';
import Blast from './pages/Blast_Emulator/Blast';
import Theory from './pages/Theory/Theory';
import Fasta from './pages/Description_Pages/Fasta/Fasta';
import PamBlosum from './pages/Description_Pages/PAM_BLOSUM/PB';
import Local from './pages/Local/local';
import './App.css';

function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/Blast',
      element: <Blast />
    },
    {
      path:'/Theory',
      element: <Theory />
    },
    {
      path:'/theory/Fasta',
      element:<Fasta />
    },
    {
      path:'/theory/PamBlosum',
      element:<PamBlosum />
    },
    {
      path:'/local',
      element: <Local />
    },
    {
      path:'/Blast',
      element:<Blast />
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
