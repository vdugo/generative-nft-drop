import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Countdown from 'react-countdown'
import { ethers } from 'ethers'

import preview from '../preview.png'

// Components
import Navigation from './Navigation';
import Data from './Data'
import Loading from './Loading';

// ABIs: Import your contract ABIs here
import NFT_ABI from '../abis/NFT.json'

// Config: Import your network config here
import config from '../config.json';

function App() {
  const [provider, setProvider] = useState(null)
  const [nft, setNft] = useState(null)

  const [account, setAccount] = useState(null)

  const [revealTime, setRevealTime] = useState(0)
  const [maxSupply, setMaxSupply] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
  const [cost, setCost] = useState(0)
  const [balance, setBalance] = useState(0)

  const [isLoading, setIsLoading] = useState(true)

  const loadBlockchainData = async () => {
    // Initiate provider
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const nft = new ethers.Contract(config[31337].nft.address, NFT_ABI, provider)
    setNft(nft)

    // Fetch accounts
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account)

    // Fetch the countdown
    const allowMintingOn = await nft.allowMintingOn()
    setRevealTime(allowMintingOn.toString() + '000')

    // Fetch the max supply
    setMaxSupply(await nft.maxSupply())

    // Fetch the total supply
    setTotalSupply(await nft.totalSupply())

    // Fetch the cost
    setCost(await nft.cost())

    // Fetch the account balance
    setBalance(await nft.balanceOf(account))


    setIsLoading(false)
  }

  useEffect(() => {
    if (isLoading) {
      loadBlockchainData()
    }
  }, [isLoading]);

  return(
    <Container>
      <Navigation account={account} />

      <h1 className='my-4 text-center'>Dapp Punks</h1>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Row>
            <Col>
              <img src={preview} alt=''/>
            </Col>

            <Col>
              <div className='my-4 text-center'>
                <Countdown date={parseInt(revealTime)} className='h2' />
              </div>

              <Data 
              maxSupply={maxSupply} 
              totalSupply={totalSupply}
              cost={cost}
              balance={balance} 
              />
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default App;
