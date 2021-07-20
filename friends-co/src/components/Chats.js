import React, {useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine} from 'react-chat-engine';
import { auth } from '../firebase';
import {useAuth} from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
    
    const didMountRef = useRef(false);
    const history =useHistory();
    const { user }= useAuth();
    const [loading, setLoading]= useState(true);
    const handleLogout= async () =>
    {
        await auth.signOut();
        history.push('/');
    }

    const getFile = async(url) =>{
        const response = await fetch(url);
        const data= await response.blob(); // profile picture in binary

        return new File([data],'userPhoto.jpeg', {type: 'image/jpeg'});
    };

    useEffect(() =>{
    if(!didMountRef.current){
            didMountRef.current = true;

        if(!user || user=== null){   //if no user
            history.push('/');

            return;
        }
        axios.get('https://api.chatengine.io/users/me/', {
            headers:{
                'project-id': "a7d492fb-3d36-464b-a8ba-31b022d3f3e5",
                'user-name': user.email,
                'user-secret': user.uid,
            },
        })
        .then(() =>{
            setLoading(false);
        })
        .catch(()=>{
            let formdata = new FormData();
            formdata.append('email',user.email);
            formdata.append('username',user.email);
            formdata.append('secret',user.uid);

            getFile(user.photoURL)
            .then((avatar)=>{
                formdata.append('avatar', avatar, avatar.name);
                axios.post('https://api.chatengine.io/users/',
                formdata,
                {headers: { "private-key":"231b9be8-9405-4cc3-b155-cc3f741b0b0d" }}
                )
                .then(()=> setLoading(false))
                .catch((error)=> console.log(error))

            })
        })

    }}, [user,history]);

    if(!user || loading)
    return 'Loading.....';

    return (
        <div className=" chats-page">
            <div className="nav-bar">
                <div className="logo-tab"> 
                    Friends&#38;Co
                </div>
                <div onClick={ handleLogout} className=" logout-tab">
                    Logout
                </div>
            </div>
                <ChatEngine
                    height="calc(100vh - 66px)"
                    projectID="a7d492fb-3d36-464b-a8ba-31b022d3f3e5"
                    userName={user.email}
                    userSecret={user.uid}
                />

            
        </div>
    );
}

export default Chats;