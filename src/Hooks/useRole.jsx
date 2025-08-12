import { useQuery } from '@tanstack/react-query';
// import useAxiosPrivate from './Api/useAxiosPrivate';

import useAxiosPublic from './Api/useAxiosPublic';
import useAuth from './useAuth';

const useRole = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: role = null, isLoading, refetch } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/user/${user.email}`);
      return res.data?.role;
    },
  });

  return [role, isLoading, refetch];
};

export default useRole;
