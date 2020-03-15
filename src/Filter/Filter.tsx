import React from 'react';
import { FilterProps } from '../types';
import './Filter.scss';

function Filter(props:FilterProps){
    const {filterOptions, changeFilterOptions, applyFilter, clearFilter} = props;
    return (
        <div className='card wrapper'>
        <div className='card-body filter-card-body'>

          <h5 className='card-title'>Filter Options</h5>

          <div className='various-filters'>

            <div className='filter-card date'>
              <h6>Date</h6>
              <span>from <input onChange={(e) => changeFilterOptions(e, 'dateFrom')} value={filterOptions.dateFrom} className='form-control' type='date'/> to <input onChange={(e) => changeFilterOptions(e, 'dateTo')} value={filterOptions.dateTo} className='form-control' type='date' /> </span>
            </div>

            <div className='filter-card time'>
              <h6>Time</h6>
              <span>from <input onChange={(e) => changeFilterOptions(e, 'timeFrom')} value={filterOptions.timeFrom} className='form-control' type='time'/> to <input onChange={(e) => changeFilterOptions(e, 'timeTo')} value={filterOptions.timeTo} className='form-control' type='time' /> </span>
            </div>

            <div className='filter-card subject'>
              <h6>Subject</h6>
              <input onChange={(e) => changeFilterOptions(e, 'subjectIncludes')} value={filterOptions.subjectIncludes} className='form-control' placeholder='Includes...' />
            </div>

            <div className='filter-card type'>
              <h6>Log Type</h6>
              <span className='filter-checkbox normal'>
                <input onChange={(e) => changeFilterOptions(e, 'typeOne', true)} checked={filterOptions.typeOne} type='checkbox' />
                <label>Normal</label>
              </span>

              <span className='filter-checkbox warning'>
                <input onChange={(e) => changeFilterOptions(e, 'typeTwo', true)} checked={filterOptions.typeTwo} type='checkbox' />
                <label>Warning</label>
              </span>

              <span className='filter-checkbox error'>
                <input onChange={(e) => changeFilterOptions(e, 'typeThree', true)} checked={filterOptions.typeThree} type='checkbox' />
                <label>Error</label>
              </span>

            </div>

          </div>

          <button onClick={applyFilter} className='btn btn-primary apply-filter'>Apply Filter</button>
          <button onClick={clearFilter} className='btn btn-secondary clear-filter'>Clear Filter</button>

        </div>
      </div>
    )
}

export default Filter;