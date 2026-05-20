// context/AppContext.jsx

import {
    createContext,
    useContext,
    useState
} from "react";

const AppContext = createContext();


// global loading setter
let globalSetLoading;


// PROVIDER
export const AppProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);

    // store globally
    globalSetLoading = setLoading;

    return (
        <AppContext.Provider
            value={{
                loading
            }}
        >
            {children}
        </AppContext.Provider>
    );
};


// CUSTOM HOOK
export const useAppContext = () => {
    return useContext(AppContext);
};


// EXPORT GLOBAL LOADING FUNCTION
export const getGlobalSetLoading = () => globalSetLoading;