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
  const [currentToken, setCurrentToken] = useState('0');
  const [equation, setEquation] = useState('');
  const [answer, setAnswer] = useState(null);

  const endsWithOperand = /\d$/;
  const endsWithOperator = /[+-/*]$/;
  const endsWithNegative = /-$/;
  const isNegative = /-/;
  const isOperator = /[*/+-]/;
  const isMultiply = /X/;
  const isInteger = /\d/;
  const isNonNegOperator = /[*+/]/;

  const handleOperator = ({ currentTarget: { value } }) => {
    let input;
    if (isMultiply.test(value)) {
      input = value.replace('X', '*');
    } else {
      input = value;
    }
    const addOperator = () =>
      endsWithOperand.test(equation) && !equation.includes('=');

    const replaceOperator = () =>
      isInteger.test(equation.slice(-2, -1)) &&
      endsWithOperator.test(equation) &&
      isNonNegOperator.test(input);

    const addNegative = () =>
      isInteger.test(equation.slice(-2, -1)) &&
      endsWithOperator.test(equation) &&
      isNegative.test(input);

    const replaceTwoOperators = () =>
      isOperator.test(equation.slice(-2, -1)) &&
      endsWithNegative.test(equation) &&
      isNonNegOperator.test(input);

    const newEquation = () => equation === '';

    const existingEquation = () => equation.includes('=');

    const onlyOperator = () =>
      isOperator.test(currentToken) && isOperator.test(equation.slice(-1));

    if (addOperator()) {
      setCurrentToken(input);
      setEquation(equation + input);
      return;
    }

    if (replaceOperator()) {
      setCurrentToken(input);
      setEquation(equation.slice(0, -1) + input);
      return;
    }

    if (addNegative()) {
      setEquation(equation + input);
      setCurrentToken(input);
      return;
    }

    if (replaceTwoOperators()) {
      setEquation(equation.slice(0, -2) + input);
      setCurrentToken(input);
      return;
    }

    if (newEquation()) {
      setCurrentToken(input);
      setEquation(input);
      return;
    }

    if (existingEquation()) {
      setCurrentToken(input);
      setEquation(answer + input);
      return;
    }

    if (onlyOperator()) {
      setCurrentToken(input);
      setEquation(equation.slice(0, -1) + input);
    }
  };

  const handleOperand = ({ currentTarget: { value } }) => {
    const input = value;
    if (
      (isInteger.test(currentToken) && equation === '') ||
      (currentToken === '0' && equation === '0')
    ) {
      setCurrentToken(input);
      setEquation(input);
    } else if (isInteger.test(currentToken) && currentToken !== '0') {
      setCurrentToken(currentToken + input);
      setEquation(equation + input);
    } else if (isOperator.test(currentToken)) {
      setCurrentToken(input);
      setEquation(equation + input);
    }
  };

  const handleDecimal = ({ currentTarget: { value } }) => {
    const decimal = value;
    if (
      !currentToken.toString().includes('.') &&
      isInteger.test(currentToken) &&
      currentToken !== '0' &&
      !equation.includes('=')
    ) {
      setCurrentToken(currentToken.toString() + decimal);
      setEquation(equation + decimal);
    } else if (isOperator.test(currentToken)) {
      setCurrentToken(`0${decimal}`);
      setEquation(`${equation}0${decimal}`);
    } else if (equation.includes('=')) {
      setEquation('0.');
      setCurrentToken('0.');
    }
  };

  const handleClear = () => {
    setEquation('');
    setCurrentToken('0');
  };

  const handleEval = ({ currentTarget: { value } }) => {
    const input = value;
    console.log('eval:', input);
    const startsWithMultiOrDiv = /^[*/]/;
    if (!equation.includes('=') && !startsWithMultiOrDiv.test(equation)) {
      // eslint-disable-next-line no-eval
      const result = eval(equation);
      setAnswer(result);
      setCurrentToken(result);
      setEquation(`${equation}=${result}`);
    } else {
      console.log('handleEval to be condition 2');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.container}>
        <Grid className={classes.grid} container spacing={1}>
          <Grid item xs={12}>
            <Paper elevation={12} className={classes.screen}>
              <Typography className={classes.output} variant="subtitle1">
                {equation}
              </Typography>
              <Typography id="display" className={classes.output} variant="h5">
                {currentToken}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Button
              id="clear"
              value="AC"
              onClick={handleClear}
              variant="contained"
              color="secondary"
              fullWidth
            >
              AC
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="divide"
              value="/"
              variant="contained"
              onClick={handleOperator}
              className={classes.operation}
              fullWidth
            >
              /
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="multiply"
              value="X"
              onClick={handleOperator}
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
              value="7"
              variant="contained"
              onClick={handleOperand}
              fullWidth
            >
              7
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="eight"
              value="8"
              variant="contained"
              onClick={handleOperand}
              fullWidth
            >
              8
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="nine"
              value="9"
              variant="contained"
              onClick={handleOperand}
              fullWidth
            >
              9
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="subtract"
              value="-"
              variant="contained"
              className={classes.operation}
              onClick={handleOperator}
              fullWidth
            >
              -
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="four"
              value="4"
              variant="contained"
              onClick={handleOperand}
              fullWidth
            >
              4
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="five"
              value="5"
              variant="contained"
              onClick={handleOperand}
              fullWidth
            >
              5
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="six"
              value="6"
              variant="contained"
              onClick={handleOperand}
              fullWidth
            >
              6
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="add"
              value="+"
              variant="contained"
              className={classes.operation}
              onClick={handleOperator}
              fullWidth
            >
              +
            </Button>
          </Grid>
          <Grid container item className={classes.fixedHeight} spacing={1}>
            <Grid item xs={3}>
              <Button
                id="one"
                value="1"
                variant="contained"
                onClick={handleOperand}
                fullWidth
              >
                1
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                id="two"
                value="2"
                variant="contained"
                onClick={handleOperand}
                fullWidth
              >
                2
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                id="three"
                value="3"
                variant="contained"
                onClick={handleOperand}
                fullWidth
              >
                3
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                id="equals"
                value="="
                className={`${classes.equals}`}
                color="primary"
                variant="contained"
                onClick={handleEval}
                fullWidth
              >
                =
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Button
              id="zero"
              value="0"
              variant="contained"
              onClick={handleOperand}
              fullWidth
            >
              0
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id="decimal"
              value="."
              variant="contained"
              onClick={handleDecimal}
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
