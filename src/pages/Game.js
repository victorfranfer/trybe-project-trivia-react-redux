import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { scoreAction } from '../redux/actions';

const BASE_POINTS = 10;
const DIFFICULTY_POINTS = { easy: 1, medium: 2, hard: 3 };
class Game extends React.Component {
  state = {
    question0: {},
    // question1: {},
    // question2: {},
    // question3: {},
    // question4: {},
    isLoading: true,
    correctColor: '',
    wrongColor: '',
    stopTimer: false,
    answer: '',
  }

  requestQuestions = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await response.json();
    if (questions.response_code > 0) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      question0: {
        category: questions.results[0].category,
        type: questions.results[0].type,
        difficulty: questions.results[0].difficulty,
        question: questions.results[0].question,
        correctAnswer: questions.results[0].correct_answer,
        incorrectAnswers: questions.results[0].incorrect_answers,
      },
      // question1: {
      //   category: questions.results[1].category,
      //   type: questions.results[1].type,
      //   question: questions.results[1].question,
      //   correctAnswer: questions.results[1].correct_answer,
      //   incorrectAnswers: questions.results[1].incorrect_answers,
      // },
      // question2: {
      //   category: questions.results[2].category,
      //   type: questions.results[2].type,
      //   question: questions.results[2].question,
      //   correctAnswer: questions.results[2].correct_answer,
      //   incorrectAnswers: questions.results[2].incorrect_answers,
      // },
      // question3: {
      //   category: questions.results[3].category,
      //   type: questions.results[3].type,
      //   question: questions.results[3].question,
      //   correctAnswer: questions.results[3].correct_answer,
      //   incorrectAnswers: questions.results[3].incorrect_answers,
      // },
      // question4: {
      //   category: questions.results[4].category,
      //   type: questions.results[4].type,
      //   question: questions.results[4].question,
      //   correctAnswer: questions.results[4].correct_answer,
      //   incorrectAnswers: questions.results[4].incorrect_answers,
      // },
      isLoading: false,
    });
  };

  componentDidMount = () => {
    this.requestQuestions();
  }

  componentDidUpdate = (prevProps) => {
    const { answer, question0 } = this.state;
    const { seconds, updateScore } = this.props;
    if (answer === 'correct' && prevProps.seconds !== seconds) {
      const { difficulty } = question0;
      const points = BASE_POINTS + (seconds * DIFFICULTY_POINTS[difficulty]);
      updateScore(points);
    }
  };

  // source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  randomizeOptions = () => {
    const { question0 } = this.state;
    const { correctAnswer, incorrectAnswers } = question0;
    const answersArray = [...incorrectAnswers, correctAnswer];
    this.shuffle(answersArray);
    return answersArray;
  }

  handleColor = (target) => {
    const { id } = target;
    this.setState({
      correctColor: '3px solid rgb(6, 240, 15)',
      wrongColor: '3px solid rgb(255, 0, 0)',
      stopTimer: true,
      answer: id,
    });
  }

  sectionType = () => {
    const { question0, correctColor, wrongColor } = this.state;
    const { correctAnswer } = question0;
    const randomOptions = this.randomizeOptions();
    const { disableOptions } = this.props;
    return (
      <div data-testid="answer-options">
        { randomOptions.map((option, index) => {
          if (option === correctAnswer) {
            return (
              <button
                key={ index }
                type="button"
                disabled={ disableOptions }
                data-testid="correct-answer"
                id="correct"
                style={ { border: correctColor } }
                onClick={ (e) => this.handleColor(e.target) }
              >
                { correctAnswer }
              </button>
            );
          } return (
            <button
              key={ index }
              type="button"
              disabled={ disableOptions }
              data-testid={ `wrong-answer-${index}` }
              id="wrong"
              style={ { border: wrongColor } }
              onClick={ (e) => this.handleColor(e.target) }
            >
              { option }
            </button>
          );
        })}
      </div>
    );
  }

  render() {
    const { question0, isLoading, stopTimer } = this.state;
    const { category, question } = question0;
    if (isLoading) return (<div>carregando...</div>);
    return (
      <main>
        <Header />
        <Timer stopTimer={ stopTimer } />
        <h3 data-testid="question-category">{ category }</h3>
        <h4 data-testid="question-text">{ question }</h4>
        { this.sectionType() }
      </main>
    );
  }
}

Game.propTypes = {
  disableOptions: PropTypes.bool.isRequired,
  seconds: PropTypes.number.isRequired,
  updateScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  disableOptions: state.timer.isDisabled,
  seconds: state.timer.secondsLeft,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (pontos) => dispatch(scoreAction(pontos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
