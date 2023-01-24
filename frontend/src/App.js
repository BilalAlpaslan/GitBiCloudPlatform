
import React from 'react';
import { Box, Button } from '@mui/material';
import { octokitEntity, checkOctokit } from './Bloc/token';
import { getDashboardJson, dashboardEntity, dashboardSHAEntity, commitDashboardJson, loadDataFromSource, panelsDataEntity } from './Bloc/dashboard';
import Appbar from './components/Appbar';


function App() {
  const octokit = octokitEntity.use();
  const dashboard = dashboardEntity.use();
  const dashboardSha = dashboardSHAEntity.use();
  const panelData = panelsDataEntity.use();

  React.useEffect(() => {
    checkOctokit();
    if (octokit) getDashboardJson(octokit);
  }, [octokit]);

  React.useEffect(() => {
    if (dashboard.panels) {
      dashboard.panels.forEach(panel => {
          loadDataFromSource(octokit, panel.datasource)
      });
    }
  }, [octokit, dashboard]);

  return (
    <>
    <Appbar/>
    <div style={{ height: '42px' }}/>
      <Box>
        <Box>
          <h2>Dashboard - {dashboard.title} </h2> 
          {dashboard.panels ? dashboard.panels.map((element, i) =>
            <Box key={i}>
              <h2>Panel {i + 1}</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                dashboard.panels[i].title = e.target.title.value;
                commitDashboardJson(octokit, dashboardSha, btoa(JSON.stringify(dashboard)));
              }}>
                <input type="text" id="title" defaultValue={element.title} />
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </form>
              {panelData[element.datasource] ? panelData[element.datasource].map(item =>
                <Box key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{element.age}</p>
                </Box>
              ) : 'veri yok'}
            </Box>
          ) : 'yok'}
            </Box>
      </Box>
      </>
      );
}

      export default App;
