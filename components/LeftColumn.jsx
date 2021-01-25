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
import ImageUploading from 'react-images-uploading';
import usei18n from '../i18n/index';

const LeftColumn = ({
  placeholders, state, updateState, handleSubmit, createMode, product,
}) => {
  const i18n = usei18n();

  const isDisabled = !state.author
    || !state.contact
    || !state.description
    || !state.name
    || !state.storeName
    || !state.id
    || !state.images.length;

  return (
    <Box>
      <VStack spacing="24px" mt="24px" mb="24px">
        <HStack w="380px">
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
            {createMode ? i18n.t('components.leftColumn.titleCreate') : i18n.t('components.leftColumn.titleEdit')}
          </Heading>
        </HStack>
        <Box w="380px">
          <Text mb="8px">{i18n.t('components.leftColumn.storeName')}</Text>
          <Input bg="white" onInput={(e) => updateState('storeName', e.target.value)} placeholder={placeholders.storeNamePlaceholder} value={product.storeName} />
        </Box>

        <Box w="380px">
          <Text mb="8px">{i18n.t('components.leftColumn.authorName')}</Text>
          <Input bg="white" onInput={(e) => updateState('author', e.target.value)} placeholder={placeholders.authorPlaceholder} value={product.author} />
        </Box>

        <Box w="380px">
          <Text mb="8px">{i18n.t('components.leftColumn.itemName')}</Text>
          <Input bg="white" onInput={(e) => updateState('name', e.target.value)} placeholder={placeholders.namePlaceholder} value={product.name} />
        </Box>

        <Box w="380px">
          <Text mb="8px">{i18n.t('components.leftColumn.itemDescription')}</Text>
          <Textarea bg="white" h="150px" onInput={(e) => updateState('description', e.target.value)} placeholder={placeholders.descriptionPlaceholder} value={product.description} />
        </Box>

        <Box w="380px">
          <Text mb="8px">{i18n.t('components.leftColumn.price')}</Text>
          <InputGroup>
            <Select bg="white" value={product.currency} maxW="65px" mr="8px" onInput={(e) => updateState('currency', e.target.value)}>
              <option value="€">€</option>
              <option value="$">$</option>
              <option value="£">£</option>
            </Select>
            <NumberInput bg="white" defaultValue={20} min={1} max={50000} precision={2} step={0.2} w="100%">
              <NumberInputField onInput={(e) => updateState('price', e.target.value)} value={product.price} />
            </NumberInput>
          </InputGroup>
        </Box>

        <Box w="380px">
          <Text mb="8px">{i18n.t('components.leftColumn.image')}</Text>
          {/* <Image
            fallbackSrc="https://via.placeholder.com/450"
            boxSize="100px"
            objectFit="cover"
            src="https://assets.catawiki.nl/assets/2019/12/16/a/8/c/a8ccba43-31ee-4d24-a509-6d36ee2d7e35.jpg"
          /> */}
          <ImageUploading
            multiple
            value={state.images}
            onChange={(imagesList) => updateState('images', imagesList)}
            maxNumber={1}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                {!imageList.length
                && (
                <Button
                  width="100px"
                  height="100px"
                  colorScheme="teal"
                  variant="outline"
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or
                  <br />
                  Drop here
                </Button>
                )}
                {/* <Button onClick={onImageRemoveAll}>Remove all images</Button> */}
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <Image src={image.data_url} alt="Image to upload" width="100px" height="100px" rounded="md" objectFit="cover" mb="16px" />
                    <div className="image-item__btn-wrapper">
                      {/* <Button colorScheme="teal" variant="outline" mr="16px" onClick={() => onImageUpdate(index)}>Update</Button> */}
                      <Button colorScheme="teal" variant="outline" onClick={() => onImageRemove(index)}>Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </Box>

        <Box w="380px">
          <Text mb="8px">{i18n.t('components.leftColumn.contactEmail')}</Text>
          <Input bg="white" placeholder={placeholders.contactPlaceholder} onInput={(e) => updateState('contact', e.target.value)} value={product.contact} />
        </Box>

        <Box w="380px">
          <Text mb="8px">{i18n.t('components.leftColumn.addressHere')}</Text>
          <InputGroup>
            <InputLeftAddon children="www.one9.com/" />
            <Input
              bg="white"
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
          {createMode && <Button disabled={isDisabled} colorScheme="blue" onClick={handleSubmit}>{i18n.t('components.leftColumn.buttonCreate')}</Button>}
          {!createMode && <Button disabled={isDisabled} colorScheme="blue" onClick={handleSubmit}>{i18n.t('components.leftColumn.buttonUpdate')}</Button>}
        </HStack>
      </VStack>
    </Box>
  );
};

export default LeftColumn;

LeftColumn.propTypes = {
  placeholders: PropTypes.object,
  product: PropTypes.object,
  updateState: PropTypes.func,
  handleSubmit: PropTypes.func,
  createMode: PropTypes.bool,
};
