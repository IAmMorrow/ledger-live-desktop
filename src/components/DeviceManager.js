// @flow

import React, { useEffect, useState, useCallback, useRef, useContext } from 'react'
import listenDevices from 'commands/listenDevices'
import getAppAndVersion from 'commands/getAppAndVersion'

const DeviceContext = React.createContext('device')

const probeDevice = async (device) => {
  const probedData = {}
  try {
    probedData.appAndVersion = await getAppAndVersion.send(device).toPromise()
  } catch (e) {
    console.log('ERROR: ', e)
  }

  return probedData
}

type Props = {
  children: any
}

const DeviceManager = ({ children }: Props) => {
  const [ deviceState, setDevice ] = useState(null)
  const [ isLocked, setLocked ] = useState(false)
  const lockQueue = useRef([])

  const lockDevice = useCallback(() => new Promise(resolve => {
    if (lockQueue.current.length === 0) {
      resolve()
      setLocked(true)
    }
    lockQueue.current.push(resolve)
  }), [lockQueue])

  const unlockDevice = useCallback(() => {
    lockQueue.current.shift()
    if (lockQueue.current.length !== 0) {
      lockQueue.current[0]()
    } else {
      setLocked(false)
    }
  }, [lockQueue])

  useEffect(() => {
    let debounce = null
    const sub = listenDevices.send().subscribe(
      ({ device, deviceModel, type }) => {
        if (device) {
          if (type === "remove") {
            if (debounce !== null) {
              clearTimeout(debounce)
            }
            debounce = setTimeout(() => {
              setDevice(null)
              debounce = null
            }, 8000)
          }

          if (type === "add") {
            if (debounce !== null) {
              clearTimeout(debounce)
              debounce = null
            } else {
              setDevice({
                device,
                deviceModel,
                type,
                available: false
              })
            }
            probeDevice(device).then(
              probeData => {
                setDevice(state => ({
                  ...state,
                  ...probeData,
                  available: true
                }))
              }
            )
          }
        }
      }
    )
    return () => {
      sub.unsubscribe()
      if (debounce) {
        clearTimeout(debounce)
      }
    }
  }, [])

  const state = {
    state: {
      isLocked,
      ...deviceState
    },
    methods: {
      lockDevice,
      unlockDevice
    }
  }

  return (
    <DeviceContext.Provider value={state}>
      {children}
    </DeviceContext.Provider>
  )
}

export const useDevice = () => useContext(DeviceContext)

export default DeviceManager