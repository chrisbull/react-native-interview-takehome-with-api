import { StatusBar } from 'expo-status-bar'
import { Box, Button, Card, HStack, NativeBaseProvider, Select, useToast } from 'native-base'
import React, { useState, useEffect, useCallback } from 'react'
import { Text } from 'react-native'

export default function App() {
  const toast = useToast()
  const [enabled, setEnabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [calculatedValue, setCalculatedValue] = useState<number>()
  const [durationInBed, setDurationInBed] = useState<number>()
  const [durationAsleep, setDurationAsleep] = useState<number>()

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
          toast.show({
            title: 'Oops, something went wrong!',
            status: 'error',
            placement: 'top',
          })
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [durationAsleep, durationInBed, toast])

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
        <Card>
          <HStack>
            <Box justifyContent="center">
              <Text>Duration in bed:</Text>
            </Box>
            <Box flexGrow={1} paddingLeft="2">
              <Select onValueChange={(value) => setDurationInBed(parseFloat(value))}>
                <Select.Item label="0" value="0" />
                <Select.Item label="0.5" value="0.5" />
                <Select.Item label="1" value="1" />
                <Select.Item label="1.5" value="1.5" />
                <Select.Item label="2" value="2" />
                <Select.Item label="2.5" value="2.5" />
                <Select.Item label="3" value="3" />
                <Select.Item label="3.5" value="3.5" />
                <Select.Item label="4" value="4" />
                <Select.Item label="4.5" value="4.5" />
                <Select.Item label="5" value="5" />
                <Select.Item label="5.5" value="5.5" />
                <Select.Item label="6" value="6" />
                <Select.Item label="6.5" value="6.5" />
                <Select.Item label="7" value="7" />
                <Select.Item label="7.5" value="7.5" />
                <Select.Item label="8" value="8" />
                <Select.Item label="8.5" value="8.5" />
                <Select.Item label="9" value="9" />
                <Select.Item label="9.5" value="9.5" />
                <Select.Item label="10" value="10" />
                <Select.Item label="10.5" value="10.5" />
                <Select.Item label="11" value="11" />
                <Select.Item label="11.5" value="11.5" />
                <Select.Item label="12" value="12" />
                <Select.Item label="12.5" value="12.5" />
                <Select.Item label="13" value="13" />
                <Select.Item label="13.5" value="13.5" />
                <Select.Item label="14" value="14" />
                <Select.Item label="14.5" value="14.5" />
                <Select.Item label="15" value="15" />
                <Select.Item label="15.5" value="15.5" />
                <Select.Item label="16" value="16" />
                <Select.Item label="16.5" value="16.5" />
                <Select.Item label="17" value="17" />
                <Select.Item label="17.5" value="17.5" />
                <Select.Item label="18" value="18" />
                <Select.Item label="18.5" value="18.5" />
                <Select.Item label="19" value="19" />
                <Select.Item label="19.5" value="19.5" />
                <Select.Item label="20" value="20" />
                <Select.Item label="20.5" value="20.5" />
                <Select.Item label="21" value="21" />
                <Select.Item label="21.5" value="21.5" />
                <Select.Item label="22" value="22" />
                <Select.Item label="22.5" value="22.5" />
                <Select.Item label="23" value="23" />
                <Select.Item label="23.5" value="23.5" />
                <Select.Item label="24" value="24" />
              </Select>
            </Box>
          </HStack>
        </Card>
        <Card>
          <HStack>
            <Box justifyContent="center">
              <Text>Duration asleep:</Text>
            </Box>
            <Box flexGrow={1} paddingLeft="2">
              <Select onValueChange={(value) => setDurationAsleep(parseFloat(value))}>
                <Select.Item label="0" value="0" />
                <Select.Item label="0.5" value="0.5" />
                <Select.Item label="1" value="1" />
                <Select.Item label="1.5" value="1.5" />
                <Select.Item label="2" value="2" />
                <Select.Item label="2.5" value="2.5" />
                <Select.Item label="3" value="3" />
                <Select.Item label="3.5" value="3.5" />
                <Select.Item label="4" value="4" />
                <Select.Item label="4.5" value="4.5" />
                <Select.Item label="5" value="5" />
                <Select.Item label="5.5" value="5.5" />
                <Select.Item label="6" value="6" />
                <Select.Item label="6.5" value="6.5" />
                <Select.Item label="7" value="7" />
                <Select.Item label="7.5" value="7.5" />
                <Select.Item label="8" value="8" />
                <Select.Item label="8.5" value="8.5" />
                <Select.Item label="9" value="9" />
                <Select.Item label="9.5" value="9.5" />
                <Select.Item label="10" value="10" />
                <Select.Item label="10.5" value="10.5" />
                <Select.Item label="11" value="11" />
                <Select.Item label="11.5" value="11.5" />
                <Select.Item label="12" value="12" />
                <Select.Item label="12.5" value="12.5" />
                <Select.Item label="13" value="13" />
                <Select.Item label="13.5" value="13.5" />
                <Select.Item label="14" value="14" />
                <Select.Item label="14.5" value="14.5" />
                <Select.Item label="15" value="15" />
                <Select.Item label="15.5" value="15.5" />
                <Select.Item label="16" value="16" />
                <Select.Item label="16.5" value="16.5" />
                <Select.Item label="17" value="17" />
                <Select.Item label="17.5" value="17.5" />
                <Select.Item label="18" value="18" />
                <Select.Item label="18.5" value="18.5" />
                <Select.Item label="19" value="19" />
                <Select.Item label="19.5" value="19.5" />
                <Select.Item label="20" value="20" />
                <Select.Item label="20.5" value="20.5" />
                <Select.Item label="21" value="21" />
                <Select.Item label="21.5" value="21.5" />
                <Select.Item label="22" value="22" />
                <Select.Item label="22.5" value="22.5" />
                <Select.Item label="23" value="23" />
                <Select.Item label="23.5" value="23.5" />
                <Select.Item label="24" value="24" />
              </Select>
            </Box>
          </HStack>
        </Card>
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
