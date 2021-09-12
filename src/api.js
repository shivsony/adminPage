import axios from 'axios';

const header = {
  "Content-Type": "application/json"
};
export const GET = (url, params, headerData) => 
  axios({
    url: url,
    method: "GET",
    headers: headerData ? headerData : header,
    params: params,
    timeout: 30000
  })
  .then(response => {
    return {
      data: response.data,
      status: response.status
    }
  })
  .catch(err => {
    console.log(err);
    const errStr  = err.toString();
    if(errStr.includes("timeout")){
      window.alert(`${errStr} please try again`)
    }
    return err
  });
export const POST = (url, data, headerData) => 
  axios({
    url: url,
    method: "POST",
    headers: headerData ? headerData : header,
    data: data,
    timeout: 30000
  })
  .then(response => {
    return {
      data: response.data,
      status: response.status
    }
  }) 
  .catch(err => {
    const errStr  = err.toString();
    if(errStr.includes("timeout")){
      window.alert(`${errStr} please try again`)
    }
    return err
  });
export const DELETE = url => 
  axios({
    url: url,
    method: 'DELETE',
    timeout: 30000
  })
  .then(response => {
    return {
      data: response.data,
      status: response.status
    }
  }) 
  .catch(err => {
    const errStr  = err.toString();
    if(errStr.includes("timeout")){
      window.alert(`${errStr} please try again`)
    }
    return err
  });
  export const PUT = (url, data, headerData, params) => 
  axios({
    url: url,
    method: "PUT",
    headers: headerData ? headerData : header,
    data: data,
    params: params,
    timeout: 30000
  })
  .then(response => {
    return {
      data: response.data,
      status: response.status
    }
  })
  .catch(err => {
    const errStr  = err.toString();
    if(errStr.includes("timeout")){
      window.alert(`${errStr} please try again`)
    }
    return err
  });