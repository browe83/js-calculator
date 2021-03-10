import './App.css';
import { Container, Grid, Button, Paper, createMuiTheme, ThemeProvider, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';



const useStyles = makeStyles({
  container: {
    backgroundColor: 'grey',
    width: '700px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calculator: {
    width: '320px',
    border: '10px solid black'
  },
  grid: {
    width: '320px',
    border: '10px solid yellow',

  },
  screen: {
    height: '30px',
  },
  equals: {
    height: '78px',
  },
  fixedHeight: {
    height: '35px',
    overflow: 'visible',
    marginBottom: '12px',
  },
  operation: {
    backgroundColor: green[500],
    '&:hover': {
        backgroundColor: green[700],
      },
  }
})

function App() {
  const classes = useStyles();
  const theme = useTheme();
  console.log('theme:', theme);
  console.log('green:', green);
  return (
    <Container className={classes.container}>
       <Grid className={classes.grid} container spacing={1}>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.screen}></Paper>
        </Grid>
        <Grid item xs={6} >
          <Button variant='contained' color='secondary' fullWidth>AC</Button>
        </Grid>
        <Grid item xs={3}>
            <Button variant='contained' className={classes.operation} fullWidth>/</Button>
        </Grid>
        <Grid item xs={3}>
            <Button variant='contained' className={classes.operation} fullWidth>X</Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant='contained' fullWidth>7</Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant='contained' fullWidth>8</Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant='contained' fullWidth>9</Button>
        </Grid>
        <Grid item xs={3}>
            <Button variant='contained' className={classes.operation} fullWidth>-</Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant='contained' fullWidth>4</Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant='contained' fullWidth>5</Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant='contained' fullWidth>6</Button>
        </Grid>
        <Grid item xs={3}>
            <Button variant='contained' className={classes.operation} fullWidth>+</Button>
        </Grid>
        <Grid container item className={classes.fixedHeight} spacing={1}>
          <Grid item xs={3}>
            <Button variant='contained' fullWidth>1</Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant='contained' fullWidth>6</Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant='contained' fullWidth>3</Button>
          </Grid>
          <Grid item xs={3}>
            <Button className={`${classes.equals}`} color='primary' variant='contained' fullWidth>=</Button>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Button variant='contained' fullWidth>0</Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant='contained' fullWidth>.</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;

