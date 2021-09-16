// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

abstract contract ERC20Interface {

    function transfer(address to, uint tokens) public virtual returns (bool success);

    function transferFrom(address from, address to, uint tokens) public virtual returns (bool success);

}

contract PurseTokenUpgradable is Initializable, UUPSUpgradeable, PausableUpgradeable, OwnableUpgradeable {
    string public name;
    string public symbol;
    uint256 public totalSupply;
    uint8 public decimals;
    uint256 private minimumSupply;
    address[] public admins;
    address public liqPool;
    address public disPool;
    uint256 public burnPercent;
    uint256 public liqPercent;
    uint256 public disPercent;
    
    uint256 public _averageInterval;
    uint256 public _getRewardEndTime;
    uint256 public _getRewardStartTime;
    uint256 public _numOfDaysPerMth;
    uint256 public _monthlyDistributePr;
    uint256 public _percentageDistribute;
    uint256 public _lastRewardStartTime;
    uint256 public _totalSupply;
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Burn(address indexed _from, uint256 _value);
    event Mint(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    modifier onlyAdmin() {
        require(isAdmin[msg.sender]);
        _;
    }

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => bool) public isAdmin;
    mapping(address => bool) public isWhitelistedTo;
    mapping(address => bool) public isWhitelistedFrom;
    mapping(address => AccAmount) public accAmount;

    struct AccAmount {
        uint256 amount;
        uint256 lastUpdateTime;
    }

    function transfer(address _to, uint256 _value)
        public
        whenNotPaused 
        returns (bool success)
    {
        require(_value >= 0);
        require(balanceOf[msg.sender] >= _value);
        if (isWhitelistedTo[_to] || isWhitelistedFrom[msg.sender]) {
            updateAccumulateBalanceTransaction(msg.sender, _to); 
            balanceOf[msg.sender] -= _value;
            balanceOf[_to] += _value;
            
           
            emit Transfer(msg.sender, _to, _value);
            return true;
        } else {
            updateAccumulateBalanceTransaction(msg.sender, _to);
            uint256 transferValue = _partialBurn(_value, msg.sender);
            balanceOf[msg.sender] -= transferValue;
            balanceOf[_to] += transferValue;
            

            emit Transfer(msg.sender, _to, transferValue);
            return true;
        }
    }
    
    function updateAccumulateBalance(address _holder, uint256 _updateTime) private {
        if (accAmount[_holder].lastUpdateTime == 0) {
            accAmount[_holder].lastUpdateTime = _updateTime;
        } 
        else if (accAmount[_holder].lastUpdateTime < _lastRewardStartTime) {
            uint256 interval = (_updateTime - _lastRewardStartTime)/ _averageInterval;
            uint256 accumulateAmount = balanceOf[_holder] * interval;
            accAmount[_holder].lastUpdateTime = _updateTime;
            accAmount[_holder].amount = accumulateAmount;            
        } 
        else {
            uint256 interval = (_updateTime - accAmount[_holder].lastUpdateTime)/ _averageInterval;
            if (interval >= 1) {
                uint256 accumulateAmount = balanceOf[_holder] * interval;
                accAmount[_holder].lastUpdateTime = _updateTime;
                accAmount[_holder].amount = accAmount[_holder].amount + accumulateAmount;                     
            }
        }
    }
    
    function updateAccumulateBalanceTransaction(address _from, address _to) private {
        updateAccumulateBalance(_from, block.timestamp);
        updateAccumulateBalance(_to, block.timestamp);
    }
    
    function updateAccumulateBalanceClaim(address _holder) private {
        updateAccumulateBalance(_holder, _getRewardStartTime);
    }

    function claimDistributionPurse() public whenNotPaused returns(bool success) {
        require(block.timestamp < _getRewardEndTime);
        require(block.timestamp > _getRewardStartTime);
        require(accAmount[msg.sender].lastUpdateTime < _getRewardStartTime);
        updateAccumulateBalanceClaim(msg.sender);
        uint256 claimAmount = accAmount[msg.sender].amount * _monthlyDistributePr * _percentageDistribute * 100 / _totalSupply / _numOfDaysPerMth / 10000;
        
        accAmount[msg.sender].lastUpdateTime = _getRewardStartTime;
        accAmount[msg.sender].amount = 0;
        updateAccumulateBalance(msg.sender, block.timestamp);
        ERC20Interface(address(this)).transfer(msg.sender, claimAmount);
        return true;
    }
    
    function activateClaimMonthly(uint256 _rewardStartTime, uint256 _rewardEndTime, uint256 _monthlyDisPr, uint256 _numOfDays, uint256 _percentage) public onlyOwner {
        require(_rewardStartTime > block.timestamp );
        require(_rewardEndTime > _rewardStartTime);
        require(_numOfDays > 0);
        require(_percentage > 0);
        
        _totalSupply = totalSupply;
        _lastRewardStartTime = _getRewardStartTime;
        _numOfDaysPerMth = _numOfDays;
        _getRewardStartTime = _rewardStartTime;
        _getRewardEndTime = _rewardEndTime;
        _percentageDistribute = _percentage;
        _monthlyDistributePr = _monthlyDisPr;
    }
    
    function approve(address _spender, uint256 _value)
        public
        whenNotPaused 
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public whenNotPaused returns (bool success) {
        require(_value >= 0);
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        if (isWhitelistedTo[_to] || isWhitelistedFrom[msg.sender]) {
            allowance[_from][msg.sender] -= _value;
            updateAccumulateBalanceTransaction(_from, _to);
            balanceOf[_from] -= _value;
            balanceOf[_to] += _value;
            
            emit Transfer(_from, _to, _value);
            return true;
        } else {
            allowance[_from][msg.sender] -= _value;
            updateAccumulateBalanceTransaction(_from, _to);
            uint256 transferValue = _partialBurn(_value, _from);
            balanceOf[_from] -= transferValue;
            balanceOf[_to] += transferValue;

            emit Transfer(_from, _to, transferValue);
            return true;
        }
    }

    function mint(address _account, uint256 _amount) public whenNotPaused onlyAdmin {
        require(_account != address(0));
        updateAccumulateBalance(_account, block.timestamp); 
        balanceOf[_account] += _amount;

        totalSupply += _amount;
        emit Mint(address(0), _account, _amount);
    }

    function burn(uint256 _amount) public whenNotPaused {
        require(_amount != 0);
        require(balanceOf[msg.sender] >= _amount);
        updateAccumulateBalance(msg.sender, block.timestamp); 
        balanceOf[msg.sender] -= _amount;
        totalSupply -= _amount;
        emit Burn(msg.sender, _amount);
    }

    function _partialBurn(uint256 _amount, address _from)
        internal
        returns (uint256)
    {
        uint256 transferAmount = 0;
        uint256 burnAmount;
        uint256 liqAmount;
        uint256 disAmount;
        (
            burnAmount,
            liqAmount,
            disAmount
        ) = _calculateDeductAmount(_amount);

        if (burnAmount >= 0 || liqAmount >= 0 || disAmount >= 0) {
            burnPrivate(_from, burnAmount, liqAmount, disAmount);
        }
        transferAmount = _amount - burnAmount - liqAmount - disAmount;

        return transferAmount;
    }

    function burnPrivate(
        address _account,
        uint256 _burnAmount,
        uint256 _liqAmount,
        uint256 _disAmount
    ) private {
        require(_account != address(0));
        uint256 accountBalance = balanceOf[_account];
        uint256 deductAmount = _burnAmount + _liqAmount + _disAmount;
        require(accountBalance >= deductAmount);
        balanceOf[_account] -= _burnAmount;
        balanceOf[_account] -= _liqAmount;
        balanceOf[_account] -= _disAmount;

        totalSupply -= _burnAmount;
        updateAccumulateBalanceTransaction(disPool, liqPool); 
        balanceOf[liqPool] += _liqAmount;
        balanceOf[disPool] += _disAmount;

        emit Burn(_account, _burnAmount);
        emit Transfer(msg.sender, liqPool, _liqAmount);
        emit Transfer(msg.sender, disPool, _disAmount);
    }

    function _calculateDeductAmount(uint256 _amount)
        internal
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        uint256 burnAmount;
        uint256 liqAmount;
        uint256 disAmount;

        if (totalSupply > minimumSupply) {
            burnAmount = (_amount * burnPercent) / 100;
            liqAmount = (_amount * liqPercent) / 100;
            disAmount = (_amount * disPercent) / 100;
            uint256 availableBurn = totalSupply - minimumSupply;
            if (burnAmount > availableBurn) {
                burnAmount = availableBurn;
            }
        }
        return (burnAmount, liqAmount, disAmount);
    }

        function setWhitelistedTo(address newWhitelist) public onlyOwner {
        // require(newWhitelist != address(0));
        require(!isWhitelistedTo[newWhitelist]);

        isWhitelistedTo[newWhitelist] = true;
    }

    function removeWhitelistedTo(address newWhitelist) public onlyOwner {
        // require(newWhitelist != address(0));
        require(isWhitelistedTo[newWhitelist]);

        isWhitelistedTo[newWhitelist] = false;
    }

    function setWhitelistedFrom(address newWhitelist) public onlyOwner {
        // require(newWhitelist != address(0));
        require(!isWhitelistedFrom[newWhitelist]);

        isWhitelistedFrom[newWhitelist] = true;
    }

    function removeWhitelistedFrom(address newWhitelist) public onlyOwner {
        // require(newWhitelist != address(0));
        require(isWhitelistedFrom[newWhitelist]);

        isWhitelistedFrom[newWhitelist] = false;
    }

    function updateLPoolAdd(address _newLPool) public onlyOwner {
        // require(_newLPool != address(0));
        require(_newLPool != liqPool);

        liqPool = _newLPool;
    }

    function updateDPoolAdd(address _newDPool) public onlyOwner {
        // require(_newDPool != address(0));
        require(_newDPool != disPool);

        disPool = _newDPool;
    }
    
    function updatePercent(uint256 _newDisPercent, uint256 _newLiqPercent, uint256 _newBurnPercent) public onlyOwner {
        require(_newDisPercent >= 0 && _newDisPercent <= 100 && _newLiqPercent >= 0 && _newLiqPercent <= 100 && _newBurnPercent >= 0 && _newBurnPercent <= 100);
        // require(_newLiqPercent >= 0 && _newLiqPercent <= 100);
        // require(_newBurnPercent >= 0 && _newBurnPercent <= 100);
        
        disPercent = _newDisPercent;
        liqPercent = _newLiqPercent;
        burnPercent = _newBurnPercent;
    }

    function addAdmin(address newAdmin) public onlyOwner{
        // require(newAdmin != address(0));
        require(!isAdmin[newAdmin]);

        isAdmin[newAdmin] = true;
        admins.push(newAdmin);
    }

    function removeAdmin(uint index) public onlyOwner returns (address[] memory){
        address removeOwner = admins[index];
        require(index < admins.length);
        require(isAdmin[removeOwner]);
        
        for (uint i = index; i<admins.length-1; i++){
            admins[i] = admins[i+1];
        }
        admins.pop();

        isAdmin[removeOwner] = false;
        return admins;
    }

    // function getAdmins() public view returns (address[] memory) {
    //     return admins;
    // }
    
    function transferERCToken(address token, uint256 amount, address _to) public whenNotPaused onlyOwner{
        require(_to != address(0));
        if (token == address(this)) {
            updateAccumulateBalanceTransaction(address(this), _to);
            ERC20Interface(token).transfer(_to, amount);
        } else {
            ERC20Interface(token).transfer(_to, amount);          
        }
    } 

    function pause() public whenNotPaused onlyOwner {
        _pause();
    }

    function unpause() public whenPaused onlyOwner {
        _unpause();
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function initialize(
        address _to,
        address _lPool,
        address _dPool,
        uint256 _burnPercent,
        uint256 _liqPercent,
        uint256 _disPercent
    ) public initializer {
        require(_lPool != address(0));
        require(_dPool != address(0));
        require(_burnPercent >= 0);
        require(_liqPercent >= 0);
        require(_disPercent >= 0);

        name = "PURSE Token";
        symbol = "PR";
        totalSupply = 64000000000 * (10**18); // 64 billion tokens
        decimals = 18;
        minimumSupply = 20000 * (10**18);

        liqPool = _lPool;
        disPool = address(this);
        burnPercent = _burnPercent;
        liqPercent = _liqPercent;
        disPercent = _disPercent;
        admins = [msg.sender];
        _averageInterval = 1 minutes;       // update to 1 days in mainnet(prod)
        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
        
        balanceOf[_to] = totalSupply;
        updateAccumulateBalance(_to, block.timestamp); 
        emit Mint(address(0), _to, totalSupply);
    }
}