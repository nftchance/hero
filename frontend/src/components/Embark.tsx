import { BigNumber } from 'ethers'
import { useState } from 'react'
import { useWaitForTransaction } from 'wagmi'

import {
    usePrepareJourneyEmbark,
    useJourneyEmbark,
} from '../hooks/useContract'

export function Embark() {
    const [questId, setQuestId] = useState('')

    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareJourneyEmbark({
        args: questId ? [BigNumber.from(questId)] : undefined,
    })
    const { data, error, isError, write } = useJourneyEmbark(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return (
        <div>
            <input
                onChange={(e) => setQuestId(e.target.value)}
                placeholder="Quest ID"
                value={questId}
            />
            <button disabled={!write || isLoading} onClick={() => write?.()}>
                {isLoading ? 'Embarking on the quest...' : 'Embark'}
            </button>
            {isSuccess && (
                <div>
                    Successfully completed the quest!
                    <div>
                        <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                    </div>
                </div>
            )}
            {(isPrepareError || isError) && (
                <div>Error: {(prepareError || error)?.message}</div>
            )}
        </div>
    )
}
