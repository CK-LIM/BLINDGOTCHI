import React, { Component } from 'react'
import x from '../x.png'

class NPXSMigration extends Component {

    render() {
        return (
            <div id="content" className="mt-3" >
                {/* <button
                    type="submit"
                    className="btn btn-info btn-block btn-sm"
                    style={{ maxWidth: '160px' }}
                    onClick={(event) => {
                        event.preventDefault()
                        this.props.bscSignMessage()
                    }}>
                    Binance Sign Message
                </button>&nbsp; */}
                {/* ******************************************Migrate NPXSXEM on Binance Chain BEP2******************************************** */}
                <h2 className="table table-borderless text-muted text-center">Migrate NPXSXEM Token!</h2>&nbsp;

                <div className="card mb-4 card-body" >
                    <form className="mb-3" onSubmit={(event) => {
                        event.preventDefault()
                        let amount = this.transferValue.value.toString()
                        this.props.bscTransfer(amount)
                        }}>
                        <div>
                            <label className="float-left"><b>Migrate NPXSXEM Token(BEP-2)</b></label>
                            <span className="float-right text-muted">
                                <div>BNB Balance: {this.props.bscNpxsxemBalance/100000000}</div>
                                <div>PURSE Balance: {window.web3.utils.fromWei(this.props.purseTokenBalance, 'Ether')}</div>
                            </span>
                        </div>
                        <div className="input-group mb-4">
                            <input
                                id="transferValue"
                                type="text"
                                ref={(input) => { this.transferValue = input }}
                                className="form-control form-control-lg"
                                placeholder="0"
                                required />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <img src={x} height='32' alt="" />
                                    &nbsp;&nbsp;&nbsp; NPXSXEM
                                </div>
                            </div>
                        </div>
                        {/* <div className="input-group mb-4">
                            <input
                                id="transferAddress"
                                type="text"
                                ref={(input) => { this.transferAddress = input }}
                                className="form-control form-control-lg"
                                placeholder="BSC Address(0x)"
                                required />
                        </div> */}
                        <button type="submit" className="btn btn-primary btn-block btn-lg">MIGRATE</button>
                    </form>
                </div>

                {/* ******************************************Migrate NPXSXEM on same network********************************************

                <div className="card mb-4 card-body" >
                    <form className="mb-3" onSubmit={(event) => {
                        event.preventDefault()
                        let amount
                        amount = this.migrateValue.value.toString()
                        amount = window.web3.utils.toWei(amount, 'Ether')
                        this.props.migrateNPXSXEM(amount)
                    }}>
                        <div>
                            <label className="float-left"><b>Migrate NPXSXEM Token</b></label>
                            <span className="float-right text-muted">
                                <div>NPXSXEM Balance: {window.web3.utils.fromWei(this.props.npxsxemTokenBalance, 'Ether')}</div>
                                <div>PURSE Balance: {window.web3.utils.fromWei(this.props.purseTokenBalance, 'Ether')}</div>
                            </span>
                        </div>
                        <div className="input-group mb-4">
                            <input
                                id="migrateValue"
                                type="text"
                                ref={(input) => { this.migrateValue = input }}
                                className="form-control form-control-lg"
                                placeholder="0"
                                required />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <img src={x} height='32' alt="" />
                                    &nbsp;&nbsp;&nbsp; NPXSXEM
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block btn-lg">MIGRATE</button>
                    </form>
                </div> */}
                {/* ******************************************Claim PURSE ******************************************** */}

                <div className="card mb-4 card-body" >
                    <h3 className="table table-borderless text-muted text-center">Claimable PURSE Token(BEP-20)</h3>&nbsp;
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Address</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Unlock date (GMT)</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>


                        <tbody id="claimList">
                            {this.props.migrator.map((migratorInfo, key) => {
                                return (
                                    <tr key={key}>
                                        {/* <th scope="row">{this.props.account}</th> */}
                                        <td>{this.props.account}</td>
                                        <td>{window.web3.utils.fromWei((migratorInfo.migrateBalance * 0.08).toString(), 'Ether')} PURSE</td>
                                        <td>{new Date(migratorInfo.unlockTime * 1000).toString()}</td>
                                        {/* <td>{migratorInfo.migrateCount}</td> */}
                                        {/* <td>{migratorInfo.releaseIteration}</td> */}
                                        <td>
                                            {migratorInfo.isRedeem
                                                ? <button
                                                    count={migratorInfo.migrateCount.toString()}
                                                    iteration={migratorInfo.releaseIteration.toString()}
                                                    onClick={(event) => {
                                                        console.log("clicked...")
                                                        console.log(event.target.count)
                                                        console.log(event.target.iteration)
                                                        // this.props.release('1', '1')
                                                        this.props.release(migratorInfo.migrateCount, migratorInfo.releaseIteration)
                                                    }}>
                                                    Claim
                                                </button>
                                                : <button type="button" disabled>Claimed</button>
                                            }
                                        </td>
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

export default NPXSMigration;
