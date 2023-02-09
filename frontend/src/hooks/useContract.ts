// Generated by @wagmi/cli@0.1.6 on 2/8/2023 at 10:17:43 PM
import {
  useContract,
  UseContractConfig,
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import { WriteContractMode, PrepareWriteContractResult } from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Journey
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const journeyABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'hero', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'start',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'end', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'JourneyPinned',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'hero', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'start',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'end', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'JourneyUnpinned',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'hero', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'questId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'QuestCompleted',
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_questId', internalType: 'uint256', type: 'uint256' }],
    name: 'embark',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [
      { name: '', internalType: 'contract JourneyFactory', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpinJourney',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JourneyFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const journeyFactoryABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'hero', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'start',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'end', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'JourneyPinned',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'hero', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'start',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'end', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'JourneyUnpinned',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'hero', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'questId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'QuestCompleted',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'NULL_PAYMENT_TOKEN',
    outputs: [
      { name: 'paymentKey', internalType: 'bytes32', type: 'bytes32' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_journey', internalType: 'address', type: 'address' }],
    name: 'getJourney',
    outputs: [
      {
        name: '',
        internalType: 'struct IHerosJourney.Journey',
        type: 'tuple',
        components: [
          {
            name: 'badgerOrganization',
            internalType: 'contract IBadger',
            type: 'address',
          },
          { name: 'caller', internalType: 'address', type: 'address' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'end', internalType: 'uint256', type: 'uint256' },
          {
            name: 'quests',
            internalType: 'struct IHerosJourney.Quest[]',
            type: 'tuple[]',
            components: [
              { name: 'to', internalType: 'address', type: 'address' },
              { name: 'data', internalType: 'bytes', type: 'bytes' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'max', internalType: 'uint256', type: 'uint256' },
              {
                name: 'stopsRequired',
                internalType: 'uint256',
                type: 'uint256',
              },
              {
                name: 'stops',
                internalType: 'struct IHerosJourney.Stop[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'badge',
                    internalType: 'contract IERC1155',
                    type: 'address',
                  },
                  { name: 'mandatory', internalType: 'uint8', type: 'uint8' },
                  { name: 'id', internalType: 'uint256', type: 'uint256' },
                  { name: 'balance', internalType: 'uint256', type: 'uint256' },
                ],
              },
              {
                name: 'transactions',
                internalType: 'struct IHerosJourney.Transaction[]',
                type: 'tuple[]',
                components: [
                  { name: 'target', internalType: 'address', type: 'address' },
                  { name: 'data', internalType: 'bytes', type: 'bytes' },
                  { name: 'value', internalType: 'uint256', type: 'uint256' },
                ],
              },
              {
                name: 'rewards',
                internalType: 'struct IHerosJourney.Reward[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'token',
                    internalType: 'contract IERC20',
                    type: 'address',
                  },
                  { name: 'id', internalType: 'uint256', type: 'uint256' },
                  { name: 'amount', internalType: 'uint256', type: 'uint256' },
                ],
              },
              {
                name: 'badge',
                internalType: 'struct IHerosJourney.Badge',
                type: 'tuple',
                components: [
                  { name: 'accountBound', internalType: 'bool', type: 'bool' },
                  { name: 'id', internalType: 'uint256', type: 'uint256' },
                  { name: 'amount', internalType: 'uint256', type: 'uint256' },
                  { name: 'uri', internalType: 'string', type: 'string' },
                  {
                    name: 'delegates',
                    internalType: 'address[]',
                    type: 'address[]',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'journeySingleton',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'journeys',
    outputs: [
      {
        name: 'badgerOrganization',
        internalType: 'contract IBadger',
        type: 'address',
      },
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'end', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_journey',
        internalType: 'struct IHerosJourney.Journey',
        type: 'tuple',
        components: [
          {
            name: 'badgerOrganization',
            internalType: 'contract IBadger',
            type: 'address',
          },
          { name: 'caller', internalType: 'address', type: 'address' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'end', internalType: 'uint256', type: 'uint256' },
          {
            name: 'quests',
            internalType: 'struct IHerosJourney.Quest[]',
            type: 'tuple[]',
            components: [
              { name: 'to', internalType: 'address', type: 'address' },
              { name: 'data', internalType: 'bytes', type: 'bytes' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'max', internalType: 'uint256', type: 'uint256' },
              {
                name: 'stopsRequired',
                internalType: 'uint256',
                type: 'uint256',
              },
              {
                name: 'stops',
                internalType: 'struct IHerosJourney.Stop[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'badge',
                    internalType: 'contract IERC1155',
                    type: 'address',
                  },
                  { name: 'mandatory', internalType: 'uint8', type: 'uint8' },
                  { name: 'id', internalType: 'uint256', type: 'uint256' },
                  { name: 'balance', internalType: 'uint256', type: 'uint256' },
                ],
              },
              {
                name: 'transactions',
                internalType: 'struct IHerosJourney.Transaction[]',
                type: 'tuple[]',
                components: [
                  { name: 'target', internalType: 'address', type: 'address' },
                  { name: 'data', internalType: 'bytes', type: 'bytes' },
                  { name: 'value', internalType: 'uint256', type: 'uint256' },
                ],
              },
              {
                name: 'rewards',
                internalType: 'struct IHerosJourney.Reward[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'token',
                    internalType: 'contract IERC20',
                    type: 'address',
                  },
                  { name: 'id', internalType: 'uint256', type: 'uint256' },
                  { name: 'amount', internalType: 'uint256', type: 'uint256' },
                ],
              },
              {
                name: 'badge',
                internalType: 'struct IHerosJourney.Badge',
                type: 'tuple',
                components: [
                  { name: 'accountBound', internalType: 'bool', type: 'bool' },
                  { name: 'id', internalType: 'uint256', type: 'uint256' },
                  { name: 'amount', internalType: 'uint256', type: 'uint256' },
                  { name: 'uri', internalType: 'string', type: 'string' },
                  {
                    name: 'delegates',
                    internalType: 'address[]',
                    type: 'address[]',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    name: 'pinJourney',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContract}__ with `abi` set to __{@link journeyABI}__.
 */
export function useJourney(config: Omit<UseContractConfig, 'abi'> = {} as any) {
  return useContract({ abi: journeyABI, ...config })
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link journeyABI}__.
 */
export function useJourneyRead<TFunctionName extends string>(
  config: Omit<
    UseContractReadConfig<typeof journeyABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: journeyABI,
    ...config,
  } as UseContractReadConfig<typeof journeyABI, TFunctionName>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link journeyABI}__.
 */
export function useJourneyWrite<
  TMode extends WriteContractMode,
  TFunctionName extends string,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof journeyABI, string>['abi'],
        TFunctionName
      >
    : UseContractWriteConfig<TMode, typeof journeyABI, TFunctionName> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<TMode, typeof journeyABI, TFunctionName>({
    abi: journeyABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link journeyABI}__ and `functionName` set to `"embark"`.
 */
export function useJourneyEmbark<TMode extends WriteContractMode>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof journeyABI, 'embark'>['abi'],
        'embark'
      > & { functionName?: 'embark' }
    : UseContractWriteConfig<TMode, typeof journeyABI, 'embark'> & {
        abi?: never
        functionName?: 'embark'
      } = {} as any,
) {
  return useContractWrite<TMode, typeof journeyABI, 'embark'>({
    abi: journeyABI,
    functionName: 'embark',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link journeyABI}__ and `functionName` set to `"unpinJourney"`.
 */
export function useJourneyUnpinJourney<TMode extends WriteContractMode>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof journeyABI, 'unpinJourney'>['abi'],
        'unpinJourney'
      > & { functionName?: 'unpinJourney' }
    : UseContractWriteConfig<TMode, typeof journeyABI, 'unpinJourney'> & {
        abi?: never
        functionName?: 'unpinJourney'
      } = {} as any,
) {
  return useContractWrite<TMode, typeof journeyABI, 'unpinJourney'>({
    abi: journeyABI,
    functionName: 'unpinJourney',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link journeyABI}__.
 */
export function usePrepareJourneyWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof journeyABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: journeyABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof journeyABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link journeyABI}__ and `functionName` set to `"embark"`.
 */
export function usePrepareJourneyEmbark(
  config: Omit<
    UsePrepareContractWriteConfig<typeof journeyABI, 'embark'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: journeyABI,
    functionName: 'embark',
    ...config,
  } as UsePrepareContractWriteConfig<typeof journeyABI, 'embark'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link journeyABI}__ and `functionName` set to `"unpinJourney"`.
 */
export function usePrepareJourneyUnpinJourney(
  config: Omit<
    UsePrepareContractWriteConfig<typeof journeyABI, 'unpinJourney'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: journeyABI,
    functionName: 'unpinJourney',
    ...config,
  } as UsePrepareContractWriteConfig<typeof journeyABI, 'unpinJourney'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link journeyABI}__.
 */
export function useJourneyEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof journeyABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: journeyABI,
    ...config,
  } as UseContractEventConfig<typeof journeyABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link journeyABI}__ and `eventName` set to `"JourneyPinned"`.
 */
export function useJourneyJourneyPinnedEvent(
  config: Omit<
    UseContractEventConfig<typeof journeyABI, 'JourneyPinned'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: journeyABI,
    eventName: 'JourneyPinned',
    ...config,
  } as UseContractEventConfig<typeof journeyABI, 'JourneyPinned'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link journeyABI}__ and `eventName` set to `"JourneyUnpinned"`.
 */
export function useJourneyJourneyUnpinnedEvent(
  config: Omit<
    UseContractEventConfig<typeof journeyABI, 'JourneyUnpinned'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: journeyABI,
    eventName: 'JourneyUnpinned',
    ...config,
  } as UseContractEventConfig<typeof journeyABI, 'JourneyUnpinned'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link journeyABI}__ and `eventName` set to `"QuestCompleted"`.
 */
export function useJourneyQuestCompletedEvent(
  config: Omit<
    UseContractEventConfig<typeof journeyABI, 'QuestCompleted'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: journeyABI,
    eventName: 'QuestCompleted',
    ...config,
  } as UseContractEventConfig<typeof journeyABI, 'QuestCompleted'>)
}

/**
 * Wraps __{@link useContract}__ with `abi` set to __{@link journeyFactoryABI}__.
 */
export function useJourneyFactory(
  config: Omit<UseContractConfig, 'abi'> = {} as any,
) {
  return useContract({ abi: journeyFactoryABI, ...config })
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link journeyFactoryABI}__.
 */
export function useJourneyFactoryRead<TFunctionName extends string>(
  config: Omit<
    UseContractReadConfig<typeof journeyFactoryABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: journeyFactoryABI,
    ...config,
  } as UseContractReadConfig<typeof journeyFactoryABI, TFunctionName>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link journeyFactoryABI}__ and `functionName` set to `"NULL_PAYMENT_TOKEN"`.
 */
export function useJourneyFactoryNullPaymentToken(
  config: Omit<
    UseContractReadConfig<typeof journeyFactoryABI, 'NULL_PAYMENT_TOKEN'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: journeyFactoryABI,
    functionName: 'NULL_PAYMENT_TOKEN',
    ...config,
  } as UseContractReadConfig<typeof journeyFactoryABI, 'NULL_PAYMENT_TOKEN'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link journeyFactoryABI}__ and `functionName` set to `"getJourney"`.
 */
export function useJourneyFactoryGetJourney(
  config: Omit<
    UseContractReadConfig<typeof journeyFactoryABI, 'getJourney'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: journeyFactoryABI,
    functionName: 'getJourney',
    ...config,
  } as UseContractReadConfig<typeof journeyFactoryABI, 'getJourney'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link journeyFactoryABI}__ and `functionName` set to `"journeySingleton"`.
 */
export function useJourneyFactoryJourneySingleton(
  config: Omit<
    UseContractReadConfig<typeof journeyFactoryABI, 'journeySingleton'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: journeyFactoryABI,
    functionName: 'journeySingleton',
    ...config,
  } as UseContractReadConfig<typeof journeyFactoryABI, 'journeySingleton'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link journeyFactoryABI}__ and `functionName` set to `"journeys"`.
 */
