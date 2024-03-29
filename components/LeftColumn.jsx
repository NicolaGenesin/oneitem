import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Input, SimpleGrid, Textarea, VStack, InputGroup,
  NumberInput, Select, Box, Image, Button,
  Heading, NumberInputField, HStack, IconButton,
  Link, Spacer, Text, NumberInputStepper,
  NumberIncrementStepper, NumberDecrementStepper,
} from '@chakra-ui/react';
import {
  MdClose,
} from 'react-icons/md';
import ImageUploading from 'react-images-uploading';
import usei18n from '../i18n/index';
import fire from '../config/fire-config';

const canUseThisId = async (id) => {
  if (!id) {
    return false;
  }

  const productRef = fire.firestore().collection('products').doc(id);
  const doc = await productRef.get();

  if (!doc.exists) {
    return true;
  }
  return false;
};

const LeftColumn = ({
  placeholders, state, updateState, handleSubmit, createMode, product, isMobile, isLoading,
}) => {
  const i18n = usei18n();

  const [isIdAvailable, setIdAvailability] = useState(true);
  const [currentSearch, setCurrentSearch] = useState('');
  const [originalId, setoriginalId] = useState(state.id);
  const stateRef = useRef();

  stateRef.current = { id: state.id, isIdAvailable, currentSearch };

  const isDisabled = !state.author
    || !state.contact
    || !state.description
    || !state.name
    || !state.images.length
    || isLoading;

  const maxImages = 6;

  useEffect(() => {
    const interval = setInterval(async () => {
      if (originalId === stateRef.current.id) {
        setIdAvailability(true);
        return;
      }

      if (stateRef.current.id
        && stateRef.current.currentSearch !== ''
        && stateRef.current.currentSearch !== stateRef.current.id) {
        setIdAvailability(await canUseThisId(stateRef.current.id));
      }

      setCurrentSearch(stateRef.current.id);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      bg="primary.50"
    >
      <VStack
        spacing="24px"
        pt="24px"
        pb="24px"
        color="textColor.50"
      >
        <HStack w="320px">
          <Heading as="h3" size="lg">
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
        {(createMode && !isMobile) && (
        <Box
          boxShadow="md"
          bg="white"
          p="16px"
          borderWidth="1px"
          borderRadius="lg"
          rounded="md"
          w="320px"
        >
          <Text
            fontWeight="semibold"
            fontSize="xs"
          >
            {i18n.t('components.leftColumn.alertInfo')}
          </Text>
        </Box>
        )}
        <Box w="320px">
          <Heading
            size="xs"
            mb="8px"
          >
            {i18n.t('components.leftColumn.authorName')}
          </Heading>
          <Input
            boxShadow="md"
            bg="white"
            onChange={() => {}}
            onInput={(e) => updateState('author', e.target.value)}
            placeholder={placeholders.authorPlaceholder}
            value={product.author}
          />
        </Box>
        <Box w="320px">
          <Heading
            size="xs"
            mb="8px"
          >
            {i18n.t('components.leftColumn.itemName')}
          </Heading>
          <Input
            boxShadow="md"
            bg="white"
            onChange={() => {}}
            onInput={(e) => updateState('name', e.target.value)}
            placeholder={placeholders.namePlaceholder}
            value={product.name}
          />
        </Box>
        <Box w="320px">
          <Heading
            size="xs"
            mb="8px"
          >
            {i18n.t('components.leftColumn.itemDescription')}
          </Heading>
          <Textarea
            boxShadow="md"
            bg="white"
            h="150px"
            onChange={() => {}}
            onInput={(e) => updateState('description', e.target.value)}
            placeholder={placeholders.descriptionPlaceholder}
            value={product.description}
          />
        </Box>
        <Box w="320px">
          <Heading
            size="xs"
            mb="8px"
          >
            {i18n.t('components.leftColumn.price')}
          </Heading>
          <InputGroup>
            <Select
              boxShadow="md"
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
              value={`${product.price}`}
              onChange={() => {}}
            >
              <NumberInputField
                boxShadow="md"
                placeholder={placeholders.pricePlaceholder}
                bg="white"
                onInput={(e) => updateState('price', e.target.value)}
              />
            </NumberInput>
          </InputGroup>
        </Box>
        <Box w="320px">
          <Heading
            size="xs"
            mb="8px"
          >
            {i18n.t('components.leftColumn.quantity')}
          </Heading>
          <InputGroup>
            <NumberInput
              min={0}
              max={50000}
              step={1}
              w="100%"
              value={`${product.quantity}`}
              onChange={(value) => updateState('quantity', value)}
            >
              <NumberInputField
                boxShadow="md"
                placeholder={placeholders.quantityPlaceholder}
                bg="white"
                onInput={(e) => updateState('quantity', e.target.value)}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
        </Box>
        <Box w="320px">
          <Heading
            size="xs"
            mb="8px"
          >
            {i18n.t('components.leftColumn.deliveryEstimate')}
          </Heading>
          <InputGroup>
            <NumberInput
              min={0}
              max={50000}
              step={1}
              maxW="65px"
              mr="8px"
              value={`${product.deliveryEstimateValue}`}
              onChange={(value) => updateState('deliveryEstimateValue', parseInt(value))}
            >
              <NumberInputField
                boxShadow="md"
                bg="white"
                onInput={(e) => updateState('deliveryEstimateValue', parseInt(e.target.value))}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Select
              boxShadow="md"
              onChange={() => {}}
              bg="white"
              value={product.deliveryEstimateRange}
              onInput={(e) => updateState('deliveryEstimateRange', e.target.value)}
            >
              <option value="days">{product.deliveryEstimateValue === 1 ? i18n.t('components.leftColumn.deliveryEstimateRangeDay') : i18n.t('components.leftColumn.deliveryEstimateRangeDays')}</option>
              <option value="weeks">{product.deliveryEstimateValue === 1 ? i18n.t('components.leftColumn.deliveryEstimateRangeWeek') : i18n.t('components.leftColumn.deliveryEstimateRangeWeeks')}</option>
            </Select>
          </InputGroup>
        </Box>
        <Box w="320px">
          <Heading size="xs" mb="8px">{i18n.t('components.leftColumn.image')}</Heading>
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
                  boxShadow="md"
                  width="100%"
                  height="100px"
                  bg="white"
                  color="primary.200"
                  fontSize="sm"
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
                <SimpleGrid columns={[2, null, 3]} spacing="16px" maxW="100%">
                  {imageList.map((image, index) => (
                    <VStack key={index} mt="16px">
                      <Image
                        src={image.data_url}
                        alt="Image to upload"
                        width="100px"
                        height="100px"
                        rounded="md"
                        objectFit="cover"
                      />
                      <Button
                        borderColor="primary.100"
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
        <Box w="320px">
          <Heading size="xs" mb="8px">{i18n.t('components.leftColumn.contactEmail')}</Heading>
          <Input
            boxShadow="md"
            bg="white"
            placeholder={placeholders.contactPlaceholder}
            onInput={(e) => updateState('contact', e.target.value)}
            onChange={() => {}}
            value={product.contact}
          />
        </Box>
        <HStack w="320px">
          {createMode
           && (
           <Button
             w="100%"
             p="34px"
             disabled={isDisabled}
             colorScheme="primaryImportantButton"
             color="white"
             onClick={handleSubmit}
             isLoading={isLoading}
             loadingText={i18n.t('components.leftColumn.buttonUpdateLoading')}
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
             isLoading={isLoading}
             loadingText={i18n.t('components.leftColumn.buttonUpdateLoading')}
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
