import React, { Component } from 'react';
import moment from 'moment';

import dataList from '../../../../data-list';

import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

import AutoCreateBox from '../../../component/AutoCreatable';
import TagChip from '../../../component/TagChip';
import TextBox from '../../../component/TextFieldBox';

class HirePopup extends Component {
    addHire() {
        if(this.props.open.create) {
            this.props.addHire();
        } else {
            this.props.updatHire();            
        }
    }

    render() {
        const { stateNull, title, content, files, boardTag, startDate, endDate, field, component,
            titleErr, startDateErr, endDateErr, tagConcat, tagFilter, addImage, deleteImage, imageLoad, textBtn
        } = this.props;
        return (
            <div className="hire-popup-main">
                <div className="hire-popup-div">

                    {/* 초기 가이드 라인 */}
                    <div className="hire-popup-guide">
                        <div>채용 공고</div>
                        <div><HighlightOffIcon onClick={() => stateNull()} style={{cursor:"pointer"}} /></div>
                    </div>
                    <div className="hire-popup-guide-sub">채용 공고를 통해 구직자들이 지원을 할 수 있도록 내용을 작성해주세요!</div>
                    
                    {/* 제목 */}
                    <TextBox 
                        helper="제목을 입력해주세요. 50자 내"
                        label="제목 ( 필수 )"
                        component={component}
                        max={50}
                        err={titleErr}
                        errName={"titleErr"}
                        name="title"
                        value={title}
                        type="text"
                        auto="off"
                        className="hire-popup-title"
                    />

                    {/* 날짜 박스 */}
                    <div className="hire-popup-date-box">
                        <TextBox 
                            helper={moment(new Date()).format("YYYYMMDD")}
                            label="시작일 ( 선택 입력 )"
                            component={component}
                            max={8}
                            err={startDateErr}
                            errName="startDateErr"
                            name="startDate"
                            value={startDate}
                            type="date"
                            auto="off"
                            className="hire-popup-date"
                        />
                        <TextBox 
                            helper={moment(new Date()).add(5, 'month').format("YYYYMMDD")}
                            label="종료일 ( 제외 시 상시 )"
                            component={component}
                            max={8}
                            err={endDateErr}
                            errName="endDateErr"
                            name="endDate"
                            value={endDate}
                            type="date"
                            auto="off"
                            className="hire-popup-date"
                        />
                    </div>

                    {/* 내용 입력 */}
                    <textarea value={content} placeholder="채용 공고문의 내용을 입력하여주세요." name="content" onChange={(e) => component.setState({ content : e.target.value })} className="hire-popup-content" />

                    {/* 직종 */}
                    <AutoCreateBox value={field} blur={false} text={"채용하고자 하는 직종을 입력하세요."} list={dataList.app.fieldList} clear={true} onChange={(e) => component.setState({ field : e })} />

                    {/* 태그 */}
                    <div className="hire-popup-tag">
                        <AutoCreateBox blur={false} text={"태그를 추가하여 주세요."} list={dataList.app.tagList} clear={true} onChange={(e) => tagConcat(e)} />
                    </div>
                    <div className="hire-popup-tag-box">
                        {
                            boardTag && boardTag.map((data,i) => {
                                return <TagChip key={i} func={(e) => tagFilter(e)} name={data} />
                            })
                        }
                    </div>

                    {/* 파일 첨부 */}
                    <div className="hire-popup-img-btn">
                        <input
                            accept="image/*" style={{display:"none"}}
                            id="contained-button-file" multiple type="file"
                            onChange={(e) => addImage(e)} />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">이미지 추가</Button>
                        </label>
                    </div>

                    {/* 추가한 이미지 보여주기 */}
                    <div className="portfolio-img-div">
                        <GridList cellHeight={180} style={{width:"100%",height:"200px",margin:"10px"}}>
                            { imageLoad ? <div style={{width:"100px",height:"100px"}}><CircularProgress/></div> 
                            : 
                            files.map((tile,i) => (
                                <GridListTile key={i}>
                                    <img src={tile.data} alt="img" />
                                    <GridListTileBar
                                        title={tile.name}
                                        actionIcon={
                                            <IconButton onClick={() => deleteImage(tile.preview)}>
                                                <HighlightOffIcon style={{color:"#ffffff"}} />
                                            </IconButton>
                                        }
                                    />
                                </GridListTile>
                            )) }
                        </GridList>
                    </div>

                    {/* 버튼들 */}
                    <div className="hire-popup-close">
                        <Button
                            onClick={this.addHire.bind(this)}
                            variant="contained" color="primary" size="small"
                            >
                            { textBtn }
                        </Button>
                        <Button
                            onClick={() => stateNull()}
                            variant="contained" color="default" size="small"
                            >
                            창 닫기
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default HirePopup;