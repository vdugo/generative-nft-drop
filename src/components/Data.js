import { ethers } from "ethers"

const Data = ({ maxSupply, totalSupply, cost, balance }) =>
{
    return(
        <div>
            <p><strong>Available to Mint:</strong>{maxSupply - totalSupply}</p>
            <p><strong>Cost to Mint:</strong>{ethers.utils.formatUnits(cost, 'ether')} ETH</p>
            <p><strong>You Own:</strong>{balance.toString()}</p>
        </div>
    )
}

export default Data
