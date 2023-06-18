import { useState, useEffect } from 'react';
import { LibraryContractAddress,NewOwnerContractAddress } from '../config.js';
import {ethers} from 'ethers';
import axios from 'axios';

import Library from '../utils/Library.json'
import Book from './components/Book';
import Book2 from './components/Book2';
import { Address } from 'cluster';
import { accounts } from 'web3/lib/commonjs/eth.exports.js';









/* vvvv Web3 Function vvvvv */

const Home: NextPage = () => {

  	const [currentAccount, setCurrentAccount] = useState('')
    const [correctNetwork, setCorrectNetwork] = useState(false)

    const [txError, setTxError] = useState(null)

    const [books, setBooks] = useState([]);
    const [bookName, setBookName] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookYear, setBookYear] = useState('');
    const [bookPetnumber, setBookPetnumber] = useState('');
    const [bookBreed, setBookBreed] = useState('');
    const [bookSex, setBookSex] = useState('');
    const [bookDateofbirth, setBookDateofbirth] = useState('');
    const [bookColor, setBookColor] = useState('');
    const [bookOwner, setBookOwner] = useState('');
    const [bookFinished, setBookFinished] = useState('');


  // Calls Metamask to connect wallet on clicking Connect Wallet button
	const connectWallet = async () => {
		try {
			const { ethereum } = window

			if (!ethereum) {
				console.log('Metamask not detected')
				return
			}
			let chainId = await ethereum.request({ method: 'eth_chainId'})

			console.log('Connected to chain:' + chainId)

			const GoerliChainId = '0x5'

			if (chainId !== GoerliChainId) {
				alert('You are not connected to the Goerli Testnet!')
				return
			}

			const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

			console.log('Found account', accounts[0])
			setCurrentAccount(accounts[0])
		} catch (error) {
			console.log('Error connecting to metamask', error)
		}
	}

  // Checks if wallet is connected to the correct network
const checkCorrectNetwork = async () => {
  const { ethereum } = window
  let chainId = await ethereum.request({ method: 'eth_chainId' })
  console.log('Connected to chain:' + chainId)

  const GoerilChainId = '0x5'

  if (chainId !== GoerliChainId) {
    setCorrectNetwork(false)
  } else {
    setCorrectNetwork(true)
  }
}

const getBooks = async() => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const LibraryContract = new ethers.Contract(
          LibraryContractAddress,
          Library.abi,
          signer
        )

        let booksFinished = await LibraryContract.getFinishedBooks()
        let booksUnFinished = await LibraryContract.getUnfinishedBooks()


        console.log(booksUnFinished);
        console.log("Books:- ")
        console.log(booksFinished);

        let books = booksFinished.concat(booksUnFinished)
        setBooks(books);

      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
      setTxError(error.message)
    }
  }

  const clickBookFinished = async (id) => {
    console.log(id);

    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const LibraryContract = new ethers.Contract(
          LibraryContractAddress,
          Library.abi,
          signer
        )

        let libraryTx = await LibraryContract.setFinished(id, true);

        console.log(libraryTx);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log('Error Submitting new Book', error)
      setTxError(error.message)
    }
  }

const submitBook = async () => {
     let book = {

        'name': bookName,
        'year': parseInt(bookYear),
        'author': bookAuthor,
        'petnumber' : bookPetnumber,
        'breed' : bookBreed,
        'sex' : bookSex,
        'dateofbirth' : bookDateofbirth,
        'color' : bookColor,
        'owner' : bookOwner,
        'finished': bookFinished == "yes" ? true : false
        



  }

  try {
    const { ethereum } = window

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const LibraryContract = new ethers.Contract(
        LibraryContractAddress,
        Library.abi,
        signer
      )

      let libraryTx = await LibraryContract.addBook(book.name, book.year, book.author, book.petnumber, book.breed, book.sex, book.dateofbirth, book.color, book.owner, book.finished);

      console.log(libraryTx);
    } else {
      console.log("Ethereum object doesn't exist!")
    }
  } catch (error) {
    console.log('Error Submitting new Book', error)
    setTxError(error.message)
  }
}
const transferBookOwner = async (bookId: number, newOwner: string) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const LibraryContract = new ethers.Contract(
        LibraryContractAddress,
        Library.abi,
        signer
      );
        console.log(bookId);
        console.log(newOwner);
      let libraryTx = await LibraryContract.transferOwner(bookId, newOwner);
      // .send({from : signer});

      console.log(libraryTx);
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log('Error transferring ownership', error);
    setTxError(error.message);
  }
};







