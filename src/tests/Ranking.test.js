import React from 'react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Ranking from '../pages/Ranking';
import { screen } from '@testing-library/react';

const initialState = {}

const mock = '[{ "name": "", "score": 0, "picture": "" }]';

describe('Testes da tela de Ranking', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => '[{ "name": "", "score": 0, "picture": "" }]')
      },
    })
  })

  it('Verifica se possui o botão para ir ao início', () => {
    renderWithRouterAndRedux(<App />, initialState , '/ranking');

    const btnHome = screen.getByRole('button', {
      name: /Sair do Jogo/i,
    });

    userEvent.click(btnHome);

    const inputName = screen.getByRole('input', {
      name: /Nome:/i,
    });
    expect(inputName).toBeInTheDocument();
  })
});