import React from 'react';
import PropTypes from 'prop-types';
import {
  Input, Text, Textarea, VStack, InputGroup,
  NumberInput, Select, Box, Image, Button,
  Heading, NumberInputField, HStack, IconButton,
  Link, InputLeftAddon, Spacer,
} from '@chakra-ui/react';
import {
  MdClose,
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
    <Box bg="primary.100">
      <VStack spacing="24px" pt="24px" pb="24px">
        <HStack w="380px">
          <Heading as="h2" size="xl">
            {createMode ? i18n.t('components.leftColumn.titleCreate') : i18n.t('components.leftColumn.titleEdit')}
          </Heading>
          <Spacer />
          <Link href={createMode ? '/' : '/home'}>
            <IconButton
              variant="ghost"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<MdClose />}
            />
          </Link>
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
            <Select
              bg="white"
              value={product.currency}
              maxW="65px"
              mr="8px"
              onInput={(e) => updateState('currency', e.target.value)}
            >
              <option value="€">€</option>
              <option value="$">$</option>
              <option value="£">£</option>
            </Select>
            <NumberInput
              defaultValue={20}
              min={1}
              max={50000}
              precision={2}
              step={0.2}
              w="100%"
            >
              <NumberInputField
                bg="white"
                onInput={(e) => updateState('price', e.target.value)}
                value={product.price}
              />
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
                  bg="primary.200"
                  borderColor="primary.300"
                  color="black"
                  variant="outline"
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  {i18n.t('components.leftColumn.clickOr')}
                  <br />
                  {i18n.t('components.leftColumn.dropHere')}
                </Button>
                )}
                {/* <Button onClick={onImageRemoveAll}>Remove all images</Button> */}
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <Image
                      src={image.data_url}
                      alt="Image to upload"
                      width="100px"
                      height="100px"
                      rounded="md"
                      objectFit="cover"
                      mb="16px"
                    />
                    <div className="image-item__btn-wrapper">
                      {/* <Button
                        colorScheme="teal"
                        variant="outline"
                        mr="16px"
                        onClick={() => onImageUpdate(index)}
                      >
                        Update
                      </Button> */}
                      <Button
                        bg="activeButton"
                        color="white"
                        variant="outline"
                        onClick={() => onImageRemove(index)}
                      >
                        {i18n.t('components.leftColumn.removeImage')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </Box>
        <Box w="380px">
          <Text mb="8px">{i18n.t('components.leftColumn.contactEmail')}</Text>
          <Input
            bg="white"
            placeholder={placeholders.contactPlaceholder}
            onInput={(e) => updateState('contact', e.target.value)}
            value={product.contact}
          />
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
        <HStack w="380px">
          {createMode
           && (
           <Button
             w="100%"
             p="34px"
             disabled={isDisabled}
             bg="activeButton"
             color="white"
             onClick={handleSubmit}
           >
             {i18n.t('components.leftColumn.buttonCreate')}
           </Button>
           )}
          {!createMode
           && (
           <Button
             w="100%"
             p="34px"
             bg="activeButton"
             color="white"
             disabled={isDisabled}
             onClick={handleSubmit}
           >
             {i18n.t('components.leftColumn.buttonUpdate')}
           </Button>
           )}
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
