import React from 'react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';
import { screen } from '@testing-library/react';

describe('Testes da tela de feedback', () => {
  it('Verifica se possui as informações da pessoa jogadora', () => {
    const initialState = {
      player: {
        name: 'Teste',
        assertions: 3,
        score: 90,
        gravatarEmail: 'teste@mail.com',
      }
    }

    renderWithRouterAndRedux(<Feedback />, initialState);

    const name = screen.getByTestId(/header-player-name/i);
    expect(name).toBeInTheDocument();

    const image = screen.getByAltText(/Teste/i);
    expect(image).toBeInTheDocument();

    const score = screen.getByTestId(/header-score/i)
    expect(score).toBeInTheDocument();
  })

  it('Verifica se possui uma mensagem de feedback', () => {
    const initialState = {
      player: {
        name: 'Teste',
        assertions: 3,
        score: 90,
        gravatarEmail: 'teste@mail.com',
      }
    }

    renderWithRouterAndRedux(<Feedback />, initialState);

    const feedback = screen.getByTestId(/feedback-text/i);
    expect(feedback).toHaveTextContent('Well Done!');
  })  

  it('Verifica se possui as informações relacionadas a resultados', () => {
    const initialState = {
      player: {
        name: 'Teste',
        assertions: 3,
        score: 90,
        gravatarEmail: 'teste@mail.com',
      }
    }

    renderWithRouterAndRedux(<Feedback />, initialState);

    const finalScore = screen.getByTestId(/feedback-total-score/i);
    expect(finalScore).toHaveTextContent('90');

    const totalQuestions = screen.getByTestId(/feedback-total-question/i);
    expect(totalQuestions).toHaveTextContent('3');
  })

  it('Verifica se possui o botão de jogar novamente', () => {
    renderWithRouterAndRedux(<Feedback />);

    const 
  })
});