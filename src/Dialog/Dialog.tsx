import React from "react";
import { DialogProps } from "../types";

function Dialog(props:DialogProps){
    return (
        <div className="modal fade" id="message-dialog" role="dialog">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title">Log Body</h5>
                </div>
                <div className="modal-body">
                {props.selectedMessage?.body ? props.selectedMessage.body : 'This log message doesn\'t have a body.'}
                </div>
            </div>
            </div>
        </div>
    )
}

export default Dialog;