import React from 'react';
import PropTypes from 'prop-types';
import {
  Input, SimpleGrid, Textarea, VStack, InputGroup,
  NumberInput, Select, Box, Image, Button, Center,
  Heading, NumberInputField, HStack, IconButton,
  Link, InputLeftAddon, Spacer, Alert, AlertIcon,
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

  const maxImages = 6;

  return (
    <Box bg="primary.50">
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
        {createMode && (
        <Alert status="info" bg="primary.100" rounded="md" w="380px">
          <AlertIcon />
          {i18n.t('components.leftColumn.alertInfo')}
        </Alert>
        )}
        <Box w="380px">
          <Heading as="h5" size="sm" mb="8px">{i18n.t('components.leftColumn.storeName')}</Heading>
          <Input bg="white" onChange={() => {}} onInput={(e) => updateState('storeName', e.target.value)} placeholder={placeholders.storeNamePlaceholder} value={product.storeName} />
        </Box>
        <Box w="380px">
          <Heading as="h5" size="sm" mb="8px">{i18n.t('components.leftColumn.authorName')}</Heading>
          <Input bg="white" onChange={() => {}} onInput={(e) => updateState('author', e.target.value)} placeholder={placeholders.authorPlaceholder} value={product.author} />
        </Box>
        <Box w="380px">
          <Heading as="h5" size="sm" mb="8px">{i18n.t('components.leftColumn.itemName')}</Heading>
          <Input bg="white" onChange={() => {}} onInput={(e) => updateState('name', e.target.value)} placeholder={placeholders.namePlaceholder} value={product.name} />
        </Box>
        <Box w="380px">
          <Heading as="h5" size="sm" mb="8px">{i18n.t('components.leftColumn.itemDescription')}</Heading>
          <Textarea bg="white" h="150px" onChange={() => {}} onInput={(e) => updateState('description', e.target.value)} placeholder={placeholders.descriptionPlaceholder} value={product.description} />
        </Box>
        <Box w="380px">
          <Heading as="h5" size="sm" mb="8px">{i18n.t('components.leftColumn.price')}</Heading>
          <InputGroup>
            <Select
              onChange={() => {}}
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
              min={1}
              max={50000}
              precision={2}
              step={0.2}
              w="100%"
            >
              <NumberInputField
                placeholder={20}
                bg="white"
                onInput={(e) => updateState('price', e.target.value)}
                value={product.price}
              />
            </NumberInput>
          </InputGroup>
        </Box>
        <Box w="380px">
          <Heading as="h5" size="sm" mb="8px">{i18n.t('components.leftColumn.image')}</Heading>
          <ImageUploading
            multiple
            value={state.images}
            onChange={(imagesList) => updateState('images', imagesList)}
            maxNumber={maxImages}
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
              <div className="upload__image-wrapper">
                {imageList.length < maxImages
                && (
                <Button
                  width="100%"
                  height="100px"
                  bg="primary.50"
                  borderColor="primary.300"
                  color="black"
                  variant="outline"
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  {i18n.t('components.leftColumn.clickOr')}
                  {' '}
                  {i18n.t('components.leftColumn.dropHere')}
                </Button>
                )}
                {/* <Button onClick={onImageRemoveAll}>Remove all images</Button> */}
                <SimpleGrid columns={[2, null, 3]} spacing="16px" mt="16px" maxW="100%">
                  {imageList.map((image, index) => (
                    <VStack key={index}>
                      <Image
                        src={image.data_url}
                        alt="Image to upload"
                        width="100px"
                        height="100px"
                        rounded="md"
                        objectFit="cover"
                      />
                      <Button
                        borderColor="primary.300"
                        color="black"
                        variant="outline"
                        onClick={() => onImageRemove(index)}
                      >
                        {i18n.t('components.leftColumn.removeImage')}
                      </Button>
                    </VStack>
                  ))}
                </SimpleGrid>
              </div>
            )}
          </ImageUploading>
        </Box>
        <Box w="380px">
          <Heading as="h5" size="sm" mb="8px">{i18n.t('components.leftColumn.contactEmail')}</Heading>
          <Input
            bg="white"
            placeholder={placeholders.contactPlaceholder}
            onInput={(e) => updateState('contact', e.target.value)}
            onChange={() => {}}
            value={product.contact}
          />
        </Box>
        <Box w="380px">
          <Heading as="h5" size="sm" mb="8px">{i18n.t('components.leftColumn.addressHere')}</Heading>
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
        <HStack w="380px" pt="24px">
          {createMode
           && (
           <Button
             w="100%"
             p="34px"
             disabled={isDisabled}
             colorScheme="primaryImportantButton"
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
             colorScheme="primaryImportantButton"
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
