import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';

import useRequest from '../hooks/useRequest';
import { readAll } from '../services/AppointmentService';
import _AppointmentList from '../components/AppointmentList';
import history from '../utils/history';

const useStyles = makeStyles(theme => ({
  mainPaper: {
    marginTop: theme.spacing(2),
  },
}));

const AppointmentList = props => {
  const { id, role } = props;

  if (role !== 0) {
    history.push('/login');
  }

  const { request, sourceData } = useRequest(readAll, []);
  const classes = useStyles();

  const read = ({ page, pageSize } = {}) => request({ page, pageSize });
  const handleChangePage = (e, page) => read({ page: page + 1 });

  useEffect(() => {
    read();
  }, []);

  const { page = 1, pageSize = 10, total = 1, data: appointments = [] } = sourceData;

  return <Container maxWidth='md'>
    <Typography variant='h4' color='textSecondary'>All Appointments</Typography>
    
    <_AppointmentList id={id} items={appointments} />

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

AppointmentList.propTypes = {
  id: PropTypes.number,
  role: PropTypes.number,
};

const mapStateToProps = ({ id, role }) => ({ id, role });

export default connect(mapStateToProps)(AppointmentList);