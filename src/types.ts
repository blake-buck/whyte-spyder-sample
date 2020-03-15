import { Moment } from "moment";

export interface UninitializedLogMessage{
    id:string;
    created:string;
    user_id:string;
    ip:string;
    type:string;
    subject:string;
    body:string | null;
  }
  
  export interface LogMessage{
    id:string;
    user_id:string;
    ip:string;
    type:string;
    subject:string;
    body:string | null;
    created:Moment;
    dateCreated:Moment;
    timeCreated:Moment;
  }
  
  export interface FilterOptions{
    dateFrom:string;
    dateTo:string;
    timeFrom:string;
    timeTo:string;
    subjectIncludes:string;
    typeOne:boolean;
    typeTwo:boolean;
    typeThree:boolean;
  }
  
  export interface AppState{
    logMessages:LogMessage[];
    selectedMessage:LogMessage | null;
    filterOptions:FilterOptions;
    sortByDateAsc:boolean;
    sortByTimeAsc:boolean;
    sortBySubjectAsc:boolean;
  }

  export interface TableProps{
    logMessages:LogMessage[]
    sortByDate: () => void;
    sortBySubject:() => void;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
}

export interface FilterProps{
  filterOptions:FilterOptions;
  changeFilterOptions: (e:React.ChangeEvent<HTMLInputElement>, parameterToChange:string, isCheckbox?:boolean) => void;
  applyFilter: () => void;
  clearFilter: () => void;
}

export interface DialogProps{
  selectedMessage:LogMessage | null
}