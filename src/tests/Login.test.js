import React from "react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import {renderWithRouterAndRedux} from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import { questionsAction } from '../redux/actions';

const mockData = {
  "response_code":0,
  "response_message":"Token Generated Successfully!",
  "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
}

const initialState = {
  game: {
    questions: [],
    isLoading: true,
    redirect: false,
  }
}

const mockQuestions = [
  {
    "category":"Entertainment: Video Games",
    "type":"multiple",
    "difficulty":"easy",
    "question":"What is the first weapon you acquire in Half-Life?",
    "correct_answer":"A crowbar",
    "incorrect_answers":[
        "A pistol",
        "The H.E.V suit",
        "Your fists"
    ]
  }
];

const mockFetch = () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(mockData),
  }))
}

describe('teste na página de Login', () => {
  // beforeEach(mockFetch);
  // afterEach(() => jest.clearAllMocks());

  it('testa se o componente de Login está sendo renderizado', () => {
    const { history, store } = renderWithRouterAndRedux(<App />, initialState)

    const nameInput = screen.getByTestId(/input-player-name/i);
    expect (nameInput).toBeInTheDocument();

    const email = screen.getByTestId(/input-gravatar-email/i);
    expect (email).toBeInTheDocument();
  
    const btnPlay = screen.getByRole('button', { name: /Play/i });
    expect(btnPlay).not.toBeEnabled();
    
    userEvent.type(email, 'teste@gmail.com');
    expect(email.value).toBe('teste@gmail.com');

    expect(btnPlay).not.toBeEnabled();
    userEvent.type(nameInput, 'teste')
    expect(nameInput.value).toBe('teste')

    expect(btnPlay).toBeEnabled();

    userEvent.click(btnPlay);

    // console.log(store.getState().game);

    // console.log(history.location.pathname);
  });

  it('testa se o componente de Login está sendo renderizado', () => {
    const { history } = renderWithRouterAndRedux(<App />)


    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    

    const email = screen.getByRole('textbox', { name: /email/i });
    expect(email).toBeInTheDocument();

    const btnPlay = screen.getByRole('button', { name: /Play/i });
    expect(btnPlay).toHaveProperty('disabled', true);

    userEvent.type(email, 'teste@gmail.com')

    expect(btnPlay).toHaveProperty('disabled', true);
    userEvent.type(nameInput, '123')

    expect(btnPlay).toHaveProperty('disabled', false);
    const btnConfig = screen.getByRole('button', { name: /configurações/i });
    expect(btnConfig).toBeInTheDocument();
    userEvent.click(btnConfig);
    
    const textId = screen.getByText(/configurações/i);
    expect(textId).toBeInTheDocument();
  });
}) ;