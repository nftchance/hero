import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import * as chains from 'wagmi/chains'

import { JourneyAbi } from './abis/Journey'
import { JourneyFactoryAbi } from './abis/JourneyFactory'

export default defineConfig(() => {
  return {
    out: 'src/hooks/useContract.ts',
    contracts: [
      {
        abi: JourneyAbi,
        name: 'Journey',
      }, {
        abi: JourneyFactoryAbi,
        name: 'JourneyFactory',
      }
    ],
    plugins: [react()],
  }
})
