import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { LogoGithubIcon, MarkGithubIcon } from '@primer/octicons-react';

export default function Footer(){
    return(
        <footer>
            <AppBar position="static" sx={{ borderRadius: 10 }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <LogoGithubIcon size={18} /> 
                        <Typography variant="subtitle2">
                            © {new Date().getFullYear()} Copyright: Matteo Gonzi
                        </Typography>
                        <MarkGithubIcon size={18} />
                    </Toolbar>
                </Container>  
            </AppBar>
        </footer>
    )
}