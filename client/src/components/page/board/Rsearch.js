import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import AutoCreateBox from '../../component/AutoCreatable';
import TagChip from '../../component/TagChip';

import dataList from '../../../data-list';

class Rsearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            filters : [],   // { row, data } => row : 필터 시 key 값, data : 필터 시 value 값

            // 필터에 들어가는 key - value 값들
            textInput : "",
            address : "",
            tag : "",
            field : "",
        };
        this.searchBtn = this.searchBtn.bind(this);
    }

    // 검색 버튼을 누를 시 현재까지 검색  필터 배열에 넣은 값 전달
    async searchBtn() {
        const { textInput, filters } = this.state;
        if(textInput) {
            await this.setState({
                filters : filters.concat({
                    row : "text" , data : textInput,
                })
            })
        }
        if(!this.state.filters[0]) {
            this.props.listFilter();
        } else {
            this.props.listFilter(this.state.filters);
        }
    }

    render() {
        const { filters, textInput,
            address, field, tag
        } = this.state;
        return (
            <div className="Company-search">
                <div className="Company-layout">
                    <div className="Company-search-title">
                        <span className="Company-search-title-title">인재찾기</span>
                        <div className="Company-search-title-states">
                            <div className="Company-search-title-state">
                                <div className="Company-search-title-state-training"></div><span>실습생</span>
                            </div>
                            <div className="Company-search-title-state">
                                <div className="Company-search-title-state-hire"></div><span>구직중</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Company-search-content">
                    <div className="Company-search-div">

                        {/* 전체 검색 부분 */}
                        <div className="Company-search-search">
                            <TextField
                                label="이름 검색"
                                style={{width:"88%"}}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                value={textInput}
                                onChange={(e) => this.setState({ textInput : e.target.value })}
                            />
                            <Button onClick={this.searchBtn} startIcon={<SearchIcon />} style={{height:"57px", width:"100px",marginLeft:"10px"}} color="primary" variant="outlined">검색</Button>
                        </div>

                        <div className="Company-search-box-layout">
                            {/* 태그 검색 부분 */}
                            <div className="Company-search-tag-box">
                                <AutoCreateBox margin={"5px"} value={address} blur={true} width={"100%"} text={"주소 입력"} list={[]} clear={true} onChange={(e) => this.setState({ filters : filters.concat({ row : "userAdd", data : e }) })} />
                                <AutoCreateBox margin={"5px"} value={field} blur={true} width={"100%"} text={"희망 분야"} list={dataList.app.fieldList} clear={true} onChange={(e) => this.setState({ filters : filters.concat({ row : "userField", data : e }) })} />
                                <AutoCreateBox margin={"5px"} value={tag} blur={true} width={"100%"} text={"태그 입력"} list={dataList.app.tagList} clear={true} onChange={(e) => this.setState({ filters : filters.concat({ row : "userTags", data : e }) })} />
                            </div>
                        </div>

                        {/* 칩으로 뿌려주는 부분 */}
                        <div className="Company-search-tag-list">
                            {
                                filters.map((data,i) => {
                                    return <TagChip key={i} name={data.data} func={(e) => this.setState({ filters : filters.filter(data => { return data.data !== e })})} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Rsearch;