import { entity } from 'simpler-state'
import { owner, repo } from '../constant'


export const dashboardEntity = entity({});
export const dashboardSHAEntity = entity(null);
export const panelsDataEntity = entity({});

export const getDashboardJson = async (octokit) => {
    octokit.request('GET /repos/{owner}/{repo}/contents/data/dashboard.json', {
        owner,
        repo,
        path: 'data/dashboard.json',
    })
        .then(res => {
            dashboardEntity.set(JSON.parse(atob(res.data.content)));
            dashboardSHAEntity.set(res.data.sha);
        })
        .catch(err => console.log(err));
}

export const commitDashboardJson = async (octokit, sha, content) => {
    octokit.request('PUT /repos/{owner}/{repo}/contents/data/dashboard.json', {
        owner,
        repo,
        sha,
        path: 'data/dashboard.json',
        message: 'dashboard commit',
        content,
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

export const loadDataFromSource = (octokit, source) => {
    octokit.request('GET /repos/{owner}/{repo}/contents/'+ source, {
        owner,
        repo,
        path: source,
    })
        .then(res => {
            var panelsData = panelsDataEntity.get();
            panelsData[source] = JSON.parse(atob(res.data.content));
            panelsDataEntity.set({ ...panelsData });
        })
        .catch(err => console.log(err));
}