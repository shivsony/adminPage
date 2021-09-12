import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withStyles, InputBase } from '@material-ui/core';

import Table from '../../components/Table/Table';
import { getUsersList, deleteUsersByIds, updateTheUser } from '../../store/actions/adminAction';
import SearchBox from '../../components/SearchBox/SearchBox';
import { makeStyles } from '@material-ui/core/styles';
import { searchUserByUserInput } from '../../services/adminService';
import locales from '../../locales/en';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 10,   
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.primary.main}`,
    fontSize: 16,
    padding: '5px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
}))(InputBase);

function AdminPage({ getUsersListRequest, users, deleteUsersByIdsRequest, updateTheUserRequest }){
  const classes = useStyles();
  const [ searchString, setSearchString ] = useState('');
  const [ editRowIndex, setEditRowIndex ] = useState(-1);
  const [editedData, setEditedData] = useState({
    id: -1,
    name: '',
    email: '',
    role: '',
  })

  useEffect(()=>{
    async function getUsers(){
      await getUsersListRequest();
    }
    getUsers();
  }, [getUsersListRequest]);

  const handleDelete = (ids=[]) => {
    deleteUsersByIdsRequest(ids, (message) => {
      console.log(message);
    })
  }

  const handleSaveEditedData = () => {
    updateTheUserRequest(editedData, (message) => {
      alert(message);
    });
  }

  const handleEditRowDataAndIndex = (index, data) => {
    setEditRowIndex(index);
    setEditedData(data);
  }
  
  const handleEditFormData = (name, value) => {
    const preData = { ... editedData };
    preData[name] = value;
    setEditedData(preData);
  }

  const onClickOnInput = (e, index) => {
    e.stopPropagation();
  }
  const EditNameForm = (data, index, idKey) => {
    if(editRowIndex === index)
      return (
        <BootstrapInput
          id='name'
          value={editedData.name}
          onClick={onClickOnInput}
          onChange={e => handleEditFormData(e.target.name, e.target.value)}
          name="name" 
        />
      )
    return data
  }
  const EditEmailForm = (data, index, idKey) => {
    if(editRowIndex === index)
      return (
        <BootstrapInput
          id='email'
          value={editedData.email}
          onClick={onClickOnInput}
          onChange={e => handleEditFormData(e.target.name, e.target.value)}
          name="email" 
        />
      )
    return data
  }
  const EditRoleForm = (data, index) => {
    if(editRowIndex === index)
      return (
        <BootstrapInput
          id='role'
          value={editedData.role}
          onClick={onClickOnInput}
          onChange={e => handleEditFormData(e.target.name, e.target.value)}
          name="role" 
        />
      )
    return data
  }
  const tableHead = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
      render: EditNameForm
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: true,
      label: 'Email',
      render: EditEmailForm
    },
    {
      id: 'role',
      numeric: false,
      disablePadding: true,
      label: 'Role',
      render: EditRoleForm
    },
    {
      id: 'action',
      numeric: false,
      disablePadding: true,
      label: 'Action',
    },
  ];
  return (
    <div className={classes.root}>
      <SearchBox value={searchString} handleChange={setSearchString} id="userSearch" placeholder={locales.admin.searchPlaceholder} />
      <Table
        tableHead={tableHead}
        tableData={searchUserByUserInput(searchString, users)}
        handleDeleteRows={handleDelete}
        handleSaveEditedData={handleSaveEditedData}
        handleEditRow={handleEditRowDataAndIndex}
        editRowIndex={editRowIndex}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  users: state.admin.userList
});

AdminPage.propTypes = {
  classes: PropTypes.object,
  users: PropTypes.array.isRequired,
  getUsersListRequest: PropTypes.func.isRequired,
  deleteUsersByIdsRequest: PropTypes.func.isRequired,
  updateTheUserRequest: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  {
    getUsersListRequest: getUsersList,
    deleteUsersByIdsRequest: deleteUsersByIds,
    updateTheUserRequest: updateTheUser
  }
)(AdminPage);