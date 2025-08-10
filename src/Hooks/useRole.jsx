import { useState, useEffect } from 'react';
import useAxiosPrivate from './Api/useAxiosPrivate';

const useRole = () => {
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                setLoading(true);
                setError(null);
                
                console.log('Fetching user role...');
                
                const response = await axiosPrivate.get('/api/auth/me');
                
                console.log('User role response:', response.data);
                
                if (response.data.success) {
                    setRole(response.data.user.role);
                    setUser(response.data.user);
                } else {
                    setError('Failed to fetch user role');
                    setRole(null);
                    setUser(null);
                }
            } catch (err) {
                console.error('Error fetching user role:', err);
                setError(err.response?.data?.message || 'Failed to fetch role');
                setRole(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, []);

    // Manual refresh function
    const refreshRole = async () => {
        setLoading(true);
        try {
            const response = await axiosPrivate.get('/api/auth/me');
            console.log(response)
            if (response.data.success) {
                setRole(response.data.user.role);
                setUser(response.data.user);
                setError(null);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to refresh role');
        } finally {
            setLoading(false);
        }
    };

    return { role, user, loading, error, refreshRole };
};

export default useRole;