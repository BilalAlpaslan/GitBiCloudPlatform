
import React from 'react';
import { Box, Button } from '@mui/material';
import { Octokit } from "octokit";

function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token') || null);
  const repo = 'GitBiCloudPlatform';
  const owner = 'bilalalpaslan';

  const getGitCredentials = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  }


  const commitJsonFile = () => {
    const octokit = new Octokit({
      auth: token,
    });

    let sha;

    octokit.request('GET /repos/{owner}/{repo}/contents/data/data.json', {
      owner,
      repo,
      path: 'data/data.json',
    })
      .then(res => {
        sha = res.data.sha;
        console.log(sha);
        octokit.request('PUT /repos/{owner}/{repo}/contents/data/data.json', {
          owner,
          repo,
          sha,
          path: 'data/data.json',
          message: 'new commit',
          content: btoa(JSON.stringify({ "name": "bilal-2" })),
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then(res => console.log(res))
          .catch(err => console.log(err)); 
      } )
      .catch(err => console.log(err));

  }


  return (
    <>
      <Box>
        <h1>React App</h1>
        {  ! token ?
        <Box>
          <form onSubmit={(e) => getGitCredentials(e.target.token.value)}>
            <label htmlFor="token">token</label>
            <input type="text" id="token" />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </Box> 
        :
        <Box>
          <h2>Authenticated</h2>
          <Button variant="contained" color="primary" onClick={() => commitJsonFile()}>
            commit
          </Button>
        </Box>
        }
      </Box>
    </>
  );
}

export default App;
