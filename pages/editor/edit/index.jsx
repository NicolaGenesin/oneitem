import React from 'react';
import {
  Input, Text, Textarea, VStack, InputGroup, NumberInput, Select, Box, Image, Button, Heading,
  NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, HStack,
} from '@chakra-ui/react';
import DynamicCustomerPage from '../../dynamicCustomerPage';

export default function Main() {
  const [value, setValue] = React.useState('');
  const handleChange = (event) => setValue(event.target.value);

  console.log(value);
  console.log(setValue);
  console.log('ciao');

  return (
    <div>
      <div className="container">
        <div className="left">
          <VStack spacing="24px" mt="24px" mb="24px">
            <Box w="460px">
              <Heading as="h2" size="xl">
                Create a new listing
              </Heading>
            </Box>

            <Box w="460px">
              <Text mb="8px">Store Name</Text>
              <Input placeholder="Nicola Genesin" onChange={handleChange} />
            </Box>

            <Box w="460px">
              <Text mb="8px">Item Name</Text>
              <Input placeholder="Handmade TOWA Pot" />
            </Box>

            <Box w="460px">
              <Text mb="8px">Item Description</Text>
              <Textarea h="150px" placeholder="Cast iron teapot let your drink water be healthy. TOWA cast iron teapot can improve the water quality by releasing iron ions and absorbing chloride ions in water. So the water after boiled by our cast iron teapot can be more sweeter and softer, which is suitable for all kinds of tea making or other drinks making." />
            </Box>

            <Box w="460px">
              <Text mb="8px">Price</Text>
              <InputGroup>
                <Select placeholder="€" maxW="65px">
                  <option value="option1">€</option>
                  <option value="option2">$</option>
                  <option value="option3">£</option>
                </Select>
                <NumberInput defaultValue={20} min={0} max={50000} precision={2} step={0.2}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
            </Box>

            <Box w="460px">
              <Text mb="8px">Image</Text>
              <Image
                boxSize="100px"
                objectFit="cover"
                src="https://assets.catawiki.nl/assets/2019/12/16/a/8/c/a8ccba43-31ee-4d24-a509-6d36ee2d7e35.jpg"
              />
            </Box>

            <Box w="460px">
              <Text mb="8px">Contact Email</Text>
              <Input placeholder="john@gmail.com" />
            </Box>

            <HStack>
              <Button colorScheme="yellow">Go Back</Button>
              <Button colorScheme="blue">Create my page</Button>
            </HStack>
          </VStack>
        </div>
        <div className="right">
          <Box mt="24px">
            <DynamicCustomerPage />
          </Box>
        </div>
      </div>
      <style jsx>
        {`
            .container {
                height: auto;
                overflow: hidden;
            }
            
            .left {
                width: 500px;
                float: left;
                background: #e8f6fe;
            }
            
            .right {
                float: none;
                // background: #e8f6fe;
                width: auto;
                overflow: hidden;
            }
            `}

      </style>
    </div>
  );
}
