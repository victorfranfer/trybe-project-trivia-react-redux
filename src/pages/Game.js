import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { scoreAction, thunkQuestions } from '../redux/actions';
import './Game.css';

const BASE_POINTS = 10;
const DIFFICULTY_POINTS = { easy: 1, medium: 2, hard: 3 };
class Game extends React.Component {
  state = {
    questionIndex: 0,
    correctColor: '',
    wrongColor: '',
    stopTimer: false,
    answer: '',
    nextDisable: false,
    reset: false,
    questionsShuffled: [],
    acertou: '',
  };

  componentDidMount = () => {
    const { getQuestions } = this.props;
    const token = localStorage.getItem('token');
    getQuestions(token);
  };

  changeAnswerState = () => {
    this.setState({ answer: '' });
  };

  componentDidUpdate = () => {
    const { questionIndex, answer, acertou } = this.state;
    const { seconds, updateScore, questions } = this.props;
    if (answer === 'correct') {
      this.setState({acertou: true})
      const { difficulty } = questions[questionIndex];
      const points = BASE_POINTS + seconds * DIFFICULTY_POINTS[difficulty];
      this.changeAnswerState();
      updateScore(points);
    }
  };

  componentWillUnmount = () => {
    this.setState({
      correctColor: '',
      wrongColor: '',
      stopTimer: false,
      answer: '',
      nextDisable: false,
    });
  }

  // source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  randomizeOptions = (questions) => {
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions;
    const answersArray = [...incorrectAnswers, correctAnswer];
    this.shuffle(answersArray);
    return answersArray;
  };

  handleColor = (target) => {
    const { id } = target;
    this.setState({
      correctColor: '3px solid rgb(6, 240, 15)',
      wrongColor: '3px solid rgb(255, 0, 0)',
      stopTimer: true,
      answer: id,
      nextDisable: true,
      reset: false,
    });
  };

  questionButtons = (questions) => {
    const { correctColor, wrongColor, questionsShuffled } = this.state;
    const { correct_answer: correctAnswer } = questions;
    const { disableOptions } = this.props;
    return (
      <div className="answer-container" data-testid="answer-options">
        {questionsShuffled.map((option, index) => {
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
                {this.decodeEntity(correctAnswer)}
              </button>
            );
          }
          return (
            <button
              key={ index }
              type="button"
              disabled={ disableOptions }
              data-testid={ `wrong-answer-${index}` }
              id="wrong"
              style={ { border: wrongColor } }
              onClick={ (e) => this.handleColor(e.target) }
            >
              {this.decodeEntity(option)}
            </button>
          );
        })}
      </div>
    );
  }

  sectionType = (questions) => {
    const { questionsShuffled } = this.state;
    if (questionsShuffled.length === 0) {
      const randomOptions = this.randomizeOptions(questions);
      this.setState({
        questionsShuffled: randomOptions,
      });
    }
    return this.questionButtons(questions);
  };

  redirectFunction = () => {
    const { history, redirect } = this.props;
    if (redirect) history.push('/');
  };

  nextQuestion = () => {
    const { questionIndex } = this.state;
    const { history, questions } = this.props;
    if (questionIndex < questions.length - 1) {
      this.setState((prevState) => ({
        questionIndex: prevState.questionIndex + 1,
        correctColor: '',
        wrongColor: '',
        stopTimer: false,
        answer: '',
        nextDisable: false,
        reset: true,
        questionsShuffled: [],
      }));
    } else {
      this.setState({ answer: '' });
      history.push('/feedback');
    }
  };

  // Post de Jessy Damasceno da Turma 21A
  // source:https://trybecourse.slack.com/archives/C03229WPQDA/p1656603304324169
  decodeEntity = (inputStr) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = inputStr;
    return textarea.value;
  }

  render() {
    const { questionIndex, stopTimer, nextDisable, reset, acertou } = this.state;
    const { questions, isLoading } = this.props;
    this.redirectFunction();
    if (isLoading) return <div>carregando...</div>;
    const { category, question } = questions[questionIndex];
    return (
      <main>
        <Header />
        <div className="container">
          <Timer stopTimer={ stopTimer } reset={ reset } />
          <h3 data-testid="question-category">{category}</h3>
          <h4 data-testid="question-text">{this.decodeEntity(question)}</h4>
          {this.sectionType(questions[questionIndex])}
          {nextDisable && (
            <div>
              <button
                type="button"
                data-testid="btn-next"
                onClick={ () => this.nextQuestion() }
              >
                Next
              </button>
              {acertou ? (<h4>Congratulations, keep doing well!!!</h4>):(<h4>It wasn't this time, but don't give up!</h4>) }
            </div>
          )}
        </div>
      </main>
    );
  }
}

Game.propTypes = {
  disableOptions: PropTypes.bool.isRequired,
  seconds: PropTypes.number.isRequired,
  updateScore: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      correct_answer: PropTypes.string.isRequired,
      incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
      difficulty: PropTypes.string.isRequired,
    }),
  ).isRequired,
  redirect: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  disableOptions: state.timer.isDisabled,
  seconds: state.timer.secondsLeft,
  questions: state.game.questions,
  isLoading: state.game.isLoading,
  redirect: state.game.redirect,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (pontos) => dispatch(scoreAction(pontos)),
  getQuestions: (token) => dispatch(thunkQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
