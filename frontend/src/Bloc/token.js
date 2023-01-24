
import { entity } from 'simpler-state'
import { Octokit } from "octokit";

export const octokitEntity = entity(null);


export const checkOctokit = () => {
    if (!octokitEntity.get() && localStorage.getItem('token')) {
        setOctokit(localStorage.getItem('token'));
    }
}

export const setOctokit = (token) => {
    octokitEntity.set(new Octokit({
        auth: token,
    }));
}

export const clearOctokit = () => {
    octokitEntity.set(null);
}