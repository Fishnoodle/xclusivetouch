import React, { useState } from "react";
import Image from 'next/image'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Hero = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div className="container mx-auto my-10">
      <div className="px-6 lg:px-5 py-20">
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-24">
          <div className="flex flex-col gap-5 lg:gap-10">
            <p className=" text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium uppercase">
              The new generation of <br className="lg:flex hidden"/> business cards
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-black">
              An All-In-One Digital Business Card to help you seize opportunities and <br  className="lg:flex hidden"/> make better connections
            </p>

            <div className="hidden lg:inline-flex gap-8 items-center">
              <button onClick={handleOpen} className="w-48 h-14 bg-[#D4AF37] text-white uppercase text-sm font-semibold rounded-md hover:bg-[#D4AF37] hover:text-black duration-300">
                contact us
                </button>
            </div>
          </div>
          <Image
            src='/assets/hero_img.png'
            width={750}
            height={750}
            alt='Picture of Hero Page'
          />
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
        }}
        style={{color: '#071013' }}
      >
        <DialogTitle>Contact Us</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To contact us, please enter your email address here. We will make sure to follow up with you.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Contact</Button>
        </DialogActions>
      </Dialog>

      </div>
    </div>
  );
};

export default Hero;