import React from 'react';
import Header from '../components/Header';

class Game extends React.Component {

  requestQuestions = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await response.json();
    console.log(questions.category);
    // this.setState({
    //   token,
    // });
    // localStorage.setItem('token', JSON.stringify(token.token));
  };

  componentDidMount() {
    requestQuestions();
  }

  render() {
    return (
      <main>
        <Header />
        <h3 data-testid="question-category">category</h3>
        <h6 data-testid="question-text">question</h6>
        <section data-testid="answer-options">
          <button type="submit" data-testid="correct-answer">Option1</button>
          <button type="submit" data-testid={ `wrong-answer-` }>Option2</button>
          <button type="submit" data-testid={ `wrong-answer-` }>Option3</button>
          <button type="submit" data-testid={ `wrong-answer-` }>Option4</button>
        </section>
      </main>

export default Game;
