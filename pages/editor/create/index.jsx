import React, { useState } from 'react';
import {
  Input, Text, Textarea, VStack, InputGroup,
  NumberInput, Select, Box, Image, Button,
  Heading, NumberInputField, HStack, IconButton,
  useDisclosure, Link,
} from '@chakra-ui/react';
import {
  MdKeyboardBackspace,
} from 'react-icons/md';
import DynamicCustomerPage from '../../dynamicCustomerPage';
import CreateModal from './CreateModal';
import fire from '../../../config/fire-config';

const cleanURLPath = (string) => string
  .replace(/[^\w\s]/gi, '')
  .replaceAll(' ', '')
  .toLowerCase();

const CreatePage = () => {
  const storeNamePlaceholder = 'Your Store Name';
  const authorPlaceholder = 'Your Name';
  const contactPlaceholder = 'john@doe.com';
  const namePlaceholder = 'The item name';
  const pricePlaceholder = 20;
  const currencyPlaceholder = '$';
  const imagePlaceholder = 'https://assets.catawiki.nl/assets/2019/12/16/a/8/c/a8ccba43-31ee-4d24-a509-6d36ee2d7e35.jpg';
  const descriptionPlaceholder = 'Some long long long long long long description';

  const product = {
    storeName: storeNamePlaceholder,
    author: '',
    contact: contactPlaceholder,
    name: namePlaceholder,
    price: pricePlaceholder,
    currency: currencyPlaceholder,
    image: imagePlaceholder,
    description: descriptionPlaceholder,
  };

  const [state, setState] = useState(product);
  const updateState = (target, value) => {
    setState({ ...state, [target]: value });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = (event) => {
    event.preventDefault();

    const id = `${cleanURLPath(state.storeName)}.${cleanURLPath(state.name)}`;
    updateState('id', id);

    fire.firestore()
      .collection('products')
      .doc(id)
      .set({ ...state, id })
      .catch((e) => {
        console.log(e);
      });

    onOpen();
  };

  return (
    <div>
      {CreateModal(isOpen, onOpen, onClose, state.id)}
      <div className="container">
        <div className="left">
          <VStack spacing="24px" mt="24px" mb="24px">
            <HStack w="460px">
              <Link href="/">
                <IconButton
                  variant="ghost"
                  colorScheme="teal"
                  aria-label="Call Sage"
                  fontSize="20px"
                  icon={<MdKeyboardBackspace />}
                />
              </Link>
              <Heading as="h2" size="xl">
                Create a new listing
              </Heading>
            </HStack>
            <Box w="460px">
              <Text mb="8px">Store Name</Text>
              <Input onInput={(e) => updateState('storeName', e.target.value)} placeholder={storeNamePlaceholder} />
            </Box>

            <Box w="460px">
              <Text mb="8px">Author Name</Text>
              <Input onInput={(e) => updateState('author', e.target.value)} placeholder={authorPlaceholder} />
            </Box>

            <Box w="460px">
              <Text mb="8px">Item Name</Text>
              <Input onInput={(e) => updateState('name', e.target.value)} placeholder={namePlaceholder} />
            </Box>

            <Box w="460px">
              <Text mb="8px">Item Description</Text>
              <Textarea h="150px" onInput={(e) => updateState('description', e.target.value)} placeholder={descriptionPlaceholder} />
            </Box>

            <Box w="460px">
              <Text mb="8px">Price (including VAT and shipment)</Text>
              <InputGroup>
                <Select placeholder={currencyPlaceholder} maxW="65px" mr="8px">
                  <option value="option1">€</option>
                  <option value="option2">$</option>
                  <option value="option3">£</option>
                </Select>
                <NumberInput defaultValue={20} min={1} max={50000} precision={2} step={0.2} w="100%">
                  <NumberInputField onInput={(e) => updateState('price', e.target.value)} />
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
              <Input placeholder={contactPlaceholder} onInput={(e) => updateState('contact', e.target.value)} />
            </Box>

            <HStack>
              <Button colorScheme="blue" onClick={handleSubmit}>Create my Store</Button>
            </HStack>
          </VStack>
        </div>
        <div className="right">
          <Box mt="24px">
            <DynamicCustomerPage product={state} />
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
                width: auto;
                overflow: hidden;
            }
            `}
      </style>
    </div>
  );
};

export default CreatePage;
