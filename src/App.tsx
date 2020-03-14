import React, { useState } from 'react';
import moment from 'moment';

import Dialog from './Dialog/Dialog';
import Table from './Table/Table';
import Filter from './Filter/Filter';
import './App.scss';

import whytespyder from './assets/whytespyder.png';
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

  const [state, setState] = useState<AppState>({
    logMessages:initializeLogMessages(logData),
    selected:null,
    filterOptions:initialFilterOptions,
    sortByDateAsc:false,
    sortByTimeAsc:false,
    sortBySubjectAsc:false
  })

  // In order to sort by date and time seperately, the initial log messages need to be modified
  function initializeLogMessages(messages:UninitializedLogMessage[]){
    return messages.map((val:UninitializedLogMessage) => ({...val, dateCreated: val.created.split(' ')[0], timeCreated:val.created.split(' ')[1]}))
  }

  // When sorting by column, you need to be able to sort in both ascending and descending order e.g. A-Z & Z-A
  function tableSort(a:LogMessage, b:LogMessage, column:string, ascending:boolean){
    if(column === 'date'){
      if(ascending){
        if(moment(a.created).isAfter(moment(b.created))){
          return 1
        }
        if(moment(b.created).isAfter(moment(a.created))){
          return -1
        }
        return 0
      }

      if(!ascending){
        if(moment(a.created).isAfter(moment(b.created))){
          return -1
        }
        if(moment(b.created).isAfter(moment(a.created))){
          return 1
        }
        return 0
      }
      return 0
    }
    if(column === 'subject'){
      if(ascending){
        if(a.subject.toLowerCase() > b.subject.toLowerCase()){
          return 1
        }
        if(a.subject.toLowerCase() < b.subject.toLowerCase()){
          return -1
        }
        return 0
      }
      if(!ascending){
        if(a.subject.toLowerCase() > b.subject.toLowerCase()){
          return -1
        }
        if(a.subject.toLowerCase() < b.subject.toLowerCase()){
          return 1
        }
        return 0
      }
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
    console.log(`${state.filterOptions.dateFrom} ${state.filterOptions.timeFrom}`)
    setState(state => ({
      ...state, 
      // reinitializing log messages is necessary each time a filter is applied in order for the filter to apply to all log messages
      logMessages:initializeLogMessages(logData)
                    .filter((message:LogMessage) => 
                      (state.filterOptions.dateFrom === '' || state.filterOptions.dateTo === '' || ( moment(state.filterOptions.dateFrom).isSame(message.dateCreated) || moment(state.filterOptions.dateTo).isSame(message.dateCreated) || moment(message.dateCreated).isBetween(state.filterOptions.dateFrom, state.filterOptions.dateTo) )) &&
                      // In order for the moment.js package to work properly, there needs to be a date in addition to the hour, minute, second portion of the string; hence the placeholder 2020-3-13
                      (state.filterOptions.timeFrom === '' || state.filterOptions.timeTo === '' || ( moment(`2020-3-13 ${state.filterOptions.timeFrom}`).isSame(`2020-3-13 ${message.timeCreated}`) || moment(`2020-3-13 ${state.filterOptions.timeTo}`).isSame(`2020-3-13 ${message.timeCreated}`) || moment(`2020-3-13 ${message.timeCreated}`).isBetween(`2020-3-13 ${state.filterOptions.timeFrom}`, `2020-3-13 ${state.filterOptions.timeTo}`) )) &&          
                      (message.subject.toLowerCase().includes(state.filterOptions.subjectIncludes.toLowerCase())) &&
                      (
                        (message.type === '1' && state.filterOptions.typeOne) ||
                        (message.type === '2' && state.filterOptions.typeTwo) ||
                        (message.type === '3' && state.filterOptions.typeThree)
                      )
                    )
    }))
  }

  function clearFilter(){
    setState(state => ({...state, logMessages:initializeLogMessages(logData), filterOptions:initialFilterOptions}))
  }

  function sortByDate(){
    setState(state => ({
      ...state,
      logMessages:[...state.logMessages.sort((a, b) => tableSort(a, b, 'date', state.sortByDateAsc))],
      sortByDateAsc: !state.sortByDateAsc,
      sortBySubjectAsc: false,
      sortByTimeAsc: false
    }))
  }

  function sortByTime(){
    setState(state => ({
      ...state,
      logMessages:[...state.logMessages.sort((a, b) => tableSort(a, b, 'time', state.sortByTimeAsc))],
      sortByDateAsc:false,
      sortBySubjectAsc:false,
      sortByTimeAsc:!state.sortByTimeAsc
    }))
  }

  function sortBySubject(){
    setState(state => ({
      ...state,
      logMessages:[...state.logMessages.sort((a, b) => tableSort(a, b, 'subject', state.sortBySubjectAsc))],
      sortBySubjectAsc:!state.sortBySubjectAsc,
      sortByDateAsc:false,
      sortByTimeAsc:false
    }))
  }

  return (
    <div>

      <header>
        <h1>Sample Log Tool</h1>
        <a download='log_messages.json' href={URL.createObjectURL(new Blob([JSON.stringify(state.logMessages)]))} className='btn btn-warning'>Export Table</a>
      </header>

      <Filter filterOptions={state.filterOptions} changeFilterOptions={changeFilterOptions} clearFilter={clearFilter} applyFilter={applyFilter}/>
      
      <Table logMessages={state.logMessages} sortByDate={sortByDate} sortBySubject={sortBySubject} sortByTime={sortByTime} setState={setState}/>

      <Dialog selected={state.selected}/>

    </div>
  );
}

export default App;