export function useJourneyFactoryJourneys(
  config: Omit<
    UseContractReadConfig<typeof journeyFactoryABI, 'journeys'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: journeyFactoryABI,
    functionName: 'journeys',
    ...config,
  } as UseContractReadConfig<typeof journeyFactoryABI, 'journeys'>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link journeyFactoryABI}__.
 */
export function useJourneyFactoryWrite<
  TMode extends WriteContractMode,
  TFunctionName extends string,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof journeyFactoryABI, string>['abi'],
        TFunctionName
      >
    : UseContractWriteConfig<TMode, typeof journeyFactoryABI, TFunctionName> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<TMode, typeof journeyFactoryABI, TFunctionName>({
    abi: journeyFactoryABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link journeyFactoryABI}__ and `functionName` set to `"pinJourney"`.
 */
export function useJourneyFactoryPinJourney<TMode extends WriteContractMode>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<
          typeof journeyFactoryABI,
          'pinJourney'
        >['abi'],
        'pinJourney'
      > & { functionName?: 'pinJourney' }
    : UseContractWriteConfig<TMode, typeof journeyFactoryABI, 'pinJourney'> & {
        abi?: never
        functionName?: 'pinJourney'
      } = {} as any,
) {
  return useContractWrite<TMode, typeof journeyFactoryABI, 'pinJourney'>({
    abi: journeyFactoryABI,
    functionName: 'pinJourney',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link journeyFactoryABI}__.
 */
export function usePrepareJourneyFactoryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof journeyFactoryABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: journeyFactoryABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof journeyFactoryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link journeyFactoryABI}__ and `functionName` set to `"pinJourney"`.
 */
export function usePrepareJourneyFactoryPinJourney(
  config: Omit<
    UsePrepareContractWriteConfig<typeof journeyFactoryABI, 'pinJourney'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: journeyFactoryABI,
    functionName: 'pinJourney',
    ...config,
  } as UsePrepareContractWriteConfig<typeof journeyFactoryABI, 'pinJourney'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link journeyFactoryABI}__.
 */
