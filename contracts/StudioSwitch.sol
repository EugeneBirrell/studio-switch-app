// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StudioSwitch {
    mapping(address => uint256) public userCues;
    mapping(address => uint256) public userRolls;
    mapping(address => uint256) public userMutes;

    uint256 public totalCues;
    uint256 public totalRolls;
    uint256 public totalMutes;

    event LightCued(address indexed user, uint256 userCues, uint256 totalCues);
    event TapeRolled(address indexed user, uint256 userRolls, uint256 totalRolls);
    event TrackMuted(address indexed user, uint256 userMutes, uint256 totalMutes);

    function cueLight() external {
        unchecked {
            userCues[msg.sender] += 1;
            totalCues += 1;
        }

        emit LightCued(msg.sender, userCues[msg.sender], totalCues);
    }

    function rollTape() external {
        unchecked {
            userRolls[msg.sender] += 1;
            totalRolls += 1;
        }

        emit TapeRolled(msg.sender, userRolls[msg.sender], totalRolls);
    }

    function muteTrack() external {
        unchecked {
            userMutes[msg.sender] += 1;
            totalMutes += 1;
        }

        emit TrackMuted(msg.sender, userMutes[msg.sender], totalMutes);
    }
}
