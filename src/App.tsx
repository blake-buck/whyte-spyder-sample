import React, { useState } from 'react';
import moment from 'moment';

import Dialog from './Dialog/Dialog';
import Table from './Table/Table';
import Filter from './Filter/Filter';
import './App.scss';

import logData from './assets/SKUNinja-sample-logs.json';
import { AppState, UninitializedLogMessage, LogMessage } from './types';

function App() {

  let initialFilterOptions = {
    dateFrom:'',
    dateTo:'',
    timeFrom:'',
    timeTo:'',
    subjectIncludes:'',
    typeOne:true,
    typeTwo:true,
    typeThree:true
  }
  // In order to filter by date and time seperately, the original log messages need to be modified
  const initialLogMessages = logData.map((val:UninitializedLogMessage) => ({...val, dateCreated: moment(val.created.split(' ')[0]), timeCreated:moment(`2020-3-13 ${val.created.split(' ')[1]}`), created:moment(val.created)}))

  const [state, setState] = useState<AppState>({
    logMessages: [...initialLogMessages],
    selectedMessage:null,
    filterOptions:initialFilterOptions,
    sortByDateAsc:false,
    sortByTimeAsc:false,
    sortBySubjectAsc:false
  })

  return (
    <div>

      <header>
        <h1>Sample Log Tool</h1>
        <span>
          <button onClick={() => download(state.logMessages, 'csv')}  className='btn btn-warning'>Export CSV</button>
          <button onClick={() => download(state.logMessages, 'json')} className='btn btn-warning'>Export JSON</button>
        </span>
      </header>

      <Filter filterOptions={state.filterOptions} changeFilterOptions={changeFilterOptions} clearFilter={clearFilter} applyFilter={applyFilter}/>
      
      <Table logMessages={state.logMessages} sortByDate={sortByDate} sortBySubject={sortBySubject} setState={setState}/>

      <Dialog selectedMessage={state.selectedMessage}/>

    </div>
  );

  function download(data:LogMessage[], type:string){
    let blobData:string[] = []

    if(type === 'json'){
      blobData.push(JSON.stringify(data))
    }

    if(type === 'csv' && data.length > 0){
      let stringToWrite = ''
      stringToWrite += Object.keys(data[0]).join(',') + '\n'
      // double looping, not great but needs to be done in order to store the various date/time values as strings and not moment objects
      data.map((message) => {
        let newLine = ''
        Object.values(message).map((val) => {
          if(typeof(val) === 'object' && val !== null){
            val = val.format('YYYY-MM-DD HH:mm:ss')
          }
          if(typeof(val) === 'string'){
            val = val.replace(/\n|,/g, '')
            val = val.replace(/,/g, '\,')
          }
          newLine += val + ','
        })

        stringToWrite += newLine.slice(0, newLine.length) + '\n'
        
      })
      blobData.push(stringToWrite.slice(0, stringToWrite.length -1))
      
    }

    // creates an invisible download link, adds it to the document, clicks it, and then removes it from the document
    let headerElement = document.querySelector('header');
    let downloadElement = document.createElement('a')

    downloadElement.style.display = 'none';
    downloadElement.download = `log_table.${type}`
    downloadElement.href = URL.createObjectURL(new Blob(blobData));
    
    headerElement?.append(downloadElement)
    downloadElement.click();
    headerElement?.removeChild(downloadElement)
  }

  

  function columnSort(a:LogMessage, b:LogMessage, column:string, ascending:boolean){
    if(column === 'date'){
      return sort(ascending, a.created.isAfter(b.created), b.created.isAfter(a.created))
    }
    if(column === 'subject'){
      return sort(ascending, a.subject.toLowerCase() > b.subject.toLowerCase(), b.subject.toLowerCase() > a.subject.toLowerCase())
    }
    return 0
  }

  function sort(ascending:boolean, firstCheck:boolean, secondCheck:boolean){
    let positionShifter = 1;

    if(!ascending){
      positionShifter = -1;
    }

    if(firstCheck){
      return 1 * positionShifter
    }

    if(secondCheck){
      return -1 * positionShifter
    }

    return 0
  }

  function changeFilterOptions(e:React.ChangeEvent<HTMLInputElement>, parameterToChange:string, isCheckbox?:boolean){
    e.persist();
    let value:string | boolean = e.target.value;
    if(isCheckbox){
      value = e.target.checked;
    }
    setState(state => ({
      ...state,
      filterOptions:{
        ...state.filterOptions,
        [parameterToChange]:value
      }
    }))
  }

  function applyFilter(){
    const filterDateFrom = moment(state.filterOptions.dateFrom);
    const filterDateTo = moment(state.filterOptions.dateTo);

    // In order for the moment.js package to work properly, there needs to be a date in addition to the hour, minute, second portion of the string; hence the placeholder 2020-3-13
    const filterTimeFrom = moment(`2020-3-13 ${state.filterOptions.timeFrom}`);
    const filterTimeTo = moment(`2020-3-13 ${state.filterOptions.timeTo}`)

    const filterSubjectIncludes = state.filterOptions.subjectIncludes.toLowerCase();

    setState(state => ({
      ...state, 
      // using initial log messages is necessary each time a filter is applied in order for the filter to apply to all log messages
      logMessages: initialLogMessages
                      .filter((message:LogMessage) => 

                        // Filter by date
                        (state.filterOptions.dateFrom === '' || state.filterOptions.dateTo === '' || ( filterDateFrom.isSame(message.dateCreated) || filterDateTo.isSame(message.dateCreated) || message.dateCreated.isBetween(filterDateFrom,filterDateTo) )) &&   
                        
                        // Filter by time
                        (state.filterOptions.timeFrom === '' || state.filterOptions.timeTo === '' || (filterTimeFrom.isSame(message.timeCreated) || filterTimeTo.isSame(message.timeCreated) || message.timeCreated.isBetween(filterTimeFrom, filterTimeTo) )) &&          
                        
                        // Filter by subject text
                        (message.subject.toLowerCase().includes(filterSubjectIncludes)) &&
                        
                        // Filter by message type
                        (
                          (message.type === '1' && state.filterOptions.typeOne) ||
                          (message.type === '2' && state.filterOptions.typeTwo) ||
                          (message.type === '3' && state.filterOptions.typeThree)
                        )
                      )
                  
    }))
  }

  function clearFilter(){
    setState(state => ({...state, logMessages:[...initialLogMessages], filterOptions:initialFilterOptions}))
  }

  function sortByDate(){
    setState(state => ({
      ...state,
      logMessages:[...state.logMessages.sort((a, b) => columnSort(a, b, 'date', state.sortByDateAsc))],
      sortByDateAsc: !state.sortByDateAsc,
      sortBySubjectAsc: false,
      sortByTimeAsc: false
    }))
  }

  function sortBySubject(){
    setState(state => ({
      ...state,
      logMessages:[...state.logMessages.sort((a, b) => columnSort(a, b, 'subject', state.sortBySubjectAsc))],
      sortBySubjectAsc:!state.sortBySubjectAsc,
      sortByDateAsc:false,
      sortByTimeAsc:false
    }))
  }

  
}

export default App;
