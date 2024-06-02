import { useEffect } from 'react';

import './App.css';

import Routes from './routes'

import { getFeatureList } from './services';
import { usePreLoginState } from './hooks';
import { PreLoginContextInterface } from './store';
import { createSignal } from './utils';

const App = () => {

  const { dispatch }: PreLoginContextInterface = usePreLoginState();

  useEffect(()=> {

    const { controller, signal } = createSignal();
    (async () => {
      const { data, error } = await getFeatureList(signal);
      if(data?.abort) return;
      if(!error) dispatch('SET_FEATURE', data);
    })();
    

    return () => controller.abort();
    
  },[dispatch])

  return <Routes />
}

export default App;
