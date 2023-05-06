import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { LogoGithubIcon, MarkGithubIcon } from '@primer/octicons-react';

export default function Footer(){
    return(
        <footer>
            <Container maxWidth="xl" sx={{ backgroundColor: "#1976d2" , color: "white", borderRadius: 10 }}>
                <Toolbar disableGutters>
                    <LogoGithubIcon size={18} /> 
                    <Typography variant="subtitle2">
                        © {new Date().getFullYear()} Copyright: Matteo Gonzi
                    </Typography>
                    <MarkGithubIcon size={18} />
                </Toolbar>
            </Container>  
        </footer>
    )
}