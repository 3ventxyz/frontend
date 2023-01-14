import { useContractRead } from 'wagmi'
import { useAuth } from '../contexts/auth'
import abi from './abi.json'

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API



export default function TokenOwnership() {
  /*Save fetched abi in a variable to be able to use not as a promise but text*/
  const axios = require('axios')
  const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`
  const auth = useAuth()
  let abiData = ''
  const fetchAbi = async () => {
    const res = await axios.get(url)
    const abi = JSON.parse(res.data.result)
    abiData = abi
    console.log(abi)
  }
  fetchAbi()

  /*Check if wallet is connected*/
  if (auth.userModel?.wallet) {
    /*use Contract Read and check tokens owned*/
    if (contractAddress !== undefined) {
      const { data, isError, isLoading } = useContractRead({
        addressOrName: contractAddress,
        contractInterface: abi,
        functionName: 'balanceOf',
        args: [auth.userModel?.wallet],
        onSuccess(data) {
          /*Function to do something if token is owned or not*/
          if (data._hex !== '0x00') {
            console.log('token owned in contract')
          } else {
            console.log('no token owned in contract')
          }
        },
        onError(error) {
          console.log('Error', error)
        }
      })
    }
  }

  return (
    <div>
      {auth.userModel?.wallet ? (
        <div>Connected to wallet</div>
      ) : (
        <div>Please verify and connect your wallet</div>
      )}
    </div>
  )
}
