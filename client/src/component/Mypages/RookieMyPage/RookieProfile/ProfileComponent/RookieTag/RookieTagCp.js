import React, { Component } from 'react';

class RookieTagCp extends Component {
    render() {
        return (
            <div className="rookieTag-content-tagView" >
                { this.props.addTags && this.props.addTags.map((data,i) => {
                    return <div key={i} className="RookieTagCp">
                        <div className="rookieTag-content-tagView-text">
                            <span>#{data}</span>
                        </div>
                    </div>
                })}
            </div>
        );
    }
}

export default RookieTagCp;