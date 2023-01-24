import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { checkOctokit, clearOctokit, octokitEntity } from '../Bloc/token';
import LogoutIcon from '@mui/icons-material/Logout';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function Appbar() {
    const octokit = octokitEntity.use();


    return (
        <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    // onClick={() => { navigate('/') }}
                    sx={{ flexGrow: 1 }}
                >
                    Gitbi Dashboard
                </Typography>
                {!octokit ?
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Ara..."
                        inputProps={{ 'aria-label': 'search' }}
                        // onChange={(e) => console.log(e.target.value)}
                        onKeyDown={(e) => {if (e.key === 'Enter') checkOctokit(e.target.value)}}
                    />
                </Search>
                :
                <>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                >
                    Authenticated
                </Typography>
                <LogoutIcon onClick={() => { clearOctokit() }} sx={{ marginLeft: 1, cursor: 'pointer' }} />
                </>
                }
            </Toolbar>
        </MuiAppBar>
    )
}