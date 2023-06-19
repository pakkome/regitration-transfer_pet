// SPDX-License-Identifier: MIT LICENSE
pragma solidity ^0.8.0;

contract Library {
  event AddBook(address recipient, uint bookId);
  event SetFinished(uint bookId, bool finished);
  event TransferOwner(uint bookId, address previousOwner, address newOwner);

  struct Book {
    uint id;
    string name;
    uint year;
    string author;
    string petnumber;
    string breed;
    string sex;
    string dateofbirth;
    string color;
    address owner;
    bool finished;
  }

  Book[] private bookList;
  mapping(uint => address) bookToOwner;

  function addBook(string memory name, uint256 year, string memory author, string memory petnumber, string memory breed, string memory sex,string memory dateofbirth, string memory color, address owner, bool finished) external {
    require(owner != address(0), "Invalid owner address");
    uint bookId = bookList.length;
    bookList.push(Book(bookId, name, year, author, petnumber, breed, sex, dateofbirth, color, owner, finished));
    bookToOwner[bookId] = owner;
    emit AddBook(msg.sender, bookId);
  }

  function _getBookList(bool finished) private view returns (Book[] memory) {
    Book[] memory temporary = new Book[](bookList.length);
    uint counter = 0;
    for(uint i=0; i<bookList.length; i++) {
      if(bookToOwner[i] == msg.sender && bookList[i].finished == finished) {
        temporary[counter] = bookList[i];
        counter++;
      }
    }
    Book[] memory result = new Book[](counter);
    for(uint i=0; i<counter; i++) {
      result[i] = temporary[i];
    }
    return result;
  }

  function getFinishedBooks() external view returns (Book[] memory) {
    return _getBookList(true);
  }

  function getUnfinishedBooks() external view returns (Book[] memory) {
    return _getBookList(false);
  }

  function setFinished(uint bookId, bool finished) external {
    if (bookToOwner[bookId] == msg.sender) {
      bookList[bookId].finished = finished;
      emit SetFinished(bookId, finished);
    }
  }

  function transferOwner(uint bookId, address newOwner) external {
    require(bookId < bookList.length, "Invalid book ID");
    require(bookToOwner[bookId] == msg.sender, "Only the current owner can transfer ownership");

    bookToOwner[bookId] = newOwner;
    emit TransferOwner(bookId, msg.sender, newOwner);
  }
}
