import React from 'react';

export class Todo extends React.Component {

    render() {
        return (
            <div>
                <div><b>id:</b> {this.props.id}</div>
                <div><b>description:</b> {this.props.description}</div>
                <div><b>nameResponsible:</b> {this.props.nameResponsible}</div>
                <div><b>emailResponsible:</b> {this.props.emailResponsible}</div>
                <div><b>status:</b> {this.props.status}</div>
                <div><b>dueDate:</b> {this.props.dueDate}</div>
            </div>
            
        );
    }

}