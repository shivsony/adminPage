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

function MainPagination({ count, page, defaultPage, onPageChange }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination defaultPage={defaultPage} count={count} page={page} onChange={onPageChange} showFirstButton showLastButton />
    </div>
  );
}

MainPagination.propTypes = {
  classes: PropTypes.object,
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default MainPagination