import React from 'react';
import { LogMessage, AppState } from '../types';
import './Table.scss';

interface TableProps{
    logMessages:LogMessage[]
    sortByDate: () => void;
    sortByTime: () => void;
    sortBySubject:() => void;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
}


function Table(props:TableProps){
    return(
        <table className='table'>
        <thead>
          <tr>
            <th scope='col' onClick={(e) => props.sortByDate()} data-toggle="tooltip" title="Sort entries by the date they were created">Date</th>
            <th scope='col' onClick={(e) => props.sortBySubject()} data-toggle="tooltip" title="Sort entries alphabetically by subject">Subject</th>
          </tr>
        </thead>
        <tbody>
          {props.logMessages.map((logMessage:LogMessage) => (
            <tr key={logMessage.id} className={`status-${logMessage.type}`} data-toggle="modal" data-target="#message-dialog" onClick={() => props.setState((state:AppState) => ({...state, selected:logMessage}))}>
              <td>{logMessage.created}</td>
              <td>{logMessage.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}

export default Table;