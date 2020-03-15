import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import App from './App';

test('dialog renders when table entry is clicked', async () => {
  const appComponent = render(<App />);
  const tableEntry = appComponent.getAllByText(/Global Error Caught/i)
  fireEvent.click(tableEntry[0])
  const dialogElement = await waitForElement(() => {
    return appComponent.getByText(/log body/i)
  })

  expect(dialogElement).toBeInTheDocument();
})

// Only one warning entry exists in the json, so when filtering by warning only 1 entry should get returned
test('filtering table by log type works', async () => {
  const appComponent = render(<App />);

  const normalCheckbox = query('.filter-checkbox.normal input');
  const errorCheckbox  = query('.filter-checkbox.error input');

  fireEvent.click(normalCheckbox);
  fireEvent.click(errorCheckbox);
  
  const applyFilterButton = appComponent.getByText(/apply filter/i);
  fireEvent.click(applyFilterButton);

  let tableEntries = document.querySelectorAll('tbody tr')
  expect(tableEntries.length).toEqual(1);
})

test('sorting table by subject works', () => {
  render(<App />);
  const subjectHeader = query('thead tr th:last-of-type');

  fireEvent.click(subjectHeader);
  let firstEntry = query('tbody tr td:last-of-type').textContent;
  expect(firstEntry).toEqual('Warning Test')

  fireEvent.click(subjectHeader);
  let secondEntry = query('tbody tr td:last-of-type').textContent;
  expect(secondEntry).toEqual('Competitive Comparison successfully executed.')
})

test('sorting table by date works', () => {
  render(<App />);
  const subjectHeader = query('thead tr th:first-of-type');

  fireEvent.click(subjectHeader);
  let firstEntry = query('tbody tr td:first-of-type').textContent;
  expect(firstEntry).toEqual('2020-03-15 14:00:00')

  fireEvent.click(subjectHeader);
  let secondEntry = query('tbody tr td:first-of-type').textContent;
  expect(secondEntry).toEqual('2019-05-29 08:57:01')
})

function query(queryString:string){
  const element = document.querySelector(queryString);
  if(element){
    return element
  }
  throw new Error(`${queryString} not found in document.`)
}