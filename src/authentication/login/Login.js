import { auth, googleProvider, facebookProvider } from "../auth";
import { AuthenticationContext, baseEndpoint } from "App";

export const fetchUserData = async userDataPayload => {
  // const endpoint = `https://map.covidx.app/`;
  const newLoginPayload = {
    method: "PUT",
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ 
      user_id:userDataPayload.user_id, 
      access_token: userDataPayload.access_token,
    })
  };
  const registerPayload = {
    method: "POST",
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ 
      user_id:userDataPayload.user_id, 
      display_name:userDataPayload.display_name, 
      email:userDataPayload.email,
      img_link:userDataPayload.img_link,
      access_token: userDataPayload.access_token,
    })
  };

  const response = await fetch(
    `${baseEndpoint}/new_login_user?user_id=${userDataPayload.user_id}`, 
    newLoginPayload
  ).then(res => 
    res.status===200 ? 
    res : 
    fetch(`${baseEndpoint}/create_user`, registerPayload)
  ).then(res => res.json()).catch(e => console.log(e));

  return response;
};

export const checkToken = async token => {
  const getPayload = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  const response = await fetch(
    `${baseEndpoint}/check_token?access_token=${token}`, 
    getPayload
  ).then(res => res.json()).catch(e => e)

  return response;
};
