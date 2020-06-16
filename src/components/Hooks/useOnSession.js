import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useOnSession = () => {
    const history = useHistory();

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if(token !== null) {
            history.push('/');
        };
    }, [history]);
};

export default useOnSession;