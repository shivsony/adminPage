import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import MainPagination from '../MainPagination/MainPaginatio';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const renderColumn = (index,  _, colFields) => {
  const { id, render, } = colFields;
  if (render) return render(_[id], index);
  return _[id];
};

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, tableHead } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {tableHead.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontSize: theme.typography.pxToRem(16),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { deleteAll, selected, setSelected } = props;
  const numSelected = selected.length;
  const deleteSelected = () => {
    deleteAll(selected)
    setSelected([]);
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 && (
        <span>
          <Tooltip title="Delete selected items">
            <IconButton aria-label="delete" onClick={deleteSelected}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <span>{`Delete Selected(${numSelected})`}</span>
        </span>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  selected: PropTypes.array,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    fontSize: theme.typography.pxToRem(16),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    paddingBottom: 40
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  flexdiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  stickyHeader: {
    overflowX: 'initial',
    [theme.breakpoints.down('md')]: {
      overflowX:'auto',
    },
  },
  saveButton: {
    padding: 10,
    cursor: 'pointer',
  }
}));

export default function EnhancedTable({ tableHead, tableData=[], handleDeleteRows, handleSaveEditedData, idKey='id', handleEditRow, editRowIndex }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(null);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const dense = false;
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const totalPages = (users) => Math.ceil(users.length / rowsPerPage);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = stableSort(tableData, getComparator(order, orderBy)).slice((page-1)*rowsPerPage, (page-1)*rowsPerPage + rowsPerPage).map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSelected([]);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setSelected([]);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - (page-1) * rowsPerPage);
  const handleDelete = (e, id) => {
    e.stopPropagation();
    handleDeleteRows([id]);
    setSelected(selected.filter(item => item !== id));
  }
  const handleEdit = (e, index, data) => {
    e.stopPropagation();
    handleEditRow && handleEditRow(index, data);
  }

  const handleSave = e => {
    e.stopPropagation();
    handleEditRow && handleEditRow(null);
    handleSaveEditedData();
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer classes={{ root: classes.stickyHeader }}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
            stickyHeader
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowsPerPage}
              tableHead={tableHead}
            />
            <TableBody>
              {stableSort(tableData, getComparator(order, orderBy))
                .slice((page - 1) * rowsPerPage, (page -1) * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      {tableHead.map((column, i) => {
                        return i !== tableHead.length -1 && (
                          <TableCell
                            align="left" padding="none"
                            key={`${row[idKey]}_serial_${i}`}
                          >
                            {renderColumn(index, row, column)}
                          </TableCell>
                        );
                      })}
                      <TableCell align="left" padding="none">
                      {editRowIndex === index ? (
                        <span onClick={(e) => handleSave(e)} className={classes.saveButton}>Save</span>
                        ) :(
                        <Tooltip title="Edit">
                          <IconButton onClick={(e)=>handleEdit(e, index, row)} aria-label="edit">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        )}
                        {editRowIndex === index ? (
                          <span onClick={(e)=>handleEdit(e, null, {})} className={classes.saveButton}>Cancel</span>
                        ) :(
                        <Tooltip title="Delete">
                          <IconButton onClick={(e) => handleDelete(e, row.id)} aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.flexdiv}>
          <EnhancedTableToolbar selected={selected} deleteAll={handleDeleteRows} setSelected={setSelected} />
          <MainPagination
            count={totalPages(tableData)}
            defaultPage={1}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    </div>
  );
}

EnhancedTable.propTypes = {
  classes: PropTypes.object,
  tableHead: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  handleDeleteRows: PropTypes.func.isRequired,
  handleSaveEditedData: PropTypes.func.isRequired,
  handleEditRow: PropTypes.func,
  editRowIndex: PropTypes.number,
};