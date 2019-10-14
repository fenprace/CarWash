import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumnGap: theme.spacing(1),
    gridRowGap: 0,
  },
}));

const CSSGrid = props => {
  const { children, container, xs } = props;
  const classes = useStyles();

  const attributes = container
    ? { className: classes.container }
    : { style: { gridColumnEnd: `span ${xs}` } };

  return <div {...attributes}>
    {children}
  </div>;
};

CSSGrid.propTypes = {
  children: PropTypes.node,
  container: PropTypes.bool,
  xs: PropTypes.number,
};

export default CSSGrid;