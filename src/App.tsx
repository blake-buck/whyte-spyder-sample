import React, { useState } from 'react';
import './App.scss';
import whytespyder from './assets/whytespyder.jpg';
import logData from './assets/SKUNinja-sample-logs.json';

interface LogMessage{
  id:string;
  created:string;
  user_id:string;
  ip:string;
  type:string;
  subject:string;
  body:string | null;
}

function App() {

  // selectedLog is changed whenever a user clicks on a row in the log table 
  // sets the content for the dialog that is opened as a result
  let selectedLog:LogMessage | null = null;

  const [selected, setSelected] = useState<LogMessage | null>(null);

  // changeSelectedLog changes selectedLog to the log a user clicks on in the table
  function changeSelectedLog(logMessage:LogMessage){
    selectedLog = logMessage;
  }

  return (
    <div>
      <header>
        <img src={whytespyder} alt='Whyte Spyder Logo' />
        <h1>Whyte Spyder Sample Error Log</h1>
      </header>

      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Date</th>
            <th scope='col'>Time</th>
            <th scope='col'>Subject</th>
          </tr>
        </thead>
        <tbody>
          {logData.map((logMessage:LogMessage) => (
            <tr key={logMessage.id} className={`status-${logMessage.type}`} data-toggle="modal" data-target="#message-dialog" onClick={() => setSelected(logMessage)}>
              <td>{logMessage.created.split(' ')[0]}</td>
              <td>{logMessage.created.split(' ')[1]}</td>
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
