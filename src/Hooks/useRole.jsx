import { useState, useEffect } from 'react';
import useAxiosPrivate from './Api/useAxiosPrivate';

const useRole = () => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Current user এর data fetch করুন
                const response = await axiosPrivate.get('/api/auth/me');
                
                if (response.data.success) {
                    setRole(response.data.user.role);
                } else {
                    setError('Failed to fetch user role');
                }
            } catch (err) {
                console.error('Error fetching user role:', err);
                setError(err.response?.data?.message || 'Failed to fetch role');
                setRole(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, []);

    return { role, loading, error };
};

export default useRole;