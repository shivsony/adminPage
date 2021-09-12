import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function MainPagination({ count, page, rowsPerPage, onPageChange }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination count={parseInt(count/rowsPerPage)} page={page} onChange={onPageChange} showFirstButton showLastButton />
    </div>
  );
}

MainPagination.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default MainPagination