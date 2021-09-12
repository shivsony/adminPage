import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%', 
    },
    input: {
        width: '100%',
        padding: 10,
        fontFamily: "Roboto",
    }
}));

const SearchBox = ({placeholder, id, handleChange, value}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <input className={classes.input} id={id} value={value} onChange={e=>handleChange(e.target.value)} placeholder={placeholder} />
        </div>
    )
}

export default SearchBox;