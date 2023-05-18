import React, { createContext } from 'react';

export const Context = createContext();

const Provider = ({ children }) => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem('theme_mode') || 'light'
  );

  React.useEffect(() => {
    document.body.classList.add(theme);
  }, []);

  return (
    <Context.Provider value={{ theme, setTheme }}>{children}</Context.Provider>
  );
};

export default Provider;
