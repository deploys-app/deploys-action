<p align="center">
    <img alt="logo" src=".github/logo.png">
    <h1 align="center">Deploys Action</h1>
    <p align="center">Github Action for Deploys.app</p>
</p>

## Usage

### Workflow

```yaml
name: Deploy
on:
  push:
    branches:
    - master
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v1
    - name: Login to GitHub Container Registry
      uses: docker/login-action@v1
      with:
        registry: ghcr.io
        username: ${{ github.repository_owner }}
        password: ${{ secrets.GITHUB_TOKEN }}
    - name: Build and push
      id: docker_build
      uses: docker/build-push-action@v2
      with:
        push: true
        tags: ghcr.io/${{ github.repository }}:latest
    - uses: deploys-app/deploys-action@v1
      with:
        project: PROJECT_ID
        location: LOCATION
        name: DEPLOYMENT_NAME
        image: ghcr.io/${{ github.repository }}@${{ steps.docker_build.outputs.digest }}
      env:
        DEPLOYS_AUTH_USER: ${{ secrets.DEPLOYS_AUTH_USER }}
        DEPLOYS_AUTH_PASS: ${{ secrets.DEPLOYS_AUTH_PASS }}
```

## Customizing

### Inputs

| Name | Description |
| --- | --- |
| project | Project ID |
| location | Location |
| name | Deployment Name |
| image | Container Image |
| port | Port |
| type | Deployment Type |
| minReplicas | Autoscale Min Replicas |
| maxReplicas | Autoscale Max Replicas |

### Environment Variables

| Name | Description |
| --- | --- |
| DEPLOYS_TOKEN | Auth Token |
| DEPLOYS_AUTH_USER | Service Account Email |
| DEPLOYS_AUTH_PASS | Service Account Key |

## License

MIT
