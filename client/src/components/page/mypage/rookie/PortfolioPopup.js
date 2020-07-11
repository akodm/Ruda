import React, { Component } from 'react';

import moment from 'moment';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

import AutoCreateBox from '../../../component/AutoCreatable';
import TagChip from '../../../component/TagChip';
import CheckBox from '../../../component/CheckBox';
import SelectBox from '../../../component/SelectBox';

class PortfolioPopup extends Component {

    // 기본 밸류 변경
    onChangeValue(e) {
        this.props.onChangeValue(e);
    }

    // 카테에 해당하는 이름의 밸류 변경
    onChangeDate(cate, e) {
        this.props.onChangeDate(cate, e);
    }

    // 칩 추가
    addChips(cate,e) {
        this.props.addChips(cate,e);
    }

    // 칩 삭제
    deleteChips(cate,e) {
        this.props.deleteChips(cate,e);
    }

    // 이미지 추가
    addImage(e) {
        this.props.addImage(e);
    }

    // 이미지 삭제
    deleteImage(data) {
        this.props.deleteImage(data);
    }

    // 포트폴리오 저장 혹은 수정 버튼
    savePortfolio() {
        if(this.props.addView.create)
            this.props.savePortfolio();
        else
            this.props.updatePortfolio();
    }

    // 닫기 버튼
    closeBtn() {
        this.props.closeBtn();
    }

    render() {
        const { textTitle, title, addView,
            startDate, startMonth, endDate, endMonth, ingDate,
            projectUrl, projectCate, projectCateInput, position,
            partner, partnerList, tag, tagList, content,
            imagesUrl, imageLoad, textBtn,
        } = this.props;
        return (
            <div className="portfolio-popup" style={{display: addView.view ? "flex" : "none"}}>
                <div className="portfolio-add-div">
                    <div className="portfolio-add-title">{textTitle}</div>
                    {/* 프로젝트명 */}
                    <TextField onPaste={this.onChangeValue.bind(this)} helperText="프로젝트명을 간단하게 입력하세요." name="title" onChange={this.onChangeValue.bind(this)} value={title} label="프로젝트명 *" type="search" variant="outlined" />
                    
                    {/* 날짜 입력 */}
                    <div className="rowLayout">
                        <TextField helperText={moment(new Date()).subtract(2, "year").format("YYYY")} name="startDate" onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} value={startDate} style={{width:"108px"}} label="시작년도 *" type="search" variant="outlined" />
                        <SelectBox 
                            value={startMonth} func={this.onChangeDate.bind(this, "startMonth")} style={{marginBottom:"22px",marginLeft:"20px",marginRight:"20px"}}
                            label={"월 *"} option={["1","2","3","4","5","6","7","8","9","10","11","12"]} text={"월 *"}
                        />
                        <TextField disabled={ingDate && true} helperText={moment(new Date()).format("YYYY")} name="endDate" onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} value={endDate} style={{width:"108px",margin:"12px"}} label="종료년도" type="search" variant="outlined" />
                        <SelectBox 
                            disabled={ingDate && true} value={endMonth} func={this.onChangeDate.bind(this, "endMonth")} style={{marginBottom:"22px",marginLeft:"10px"}}
                            label={"월"} option={["1","2","3","4","5","6","7","8","9","10","11","12"]} text={"월"}
                        />
                        <CheckBox label="진행 중" style={{marginBottom:"15px",marginLeft:"15px"}} check={ingDate} func={this.onChangeDate.bind(this, "ingDate")} name={"ingDate"} color="primary" />
                    </div>

                    {/* 프로젝트 주소와 구분 */}
                    <div className="rowLayout" style={{alignItems:"center",marginTop:"-10px",marginBottom:"10px"}}>
                        <TextField helperText="프로젝트를 보여줄 주소나 경로를 알려주세요." name="projectUrl" onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} value={projectUrl} style={{width:"600px",marginTop:"22px",marginRight:"10px"}} label="프로젝트 URL" type="search" variant="outlined" />
                        <SelectBox 
                            value={projectCate} func={this.onChangeDate.bind(this, "projectCate")}
                            label={"구분"} option={["교내","교외","산업체","직접입력"]} text={"구분"}
                        />
                        {
                            projectCate === "직접입력" && 
                            <TextField name="projectCateInput" onPaste={this.onChangeValue.bind(this)} onChange={this.onChangeValue.bind(this)} value={projectCateInput} style={{width:"140px",margin:"12px"}} label="내용" type="search" variant="outlined" />
                        }
                    </div>

                    {/* 프로젝트 역할 */}
                    <TextField helperText="프로젝트에서 자신의 역할을 입력하세요." name="position" onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} value={position} style={{marginBottom:"15px"}} label="프로젝트 역할" type="search" variant="outlined" />

                    {/* 구성원 */}
                    <AutoCreateBox blur={false} style={{width:"100px"}} text={"같이 작업한 구성원을 추가해주세요."} list={partnerList || []} clear={true} onChange={this.addChips.bind(this,"partner")} />
                    <div className="portfolio-partner-div">
                        {
                            partner.map((data,i) => {
                                return <TagChip func={this.deleteChips.bind(this, "partner")} name={data} key={i} />
                            })
                        }
                    </div>

                    {/* 기술스택 */}
                    <div style={{marginTop:"10px"}}>
                        <AutoCreateBox blur={false} style={{width:"100px"}} text={"프로젝트에 사용한 기술스택을 추가하세요."} list={tagList || []} clear={true} onChange={this.addChips.bind(this,"tag")} />
                    </div>
                    <div className="portfolio-partner-div" style={{marginBottom:"25px"}}>
                        {
                            tag.map((data,i) => {
                                return <TagChip func={this.deleteChips.bind(this, "tag")} name={data} key={i} />
                            })
                        }
                    </div>

                    {/* 내용 */}
                    <textarea value={content} onPaste={this.onChangeValue.bind(this)} onChange={this.onChangeValue.bind(this)} name="content" placeholder="프로젝트에 대한 간단한 설명을 해주세요." className="portfolio-textarea"></textarea>
                    
                    {/* 이미지 추가 */}
                    <div>
                        <input
                            accept="image/*" style={{display:"none"}}
                            id="contained-button-file" multiple type="file"
                            onChange={this.addImage.bind(this)} />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">이미지 추가</Button>
                        </label>
                    </div>

                    {/* 추가한 이미지 보여주기 */}
                    <div className="portfolio-img-div">
                        <GridList cellHeight={180} style={{width:"100%",height:"200px",margin:"10px"}}>
                            { imageLoad ? <div style={{width:"100px",height:"100px"}}><CircularProgress/></div> 
                            : 
                            imagesUrl.map((tile,i) => (
                                <GridListTile key={i}>
                                    <img src={tile.data} alt="img" />
                                    <GridListTileBar
                                        title={tile.name}
                                        actionIcon={
                                            <IconButton onClick={this.deleteImage.bind(this,tile.preview)}>
                                                <HighlightOffIcon style={{color:"#ffffff"}} />
                                            </IconButton>
                                        }
                                    />
                                </GridListTile>
                            )) }
                        </GridList>
                    </div>

                    {/* 버튼들 */}
                    <div className="portfolio-close">
                        <Button
                            onClick={this.savePortfolio.bind(this)}
                            variant="contained" color="primary" size="small"
                            >
                            { textBtn }
                        </Button>
                        <Button
                            onClick={this.closeBtn.bind(this)}
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

export default PortfolioPopup;