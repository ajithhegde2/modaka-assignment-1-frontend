import { Box, Button, Grid, Slider, Stack, Typography, styled } from '@mui/material'

export const Container = styled(Grid)({
  border: '3px solid #92A2B6',
  borderRadius: '15px',
  backgroundColor: 'white',
  boxSizing:'border-box',
  flex:1,
  
})

export const ImageContainer = styled(Box)({
  borderRadius: '15px 0 0 15px',
  height: '100%',
  padding: '2rem 3rem',
})

export const InputContainer = styled(Stack)({
  borderRadius: '0 15px 15px 0',
  backgroundColor: '#F4F4F4',
  padding: '2rem 3rem',
  gap: '2rem',
  height:'100%'
})

export const StyledSlider = styled(Slider)({
  color: '#26476E',
  height: 10,
  '& .MuiSlider-thumb': {
    height: 15,
    width: 15,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 4px -2px black',
    border: '2px solid #26476E',
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#FFFFFF',
    opacity: 1,
  },
  '&:focus, &:hover, &.Mui-active': {},
  '&:before': {
    boxShadow:
      '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
  },
})

export const Symbol = styled(Typography)({
  variant: 'subtitle2',
  fontWeight: 600,
})

export const StyledButton = styled(Button)({
  color: 'white',
  variant: 'filled',
  backgroundColor: '#26476E',
  textTransform: 'none',
  padding: '0.5rem 3rem',
  fontSize: '15px',
  borderRadius: '0',
  '&:hover': {
    backgroundColor: '#26476E',
  },
})
