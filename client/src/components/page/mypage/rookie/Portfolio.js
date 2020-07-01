import React, { Component } from 'react';
import '../../../css/Portfolio.css';

import config from '../../../../client-configs';
import dataList from '../../../../data-list';
import { storage } from "../../../../firebase";
import axios from 'axios';
import moment from 'moment';

import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import AssignmentLateOutlinedIcon from '@material-ui/icons/AssignmentLateOutlined';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';

import AutoCreateBox from '../../../component/AutoCreatable';
import TagChip from '../../../component/TagChip';
import CheckBox from '../../../component/CheckBox';
import SelectBox from '../../../component/SelectBox';
// import Popup from './PortfolioPopup';

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioList : this.props.portfolio || [],

            title : "",
            content : "",

            tag : [],
            partner : [],

            startDate : "",
            startMonth : "1",
            endDate : "",
            endMonth : "1",
            ingDate : false,

            projectCate : "교내",
            projectCateInput : "",
            projectUrl : "",

            imagesUrl : [],
            imageLoad : false,
            addView : false,

            imageView : false,
            preview : "",
        }
    }

    // 포트폴리오 추가 하는 호출
    async savePortfolio() {
        try {
            const { title, content, tag, startDate, startMonth, endDate, endMonth, ingDate, partner, projectCate, projectCateInput, projectUrl, imagesUrl } = this.state;
            const { userId } = this.props;

            if(!title || !startDate || !startMonth) {
                alert("필수 입력 사항을 입력해주세요.");
                return;
            }

            let start = startDate + "-" + startMonth;
            let end = ingDate ? "" : (endDate + "-" + endMonth);
            let cate = projectCateInput ? projectCateInput : projectCate;
            let urlArr = imagesUrl.map(data => {
                return data.data;
            })

            const result = await axios.post(`${config.app.s_url}/portfolios/create`, {
                title : title,
                content : content,
                tag : tag,
                startDate : start,
                endDate : end,
                partner : partner,
                projectCate : cate,
                projectUrl : projectUrl,
                imagesUrl : urlArr,
                userId : userId,
            });
            if(result.data) {
                this.props.addPortfolio(result.data)
                this.setState(current => ({
                    portfolioList : current.portfolioList.concat(result.data)
                }))
                this.setState({ addView : false });
                alert("포트폴리오를 추가하였습니다.");
            } else {
                alert("잘못된 값이 있습니다. 다시 시도해주세요.");
            }
        } catch(err) {
            console.log("portfolio save err : " + err);
        }
        this.setState({ loaded : true });
    }

    // 이미지 추가하기 -> 배열로 제이슨 형식으로 추가 -> 필요한 값은 데이터
    addImage(event) {
        if(event.target.files[0]) {
            const { userEmail } = this.props;
            let image = event.target.files[0];
            this.setState({ imageLoad : true });
            const uploadTask = storage.ref(`/portfolio/${userEmail}/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                null, null, () => {
                    storage
                    .ref(`portfolio/${userEmail}`)
                    .child(image.name)
                    .getDownloadURL()
                    .then(async url => {
                        console.log("image upload !!")
                        await this.setState({ imagesUrl : 
                            this.state.imagesUrl.concat({
                                data : url,
                                preview : URL.createObjectURL(image),
                                image : image,
                            }) 
                        }, () => this.setState({ imageLoad : false }));
                    })
                }
            )
        }
    }

    // 추가한 이미지 삭제하기
    deleteImage(event) {
        this.setState({
            imagesUrl : this.state.imagesUrl.filter(data => {
                return event !== data.preview
            })
        })
    }

    // 파트너와 태그를 추가하는 함수
    addChips(cate, e) {
        switch(cate) {
            case "partner" : 
                this.setState(current => ({ partner : current.partner.concat(e) })) 
                break;
            case "tag" : 
                this.setState(current => ({ tag : current.tag.concat(e) })) 
                break;
            default : break;
        }
    }

    // 파트너와 태그를 삭제하는 함수
    partnerDelete(e) { this.setState(current => ({ partner : current.partner.filter(data => { return data !== e })})) }
    tagDelete(e) { this.setState(current => ({ tag : current.tag.filter(data => { return data !== e })})) }

    // 기본 인풋 데이터 변경 함수
    onChangeValue(e) { this.setState({ [e.target.name] : e.target.value }) }
        
    render() {
        const { userName, userEmail, load } = this.props;
        const { portfolioList, addView, ingDate,
            title, content, startDate, startMonth, endDate, endMonth, tag, partner, projectUrl, projectCate, projectCateInput,
            imagesUrl, imageLoad , imageView, preview
        } = this.state;
        return load ? (
            <div className="Mypage-content-main">

                {/* 포트폴리오 내 이미지 클릭하여 보기 */}
                {
                    imageView && <div className="load-mask" onClick={() => this.setState({ imageView : false })}>
                        <div className="portfolio-imageviewDiv">
                            <img src={preview} alt="img" className="portfolio-imaPre"></img>
                        </div>
                    </div>
                }

                {/* 초기 타이틀 라인 */}
                <div className="portfolio-title">
                    {
                        userEmail && <div className="portfolio-content" onClick={() => this.setState({ addView : true })}><span style={{marginRight:"5px"}}>포트폴리오 추가</span><LibraryAddOutlinedIcon /></div>
                    }
                    <div>{userName}님의 포트폴리오 개수는 <span style={{color:"red"}}>{portfolioList.length}</span>개 입니다.</div>
                </div>

                {/* 포트폴리오 추가 팝업 창 */}
                {
                    addView &&
                    <div className="portfolio-popup">
                        <div className="portfolio-add-div">
                            <div className="portfolio-add-title">포트폴리오 추가를 위해 값을 입력해주세요!</div>
                            <TextField helperText="프로젝트명을 간단하게 입력하세요." name="title" onChange={this.onChangeValue.bind(this)} value={title} label="프로젝트명 *" type="search" variant="outlined" />
                            <div className="rowLayout">
                                <TextField helperText={moment(new Date()).subtract(2, "year").format("YYYY")} name="startDate" onChange={this.onChangeValue.bind(this)} value={startDate} style={{width:"108px"}} label="시작년도 *" type="search" variant="outlined" />
                                <SelectBox 
                                    value={startMonth} func={(e) => this.setState({ startMonth : e })} style={{marginBottom:"22px",marginLeft:"20px",marginRight:"20px"}}
                                    label={"월 *"} option={["1","2","3","4","5","6","7","8","9","10","11","12"]} text={"월 *"}
                                />
                                <TextField disabled={ ingDate && true} helperText={moment(new Date()).format("YYYY")} name="endDate" onChange={this.onChangeValue.bind(this)} value={endDate} style={{width:"108px",margin:"12px"}} label="종료년도" type="search" variant="outlined" />
                                <SelectBox 
                                    disabled={ ingDate && true} value={endMonth} func={(e) => this.setState({ endMonth : e })} style={{marginBottom:"22px",marginLeft:"10px"}}
                                    label={"월"} option={["1","2","3","4","5","6","7","8","9","10","11","12"]} text={"월"}
                                />
                                <CheckBox label="진행 중" style={{marginBottom:"15px",marginLeft:"15px"}} check={ingDate} func={(e) => this.setState({ ingDate : e })} name="ingDate" color="primary" />
                            </div>
                            <div className="rowLayout" style={{alignItems:"center",marginTop:"-10px",marginBottom:"25px"}}>
                                <TextField helperText="프로젝트를 보여줄 주소나 경로를 알려주세요." name="projectUrl" onChange={this.onChangeValue.bind(this)} value={projectUrl} style={{width:"600px",marginTop:"22px",marginRight:"10px"}} label="프로젝트 URL" type="search" variant="outlined" />
                                <SelectBox 
                                    value={projectCate} func={(e) => this.setState({ projectCate : e })}
                                    label={"구분"} option={["교내","교외","산업체","직접입력"]} text={"구분"}
                                />
                                {
                                    projectCate === "직접입력" && 
                                    <TextField name="projectCateInput" onChange={this.onChangeValue.bind(this)} value={projectCateInput} style={{width:"140px",margin:"12px"}} label="내용" type="search" variant="outlined" />
                                }
                            </div>
                            <AutoCreateBox blur={false} style={{width:"100px"}} text={"같이 작업한 구성원을 추가해주세요."} list={[]} clear={true} onChange={this.addChips.bind(this,"partner")} />
                            <div className="portfolio-partner-div">
                                {
                                    partner.map((data,i) => {
                                        return <TagChip func={this.partnerDelete.bind(this)} name={data} key={i} />
                                    })
                                }
                            </div>
                            <div style={{marginTop:"10px"}}>
                                <AutoCreateBox blur={false} style={{width:"100px"}} text={"프로젝트에 사용한 기술스택을 추가하세요."} list={dataList.app.tagList} clear={true} onChange={this.addChips.bind(this,"tag")} />
                            </div>
                            <div className="portfolio-partner-div" style={{marginBottom:"25px"}}>
                                {
                                    tag.map((data,i) => {
                                        return <TagChip func={this.tagDelete.bind(this)} name={data} key={i} />
                                    })
                                }
                            </div>
                            <textarea value={content} onChange={this.onChangeValue.bind(this)} name="content" placeholder="프로젝트에 대한 간단한 설명을 해주세요." className="portfolio-textarea"></textarea>
                            <div>
                                <input
                                    accept="image/*" style={{display:"none"}}
                                    id="contained-button-file" multiple type="file"
                                    onChange={this.addImage.bind(this)} />
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" color="primary" component="span">이미지 추가</Button>
                                </label>
                            </div>
                            <div className="portfolio-img-div">
                                <GridList cellHeight={180} style={{width:"100%",height:"200px",margin:"10px"}}>
                                    { imageLoad ? <div style={{width:"100px",height:"100px"}}><CircularProgress/></div> 
                                    : 
                                    imagesUrl.map((tile,i) => (
                                        <GridListTile key={i}>
                                            <img src={tile.preview} alt={tile.image.name} />
                                            <GridListTileBar
                                                title={tile.image.name}
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
                            <div className="portfolio-close">
                                <Button
                                    onClick={this.savePortfolio.bind(this)}
                                    variant="contained" color="primary" size="small"
                                    >
                                    포트폴리오 추가하기
                                </Button>
                                <Button
                                    onClick={() => this.setState({ addView : false })}
                                    variant="contained" color="default" size="small"
                                    >
                                    창 닫기
                                </Button>
                            </div>
                        </div>
                    </div>
                }

                {/* 포트폴리오를 표시하거나 초기 가이드 텍스트 표시 */}
                {
                    portfolioList && portfolioList[0] ?
                    portfolioList.map((data,i) => {
                        return <div className="portfolio-list-div" key={i}>
                            <div className="portfolio-idx-title">{data.title}</div>
                            <div className="portfolio-idx-date"><span>{data.startDate}~{data.endDate || "진행 중"}</span><span>구분: {data.projectCate}</span></div>
                            <textarea className="portfolio-idx-contentBox" value={data.content} readOnly></textarea>
                            <div className="portfolio-idx-partnerTitle">함께한 구성원</div>
                            <div className="portfolio-idx-partnerBox">
                                { data.partner.map((data,i) => {
                                    return <TagChip name={data} key={i} />
                                }) }
                            </div>
                            <div className="portfolio-idx-partnerTitle">태그 항목</div>
                            <div className="portfolio-idx-partnerBox">
                                { data.tag.map((data,i) => {
                                    return <TagChip name={data} key={i} />
                                }) }
                            </div>
                            <div className="portfolio-idx-partnerTitle" style={{display:"flex",justifyContent:"space-between"}}>
                                <span>프로젝트 주소</span>
                                <div className="portfolio-idx-imageArr" style={{marginTop:"-50px"}}>
                                    {
                                        data.imagesUrl.map((data,i) => {
                                            return <Avatar onClick={() => this.setState({ imageView : true, preview : data })} variant="rounded" key={i} alt="Remy Sharp" src={data} 
                                                style={{
                                                    border:"1px solid rgba(156, 156, 156, 0.664)",
                                                    margin:"5px",height:"70px",width:"70px",cursor:"pointer"
                                                }} 
                                            />
                                        })
                                    }
                                </div>
                            </div>
                            <div className="portfolio-idx-partnerTitle" style={{marginBottom:"10px"}} ><a href={data.projectUrl} >{data.projectUrl}</a></div>
                        </div>
                    })
                    :
                    <div>
                        {
                            <div className="portfolio-first">
                                {
                                    userEmail ?
                                    <div className="portfolio-guideDiv">
                                        <h3 style={{display:"flex",alignItems:"center"}}><AssignmentLateOutlinedIcon/><span style={{marginLeft:"10px"}}>포트폴리오가 없습니다.</span></h3>
                                        <span className="portfolio-guide">
                                            다른사람에게 어필할 포트폴리오를 작성하세요. <br></br>
                                            포트폴리오의 주소를 추가하여 다른 사람이 쉽게 확인 할 수 있습니다. <br></br>
                                            태그를 추가하여 어떤 기술이나 전공을 담았는지 알려줄 수 있습니다. <br></br>
                                            이미지를 첨부하고, 간단한 소개글을 넣어 어떤 포트폴리오인지 알 수 있게 해주세요. <br></br>
                                        </span>
                                    </div>
                                    :
                                    <div className="portfolio-guideDiv">
                                        <h3 style={{display:"flex",alignItems:"center"}}><AssignmentLateOutlinedIcon/><span style={{marginLeft:"10px"}}>포트폴리오가 없습니다.</span></h3>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                }
            </div>
        ) : <div></div>
    }
}

export default Portfolio;