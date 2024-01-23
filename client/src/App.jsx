import React from 'react'
import { Route,createBrowserRouter, createRoutesFromElements,RouterProvider} from 'react-router-dom';
import StudentForm from './components/StudentForm';
import Layout from './Layout';
import StudentDetailsReport from './components/StudentDetailsReport';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path="" element={<StudentForm />} />
        <Route path='/studentdetails' element={<StudentDetailsReport />} />
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App