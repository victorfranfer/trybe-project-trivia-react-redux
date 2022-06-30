import React from "react";
import App from "../../App"
import userEvent from "@testing-library/user-event";
import Game from '../../pages/Game';
import {renderWithRouterAndRedux} from './renderWithRouterAndRedux'
import { screen } from '@testing-library/react';
import { toBeInTheDocument } from "@testing-library/jest-dom";


describe('teste na página Game', () => {
  it('testa se aparece a mensagem /carregando/ antes da requisição da API', () => {
    const { history, store } = renderWithRouterAndRedux(<Game />)

    const carregando = screen.getByText(/carregando.../i);
    expect(carregando).toBeInTheDocument();
  });
  
  it('testa se o componente de Header está sendo renderizado', () => {
    const { history, store } = renderWithRouterAndRedux(<Game />)

    jest.spyOn(global, 'fetch').mockImplementation(questionsAPIFetch)

    const playerPicture = screen.getByTestId('header-profile-picture');
    expect(playerPicture).toBeInTheDocument();
    
    const playerName = screen.getByTestId('header-player-name');
    expect(playerName).toBeInTheDocument();

    const playerScore = screen.getByTestId('header-score');
    expect(playerScore).toBeInTheDocument();
  });

  it('testa se o componente Timer está sendo renderizado', () => {
    const { history, store } = renderWithRouterAndRedux(<Game />)

    const timer = screen.getByTestId('timer');
    expect(timer).toBeInTheDocument();
  });

  it('testa se as perguntas estão sendo renderizadas', () => {
    const { history, store } = renderWithRouterAndRedux(<Game />)

    const questionCategory = screen.getByTestId('question-category');
    expect(questionCategory).toBeInTheDocument();

    const questionText = screen.getByTestId('question-text');
    expect(questionText).toBeInTheDocument();

    const answerOptions = screen.getByTestId('answer-options');
    expect(answerOptions).toBeInTheDocument();

    const correctAnswer = screen.getByTestId('correct-answer');
    expect(correctAnswer).toBeInTheDocument();

    const wrongAnswer0 = screen.getByTestId('wrong-answer-0');
    expect(wrongAnswer0).toBeInTheDocument();
  })

  // it('testa se o componente XXXX está sendo renderizado', () => {
  //   const { history } = renderWithRouterAndRedux(<App />)


  //   const nameInput = screen.getByRole('textbox', { name: /nome/i });
    

  //   const email = screen.getByRole('textbox', { name: /email/i });
  //   expect(email).toBeInTheDocument();

  //   const btnPlay = screen.getByRole('button', { name: /Play/i });
  //   expect(btnPlay).toHaveProperty('disabled', true);

  //   userEvent.type(email, 'teste@gmail.com')

  //   expect(btnPlay).toHaveProperty('disabled', true);
  //   userEvent.type(nameInput, '123')

  //   expect(btnPlay).toHaveProperty('disabled', false);
  //   const btnConfig = screen.getByRole('button', { name: /configurações/i });
  //   expect(btnConfig).toBeInTheDocument();
  //   userEvent.click(btnConfig);
    
  //   const textId = screen.getByText(/configurações/i);
  //   expect(textId).toBeInTheDocument();
  //  // const storageData = jest.spyOn(global.localStorage, 'setItem')
  //   //expect(storageData).toHaveBeenCalledTimes(1);
  // });
}) ;