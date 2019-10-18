import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';

import useRequest from '../hooks/useRequest';
import { readAppointment } from '../services/UserService';
import AppointmentList from '../components/AppointmentList';


const useStyles = makeStyles(theme => ({
  mainPaper: {
    marginTop: theme.spacing(2),
  },
}));

const UserAppointmentList = props => {
  const { match } = props;
  const id = Number(match.params.id);

  const { request, sourceData } = useRequest(readAppointment, []);
  const classes = useStyles();

  const read = ({ id, page, pageSize }) => request({ id, page, pageSize });
  const handleChangePage = (e, page) => read({ id, page: page + 1 });

  useEffect(() => {
    read({ id });
  }, []);

  const { page = 1, pageSize = 10, total = 1, data: appointments = [] } = sourceData;

  return <Container maxWidth='md'>
    <Typography variant='h4' color='textSecondary'>My Appointments</Typography>

    <AppointmentList id={id} items={appointments} />

    <Paper className={classes.mainPaper}>
      <TablePagination
        component='div'
        page={Number(page) - 1}
        rowsPerPage={Number(pageSize)}
        count={Number(total)}
        rowsPerPageOptions={[10]}
        onChangePage={handleChangePage}
      />
    </Paper>
  </Container>;
};

UserAppointmentList.propTypes = {
  match: PropTypes.object,
};

export default UserAppointmentList;