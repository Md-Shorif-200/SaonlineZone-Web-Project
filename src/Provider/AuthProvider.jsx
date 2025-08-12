import React, { createContext, useContext, useEffect, useState } from "react";
import {   createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { auth } from "../../firebase";
import useAxiosPrivate from "../Hooks/Api/useAxiosPrivate";

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate()
  console.log(user);
 

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        console.log(currentUser);
        setUser(currentUser);

            if(currentUser?.email){
               const user = {email : currentUser.email};
               const res = await axiosPrivate.post('/jwt-token',user);
               console.log(res.data);
        setLoading(false);
        setError(null);
               
            }else{
              const res = await axiosPrivate.post('/log-out',{});
              console.log('clear token',res.data);

        setLoading(false);
        setError(null);
              
            }

   
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);


// creat new user
  const creatUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   log in
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };





  // update profile
  const updateUserProfile = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };









  // log out
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      setError(error);
      console.error("Logout error:", error);
    }
  };

  const value = {
    user,
    creatUser,
    updateUserProfile,
    logIn,
    loading,
    error,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
