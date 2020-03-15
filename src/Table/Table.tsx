import React from 'react';
import { LogMessage, AppState, TableProps } from '../types';
import './Table.scss';

function Table(props:TableProps){
    return(
      <table className='table'>
        <thead>
          <tr>
            <th scope='col' onClick={props.sortByDate} data-toggle="tooltip" title="Sort entries by the date they were created">Date</th>
            <th scope='col' onClick={props.sortBySubject} data-toggle="tooltip" title="Sort entries alphabetically by subject">Subject</th>
          </tr>
        </thead>
        <tbody>
          {props.logMessages.map((logMessage:LogMessage) => (
            <tr key={logMessage.id} className={`status-${logMessage.type}`} data-toggle="modal" data-target="#message-dialog" onClick={() => props.setState((state:AppState) => ({...state, selectedMessage:logMessage}))}>
              <td>{logMessage.created.format('YYYY-MM-DD HH:mm:ss')}</td>
              <td>{logMessage.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}

export default Table;