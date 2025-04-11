import React, {useState, useEffect, createContext, useContext} from 'react';
import NetInfo from '@react-native-community/netinfo';

const NoInternetContext = createContext();

export const useInternetStatus = () => useContext(NoInternetContext);

export const NoInternetProvider = ({children}) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return (
    <NoInternetContext.Provider value={isConnected}>
      {children}
    </NoInternetContext.Provider>
  );
};
