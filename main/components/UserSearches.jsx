"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setText, setCategory } from "@app/redux/slices/searchProperties";
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { setLoading } from '@app/redux/slices/loading';
import { useDispatch, useSelector } from 'react-redux';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import HorizontalCardListLoading from './HorizontalCardListLoading';
import UserSearchLoading from './UserSearchLoading';

const UserSearches = ({onHideSearch}) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state =>state.siteloading);
    const router = useRouter();
    const [userSearches, setUserSearches] = useState([]);

    const goToSearch = (text, category) => {
      dispatch(setCategory(category));
      dispatch(setText(text));
      router.push('/search/results');
    };

    useEffect(()=>{
        dispatch(setLoading(true));
        const getUserSearch = async ()=>{
        const session = await getSession();
        const user =  session?.user;
        if (typeof user != 'undefined'){
            const response = await axios.get(`/api/search/usersearches/${user.email}`);
            const data = await response.data;
            setUserSearches(data);
            dispatch(setLoading(false));
        }
        }
        getUserSearch();
    }, 
    []);
  return (
    <>
          <div className="absolute mt-6 lg:mt-18 grid grid-cols-1 grid-rows-3 justify-center items-center w-full bg-white h-full">
          <div className='flex justify-center'>
            <p className='text-2xl lg:text-4xl orange_gradient'>Mis búsquedas anteriores</p>
          </div>
            <div className='flex justify-center'>
                {!loading && userSearches.length>0 &&
                  <div className="overflow-y-scroll h-52 lg:h-40 bg-white  p-2 grid grid-col-3 lg:grid-cols-4 gap-1 lg:gap-4 w-full lg:w-1/2 mr-4 ml-4">
                  {userSearches.map((search, index) => (
                      <button
                      onClick={() => {
                          goToSearch(search.key, search.category);
                      }}
                      key={index}
                      className="w-full h-6 lg:w-30 lg:h-16 border shadow rounded flex justify-center items-center text-center search_gradient border-gray-200 hover:bg-red-400"
                      >
                      {search.key}
                      </button>
                  ))}
                  </div>}
                  {!loading && userSearches.length==0 &&
                  <p className='flex text-center p-2'>No hay registros que mostrar</p>}
                {loading && <UserSearchLoading />}

            </div>
            <div className='flex justify-center mt-4 lg:mt-8'>
                <button onClick={()=>{onHideSearch(false)}} className='black_btn'><AiOutlineCloseCircle className='h-4 w-4' color='red'/>&nbsp; Cerrar</button>
            </div>
          </div>
        </>
  )
}

export default UserSearches