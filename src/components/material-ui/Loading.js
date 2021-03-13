// Material UI
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 1000,
    color: '#8a2be2',
    background: 'rgba(255, 255, 255, 0.1)',
  },
}));

const Loading = ({ open }) => {
  const classes = useStyles();
  console.log(open);

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};

export default Loading;
