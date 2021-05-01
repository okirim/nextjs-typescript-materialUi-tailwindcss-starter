import { SnackbarProvider} from 'notistack';
import React from 'react';

interface SnackProviderProps {
    children:JSX.Element;
}

const  SnackProvider:React.FC<SnackProviderProps>=(children)=> {
    return (
        <SnackbarProvider maxSnack={3}>
            {children}
        </SnackbarProvider>
    );
}

export default SnackProvider;