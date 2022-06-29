import React from "react";
import App from "../../App"
import userEvent from "@testing-library/user-event";
import Login from '../../pages/Login';
import {renderWithRouterAndRedux} from './renderWithRouterAndRedux'
import { screen } from '@testing-library/react';
import { toBeInTheDocument } from "@testing-library/jest-dom";

describe('teste na página de Login', () => {
  it('testa se o componente de Login está sendo renderizado', () => {
    const { history, store } = renderWithRouterAndRedux(<App />)


    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    

    const email = screen.getByRole('textbox', { name: /email/i });
  
    const btnPlay = screen.getByRole('button', { name: /Play/i });
    

    userEvent.type(email, 'teste@gmail.com')

    expect(btnPlay).toHaveProperty('disabled', true);
    userEvent.type(nameInput, '123')

    expect(btnPlay).toHaveProperty('disabled', false);
  
    userEvent.click(btnPlay);
    
    //const storage = jest.spyOn(localStorage, 'setItem')
    //expect(localStorage.setItem).toHaveBeenCalled()
    

    const textId = screen.getByText(/carregando.../i);
    expect(textId).toBeInTheDocument();
   // const storageData = jest.spyOn(global.localStorage, 'setItem')
    //expect(storageData).toHaveBeenCalledTimes(1);
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
   // const storageData = jest.spyOn(global.localStorage, 'setItem')
    //expect(storageData).toHaveBeenCalledTimes(1);
  });
}) ;