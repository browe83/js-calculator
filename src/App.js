import './App.css';
import React, { useState } from 'react';
import { Container, Grid, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontFamily: 'digital-7',
    },
    h5: {
      fontFamily: 'digital-7',
    },
  },
});

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
  grid: {
    width: '320px',
  },
  screen: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    '&:first-child': {
      paddingTop: '10px',
    },
    '&:last-child': {
      paddingBottom: '5px',
    },
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
  },
  output: {
    paddingRight: '8px',
    minHeight: '20px',
    lineHeight: '1',
  },
});

function App() {
  const classes = useStyles();
  const [currentVal, setCurrentVal] = useState('0');
  const [prevVal, setPrevVal] = useState(null);
  const [equation, setEquation] = useState([]);

  const handleClick = (e) => {
    const input = e.target.innerHTML;
    const isOperand = input.match(/[0-9]/);
    const isOperator = input.match(/[/+\-X]/);
    const isEquals = input.match(/=/);
    const isDecimal = input.match(/./);
    const isClear = input.match(/AC/);
    const isFloat = input.match(/^\d*\.?\d*$/);
    const startsWithAngle = input.match(/</);
    if (startsWithAngle) {
      return;
    }
    if (input === '0' && equation[0] === '0') {
      return;
    }
    if (isClear) {
      setCurrentVal('0');
      setPrevVal(null);
      setEquation([]);
    } else if (currentVal === '0' && prevVal === null) {
      setCurrentVal(input);
      setPrevVal(input);
      setEquation(input);
    } else {
      setPrevVal(currentVal);
      console.log('prevVal:', prevVal);
      setCurrentVal(equation + input);
      setEquation(equation + input);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.container}>
        <Grid className={classes.grid} container spacing={1}>
          <Grid id="display" item xs={12}>
            <Paper elevation={12} className={classes.screen}>
              <Typography className={classes.output} variant="subtitle1">
                {equation}
              </Typography>
              <Typography className={classes.output} variant="h5">
                {currentVal}
              </Typography>
            </Paper>
          </Grid>
          <Grid onClick={handleClick} item xs={6}>
            <Button id="clear" variant="contained" color="secondary" fullWidth>
              AC
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="divide"
              variant="contained"
              onClick={handleClick}
              className={classes.operation}
              fullWidth
            >
              /
            </Button>
          </Grid>
          <Grid onClick={handleClick} item xs={3}>
            <Button
              id="multiply"
              variant="contained"
              className={classes.operation}
              fullWidth
            >
              X
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="seven"
              variant="contained"
              onClick={handleClick}
              fullWidth
            >
              7
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="eight"
              variant="contained"
              onClick={handleClick}
              fullWidth
            >
              8
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="nine"
              variant="contained"
              onClick={handleClick}
              fullWidth
            >
              9
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="subtract"
              variant="contained"
              className={classes.operation}
              onClick={handleClick}
              fullWidth
            >
              -
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="four"
              variant="contained"
              onClick={handleClick}
              fullWidth
            >
              4
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="five"
              variant="contained"
              onClick={handleClick}
              fullWidth
            >
              5
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="six"
              variant="contained"
              onClick={handleClick}
              fullWidth
            >
              6
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="add"
              variant="contained"
              className={classes.operation}
              onClick={handleClick}
              fullWidth
            >
              +
            </Button>
          </Grid>
          <Grid container item className={classes.fixedHeight} spacing={1}>
            <Grid item xs={3}>
              <Button
                id="one"
                variant="contained"
                onClick={handleClick}
                fullWidth
              >
                1
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                id="two"
                variant="contained"
                onClick={handleClick}
                fullWidth
              >
                2
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                id="three"
                variant="contained"
                onClick={handleClick}
                fullWidth
              >
                3
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                id="equals"
                className={`${classes.equals}`}
                color="primary"
                variant="contained"
                onClick={handleClick}
                fullWidth
              >
                =
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Button
              id="zero"
              variant="contained"
              onClick={handleClick}
              fullWidth
            >
              0
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="decimal"
              variant="contained"
              onClick={handleClick}
              fullWidth
            >
              .
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
