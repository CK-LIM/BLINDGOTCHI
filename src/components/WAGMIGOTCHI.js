import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from '@material-ui/core/Button';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import character from '../character.png'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Spring, animated, } from 'react-spring'
import { Transition } from 'react-spring'



class WAGMIGOTCHI extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
        this.state = {
            validAmount: false
        }
        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler(event) {
        console.log("clicked")
        console.log(event)
        if (event == 0) {
            this.setState({
                message: 'FALSE'
            })
            this.setState({
                validAmount: false
            })

        } else {
            this.setState({
                message: 'true'
            })
            this.state.validAmount= true
            console.log("True")
        }
    }

    render() {
        return (

            <div id="content" className="mt-3" >
                <div className="text-center">
                    <ButtonGroup>
                        {/* <Button variant="outlined" color="default" component={Link} to="/PRTokenDistribution/">Liquidity Pool</Button> */}
                        <Button variant="contained" color="default" component={Link} to="/WAGMIGOTCHI/">BlindGOTCHI</Button>
                       
                    </ButtonGroup>
                </div>

                &nbsp;
                {/* ******************************************Migrate NPXSXEM on Binance Chain BEP2******************************************** */}
                <h2 className="table table-borderless text-muted text-center">Interact with BlindGOTCHI!</h2>&nbsp;

                <div className="card mb-4 card-body" >
                    <div className="text-center" >
                        <img src={character} height='150' alt="" />
                    </div>
                    <br />


                    {/* <Spring
                        loop= {true}
                        from={{ opacity: 0 }}
                        to={{ opacity: 1 }}
                    >
                        {props => <div style={props}>hello</div>}
                    </Spring> */}


                    <div className="card mb-4 card-body" >
                        <span className="float-right text-muted">
                            <div>BlindGOTCHI {'>'}  {this.props.status}</div>
                        </span>
                    </div>
                    <div >
                        <span className="float-left text-muted" >
                            <div>Boredom : {this.props.boredom}</div>
                        </span>
                        <br />
                        <ProgressBar variant="info" now={100 - this.props.boredom} />
                        <span className="float-left text-muted" >
                            <div>Uncleanliness : {this.props.uncleanliness}</div>
                        </span>
                        <br />
                        <ProgressBar variant="info" now={100 - this.props.uncleanliness} />
                        <span className="float-left text-muted" >
                            <div>Hunger : {this.props.hunger}</div>
                        </span>
                        <br />
                        <ProgressBar variant="info" now={100 - this.props.hunger} />
                        <span className="float-left text-muted" >
                            <div>Sleepiness : {this.props.sleepiness}</div>
                        </span>
                        <br />
                        <ProgressBar variant="info" now={100 - this.props.sleepiness} />

                    </div>
                    <br />
                    <div className="text-center">
                        <Button
                            variant="outlined" color="default"
                            type="submit"
                            // className="btn btn-primary btn-block btn-sm"
                            style={{ maxWidth: '100px' }}
                            onClick={(event) => {
                                event.preventDefault()
                                this.clickHandler(this.props.nftBalance)
                                if (this.state.validAmount == false) {
                                    alert("PLease get your NFT to interact with BlindGOTCHI")
                                } else {
                                    this.props.clean()
                                }
                            }}>
                            Clean
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button
                            variant="outlined" color="default"
                            type="submit"
                            // className="btn btn-primary btn-block btn-sm"
                            style={{ maxWidth: '100px' }}
                            onClick={(event) => {
                                event.preventDefault()
                                this.clickHandler(this.props.nftBalance)
                                if (this.state.validAmount == false) {
                                    alert("PLease get your nft to interact with BlindGOTCHI")
                                } else {
                                    this.props.feed()
                                }                                
                            }}>
                            Feed
                        </Button>&nbsp;&nbsp;&nbsp;
                        <Button
                            variant="outlined" color="default"
                            type="submit"
                            // className="btn btn-primary btn-block btn-sm"
                            style={{ maxWidth: '100px' }}
                            onClick={(event) => {
                                event.preventDefault()
                                this.clickHandler(this.props.nftBalance)
                                if (this.state.validAmount == false) {
                                    alert("PLease get your nft to interact with BlindGOTCHI")
                                } else {
                                    this.props.play()
                                }
                            }}>
                            Play
                        </Button>&nbsp;&nbsp;&nbsp;
                        <Button
                            variant="outlined" color="default"
                            type="submit"
                            // className="btn btn-primary btn-block btn-sm"
                            style={{ maxWidth: '100px' }}
                            onClick={(event) => {
                                event.preventDefault()
                                this.clickHandler(this.props.nftBalance)
                                console.log(this.state.validAmount)
                                if (this.state.validAmount == false) {
                                    alert("PLease get your nft to interact with BlindGOTCHI")
                                } else {
                                    this.props.sleep()
                                }
                            }}>
                            Sleep
                        </Button>
                    </div>
                </div><br />

                <br />

                {/* ********************************* show Token old************************************ */}

            </div>
        );
    }
}


export default WAGMIGOTCHI;
