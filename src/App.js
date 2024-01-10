
import {  Box, Grid, Stack, Typography } from '@mui/material';
import './App.css';
import { Container, ImageContainer, InputContainer, StyledButton, StyledSlider, Symbol } from './components/styledComponents/styled';
import { useRef, useState } from 'react';
import axios from 'axios';



function App() {
const [filter, setFilter] = useState({brightness:1 , contrast:1})
 const [selectedImage, setSelectedImage] = useState(null)
 const imageRef = useRef(null)

 const handleImageChange = (event) => {
   const file = event.target.files[0]

   if (file) {
     const reader = new FileReader()
     reader.onload = () => {
       setSelectedImage(reader.result)
     }
     reader.readAsDataURL(file)
   }
 }
 

 const selectImage = () => {
   // Trigger the hidden file input
   document.getElementById('imageInput').click()
 }

 const handleChange =(e)=>{
  setFilter(state => ({...state , [e.target.name]:e.target.value}))
 }

 const handleDownload =()=>{
  if(selectedImage){
    const editedImage = imageRef.current
  

    if (editedImage.complete) {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      canvas.height = editedImage.naturalHeight // Use naturalHeight instead of naturalheight
      canvas.width = editedImage.naturalWidth
      context.filter = ` contrast(${filter.contrast}) brightness(${filter.brightness})`
      context.drawImage(editedImage, 0, 0, canvas.width, canvas.height)

      
      

      const dataURL = canvas.toDataURL('image/png')

      canvas.toBlob(blob =>{

         axios
           .post(
             'https://erin-cautious-worm.cyclic.app/api',
             { blob },
             {
               headers: {
                 'Content-Type': 'multipart/form-data',
               },
             }
           )
           .catch((error) => {
             console.log(error)
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



  return (
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
                  src={selectedImage}
                  alt='Selected Image'
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
                  <StyledButton fullWidth onClick={selectImage}>
                    Save & Download
                  </StyledButton>
                </Box>
              </Stack>
            </InputContainer>
          </Grid>
        </Container>
        <Grid container marginY={4}>
          <Grid item xs={12} md={7} textAlign={'center'}>
            <StyledButton onClick={handleDownload}>Upload File</StyledButton>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  )
  
}

export default App;
