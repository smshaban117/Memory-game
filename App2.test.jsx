import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import App from './App2';
import { expect, test } from 'vitest';


test('list contains 5 animals', () => {
    render(<App/>)

    const listElement = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');

    
    expect(listElement).toBeInTheDocument();
    expect(listElement).toHaveClass('animals');
    expect(listItems.length).toEqual(5);
});