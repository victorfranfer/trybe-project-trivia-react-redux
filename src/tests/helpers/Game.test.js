import React from "react";
import App from "../../App"
import userEvent from "@testing-library/user-event";
import Game from '../../pages/Game';
import {renderWithRouterAndRedux} from './renderWithRouterAndRedux'
import { screen, waitFor } from '@testing-library/react';
import { toBeInTheDocument } from "@testing-library/jest-dom";

const questionsResponse = {
  response_code: 0,
  results: [
    {
      "category": "Geography",
      "type": "boolean",
      "difficulty": "easy",
      "question": "The Republic of Malta is the smallest microstate worldwide.",
      "correct_answer": "False",
      "incorrect_answers": [
        "True"
      ]
    },
    {
      "category": "Science & Nature",
      "type": "multiple",
      "difficulty": "hard",
      "question": "In quantum physics, which of these theorised sub-atomic particles has yet to be observed?",
      "correct_answer": "Graviton",
      "incorrect_answers": [
        "Z boson",
        "Tau neutrino",
        "Gluon"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "medium",
      "question": "Generally, which component of a computer draws the most power?",
      "correct_answer": "Video Card",
      "incorrect_answers": [
        "Hard Drive",
        "Processor",
        "Power Supply"
      ]
    },
    {
      "category": "Entertainment: Video Games",
      "type": "multiple",
      "difficulty": "easy",
      "question": "What is the most expensive weapon in Counter-Strike: Global Offensive?",
      "correct_answer": "Scar-20/G3SG1",
      "incorrect_answers": [
        "M4A1",
        "AWP",
        "R8 Revolver"
      ]
    },
    {
      "category": "Entertainment: Japanese Anime & Manga",
      "type": "multiple",
      "difficulty": "hard",
      "question": "Who was the Author of the manga Uzumaki?",
      "correct_answer": "Junji Ito",
      "incorrect_answers": [
        "Noboru Takahashi",
        "Akira Toriyama",
        "Masashi Kishimoto",
      ],
    },
  ],
};

const initialState = {
  game: {
    questions: questionsResponse.results,
    isLoading: true,
    redirect: false,
  }
};

const initialState2 = {
  game: {
    questions: questionsResponse.results,
    isLoading: false,
    redirect: false,
  },
}

const mockFetch = () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(questionsResponse),
  }))
}

describe('teste na página Game', () => {
  beforeEach(mockFetch);
  afterEach(() => jest.clearAllMocks());

  it('testa se aparece a mensagem /carregando/ antes da requisição da API', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState)
    history.push('/game');

    const carregando = screen.getByText(/carregando.../i);
    expect(carregando).toBeInTheDocument();
  });
  
  it('testa se os componentes estão sendo renderizados', async () => {
    const { history, store } = renderWithRouterAndRedux(<App />, initialState2);
    history.push('/game');

    const playerPicture = screen.getByTestId('header-profile-picture');
    expect(playerPicture).toBeInTheDocument();
    
    const playerName = screen.getByTestId('header-player-name');
    expect(playerName).toBeInTheDocument();

    const playerScore = screen.getByTestId('header-score');
    expect(playerScore).toBeInTheDocument();

    const timer = screen.getByTestId('timer');
    expect(timer).toBeInTheDocument();

    const questionCategory = screen.getByTestId('question-category');
    expect(questionCategory).toBeInTheDocument();

    const questionText = screen.getByTestId('question-text');
    expect(questionText).toBeInTheDocument();

    const answerOptions = screen.getByTestId('answer-options');
    expect(answerOptions).toBeInTheDocument();

    const correctAnswer = screen.getByTestId('correct-answer');
    expect(correctAnswer).toBeInTheDocument();

    const incorrectAnswers = document.getElementById('wrong');
    // const incorrectAnswers = screen.getByRole('button', {
    //   name: /true/i,
    // });
    expect(incorrectAnswers).toBeInTheDocument();

    userEvent.click(correctAnswer);

    expect(playerScore).toHaveTextContent('10');
    
    const btnNext = screen.getByTestId('btn-next');
    expect(btnNext).toBeInTheDocument();

    userEvent.click(btnNext);
    expect(questionText).toHaveTextContent('In quantum physics, which of these theorised sub-atomic particles has yet to be observed?');
  });

  it('teste o botão de resposta errada', () => {
    const { history, store } = renderWithRouterAndRedux(<App />, initialState2);
    history.push('/game');

    const playerPicture = screen.getByTestId('header-profile-picture');
    
    const playerName = screen.getByTestId('header-player-name');

    const playerScore = screen.getByTestId('header-score');

    const timer = screen.getByTestId('timer');

    const questionCategory = screen.getByTestId('question-category');

    const questionText = screen.getByTestId('question-text');

    const answerOptions = screen.getByTestId('answer-options');

    const correctAnswer = screen.getByTestId('correct-answer');

    const incorrectAnswers = document.getElementById('wrong');
    // const incorrectAnswers = screen.getByRole('button', {
    //   name: /true/i,
    // });
    expect(incorrectAnswers).toBeInTheDocument();

    userEvent.click(incorrectAnswers);

    expect(playerScore).toHaveTextContent('0');
  });

  it('', () => {
    const { history, store } = renderWithRouterAndRedux(<App />, initialState2);
    history.push('/game');

    const playerPicture = screen.getByTestId('header-profile-picture');
    const playerName = screen.getByTestId('header-player-name');
    const playerScore = screen.getByTestId('header-score');
    const timer = screen.getByTestId('timer');
    const questionCategory = screen.getByTestId('question-category');
    const questionText = screen.getByTestId('question-text');
    const answerOptions = screen.getByTestId('answer-options');
    const correctAnswer = screen.getByTestId('correct-answer');
    const incorrectAnswers = document.getElementById('wrong');

    userEvent.click(correctAnswer);

    const btnNext = screen.getByTestId('btn-next');
    expect(btnNext).toBeInTheDocument();

    userEvent.click(btnNext);
    userEvent.click(correctAnswer);
    const btnNext2 = screen.getByTestId('btn-next');
    userEvent.click(btnNext2);
    userEvent.click(correctAnswer);
    const btnNext3 = screen.getByTestId('btn-next');
    userEvent.click(btnNext3);
    userEvent.click(correctAnswer);
    const btnNext4 = screen.getByTestId('btn-next');
    userEvent.click(btnNext4);
    userEvent.click(correctAnswer);
    const btnNext5 = screen.getByTestId('btn-next');
    userEvent.click(btnNext5);

    expect(history.location.pathname).toBe('/feedback');

    const btnPlayAgains = screen.getByTestId(/btn-play-again/i);
    expect(btnPlayAgains).toBeInTheDocument();

  })
}) ;