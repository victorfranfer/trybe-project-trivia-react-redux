import React from 'react';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    category: '',
    type: '',
    question: '',
    correctAnswer: '',
    incorrectAnswers: [],
  }

  requestQuestions = async () => {
    const token = localStorage.getItem('token');
    console.log(token);
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await response.json();
    console.log(questions.results[0]);
    this.setState({
      category: questions.results[0].category,
      type: questions.results[0].type,
      question: questions.results[0].question,
      correctAnswer: questions.results[0].correct_answer,
      incorrectAnswers: questions.results[0].incorrect_answers,
    });
  };

  componentDidMount = () => {
    this.requestQuestions();
  }

  sectionType = () => {
    const { type, correctAnswer, incorrectAnswers } = this.state;
    if (type === 'multiple') {
      return (
        <section data-testid="answer-options">
          <button type="button" data-testid="correct-answer">
            { correctAnswer }
          </button>
          <button
            type="button"
            data-testid={ `wrong-answer-${incorrectAnswers[0]}` }
          >
            { incorrectAnswers[0] }
          </button>
          <button
            type="button"
            data-testid={ `wrong-answer-${incorrectAnswers[1]}` }
          >
            { incorrectAnswers[1] }
          </button>
          <button
            type="button"
            data-testid={ `wrong-answer-${incorrectAnswers[2]}` }
          >
            { incorrectAnswers[2] }
          </button>
        </section>
      );
    }
    return (
      <section data-testid="answer-options">
        <button type="button" data-testid="correct-answer">
          { correctAnswer }
        </button>
        <button
          type="button"
          data-testid={ `wrong-answer-${incorrectAnswers[0]}` }
        >
          { incorrectAnswers[0] }
        </button>
      </section>
    );
  }

  render() {
    const { category, question } = this.state;
    return (
      <main>
        <Header />
        <h3 data-testid="question-category">{ category }</h3>
        <h6 data-testid="question-text">{ question }</h6>
        { this.sectionType() }
      </main>
    );
  }
}

export default Game;
