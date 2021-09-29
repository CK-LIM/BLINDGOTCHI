import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from '@material-ui/core/Button';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import character from '../character.png'
import love from '../Love.ico'
import ProgressBar from 'react-bootstrap/ProgressBar'
// import { Spring, animated } from 'react-spring'
import { Spring, animated } from 'react-spring'


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
            this.state.validAmount = true
            console.log("True")
        }
    }

    render() {
        return (

            <div id="content" className="mt-3" >
                <div className="text-center">
                    <ButtonGroup>
                        {/* <Button variant="outlined" color="default" component={Link} to="/PRTokenDistribution/">Liquidity Pool</Button> */}
                        <Button variant="contained" color="default" component={Link} to="/BLINDGOTCHI/">BlindGOTCHI</Button>

                    </ButtonGroup>
                </div>

                &nbsp;
                {/* ******************************************Migrate NPXSXEM on Binance Chain BEP2******************************************** */}
                <h2 className="table table-borderless text-muted text-center">Interact with BlindGOTCHI!</h2>&nbsp;

                <div className="card mb-4 card-body" >
                    {/* <div className="text-center" >
                        <img src={character} height='150' alt="" />
                    </div> */}
                    <Spring loop
                        from={{ opacity: 0, color: 'red' },
                            { y: 10 }}
                        to={[{ opacity: 1, color: '#ffaaee' },
                        { opacity: 0.6, color: 'rgb(14,26,19)' },
                        { y: -10 },
                        { y: 10 },]}
                        config={{ delay: 0, duration: 500 }}>
                        {props => (
                            <animated.div style={props}>
                                <div className="text-center" >
                                    <img src={character} height='150' alt="" />
                                </div>
                            </animated.div>
                        )}
                    </Spring>
                    <br />
                    <div className="card mb-4 card-body" >
                        {/* <span>BlindGOTCHI</span> */}
                        <Spring loop
                            from={{ opacity: 0, color: 'red', fontSize: '1.5em' }}
                            to={[
                                { opacity: 1, color: '#ffaaee', fontSize: '1.5em' },
                                { opacity: 1.5, color: 'rgb(14,26,19)', fontSize: '1.5em' },
                            ]}>
                            {styles => (
                                <animated.div style={styles}> {">>>"} {this.props.status}</animated.div>
                            )}
                        </Spring>
                    </div>
                    <div >
                        <span className="float-left text-muted" >
                            <div>Boredom :</div>
                        </span>
                        <br />
                        <ProgressBar variant="info" now={(200 - this.props.boredom) / 2} />
                        <span className="float-left text-muted" >
                            <div>Uncleanliness : </div>
                        </span>
                        <br />
                        <ProgressBar variant="info" now={(200 - this.props.uncleanliness) / 2} />
                        <span className="float-left text-muted" >
                            <div>Hunger :</div>
                        </span>
                        <br />
                        <ProgressBar variant="info" now={(200 - this.props.hunger) / 2} />
                        <span className="float-left text-muted" >
                            <div>Sleepiness :</div>
                        </span>
                        <br />
                        <ProgressBar variant="info" now={(200 - this.props.sleepiness) / 2} />

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
                                    if (window.confirm("PLease get your NFT to interact with BlindGOTCHI" + "\r\n" + 'Click "ok" to redirected to Etherscan BlindGOTCHI smart contract or cancel to reload this page')) {
                                        window.location.href = 'https://etherscan.io/address/0x94d63b7af8bb003cd435311137776f86c4be2c3b';
                                    };
                                    // alert("PLease get your NFT to interact with BlindGOTCHI")
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
                                    if (window.confirm("PLease get your NFT to interact with BlindGOTCHI" + "\r\n" + 'Click "ok" to redirected to Etherscan BlindGOTCHI smart contract or cancel to reload this page')) {
                                        window.location.href = 'https://etherscan.io/address/0x94d63b7af8bb003cd435311137776f86c4be2c3b';
                                    };
                                    // alert("PLease get your nft to interact with BlindGOTCHI")
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
                                    if (window.confirm("PLease get your NFT to interact with BlindGOTCHI" + "\r\n" + 'Click "ok" to redirected to Etherscan BlindGOTCHI smart contract or cancel to reload this page')) {
                                        window.location.href = 'https://etherscan.io/address/0x94d63b7af8bb003cd435311137776f86c4be2c3b';
                                    };
                                    // alert("PLease get your nft to interact with BlindGOTCHI")
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
                                    if (window.confirm("PLease get your NFT to interact with BlindGOTCHI" + "\r\n" + 'Click "ok" to redirected to Etherscan BlindGOTCHI smart contract or cancel to reload this page')) {
                                        window.location.href = 'https://etherscan.io/address/0x94d63b7af8bb003cd435311137776f86c4be2c3b';
                                    };
                                    // alert("PLease get your nft to interact with BlindGOTCHI")
                                } else {
                                    this.props.sleep()
                                }
                            }}>
                            Sleep
                        </Button>
                    </div>
                </div>

                {/* ********************************* show Token old************************************ */}
                <div className="card mb-4 card-body" >

                    <h4 className="table table-borderless text-muted text-center">BlindGOTCHI <img src={love} height='30' alt="" /> Ranking</h4>&nbsp;
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Rank</th>
                                <th scope="col">Caretaker</th>
                                <th scope="col">Love</th>

                            </tr>
                        </thead>
                        <tbody id="claimList" >
                            {this.props.caretakers.map((caretakerInfo, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{this.props.caretakers.indexOf(caretakerInfo)+1}</td>
                                        <td>{caretakerInfo.careTaker}</td>
                                        <td>{caretakerInfo.love}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


export default WAGMIGOTCHI;