/* vvvv   HTML  vvvvvv */




  return (




    
    <div className='flex flex-col items-center bg-[#f3f6f4] text-[#6a50aa] min-h-screen'>
  <div className='trasition hover:rotate-180 hover:scale-105 transition duration-500 ease-in-out' >
  </div>
  
  <h2 className='text-7xl font-bold mb-20 mt-12'style={{ color: "#1d486e"}}>
  PETBOOK
  </h2>
  <div class="flex flex-wrap justify-center">
  <img
    src="https://cdn-icons-png.flaticon.com/512/3048/3048234.png"
    class="max-w-xs h-xs transition-shadow ease-in-out duration-300"
    alt=""
  />
</div>
  <h2 className='text-3xl font-bold mb-20 mt-12'style={{ color: "#2e84b3"}}
  >
    Pet registration system with Smart Contract
  </h2>
  {currentAccount === '' ? (
    <button
    className='text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
    onClick={connectWallet}
    style={{ backgroundColor: "#23315e", color: "#ffffff" }}
    >
    Connect Wallet
    </button>
    ) : correctNetwork ? (
      <h4 className='text-3xl font-bold mb-20 mt-12'>
        Wallet Connected
      </h4>
    ) : (
    <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'style={{ color: "#2b58a1"}}>


    <div class="flex flex-wrap justify-center">
  <img
    src="https://cdn-icons-png.flaticon.com/512/512/512716.png"
    class="max-w-sm h-auto transition-shadow ease-in-out duration-300"
    alt=""
    />
</div>

    <div class="flex flex-wrap justify-center">
  <img
    src="https://cdn-icons-png.flaticon.com/512/7925/7925215.png"
    class="max-w-sm h-auto transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
    alt=""
  />
</div>

    <div>Wellcome</div>
    <div>Registration system</div>
    <div class="flex flex-wrap justify-center">
  <img
    src="https://cdn-icons-png.flaticon.com/512/512/512716.png"
    class="max-w-sm h-auto transition-shadow ease-in-out duration-300"
    alt=""
    />

</div>

<div className='text-xl font-semibold mb-20 mt-4' style={{ color: "#2c508a" , backgroundColor: "#d2e7fa",padding: "150px"}}>
  <div className='font-semibold text-lg text-center mb-4 text-xxl'></div>
  <h4 className='text-5xl font-bold mb-20 mt-12'style={{ color: "#2c508a"}}>
        REGISTRATION
      </h4>

      <label>Registration No.</label>
      <p>❥<input className='text-xl font-bold mb-2 mt-1' type="text" placeholder="Input Registration No." value={bookPetnumber} onChange={(e) => setBookPetnumber(e.target.value)}  style={{ padding: "15px" , margin: "8px", width:"20em"}}/></p>

      <label>Pet Name</label>
      <p>✎<input className='text-xl font-bold mb-2 mt-1' type="text" placeholder="Input Pet Name" value={bookName} onChange={(e) => setBookName(e.target.value)} style={{ padding: "15px" , margin: "8px", width:"20em"}}/></p>
      
      <label>Farm Name</label>
      <p>❥<input className='text-xl font-bold mb-2 mt-1' type="text" placeholder="Input farm animal breeds" value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} style={{ padding: "15px" , margin: "8px", width:"20em"}}/></p>
      
      <label>Year of Registration</label>
      <p>❥<input className='text-xl font-bold mb-2 mt-1' type="text" placeholder="Input Year of registration" value={bookYear} onChange={(e) => setBookYear(e.target.value)}  style={{ padding: "15px" , margin: "8px", width:"20em"}}/></p>

      <label>Breed</label>
      <p>❥<input className='text-xl font-bold mb-2 mt-1' type="text" placeholder="Input Breed" value={bookBreed} onChange={(e) => setBookBreed(e.target.value)}  style={{ padding: "15px" , margin: "8px", width:"20em"}}/></p>

      <label>Sex</label>
      <p>❥<input className='text-xl font-bold mb-2 mt-1' type="text" placeholder="Input Sex" value={bookSex} onChange={(e) => setBookSex(e.target.value)}  style={{ padding: "15px" , margin: "8px", width:"20em"}}/></p>

      <label>Date of birth</label>
      <p>❥<input className='text-xl font-bold mb-2 mt-1' type="text" placeholder="Input Date of birth" value={bookDateofbirth} onChange={(e) => setBookDateofbirth(e.target.value)}  style={{ padding: "15px" , margin: "8px", width:"20em"}}/></p>

      <label>Pet Color</label>
      <p>❥<input className='text-xl font-bold mb-2 mt-1' type="text" placeholder="Input Color" value={bookColor} onChange={(e) => setBookColor(e.target.value)}  style={{ padding: "15px" , margin: "8px", width:"20em"}}/></p>

      <label>Address Owner ❀</label>
      <p>❥<input className='text-xl font-bold mb-2 mt-1' type="text" placeholder="Input AddressOwner" value={bookOwner} onChange={(e) => setBookOwner(e.target.value)} style={{ padding: "15px" , margin: "8px", width:"20em"}}/></p>
      
      <label>This pet vaccinated ?</label>
      <p>❥<input className='text-xl font-bold mb-2 mt-1' type="text" placeholder="yes or no" value={bookFinished} onChange={(e) => setBookFinished(e.target.value)} style={{ padding: "15px" , margin: "8px", width:"20em"}}/></p>
      <br/><br></br>

      <button className='text-xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
      onClick={submitBook} 
      style={{ backgroundColor: "#95bdab", color: "#1b573c"}}
      >
         Register
      </button>
  </div>
  {(
    <div className='flex flex-col justify-center items-center'style={{ backgroundColor: "#d2e7fa",padding: "100px"}}>
      <div className='font-semibold text-lg text-center mb-4 text-xxl'
      style={{ color: "#1d486e"}}>
      <h4 className='text-5xl font-bold mb-20 mt-12'>
        PET LIST
      </h4>
      <div className='book2'>
      {books.map((book) => (
        <Book2
        petnumber={book.petnumber}
          />
          ))}
          </div>
      </div>
      <button className='text-xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
      onClick={getBooks} 
      style={{ backgroundColor: "#07206e", color: "#ffffff"}}
      >
        
        Registered pet information
      </button>
      {books.map((book) => (
        <Book
          key={book.id}
          id={parseInt(book.id)}
          name={book.name}
          year={parseInt(book.year).toString()}
          author={book.author}
          petnumber={book.petnumber}
          breed={book.breed}
          sex={book.sex}
          dateofbirth={book.dateofbirth}
          color={book.color}
          owner={book.owner}
          finished={book.finished.toString()}
          clickBookFinished={clickBookFinished}
          transferBookOwner={transferBookOwner} // Pass the function as a prop


        />
       
      ))}
      
    </div>



  )}


    </div>
    

  )}

 









      




<div class="p-6 shadow-lg rounded-lg bg-gray-100 text-gray-1500">
  <h2 class="font-semibold text-3xl mb-5"style={{ color: "#366bb5"}}>Thank you for visiting our website!</h2>
  <p style={{ color: "#232a7d"}}>
  ❤ Pattarawan Thanakitcharoenchai &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID : 2220731303004 <br></br>
  </p>
  <button
    type="button"
    class="inline-block px-6 py-2.5 mt-4 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
    style={{ backgroundColor: "#ffd1e3", color: "#d92759"}}
    >
    Github
  </button>
</div>


</div>




  )
}
export default Home
