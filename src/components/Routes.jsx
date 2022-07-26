import React from 'react'
import {Routes as Switch,Route,Navigate} from 'react-router-dom';
import {Results} from './Results';

export const Routes = () => {

  const pathArray=['/search','/image','/news','/video'];

  return (
    <div className='p-4'>
        <Switch>
            <Route path="/" element={<Navigate to="/search" replace={true} />}/>
            {pathArray.map((data)=><Route path={data} element={<Results/>}/>)}
        </Switch>
        
    </div>
  )
}
