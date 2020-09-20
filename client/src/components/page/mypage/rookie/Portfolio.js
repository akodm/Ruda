import React, { Component } from 'react';
import '../../../css/Portfolio.css';

import config from '../../../../client-configs';
import dataList from '../../../../data-list';
import { storage } from "../../../../firebase";
import axios from 'axios';

import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import AssignmentLateOutlinedIcon from '@material-ui/icons/AssignmentLateOutlined';
import Avatar from '@material-ui/core/Avatar';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import TagChip from '../../../component/TagChip';
import Popup from './PortfolioPopup';

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
            position : "",

            imagesUrl : [],
            imageLoad : false,
            addView : false,

            imageView : false,
            preview : "",
        }
    }

    // ---------------------------------------=== axios 호출로 추가/수정/삭제 호출 === //

    // 포트폴리오 추가 하는 호출
    async savePortfolio() {
        try {
            const { title, content, tag, startDate, startMonth, endDate, endMonth, ingDate, partner, projectCate, projectCateInput, projectUrl, position, imagesUrl } = this.state;
            const { userId } = this.props;

            if(!title || !startDate || !startMonth) {
                alert("필수 입력 사항을 입력해주세요.");
                return;
            }

            let start = startDate + "-" + startMonth;
            let end = ingDate ? "" : (endDate + "-" + endMonth);
            let cate = projectCateInput ? projectCateInput : projectCate;

            const result = await axios.post(`${config.app.s_url}/portfolios/create`, {
                title : title,
                content : content,
                tag : tag,
                startDate : start,
                endDate : end,
                partner : partner,
                projectCate : cate,
                projectUrl : projectUrl,
                position : position,
                imagesUrl : imagesUrl,
                userId : userId,
            });
            if(result.data) {
                this.props.addPortfolio(result.data)
                this.setState(current => ({
                    portfolioList : current.portfolioList.concat(result.data)
                }))
                this.onChangeNull.bind(this);
                this.setState({ addView : { view : false, create : false }})
                alert("포트폴리오를 추가하였습니다.");
            } else {
                alert("잘못된 값이 있습니다. 다시 시도해주세요.");
            }
        } catch(err) {
            alert("포트폴리오가 추가되지 않았습니다.");
        }
        
        this.setState({ loaded : true });
    }

    // 포트폴리오 수정 하는 호출
    async updatePortfolio() {
        try {
            const { title, content, 
                tag, startDate, startMonth, endDate, endMonth, ingDate, 
                partner, projectCate, projectCateInput, projectUrl, position,
                imagesUrl,
                addView, portfolioList } = this.state;
            const { userId } = this.props;

            if(!title || !startDate || !startMonth) {
                alert("필수 입력 사항을 입력해주세요.");
                return;
            }

            let start = startDate + "-" + startMonth;
            let end = ingDate ? "" : (endDate + "-" + endMonth);
            let cate = projectCateInput ? projectCateInput : projectCate;

            let portfolioListArray = portfolioList;
            portfolioListArray[addView.idx] = {
                title : title,
                content : content,
                tag : tag,
                startDate : start,
                endDate : end,
                partner : partner,
                projectCate : cate,
                projectUrl : projectUrl,
                position : position,
                imagesUrl : imagesUrl,
                userId : userId,
                id : addView.id,
            }

            const result = await axios.put(`${config.app.s_url}/portfolios/update`, {
                title : title,
                content : content,
                tag : tag,
                startDate : start,
                endDate : end,
                partner : partner,
                projectCate : cate,
                projectUrl : projectUrl,
                imagesUrl : imagesUrl,
                userId : userId,
                id : addView.id,
            });
            if(result.data) {
                this.setState({ portfolioList : portfolioListArray, addView : { view : false, create : false  }})
                this.onChangeNull.bind(this);
                alert("포트폴리오를 수정하였습니다.");
            } else {
                alert("잘못된 값이 있습니다. 다시 시도해주세요.");
            }
        } catch(err) {
            alert("포트폴리오가 수정되지 않았습니다.");
        }
        this.setState({ loaded : true });
    }

    // 포트폴리오 삭제 하는 호출
    async deletePortfolio(id) {
        try {
            const { portfolioList } = this.state;

            const result = await axios.delete(`${config.app.s_url}/portfolios/delete?id=${id}`);
            if(result.data) {
                this.setState({ portfolioList : portfolioList.filter(data => {
                    return data.id !== id
                })});
                alert("포트폴리오가 삭제되었습니다.");
            } else {
                alert("포트폴리오 삭제가 정상적으로 처리되지 않았습니다.");
            }
        } catch(err) {
            alert("포트폴리오가 삭제되지 않았습니다.");
            return;
        }
    }

    // -----------------------------------------------=== 스태이트 값 변경 함수들 === //

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
                        await this.setState({ imagesUrl : 
                            this.state.imagesUrl.concat({
                                data : url,
                                preview : URL.createObjectURL(image),
                                name : image.name,
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
    deleteChips(cate,e) {
        if(cate === "tag") {
            this.setState(current => ({ tag : current.tag.filter(data => { return data !== e })}))
        } else {
            this.setState(current => ({ partner : current.partner.filter(data => { return data !== e })}))
        }
    }

    // 기본 인풋 데이터 변경 함수
    onChangeValue(e) { this.setState({ [e.target.name] : e.target.value }) }
    onChangeDate(cate, e) { this.setState({ [cate] : e }) }
    onChangeNull() {
        this.setState({
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
            position : "",
            imagesUrl : [],
            imageLoad : false,
            imageView : false,
            addView : { view : false, create : false },
        })
    }
    numberChange(e) {
        if(/^[0-9/]*$/g.test(e.target.value) || !e.target.value) {
            this.setState({ [e.target.name] : e.target.value })
        }
    }

    /* -------------------------------------------------=== 추가/수정/삭제 버튼 누를 시 === */

    // 포트폴리오 수정 버튼 누를 시
    onChangeUpdate(data, i) {
        const { portfolioList } = this.state;
        let start = portfolioList[i].startDate.split("-");
        let end = portfolioList[i].endDate.split("-");
        let cateInput = /교내|교외|산업체/.test(portfolioList[i].projectCate);
        this.setState({
            title : portfolioList[i].title,
            startDate : start[0] || "",
            startMonth : start[1] || "1",
            endDate : end[0] || "",
            endMonth : end[1] || "1",
            ingDate : !portfolioList[i].endDate ? true : false,
            projectUrl : portfolioList[i].projectUrl,
            projectCate : cateInput ? portfolioList[i].projectCate : "직적입력",
            projectCateInput : cateInput ? "" : portfolioList[i].projectCate,
            position : portfolioList[i].position,
            partner : portfolioList[i].partner,
            tag : portfolioList[i].tag,
            content : portfolioList[i].content,
            imagesUrl : portfolioList[i].imagesUrl,
            addView : { view : true, create : false, id : data.id, idx : i }
        })
    }

    // 포트폴리오 추가 버튼 누를 시
    async portfolioadd() {
        await this.onChangeNull();
        this.setState({ addView : { view : true, create : true }});
    }

    // 포트폴리오 삭제 버튼 누를 시
    portfolioDelete(id) {
        if(window.confirm("포트폴리오를 삭제하시겠습니까?")) {
            this.deletePortfolio(id);
        }
        return;
    }

    // ----------------------------------------------------------=== 렌더링 === //
    render() {
        const { userName, load, loginState } = this.props;
        const { portfolioList, addView, ingDate,
            title, content, startDate, startMonth, endDate, endMonth, tag, partner, projectUrl, projectCate, projectCateInput, position,
            imagesUrl, imageLoad , imageView, preview
        } = this.state;
        return load ? (
            <div className="portfolio">

                {/* 포트폴리오 이미지 클릭하여 크게 보기 */}
                {
                    imageView && <div className="load-mask" onClick={() => this.setState({ imageView : false })}>
                        <div className="portfolio-imageviewDiv">
                            <img src={preview} alt="img" className="portfolio-imaPre"></img>
                        </div>
                    </div>
                }

                {/* 초기 타이틀 라인 추가와 갯수 표시 */}
                <div className="portfolio-title">
                    {
                        loginState && <div className="portfolio-content" onClick={this.portfolioadd.bind(this)}><span style={{marginRight:"5px"}}>포트폴리오 추가</span><LibraryAddOutlinedIcon /></div>
                    }
                    <div>{userName}님의 포트폴리오 개수는 <span style={{color:"red"}}>{portfolioList.length}</span>개 입니다.</div>
                </div>

                {/* 포트폴리오 추가 팝업 창 */}
                {
                    addView.view && 
                    <Popup 
                        textTitle={addView.create ? "포트폴리오 추가를 위해 값을 입력해주세요!" : "포트폴리오 수정을 위해 값을 변경해주세요!"}
                        title={title}
                        startDate={startDate}
                        startMonth={startMonth}
                        endDate={endDate}
                        endMonth={endMonth}
                        ingDate={ingDate}
                        projectUrl={projectUrl}
                        projectCate={projectCate}
                        projectCateInput={projectCateInput}
                        position={position}
                        partner={partner}
                        tag={tag}
                        tagList={dataList.app.tagList}
                        content={content}
                        imageLoad={imageLoad}
                        imagesUrl={imagesUrl}
                        textBtn={addView.create ? "포트폴리오 추가" : "포트폴리오 수정"}
                        addView={addView}

                        numberChange={this.numberChange.bind(this)}
                        onChangeValue={this.onChangeValue.bind(this)}
                        onChangeDate={this.onChangeDate.bind(this)}
                        addChips={this.addChips.bind(this)}
                        deleteChips={this.deleteChips.bind(this)}
                        addImage={this.addImage.bind(this)}
                        deleteImage={this.deleteImage.bind(this)}
                        savePortfolio={this.savePortfolio.bind(this)}
                        updatePortfolio={this.updatePortfolio.bind(this)}
                        closeBtn={this.onChangeNull.bind(this)}
                    />
                }

                {/* 포트폴리오를 표시 */}
                {
                    portfolioList && portfolioList[0] ?
                    portfolioList.map((data,i) => {
                        return <div className="portfolio-list-div" key={i}>
                            <div className="portfolio-idx-title">{data.title}<div>{loginState && <EditOutlinedIcon style={{cursor:"pointer"}} onClick={this.onChangeUpdate.bind(this, data, i)} />}{ loginState && <DeleteForeverOutlinedIcon style={{cursor:"pointer"}} onClick={this.portfolioDelete.bind(this, data.id)} />}</div></div>
                            <div className="portfolio-idx-date"><span>{data.startDate}~{data.endDate || "진행 중"}</span><span>구분: {data.projectCate}</span></div>
                            <pre className="portfolio-idx-contentBox">{data.content}</pre>
                            <div className="portfolio-idx-layout">
                                <div className="portfolio-idx-left">
                                    <div className="portfolio-idx-partnerTitle" style={{marginBottom:"15px"}}>나의 역할 : {data.position}</div>
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
                                    </div>
                                    <div className="portfolio-idx-partnerTitle" style={{marginBottom:"10px"}} ><a href={data.projectUrl} >{data.projectUrl}</a></div>
                                </div>
                                <div className="portfolio-idx-right">
                                    <div className="portfolio-idx-imageArr">
                                        {
                                            data.imagesUrl.map((data,i) => {
                                                return <Avatar onClick={() => this.setState({ imageView : true, preview : data.data })} variant="rounded" key={i} alt="Remy Sharp" src={data.data} 
                                                    style={{
                                                        border:"1px solid rgba(156, 156, 156, 0.664)",
                                                        margin:"5px",height:"70px",width:"70px",cursor:"pointer"
                                                    }} 
                                                />
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                    :
                    <div>

                        {/* 포트폴리오 가이드 텍스트 */}
                        {
                            <div className="portfolio-first">
                                {
                                    loginState ?
                                    <div className="portfolio-guideDiv">
                                        <h3 style={{display:"flex",alignItems:"center"}}><AssignmentLateOutlinedIcon/><span style={{marginLeft:"10px"}}>포트폴리오가 없습니다.</span></h3>
                                        <span className="portfolio-guide">
                                            다른사람에게 어필할 포트폴리오를 작성하세요. <br></br>
                                            포트폴리오에 주소를 추가하여 다른 사람이 쉽게 확인 할 수 있습니다. <br></br>
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