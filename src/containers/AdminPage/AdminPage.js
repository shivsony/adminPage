import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


import Table from '../../components/Table/Table';
import { getUsersList, deleteUsersByIds, updateTheUser, createNewUser } from '../../store/actions/adminAction';
import SearchBox from '../../components/SearchBox/SearchBox';
import { makeStyles } from '@material-ui/core/styles';
import { searchUserByUserInput } from '../../services/adminService';
import locales from '../../locales/en';
import TextInput from '../../components/TextInput/TextInput';
import MainModal from '../../components/MainModal/MainModal';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 10,   
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },
  inputRow: {
    padding: 10,
  }
}));

function AdminPage({ getUsersListRequest, users, deleteUsersByIdsRequest, updateTheUserRequest, createNewUserRequest }){
  const classes = useStyles();
  const [ searchString, setSearchString ] = useState('');
  const [ editRowIndex, setEditRowIndex ] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    id: null,
    name: '',
    email: '',
    role: '',
  })
  const [addUser, setAddUser] = useState({
    id: null,
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

  const handleEnterTheUserDetails = (name, value) => {
    const preData = { ... addUser };
    preData[name] = value;
    setAddUser(preData);
  }

  const openAddUserModal = () => {
    setIsModalOpen(true);
  }
  const closeAddUserModal = () => {
    setIsModalOpen(false);
  }

  const handleAddUser = () => {
    const data = { ...addUser };
    data.id = users.length + 1;
    createNewUserRequest(data, (message)=>{
      closeAddUserModal();
      alert(message);
    })
  }


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

  const EditNameForm = (data, index) => {
    return editRowIndex === index ?
      <TextInput
        id='name'
        value={editedData.name}
        onClick={onClickOnInput}
        onChange={e => handleEditFormData(e.target.name, e.target.value)}
        name="name" 
      /> : data;
  }
  const EditEmailForm = (data, index) => {
    return editRowIndex === index ?
      <TextInput
        id='email'
        value={editedData.email}
        onClick={onClickOnInput}
        onChange={e => handleEditFormData(e.target.name, e.target.value)}
        name="email" 
      /> : data;
  }
  const EditRoleForm = (data, index) => {
    return editRowIndex === index ?
      <TextInput
        id='role'
        value={editedData.role}
        onClick={onClickOnInput}
        onChange={e => handleEditFormData(e.target.name, e.target.value)}
        name="role" 
      /> : data;
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
      <div className={classes.searchContainer}>
        <SearchBox value={searchString} handleChange={setSearchString} id="userSearch" placeholder={locales.admin.searchPlaceholder} />
        <div>
          <Button
            variant="contained"
            color="primary"
            endIcon={<AddIcon />}
            onClick={openAddUserModal}
          >
            Add
          </Button>
        </div>
      </div>
      <Table
        tableHead={tableHead}
        tableData={searchUserByUserInput(searchString, users)}
        handleDeleteRows={handleDelete}
        handleSaveEditedData={handleSaveEditedData}
        handleEditRow={handleEditRowDataAndIndex}
        editRowIndex={editRowIndex}
      />
      <MainModal
        open={isModalOpen}
        handleClose={closeAddUserModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <h3 className={classes.inputRow}>Create New User</h3>
          <div className={classes.inputRow}>
            <TextInput id='name' name="name" placeholder="Enter user name" value={addUser.name} onChange={(e) => handleEnterTheUserDetails(e.target.name, e.target.value)}  />
          </div>
          <div className={classes.inputRow}>
            <TextInput id='email' name="email" placeholder="Enter user email" value={addUser.email} onChange={(e) => handleEnterTheUserDetails(e.target.name, e.target.value)}  />
          </div>
          <div className={classes.inputRow}>
            <TextInput id='role' name="role" placeholder="Enter user role" value={addUser.role} onChange={(e) => handleEnterTheUserDetails(e.target.name, e.target.value)}  />
          </div>
        </div>
        <div className={classes.inputRow}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUser}
          >
            Submit
          </Button>
        </div>
      </MainModal>

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
  createNewUserRequest: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  {
    getUsersListRequest: getUsersList,
    deleteUsersByIdsRequest: deleteUsersByIds,
    updateTheUserRequest: updateTheUser,
    createNewUserRequest: createNewUser 
  }
)(AdminPage);