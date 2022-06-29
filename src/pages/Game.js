import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Timer from '../components/Timer';

class Game extends React.Component {
  state = {
    question0: {},
    // question1: {},
    // question2: {},
    // question3: {},
    // question4: {},
    isLoading: true,
  }

  requestQuestions = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    console.log(token);
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await response.json();
    console.log(questions.response_code);
    if (questions.response_code > 0) {
      localStorage.removeItem('token');
      history.push('/');
    }
    console.log(questions.results);
    this.setState({
      question0: {
        category: questions.results[0].category,
        type: questions.results[0].type,
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

  // source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle = (array) => {
    let currentIndex = array.length; let
      randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  randomizeOptions = () => {
    const { question0 } = this.state;
    console.log(question0);
    const { correctAnswer, incorrectAnswers } = question0;
    const answersArray = [...incorrectAnswers, correctAnswer];
    this.shuffle(answersArray);
    return answersArray;
  }

  sectionType = () => {
    const { question0 } = this.state;
    const { correctAnswer } = question0;
    const randomOptions = this.randomizeOptions();
    const { isDisabled } = this.props;
    // if (type === 'multiple') {
    return (
      <div data-testid="answer-options">
        { randomOptions.map((option, index) => {
          if (option === correctAnswer) {
            return (
              <button type="button" disabled={ isDisabled } data-testid="correct-answer">
                { correctAnswer }
              </button>
            );
          } return (
            <button
              type="button"
              disabled={ isDisabled }
              data-testid={ `wrong-answer-${index}` }
              key={ index }
            >
              { option }
            </button>
          );
        })}
      </div>
    );
  }

  render() {
    const { question0, isLoading } = this.state;
    const { category, question } = question0;
    if (isLoading) {
      return (
        <div>carregando...</div>
      );
    }
    return (
      <main>
        <Header />
        <Timer />
        <h3 data-testid="question-category">{ category }</h3>
        <h4 data-testid="question-text">{ question }</h4>
        { this.sectionType() }
      </main>
    );
  }
}

Game.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
