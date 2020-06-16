import axios from 'axios';

const baseURL = 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit/'

const useApi = () => {
    const api = axios.create({
        baseURL: baseURL 
    });  
    return api;
};

export default useApi;