export function useJourneyFactoryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof journeyFactoryABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: journeyFactoryABI,
    ...config,
  } as UseContractEventConfig<typeof journeyFactoryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link journeyFactoryABI}__ and `eventName` set to `"JourneyPinned"`.
 */
export function useJourneyFactoryJourneyPinnedEvent(
  config: Omit<
    UseContractEventConfig<typeof journeyFactoryABI, 'JourneyPinned'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: journeyFactoryABI,
    eventName: 'JourneyPinned',
    ...config,
  } as UseContractEventConfig<typeof journeyFactoryABI, 'JourneyPinned'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link journeyFactoryABI}__ and `eventName` set to `"JourneyUnpinned"`.
 */
export function useJourneyFactoryJourneyUnpinnedEvent(
  config: Omit<
    UseContractEventConfig<typeof journeyFactoryABI, 'JourneyUnpinned'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: journeyFactoryABI,
    eventName: 'JourneyUnpinned',
    ...config,
  } as UseContractEventConfig<typeof journeyFactoryABI, 'JourneyUnpinned'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link journeyFactoryABI}__ and `eventName` set to `"QuestCompleted"`.
 */
export function useJourneyFactoryQuestCompletedEvent(
  config: Omit<
    UseContractEventConfig<typeof journeyFactoryABI, 'QuestCompleted'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: journeyFactoryABI,
    eventName: 'QuestCompleted',
    ...config,
  } as UseContractEventConfig<typeof journeyFactoryABI, 'QuestCompleted'>)
}
