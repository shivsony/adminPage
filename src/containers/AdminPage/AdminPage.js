import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Table from '../../components/Table/Table';
import { getUsersList, deleteUsersByIds } from '../../store/actions/adminAction';
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

const tableHead = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
  { id: 'role', numeric: false, disablePadding: true, label: 'Role' },
  { id: 'action', numeric: false, disablePadding: true, label: 'Action' },
];

function AdminPage({ getUsersListRequest, users, deleteUsersByIdsRequest }){
  const classes = useStyles();
  const [ searchString, setSearchString ] = useState('');

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
  return (
    <div className={classes.root}>
      <SearchBox value={searchString} handleChange={setSearchString} id="userSearch" placeholder={locales.admin.searchPlaceholder} />
      <Table tableHead={tableHead} tableData={searchUserByUserInput(searchString, users)} handleDeleteRows={handleDelete} />
    </div>
  )
}

const mapStateToProps = state => ({
  users: state.admin.userList
});

export default connect(
  mapStateToProps,
  {
    getUsersListRequest: getUsersList,
    deleteUsersByIdsRequest: deleteUsersByIds
  }
)(AdminPage);