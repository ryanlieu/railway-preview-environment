# Railway Preview Deploy Action

This GitHub Action automates the deployment of a preview environment for your
Railway project whenever a pull request is opened in your repository. It works
similarly to Vercel preview deployments. This allows you to easily review
changes in a live environment before merging.

This PR is inspired by
[railway-pr-deploy](https://github.com/Faolain/railway-pr-deploy) but with some
improvements and convert it to TypeScript.

## Features

- Deploys a new preview environment on every pull request.
- Supports custom environment variables for each deployment.
- Optionally reuses an existing preview environment for subsequent PRs.
- Optionally cleans up the environment when the PR is closed.
- Provides the deployed environment’s domain as an output for easy reference.

## Inputs

| Name                        | Description                                                                                                                     | Required | Default |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| `railway_api_token`         | The Railway API token.                                                                                                          | Yes      |         |
| `project_id`                | The Railway project ID. You can find it in the Railway dashboard under **Settings > General**.                                  | Yes      |         |
| `environment_name`          | The name of the environment that serves as the base for the preview deployment.                                                 | Yes      |         |
| `environment_id`            | The environment ID that serves as the base for the preview deployment. If provided, `environment_name` will be ignored.         | No       |         |
| `preview_environment_name`  | The name for the new preview environment. Use PR-specific naming, e.g., `pr-<PR_NUMBER>-<SHORT_COMMIT_HASH>`.                   | Yes      |         |
| `environment_variables`     | Environment variables to be set for the preview deployment, provided as a JSON object (e.g., `{"KEY": "value"}`).               | No       |         |
| `api_service_name`          | The name of the API service for the PR environment, used to identify the deployed domain.                                       | No       |         |
| `ignore_service_redeploy`   | A list of services to ignore when redeploying the PR environment. Useful for services that don't need redeployment on every PR. | No       |         |
| `branch_name`               | The branch name of the pull request used for the preview deployment.                                                            | Yes      |         |
| `reuse_preview_environment` | Whether to reuse an existing preview environment if it has already been created.                                                | No       | `true`  |
| `cleanup`                   | Whether to clean up the preview environment after the PR is closed.                                                             | No       | `false` |

## Outputs

| Name             | Description                                                        |
| ---------------- | ------------------------------------------------------------------ |
| `service_domain` | The domain of the service that was deployed in the PR environment. |

## Usage

Here's an example of how you can use this action in your workflow file:

```yaml
name: Deploy Preview Environment

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  deploy-preview:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Railway Preview Deploy
        uses: ayungavis/railway-preview-deploy@v1
        with:
          railway_api_token: ${{ secrets.RAILWAY_API_TOKEN }}
          project_id: ${{ secrets.RAILWAY_PROJECT_ID }}
          environment_name: 'staging'
          preview_environment_name:
            'pr-${{ github.event.number }}-${{ github.sha }}'
          environment_variables:
            '{"DATABASE_URL": "postgres://user:pass@host/db"}'
          branch_name: ${{ github.head_ref }}
          cleanup: 'true'
```

**Inputs Breakdown:**

- `railway_api_token`: The token to authenticate your Railway API requests.
- `project_id`: The ID of your Railway project.
- `environment_name`: The base environment that the preview deployment will be
  derived from (e.g., staging).
- `preview_environment_name`: A custom name for the preview environment, which
  you can dynamically set using the PR number and commit hash.
- `environment_variables`: Optional environment variables you can set, provided
  in JSON format.
- `branch_name`: The branch from the pull request.
- `cleanup`: Whether to clean up the preview environment after the PR is closed.

## Example Workflow

The following example workflow deploys a preview environment on Railway for each
pull request:

```yaml
name: Railway Preview Deployment

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Deploy to Railway
        uses: ayungavis/railway-preview-deploy@v1
        with:
          railway_api_token: ${{ secrets.RAILWAY_API_TOKEN }}
          project_id: ${{ secrets.RAILWAY_PROJECT_ID }}
          environment_name: 'staging'
          preview_environment_name:
            'pr-${{ github.event.number }}-${{ github.sha }}'
          environment_variables: |
            {
              "DATABASE_URL": "postgres://username:password@hostname/db"
            }
          branch_name: ${{ github.head_ref }}

      - name: Post deployment info
        run:
          echo "Preview deployed at ${{ steps.deploy.outputs.service_domain }}"

  cleanup:
    runs-on: ubuntu-latest
    if:
      github.event.pull_request.merged == true ||
      github.event.pull_request.state == 'closed'

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Cleanup Railway Environment
        uses: ayungavis/railway-preview-deploy@v1
        with:
          railway_api_token: ${{ secrets.RAILWAY_API_TOKEN }}
          project_id: ${{ secrets.RAILWAY_PROJECT_ID }}
          preview_environment_name:
            'pr-${{ github.event.number }}-${{ github.sha }}'
          cleanup: 'true'
```

## License

This action is licensed under the MIT License.

This README provides a clear description of the action, how to use it, and
example workflow configurations to help users quickly set up and start using
your GitHub Action.
