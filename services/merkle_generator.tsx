import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'

export default class MerkleGenerator {
  allowlist: string[]
  leafs: Buffer[]
  merkleTree: MerkleTree

  constructor(allowlist: string[]) {
    this.allowlist = allowlist
    this.leafs = allowlist.map((addr) => keccak256(addr))
    this.merkleTree = new MerkleTree(this.leafs, keccak256, { sortPairs: true })
  }

  proofGenerator = (address: string) => {
    if (this.allowlist.includes(address)) {
      const proof = this.merkleTree.getHexProof(keccak256(address))
      return proof
    } else if (
      address &&
      typeof address === 'string' &&
      this.allowlist.includes(address.toLowerCase())
    ) {
      const proof = this.merkleTree.getHexProof(
        keccak256(address.toLowerCase())
      )
      return proof
    }
  }

  rootGenerator = () => {
    return this.merkleTree.getHexRoot()
  }

  checkAllowlist = (address: string) => {
    return (
      this.allowlist.includes(address) ||
      (typeof address === 'string' &&
        this.allowlist.includes(address.toLowerCase()))
    )
  }
}
