import React, {
  createContext, useContext, useState, useEffect,
} from 'react';

const Context = createContext();

export function AppWrapper({ children }) {
  const [state, setState] = useState({
    page: 'INITIAL STATE',
    sidebar: {
      isOpen: false,
    },
  });

  return (
    <Context.Provider value={{ state, setState }}>
      {children}
    </Context.Provider>
  );
}

export function useAppContext() {
  return useContext(Context);
}

export function updateContext(data) {
  const { setState } = useContext(Context);

  useEffect(() => {
    setState(data);
  }, [setState]);
}
