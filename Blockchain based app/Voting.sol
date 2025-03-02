// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; // Define Solidity version

/**
 * @title Voting Smart Contract
 * @dev Allows users to create polls, vote, and close polls after a deadline.
 */
contract Voting {
    struct Poll {
        string question; // The poll question
        string[] options; // The available voting options
        mapping(uint => uint) votes; // Store vote count for each option
        mapping(address => bool) hasVoted; // Track whether a user has voted
        uint deadline; // Store poll deadline (timestamp)
        bool exists; // Ensure poll existence
    }

    address public owner; // The owner of the contract
    uint public pollCount; // Counter to track the number of polls
    mapping(uint => Poll) public polls; // Store polls by ID

    event PollCreated(uint pollId, string question, string[] options, uint deadline);
    event Voted(uint pollId, uint optionIndex);
    
    constructor() {
        owner = msg.sender; // Set contract deployer as owner
    }

    // Function to create a poll
    function createPoll(string memory _question, string[] memory _options, uint _duration) public {
        require(msg.sender == owner, "Only owner can create polls"); // Restrict poll creation to contract owner
        require(_options.length > 1, "At least two options required"); // Require at least two options

        Poll storage newPoll = polls[pollCount]; // Create new poll entry
        newPoll.question = _question;
        newPoll.options = _options;
        newPoll.exists = true;
        newPoll.deadline = block.timestamp + _duration; // Set poll deadline

        emit PollCreated(pollCount, _question, _options, newPoll.deadline);
        pollCount++; // Increment poll counter
    }

    // Function to vote
    function vote(uint _pollId, uint _optionIndex) public {
        require(polls[_pollId].exists, "Poll does not exist"); // Ensure poll exists
        require(block.timestamp < polls[_pollId].deadline, "Voting period has ended"); // Ensure voting is open
        require(!polls[_pollId].hasVoted[msg.sender], "You have already voted"); // Ensure unique vote per user
        require(_optionIndex < polls[_pollId].options.length, "Invalid option"); // Ensure valid option index

        polls[_pollId].votes[_optionIndex]++; // Increase vote count
        polls[_pollId].hasVoted[msg.sender] = true; // Mark user as voted

        emit Voted(_pollId, _optionIndex);
    }

    // Function to retrieve poll details
    function getPoll(uint _pollId) public view returns (string memory, string[] memory, uint) {
        return (polls[_pollId].question, polls[_pollId].options, polls[_pollId].deadline);
    }

    // Function to retrieve vote count for a poll option
    function getVotes(uint _pollId, uint _optionIndex) public view returns (uint) {
        return polls[_pollId].votes[_optionIndex];
    }
}
