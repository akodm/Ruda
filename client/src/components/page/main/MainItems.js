import React from 'react';

export default function MainItems(props) {
    return (
        <div className="Main-new-centerItem">
            <img src={props.src} alt="items" className="Main-new-itemImg"></img>
            <span className="Main-new-itemTitle">{props.title}</span>
            <span className="Main-new-itemSpan">{props.span1}</span>
            <span className="Main-new-itemSpan">{props.span2}</span>
        </div>
    );
}