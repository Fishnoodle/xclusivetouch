import React, { useState } from "react";
import Image from 'next/image'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme for MUI components
const theme = createTheme({
  palette: {
    primary: {
      main: '#D4AF37', // Gold color
    },
    secondary: {
      main: '#121212', // Near black
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '4px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginTop: '16px',
          marginBottom: '8px',
        },
      },
    },
  },
});

const Hero = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full bg-gradient-to-b from-white to-gray-50 pt-16 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex flex-col max-w-2xl mb-12 lg:mb-0">
              {/* Gold accent bar */}
              <div className="w-16 h-1.5 bg-[#D4AF37] mb-6"></div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                The New Generation of Business Cards
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                An all-in-one digital business card solution that helps you make powerful connections and seize new opportunities. Stand out with NFC and QR technology.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleOpen} 
                  className="px-8 py-4 bg-[#D4AF37] text-white font-medium rounded-lg hover:bg-[#C4A032] transition-colors shadow-md hover:shadow-lg"
                >
                  Contact Us
                </button>
                <a 
                  href="howitworks" 
                  className="px-8 py-4 border-2 border-gray-900 text-gray-900 font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-colors flex items-center justify-center"
                >
                  Learn More
                </a>
              </div>
              
              <div className="flex items-center mt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-bold border-2 border-white`}>
                      {i}
                    </div>
                  ))}
                </div>
                <p className="ml-4 text-sm text-gray-600">
                  <span className="font-semibold">4.9/5</span> from over 500+ satisfied customers
                </p>
              </div>
            </div>
            
            <div className="relative">
              {/* Gold decorative element */}
              <div className="absolute -z-10 w-64 h-64 bg-[#D4AF37]/10 rounded-full -top-10 -left-10"></div>
              
              <div className="relative z-10 bg-white p-2 rounded-xl shadow-xl rotate-1 transition-transform hover:rotate-0 duration-300">
                <Image
                  src='/assets/hero_img.png'
                  width={550}
                  height={550}
                  className="rounded-lg"
                  alt='XclusiveTouch digital business cards'
                  priority
                />
              </div>
              
              {/* Black decorative element */}
              <div className="absolute -z-10 w-32 h-32 bg-black/5 rounded-full -bottom-5 -right-5"></div>
            </div>
          </div>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
            sx: {
              borderRadius: '12px',
              padding: '16px',
              maxWidth: '500px',
              width: '100%',
            }
          }}
        >
          <DialogTitle sx={{ 
            fontWeight: 700, 
            fontSize: '24px',
            color: '#121212',
            pb: 1
          }}>
            Contact Us
          </DialogTitle>
          
          <DialogContent>
            <p className="text-gray-600 mb-4">
              Tell us about your needs, and we&#39;ll help you find the perfect digital business card solution.
            </p>
            
            <TextField
              autoFocus
              required
              fullWidth
              id="name"
              name="name"
              label="Full Name"
              variant="outlined"
              color="primary"
            />
            
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              type="email"
              variant="outlined"
              color="primary"
            />
            
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone Number (Optional)"
              variant="outlined"
              color="primary"
            />
            
            <TextField
              fullWidth
              id="message"
              name="message"
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              color="primary"
            />
          </DialogContent>
          
          <DialogActions sx={{ padding: '16px' }}>
            <Button 
              onClick={handleClose} 
              sx={{ color: '#121212' }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              sx={{ color: 'white', px: 4 }}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default Hero;