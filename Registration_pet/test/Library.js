const {expect} = require("chai");
const {ethers} = require("hardhat");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


describe("Library Contract", function() {
  let Library;
  let library;
  let owner;

  const NUM_UNFINISHED_BOOK = 5;
  const NUM_FINISHED_BOOK = 3;

  let unfinishedBookList;
  let finishedBookList;

  function verifyBook(bookChain, book) {
      expect(book.name).to.equal(bookChain.name);
      expect(book.year.toString()).to.equal(bookChain.year.toString());
      expect(book.author).to.equal(bookChain.author);
  }

  function verifyBookList(booksFromChain, bookList) {
      expect(booksFromChain.length).to.not.equal(0);
      expect(booksFromChain.length).to.equal(bookList.length);
      for (let i = 0; i < bookList.length; i++) {
          const bookChain = booksFromChain[i];
          const book = bookList[i];
          verifyBook(bookChain, book);
      }
  }

  beforeEach(async function() {
    Library = await ethers.getContractFactory("Library");
    [owner] = await ethers.getSigners();
    library = await Library.deploy();

    unfinishedBookList = [];
    finishedBookList = [];



    for(let i=0; i<NUM_UNFINISHED_BOOK; i++) {
      let book = {
        'name': getRandomInt(1, 1000).toString(),
        'year': getRandomInt(1800, 2021),
        'author': getRandomInt(1, 1000).toString(),
        'finished': false
      };

      await library.addBook(book.name, book.year, book.author, book.finished);
      unfinishedBookList.push(book);
    }

    for(let i=0; i<NUM_FINISHED_BOOK; i++) {
      let book = {
        'name': getRandomInt(1, 1000).toString(),
        'year': getRandomInt(1800, 2021),
        'author': getRandomInt(1, 1000).toString(),
        'finished': true
      };

      await library.addBook(book.name, book.year, book.author, book.finished);
      finishedBookList.push(book);
    }
  });

  describe("Add Book", function(){
    it("should emit AddBook event", async function() {
      let book = {
        'name': getRandomInt(1, 1000).toString(),
        'year': getRandomInt(1800, 2021),
        'author': getRandomInt(1, 1000).toString(),
        'finished': false
      };

      await expect(await library.addBook(book.name, book.year, book.author, book.finished)
    ).to.emit(library, 'AddBook').withArgs(owner.address, NUM_FINISHED_BOOK + NUM_UNFINISHED_BOOK);
    })
  })

  describe("Get Book", function() {
    it("should return the correct unfinished books", async function(){
      const booksFromChain = await library.getUnfinishedBooks()
      expect(booksFromChain.length).to.equal(NUM_UNFINISHED_BOOK);
      verifyBookList(booksFromChain, unfinishedBookList);
    })

    it("should return the correct finished books", async function(){
      const booksFromChain = await library.getFinishedBooks()
      expect(booksFromChain.length).to.equal(NUM_FINISHED_BOOK);
      verifyBookList(booksFromChain, finishedBookList);
    })
  })

  describe("Set Finished", function() {
      it("Should emit SetFinished event", async function () {
          const BOOK_ID = 0;
          const BOOK_FINISHED = true;

          await expect(
              library.setFinished(BOOK_ID, BOOK_FINISHED)
          ).to.emit(
              library, 'SetFinished'
          ).withArgs(
              BOOK_ID, BOOK_FINISHED
          )
      })
  })
  describe("Transfer Book Owner", function () {
    it("Should transfer book ownership", async function () {
      const BOOK_ID = 0;
      const newOwner = ethers.Wallet.createRandom().address;

      await expect(
        library.transferOwner(BOOK_ID, newOwner)
      ).to.emit(library, "TransferOwner").withArgs(BOOK_ID, owner.address, newOwner);

      const bookOwner = await library.bookToOwner(BOOK_ID);
      expect(bookOwner).to.equal(newOwner);
    });

    it("Should revert when transferring ownership by non-owner", async function () {
      const BOOK_ID = 0;
      const newOwner = ethers.Wallet.createRandom().address;

      const nonOwner = ethers.Wallet.createRandom();
      await expect(
        library.connect(nonOwner).transferOwner(BOOK_ID, newOwner)
      ).to.be.revertedWith("Only the current owner can transfer ownership");

      const bookOwner = await library.bookToOwner(BOOK_ID);
      expect(bookOwner).to.equal(owner.address);
    });

    it("Should revert when transferring ownership of invalid book ID", async function () {
      const INVALID_BOOK_ID = 999;
      const newOwner = ethers.Wallet.createRandom().address;

      await expect(
        library.transferOwner(INVALID_BOOK_ID, newOwner)
      ).to.be.revertedWith("Invalid book ID");

      // Ensure the ownership of other books is not affected
      const bookOwner = await library.bookToOwner(0);
      expect(bookOwner).to.equal(owner.address);
    });
  });
});

