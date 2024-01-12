
import {  Box, Divider, Grid, Stack, Typography } from '@mui/material';

import { Container, ImageContainer, InputContainer, StyledButton, StyledSlider, Symbol } from './components/styledComponents/styled';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';



function App() {
const [filter, setFilter] = useState({brightness:1 , contrast:1})
 const [selectedImage, setSelectedImage] = useState(null)
 const [images, setImages] = useState([])
 const imageRef = useRef(null)

 const handleImageChange = (event) => {
   const file = event.target.files[0]

   if (file) {
     const reader = new FileReader()
     reader.onload = () => {
 
       setSelectedImage({url:reader.result , fileName : file.name})
     }
    
     reader.readAsDataURL(file)
   }
 }
 

 const selectImage = () => {
   // Trigger the hidden file input
   document.getElementById('imageInput').click()
 }

 const handleChange =(e)=>{
  if (selectedImage)
    setFilter((state) => ({ ...state, [e.target.name]: e.target.value }))
  else{
    alert('select image by clicking upload')
  }
 }

 const handleDownload =()=>{
  
  if(selectedImage){
    const editedImage = imageRef.current
  

    if (editedImage.complete) {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      canvas.height = editedImage.naturalHeight 
      canvas.width = editedImage.naturalWidth
      context.filter = ` contrast(${filter.contrast}) brightness(${filter.brightness})`
      context.drawImage(editedImage, 0, 0, canvas.width, canvas.height)

      
      

      const dataURL = canvas.toDataURL('image/png')

      canvas.toBlob(blob =>{
const file = new File([blob], selectedImage.fileName, { type: 'image/jpeg' })

  axios
    .post(
       'https://erin-cautious-worm.cyclic.app/api',
      // 'http://localhost:8000/api',
      {file},
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then((response) => {
      setSelectedImage(null)
      setFilter({ brightness: 1, contrast: 1 })
      getAllImages()
      alert('Image Saved')
    })
    .catch((error) => {
      return
    })
      })
     
     


      // Create a temporary link element for downloading
      const downloadLink = document.createElement('a')
      downloadLink.href = dataURL
      downloadLink.download = 'filtered_image.png'

      // Append the link to the document and trigger a click event
      document.body.appendChild(downloadLink)
      downloadLink.click()

      // Remove the link from the document
      document.body.removeChild(downloadLink)
    } 
  }
 }

 const getAllImages = async ()=>{
  try {
     const {data} = await axios.get(
       'https://erin-cautious-worm.cyclic.app/api',
      //  'http://localhost:8000/api',
       {
         headers: {
           'Content-Type': 'application/json',
         },
       }
     )
     
    setImages(data)
  } catch (error) {
    alert(`error getting images : ${error}`)
  }
   
 }

useEffect(() => {
  getAllImages()
}, [])

  return (
    <Box>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        minHeight={'100vh'}
        sx={{ backgroundColor: '#FAFAFA' }}
      >
        <Stack
          flex={1}
          margin={{ xs: '1rem 1rem', md: '4rem 6rem', lg: '4rem 10rem' }}
          minHeight={'70%'}
        >
          <Container container>
            <Grid
              item
              xs={12}
              md={7}
              component={Stack}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <ImageContainer>
                {selectedImage && (
                  <img
                    ref={imageRef}
                    src={selectedImage.url}
                    alt='Selected'
                    style={{
                      filter: ` contrast(${filter.contrast}) brightness(${filter.brightness})`,
                    }}
                    crossOrigin='anonymous'
                  />
                )}
              </ImageContainer>
            </Grid>
            <Grid item xs={12} md={5}>
              <InputContainer>
                <Typography variant={'h6'} fontWeight={600} marginBottom={2}>
                  Image Name
                </Typography>
                <Box>
                  <Typography fontWeight={600}>Brightness</Typography>
                  <Box marginX={'5px'}>
                    <StyledSlider
                      min={0}
                      max={3}
                      step={0.05}
                      value={filter.brightness}
                      name='brightness'
                      onChange={handleChange}
                    />
                  </Box>
                  <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    marginTop={'-15px'}
                  >
                    <Symbol>-</Symbol>
                    <Symbol>+</Symbol>
                  </Stack>
                </Box>
                <Box>
                  <Typography fontWeight={600}>Contrast</Typography>
                  <Box marginX={'5px'}>
                    <StyledSlider
                      min={0}
                      max={4}
                      step={0.05}
                      value={filter.contrast}
                      name='contrast'
                      onChange={handleChange}
                    />
                  </Box>
                  <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    marginTop={'-15px'}
                  >
                    <Symbol>-</Symbol>
                    <Symbol>+</Symbol>
                  </Stack>
                </Box>
                <Stack marginX={6} flex={1} justifyContent={'end'}>
                  <input
                    type='file'
                    accept='image/*'
                    id='imageInput'
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />

                  <Box>
                    <StyledButton fullWidth onClick={handleDownload}>
                      Save & Download
                    </StyledButton>
                  </Box>
                </Stack>
              </InputContainer>
            </Grid>
          </Container>
          <Grid container marginY={4}>
            <Grid item xs={12} md={7} textAlign={'center'}>
              <StyledButton onClick={selectImage}>Upload File</StyledButton>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
      <Grid
        container
        padding={{ xs: '1rem 1rem', md: '4rem 6rem', lg: '4rem 10rem' }}
        id='images'
      >
        <Grid item xs={12}>
          <Typography variant='h4' marginY={4} fontFamily={700}>
            Saved Images:
          </Typography>
        </Grid>
        {images.map((ele, index) => {
          return (
            <Grid item xs={12} md={4} lg={3} padding={{ xs: 1, md: 1 }}>
              <Stack
                sx={{
                  boxShadow: 3,
                  borderRadius: '15px',
                  padding: '1rem',
                  height: '100%',
                }}
                gap={2}
              >
                <img
                  key={index}
                  src={ele.url}
                  alt='image'
                  className='displayImage'
                />
                <Stack flex={1} justifyContent={'end'}>
                  <Divider />
                  <Typography variant='p' fontWeight={600} marginY={4}>
                    File Name :- {ele.fileName}
                  </Typography>
                  
                </Stack>
              </Stack>
            </Grid>
          )
        })}
      </Grid>
      <StyledButton
        component={'a'}
        sx={{
          borderRadius: '50px',
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          scrollBehavior: 'smooth',
        }}
        href='#images'
      >
        Show Saved Images
      </StyledButton>
    </Box>
  )
  
}

export default App;
