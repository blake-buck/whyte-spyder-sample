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
    created:string;
    user_id:string;
    ip:string;
    type:string;
    subject:string;
    body:string | null;
    dateCreated:string;
    timeCreated:string;
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
    selected:LogMessage | null;
    filterOptions:FilterOptions;
    sortByDateAsc:boolean;
    sortByTimeAsc:boolean;
    sortBySubjectAsc:boolean;
  }