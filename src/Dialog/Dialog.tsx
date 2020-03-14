import React from "react";
import { LogMessage } from "../types";

interface DialogProps{
    selected:LogMessage | null
}

function Dialog(props:DialogProps){
    return (
        <div className="modal fade" id="message-dialog" role="dialog">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title">Log Body</h5>
                </div>
                <div className="modal-body">
                {props.selected?.body ? props.selected.body : 'This log message doesn\'t have a body.'}
                </div>
                <div className="modal-footer">
                </div>
            </div>
            </div>
        </div>
    )
}

export default Dialog;