import React from 'react';
import PropTypes from 'prop-types';
import {
  Input, Text, Textarea, VStack, InputGroup,
  NumberInput, Select, Box, Image, Button,
  Heading, NumberInputField, HStack, IconButton,
  Link, InputLeftAddon,
} from '@chakra-ui/react';
import {
  MdKeyboardBackspace,
} from 'react-icons/md';

const LeftColumn = ({
  placeholders, updateState, handleSubmit, createMode, product,
}) => (
  <Box>
    <VStack spacing="24px" mt="24px" mb="24px">
      <HStack w="460px">
        <Link href={createMode ? '/' : '/home'}>
          <IconButton
            variant="ghost"
            colorScheme="teal"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<MdKeyboardBackspace />}
          />
        </Link>
        <Heading as="h2" size="xl">
          {createMode ? 'Create a new listing' : 'Edit your Listing'}
        </Heading>
      </HStack>
      <Box w="460px">
        <Text mb="8px">Store Name</Text>
        <Input onInput={(e) => updateState('storeName', e.target.value)} placeholder={placeholders.storeNamePlaceholder} value={product.storeName} />
      </Box>

      <Box w="460px">
        <Text mb="8px">Author Name</Text>
        <Input onInput={(e) => updateState('author', e.target.value)} placeholder={placeholders.authorPlaceholder} value={product.author} />
      </Box>

      <Box w="460px">
        <Text mb="8px">Item Name</Text>
        <Input onInput={(e) => updateState('name', e.target.value)} placeholder={placeholders.namePlaceholder} value={product.name} />
      </Box>

      <Box w="460px">
        <Text mb="8px">Item Description</Text>
        <Textarea h="150px" onInput={(e) => updateState('description', e.target.value)} placeholder={placeholders.descriptionPlaceholder} value={product.description} />
      </Box>

      <Box w="460px">
        <Text mb="8px">Price (including VAT and shipment)</Text>
        <InputGroup>
          <Select placeholder={placeholders.currencyPlaceholder} maxW="65px" mr="8px">
            <option value="option1">€</option>
            <option value="option2">$</option>
            <option value="option3">£</option>
          </Select>
          <NumberInput defaultValue={20} min={1} max={50000} precision={2} step={0.2} w="100%">
            <NumberInputField onInput={(e) => updateState('price', e.target.value)} value={product.price} />
          </NumberInput>
        </InputGroup>
      </Box>

      <Box w="460px">
        <Text mb="8px">Image</Text>
        <Image
          fallbackSrc="https://via.placeholder.com/450"
          boxSize="100px"
          objectFit="cover"
          src="https://assets.catawiki.nl/assets/2019/12/16/a/8/c/a8ccba43-31ee-4d24-a509-6d36ee2d7e35.jpg"
        />
      </Box>

      <Box w="460px">
        <Text mb="8px">Contact Email</Text>
        <Input placeholder={placeholders.contactPlaceholder} onInput={(e) => updateState('contact', e.target.value)} value={product.contact} />
      </Box>

      <Box w="460px">
        <Text mb="8px">Your address name on one9</Text>
        <InputGroup>
          <InputLeftAddon children="www.one9.com/" />
          <Input
            type="tel"
            placeholder="turtle-teapot"
            value={product.id}
            onInput={(e) => {
              updateState('id', e.target.value);
            }}
          />
        </InputGroup>
      </Box>

      <HStack>
        {createMode && <Button colorScheme="blue" onClick={handleSubmit}>Create my Listing</Button>}
        {!createMode && <Button colorScheme="blue" onClick={handleSubmit}>Update my Listing</Button>}
      </HStack>
    </VStack>
  </Box>
);

export default LeftColumn;

LeftColumn.propTypes = {
  placeholders: PropTypes.object,
  product: PropTypes.object,
  updateState: PropTypes.func,
  handleSubmit: PropTypes.func,
  createMode: PropTypes.bool,
};
