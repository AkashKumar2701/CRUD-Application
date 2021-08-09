import React from 'react';
import { AppBar, IconButton, Typography, Container, Paper } from '@material-ui/core';
import useStyles from './styles'
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Link } from 'react-router-dom';
const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Typography variant='h6' color='initial' gutterBottom><strong>BITCODING&nbsp;&copy;&nbsp;2021</strong></Typography>
            <div>
                <Link target='_blank' to='https://www.instagram.com/i_am_akash2701/'>
                    <IconButton><InstagramIcon color='inherit' /></IconButton>
                </Link>
                <Link target='_blank' to='https://www.linkedin.com/in/akash-kumar-6337b01a5/'>
                    <IconButton><LinkedInIcon color='inherit' /></IconButton>
                </Link>
                <Link target='_blank' to='https://www.facebook.com/profile.php?id=100006448988810'>
                    <IconButton><FacebookIcon color='inherit' /></IconButton>
                </Link>
                <Link target='_blank' to='https://github.com/AkashKumar2701'>
                    <IconButton><GitHubIcon color='inherit' /></IconButton>
                </Link>
            </div>
            <Typography variant="body1" color="initial" style={{ textAlign: "center" }} ><strong>This Website Is Designed And Developed By Akash Kumar</strong></Typography>

        </footer>
    )


}
export default Footer;