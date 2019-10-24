import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  mainPaper: {
    marginTop: theme.spacing(2),
  },
}));

const Description = props => {
  const { onChange, appointment } = props;

  const classes = useStyles();

  const handleChange = e => onChange({ description: e.target.value });

  return <>
    <Paper className={classes.mainPaper}>
      <List>
        <ListSubheader>Leave a Message</ListSubheader>
        <ListItem>
          <TextField
            fullWidth
            multiline
            variant='outlined'
            value={appointment.description}
            onChange={handleChange}
          />
        </ListItem>
      </List>
    </Paper>
  </>;
};

Description.propTypes = {
  onChange: PropTypes.func,
  appointment: PropTypes.object,
};

export default Description;