const { ContractFactory, utils } = require("ethers")
const { fs } = require('fs');
const { promisify } = require('util');

const artifacts = {
    UniswapV3Factory : require('../artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json'),
    SwapRouter : 

}
/**
 * 链接 Solidity 智能合约中的库引用
 *1. 遍历库引用：函数首先遍历 linkReferences 对象，该对象的键是文件名，值是另一个对象，其中包含合约名称和对应的库引用信息。
 *2. 检查库是否存在：对于每个合约名称，函数检查 libraries 对象中是否存在对应的库名称。如果不存在，函数会抛出一个错误，指出缺少的库名称。
 *3. 获取库地址：如果库存在，函数会获取库的地址，并将其转换为小写，然后去掉前两个字符（0x 前缀）。
 *4. 替换字节码中的库引用：对于每个库引用，函数会计算出在字节码中需要替换的起始位置和长度。然后，它会将字节码的这一部分替换为库的地址。这个过程通过 slice 方法来实现，先截取字节码的前半部分，然后插入库地址，最后拼接字节码的后半部分。
 *5. 返回链接后的字节码：最后，函数返回链接后的字节码，这个字节码现在包含了所有库引用的地址。
 * @param param0 接收两个参数：一个对象，包含智能合约的字节码 (bytecode) 和库引用信息 (linkReferences)
 * @param libraries 包含库名称和对应的地址
 * @returns 链接库合约之后的字节码
 */
const linkLibraries = ({ bytecode, linkReferences }, libraries) => {
    Object.keys(linkReferences).forEach((fileName) => {
      Object.keys(linkReferences[fileName]).forEach((contractName) => {
        if (!libraries.hasOwnProperty(contractName)) {
          throw new Error(`Missing link library name ${contractName}`)
        }
        const address = utils
          .getAddress(libraries[contractName])
          .toLowerCase()
          .slice(2)
        linkReferences[fileName][contractName].forEach(
          ({ start, length }) => {
            const start2 = 2 + start * 2
            const length2 = length * 2
            bytecode = bytecode
              .slice(0, start2)
              .concat(address)
              .concat(bytecode.slice(start2 + length2, bytecode.length))
          }
        )
      })
    })
    return bytecode
  }
  



