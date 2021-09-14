import { withStyles, InputBase } from '@material-ui/core';

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

const TextInput = BootstrapInput;
export default TextInput;