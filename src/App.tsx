import React, { useState } from 'react';
import './App.scss';
import whytespyder from './assets/whytespyder.jpg';
import logData from './assets/SKUNinja-sample-logs.json';
import moment from 'moment';

interface LogMessage{
  id:string;
  created:string;
  user_id:string;
  ip:string;
  type:string;
  subject:string;
  body:string | null;
  dateCreated:string;
  timeCreated:string;
}

function App() {

  function initializeLogMessages(messages:any){
    return messages.map((val:any) => ({...val, dateCreated: val.created.split(' ')[0], timeCreated:val.created.split(' ')[1]}))
  }

  const [logMessages, setLogMessages] = useState<LogMessage[]>(initializeLogMessages(logData))
  const [selected, setSelected] = useState<LogMessage | null>(null);
  const [filterOptions, setFilterOptions] = useState({
    date:{
      from:'',
      to:''
    },
    time:{
      from:'',
      to:''
    },
    subjectIncludes:'',
    typeOne:true,
    typeTwo:false,
    typeThree:true
  })

  function applyFilter(){
    setLogMessages(messages => 
      initializeLogMessages(logData)
        .filter((message:LogMessage) => 
          (filterOptions.date.from === '' || filterOptions.date.to === '' || ( moment(filterOptions.date.from).isSame(message.dateCreated) || moment(filterOptions.date.to).isSame(message.dateCreated) || moment(message.dateCreated).isBetween(filterOptions.date.from, filterOptions.date.to) )) &&
            (filterOptions.time.from === '' || filterOptions.time.to === '' || ( moment(`2020-3-13 ${filterOptions.time.from}`).isSame(`2020-3-13 ${message.timeCreated}`) || moment(`2020-3-13 ${filterOptions.time.to}`).isSame(`2020-3-13 ${message.timeCreated}`) || moment(`2020-3-13 ${message.timeCreated}`).isBetween(`2020-3-13 ${filterOptions.time.from}`, `2020-3-13 ${filterOptions.time.to}`) )) &&
          (message.subject.toLowerCase().includes(filterOptions.subjectIncludes.toLowerCase())) &&
          (
            (message.type === '1' && filterOptions.typeOne) ||
            (message.type === '2' && filterOptions.typeTwo) ||
            (message.type === '3' && filterOptions.typeThree)
          )
        )
    )
  }

  function clearFilter(){
    setLogMessages(messages => initializeLogMessages(logData))
  }


  return (
    <div>
      <header>
        <img src={whytespyder} alt='Whyte Spyder Logo' />
        <h1>Whyte Spyder Sample Error Log</h1>
      </header>

      <div className='card'>
        <div className='card-body filter-card-body'>

          <h5 className='card-title'>Filter Options</h5>

          <div className='various-filters'>

            <div className='filter-card'>
              <h6>Date</h6>
              <span>from <input onChange={(e) => {e.persist(); setFilterOptions(options => ({...options, date:{...options.date, from:e.target.value}}))}} value={filterOptions.date.from} className='form-control' type='date'/> to <input onChange={(e) => {e.persist(); setFilterOptions(options => ({...options, date:{...options.date, to:e.target.value}}))}} value={filterOptions.date.to} className='form-control' type='date' /> </span>
            </div>

            <div className='filter-card'>
              <h6>Time</h6>
              <span>from <input onChange={(e) => {e.persist(); setFilterOptions(options => ({...options, time:{...options.time, from:e.target.value}}))}} value={filterOptions.time.from} className='form-control' type='time'/> to <input onChange={(e) => {e.persist(); setFilterOptions(options => ({...options, time:{...options.time, to:e.target.value}}))}} value={filterOptions.time.to} className='form-control' type='time' /> </span>
            </div>

            <div className='filter-card'>
              <h6>Subject</h6>
              <input onChange={(e) => {e.persist(); setFilterOptions(options => ({...options, subjectIncludes:e.target.value}))}} value={filterOptions.subjectIncludes} className='form-control' placeholder='Includes...' />
            </div>

            <div className='filter-card'>
              <h6>Type of</h6>
              <span className='filter-checkbox'>
                <input onChange={(e) => {e.persist(); setFilterOptions(options => ({...options, typeOne:!options.typeOne}))}} checked={filterOptions.typeOne} type='checkbox' />
                <label>Normal</label>
              </span>

              <span className='filter-checkbox'>
                <input onChange={(e) => {e.persist(); setFilterOptions(options => ({...options, typeTwo:!options.typeTwo}))}} checked={filterOptions.typeTwo} type='checkbox' />
                <label>Warning</label>
              </span>

              <span className='filter-checkbox'>
                <input onChange={(e) => {e.persist(); setFilterOptions(options => ({...options, typeThree:!options.typeThree}))}} checked={filterOptions.typeThree} type='checkbox' />
                <label>Error</label>
              </span>

            </div>

          </div>

          <button onClick={() => applyFilter()} className='btn btn-primary'>Apply Filter</button>
          <button onClick={() => clearFilter()} className='btn btn-secondary'>Clear Filter</button>

        </div>
      </div>

      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Date</th>
            <th scope='col'>Time</th>
            <th scope='col'>Subject</th>
          </tr>
        </thead>
        <tbody>
          {logMessages.map((logMessage:LogMessage) => (
            <tr key={logMessage.id} className={`status-${logMessage.type}`} data-toggle="modal" data-target="#message-dialog" onClick={() => setSelected(logMessage)}>
              <td>{logMessage.dateCreated}</td>
              <td>{logMessage.timeCreated}</td>
              <td>{logMessage.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="modal fade" id="message-dialog" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Log Message</h5>
            </div>
            <div className="modal-body">
              {selected?.body ? selected.body : 'This log message doesn\'t have a body.'}
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
