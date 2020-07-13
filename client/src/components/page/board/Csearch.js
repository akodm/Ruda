import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import AutoCreateBox from '../../component/AutoCreatable';

import dataList from '../../../data-list';

class Csearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            
            tagInput : "",
        }
    }

    render() {
        const { tagInput } = this.state;
        return (
            <div className="Company-search">
            <div className="Company-search-title">
                <span className="Company-search-title-title">기업찾기</span>
                <div className="Company-search-title-states">
                    <div className="Company-search-title-state">
                        <div className="Company-search-title-state-training"></div><span>실습생</span>
                    </div>
                    <div className="Company-search-title-state">
                        <div className="Company-search-title-state-hire"></div><span>채용중</span>
                    </div>
                </div>
            </div>
            <div className="Company-search-content">
                <div className="Company-search-div">

                    {/* 전체 검색 부분 */}
                    <div className="Company-search-search">
                        <TextField
                            label="전체 검색"
                            style={{width:"88%"}}
                            variant="outlined"
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            }}
                        />
                        <Button style={{height:"57px", width:"100px"}} variant="outlined">검색</Button>
                    </div>

                    <div className="Company-search-tag-box">
                        
                    </div>
                    <AutoCreateBox value={tagInput} blur={true} width={200} text={"태그 선택"} list={dataList.app.tagList} clear={true} onChange={(e) => this.setState({ tagInput : e })} />
                </div>
            </div>
        </div>
        );
    }
}

export default Csearch;