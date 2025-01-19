# ZPI2023_zaoczni_NBP_Crasher

##### version: 2.2.3

## Used technologies
### Frontend
This part of system was developed using easily available technologies. <br>
The language used is JavaScript – standard ECMAScript 2024 <br>
UI was developed with: <br>
    framework Angular – version 17.3.0, <br>
    TypeScript – version 5.4.2, <br>
    Bootstrap – version 5.3.3, <br>
    DevExtreme Angular components – version 23.1.13. <br>
Tests written with Karma test runner (version 5.1.0) & Jasmine testing framework (version 5.1.0).<br>

### Backend
This part of system was developed using easily available technologies. <br>
The language used is Python – version 3.12 <br>
API was developed with framework FastAPI in version 0.115.6 <br>
Data analysis was perfomed with help of following external packages: <br>
    numpy – version 2.2.1 <br>
    pandas – version 2.2.3 <br>
Web server hosting our API implementation is uvicorn – version 0.34.0<br>
Unit tests where written in pytest - version 8.3.4<br>

## Deployment

Deployments are integrated with GitHub Actions and Release platform.
Our [Hosting Server](#hosting) has GitHub Self-Hosted runner installed, 
which is an open source application integrated with [GitHub](https://github.com) and allows to run GitHub Actions Workflows.

The `Deploy App` workflow is run on self-hosted runner and it can deploy code which has release. 
Release can be `Latest` or `Pre-release`.
1. Checks out to provided app version (manual run) or fetches version corresponding to the branch from which workflow was started.
2. Builds both Backend and Frontend docker container.
3. Stops currently running containers (if any of them are running).
4. Starts new containers using built images.
5. Clean up [Hosting Server](#hosting) from stopped containers, dangling images and unused build cache.

### Hosting

We are using self-hosted server to build and run application's docker containers.
Application is not exposed to the Internet, but it requires [Tailscale client](https://tailscale.com),
to establish an point-to-point connection with deployment server and access the Application.

Hosting Server is an Microsoft Hyper-V Virtual Machine gen 2.
- **CPU**: 12 virtual cores 
- **RAM**: 8 GBs
- **Storage**: 32 GB
- **OS**: Ubuntu 24.04 LTS

Additional software installed on Hosting Server:
- [GitHub Self-Hosted runner](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners)
- [Tailscale client](https://tailscale.com/download/linux)


## Project documentation
Project documentation is placed in the repository of the project in 'docs' folder.<br>
To redirect to documentation use this [link](docs).

## Backlogs location
Backlogs can be found on the project site on github under the [link](https://github.com/orgs/IIS-ZPI/projects/23/views/2?filterQuery=).

## CI implementation including automated unit tests

### Workflows

We used GitHub Actions as our continuous integration and continuous delivery platform.

1. `Check version` - triggered on opening and synchronizing (committing) pull request.
   It validates if application version provided by developer is not already released (merged to `release`),
   to avoid overwriting existing version.
2. `Docker build image` - triggered on opening and synchronizing (committing) pull request.
   Builds docker images based on `compose.yaml` definition of services.
   It allows to validate both docker compose build context and `Dockerfile`s itself.
3. `Backend Tests` - triggered on opening and synchronizing (committing) pull request.
   Runs unit tests using `Pytest` framework, if any file in `/backend` directory was changed.
4. `Frontend Tests` - triggered on opening and synchronizing (committing) pull request.
   Runs unit tests using `Jasmine` framework, if any file in `/frontend` directory was changed.
5. `Create Release` - triggered on closing pull request with destination branch set to
   `develop` or `release`. Creates GitHub release of a merged code.
   Behavior differs based on destination branch, if it is:
   - `develop` - workflow creates a GitHub release with label `Pre-release`.
    This type of release can be overwritten by next merge to develop branch.
   - `release` - workflow creates a GitHub release with label `Latest`.
    This type of release can **NOT** be overwritten.
6. `Deploy App` - can be triggered manually and also it is triggered on push to `release` branch.
    Deployment is executed based on the GitHub releases, as a result code which has at least a `Pre-release`,
    can be deployed to server. This workflow is executed on [GitHub Self-Hosted runner](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners) only.

## Reports location
Reports for sprints can be found under the [link](docs/Raports).<br>
Communication regarding bugs, errors and further solving problems encountered during testing can be easily found in the backlog. <br>
Example links to bug fixing: <br>
[Link 1](https://github.com/orgs/IIS-ZPI/projects/23/views/2?filterQuery=&pane=issue&itemId=93567722&issue=IIS-ZPI%7CZPI2024_zaoczni_NBP_Crasher%7C56) <br>
[Link 2](https://github.com/orgs/IIS-ZPI/projects/23/views/2?filterQuery=&pane=issue&itemId=94253959&issue=IIS-ZPI%7CZPI2024_zaoczni_NBP_Crasher%7C65) <br>

