import { StatusBar } from 'expo-status-bar'
import { Box, Button, Card, NativeBaseProvider } from 'native-base'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Text } from 'react-native'
import SelectRow from './SelectRow'

export default function App() {
  const [enabled, setEnabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [calculatedValue, setCalculatedValue] = useState<number>()
  const [durationInBed, setDurationInBed] = useState<number>()
  const [durationAsleep, setDurationAsleep] = useState<number>()

  const loadedRef = useRef(false)

  useEffect(() => {
    fetch('http://localhost:3000/api/sleep-data', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: '12345',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDurationInBed(data.durationInBed)
        setDurationAsleep(data.durationAsleep)
        // setHasLoaded(true)
        loadedRef.current = true
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const handleButtonPress = useCallback(() => {
    if (durationInBed && durationAsleep) {
      const _calculatedValue = 100 * (durationAsleep / durationInBed)

      setLoading(true)

      fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          duration_in_bed: durationInBed,
          duration_asleep: durationAsleep,
          calculated_value: _calculatedValue,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setCalculatedValue(_calculatedValue)
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [durationAsleep, durationInBed])

  useEffect(() => {
    if (durationInBed && durationAsleep) {
      setEnabled(true)
    } else {
      setEnabled(false)
    }
  }, [durationInBed, durationAsleep])

  return (
    <NativeBaseProvider>
      <StatusBar style="auto" />

      <Box safeArea>
        <SelectRow
          text="Duration in bed:"
          onValueChange={(value) => setDurationInBed(parseFloat(value))}
          testID="durationInBed"
        />
        <SelectRow
          text="Duration asleep:"
          onValueChange={(value) => setDurationAsleep(parseFloat(value))}
          testID="durationInAsleep"
          maxHours={durationInBed}
        />

        <Card>
          <Button onPress={handleButtonPress} isDisabled={!enabled} isLoading={loading}>
            {loading ? 'Loading' : 'Calculate'}
          </Button>
        </Card>
        <Card>
          <Text>{calculatedValue}</Text>
        </Card>
      </Box>
    </NativeBaseProvider>
  )
}
