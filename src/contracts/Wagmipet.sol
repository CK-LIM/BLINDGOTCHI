/**
 *Submitted for verification at Etherscan.io on 2021-09-10
*/

// SPDX-License-Identifier: Unlicense

/*
  (w) (a) (g) (m) (i)
  by dom
*/

pragma solidity ^0.8.0;

contract Wagmipet {
    address _owner;
    bool _birthed;
    address[] public caretakers;
    uint256 public caretakerIndex;
    
    event CaretakerLoved(address indexed caretaker, uint256 indexed amount);
    
    uint256 lastFeedBlock;
    uint256 lastCleanBlock;
    uint256 lastPlayBlock;
    uint256 lastSleepBlock;
    
    uint8 internal hunger;
    uint8 internal uncleanliness;
    uint8 internal boredom;
    uint8 internal sleepiness;
    
    mapping (address => careTakerInfo) public love;

    struct careTakerInfo {
        address careTaker;
        uint256 love;
    }
    
    modifier onlyOwner() {
        require(msg.sender == _owner);
        _;
    }
    
    constructor() {
        _owner = msg.sender;
        lastFeedBlock = block.number;
        lastCleanBlock = block.number;
        lastPlayBlock = block.number;
        lastSleepBlock = block.number;
        
        hunger = 0;
        uncleanliness = 0;
        boredom = 0;
        sleepiness = 0;
    }
    
    function addLove(address caretaker, uint256 amount) internal {
        if (love[caretaker].love == 0) {
            caretakers.push(caretaker);
            love[caretaker].careTaker = caretaker;
            caretakerIndex +=1;
        }
        love[caretaker].love += amount;
        emit CaretakerLoved(caretaker, amount);
    }
    
    function feed() public {
        require(getAlive(), "No longer with us");
        require(getBoredom() < 80, "I'm too tired to eat");
        require(getUncleanliness() < 80, "I'm feeling too gross to eat");
        // require(getHunger() > 0, "i dont need to eat");
        
        lastFeedBlock = block.number;
        
        hunger = 0;
        boredom += 10;
        uncleanliness += 3;

        addLove(msg.sender, 1);
    }
    
    function clean() public {
        require(getAlive(), "No longer with us");
        require(getUncleanliness() > 0, "I dont need a bath");
        lastCleanBlock = block.number;
        
        uncleanliness = 0;
        
        addLove(msg.sender, 1);
    }
    
    function play() public {
        require(getAlive(), "No longer with us");
        require(getHunger() < 80, "I'm too hungry to play");
        require(getSleepiness() < 80, "I'm too sleepy to play");
        require(getUncleanliness() < 80, "I'm feeling too gross to play");
        // require(getBoredom() > 0, "i dont wanna play");
        
        lastPlayBlock = block.number;
        
        boredom = 0;
        hunger += 10;
        sleepiness += 10;
        uncleanliness += 5;
        
        addLove(msg.sender, 1);
    }
    
    function sleep() public {
        require(getAlive(), "No longer with us");
        require(getUncleanliness() < 80, "I'm feeling too gross to sleep");
        require(getSleepiness() > 0, "I'm not feeling sleepy");
        
        lastSleepBlock = block.number;
        
        sleepiness = 0;
        uncleanliness += 5;
        
        addLove(msg.sender, 1);
    }
    
    function getStatus() public view returns (string memory) {
        uint256 mostNeeded = 0;
        
        string[4] memory goodStatus = [
            "GM",
            "I'm feeling great",
            "All good",
            "I love u"
        ];
        
        string memory status = goodStatus[block.number % 4];
        
        uint256 _hunger = getHunger();
        uint256 _uncleanliness = getUncleanliness();
        uint256 _boredom = getBoredom();
        uint256 _sleepiness = getSleepiness();
        
        if (getAlive() == false) {
            return "No longer with us";
        }
        
        if (_hunger > 50 && _hunger > mostNeeded) {
            mostNeeded = _hunger;
            status = "I'm hungry";
        }
        
        if (_uncleanliness > 50 && _uncleanliness > mostNeeded) {
            mostNeeded = _uncleanliness;
            status = "I need a bath";
        }
        
        if (_boredom > 50 && _boredom > mostNeeded) {
            mostNeeded = _boredom;
            status = "I'm bored";
        }
        
        if (_sleepiness > 50 && _sleepiness > mostNeeded) {
            mostNeeded = _sleepiness;
            status = "I'm sleepy";
        }
        
        return status;
    }
    
    function getAlive() public view returns (bool) {
        return getHunger() < 201 && getUncleanliness() < 201 &&
            getBoredom() < 201 && getSleepiness() < 201;
    }
    
    function getHunger() public view returns (uint256) {
        return hunger + ((block.number - lastFeedBlock) / 50);
    }
    
    function getUncleanliness() public view returns (uint256) {
        return uncleanliness + ((block.number - lastCleanBlock) / 50);
    }
    
    function getBoredom() public view returns (uint256) {
        return boredom + ((block.number - lastPlayBlock) / 50);
    }
    
    function getSleepiness() public view returns (uint256) {
        return sleepiness + ((block.number - lastSleepBlock) / 50);
    }
}