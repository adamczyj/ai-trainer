# Strava API Client

This is a TypeScript client for the Strava API v3, generated from the OpenAPI specification using OpenAPI Generator.

## Features

- **Type-safe API calls** - All API endpoints are fully typed
- **Axios-based HTTP client** - Uses axios for HTTP requests
- **Authentication integration** - Works with our `stravaConfig` authentication system
- **Complete API coverage** - All Strava API endpoints are available

## Quick Start

### 1. Set up authentication

Make sure you have your Strava API credentials set as environment variables:

```bash
export STRAVA_CLIENT_ID="your_client_id"
export STRAVA_CLIENT_SECRET="your_client_secret"
export STRAVA_ACCESS_TOKEN="your_access_token"
export STRAVA_REFRESH_TOKEN="your_refresh_token"
```

### 2. Use the client

```typescript
import { stravaClient } from '../strava/stravaClient.js';

// Get athlete profile
const athlete = await stravaClient.athletes.getLoggedInAthlete();
console.log(`Hello ${athlete.data.firstname} ${athlete.data.lastname}!`);

// Get recent activities
const activities = await stravaClient.activities.getLoggedInAthleteActivities(1, 10);
console.log(`You have ${activities.data.length} recent activities`);

// Get athlete's clubs
const clubs = await stravaClient.clubs.getLoggedInAthleteClubs();
console.log(`You're a member of ${clubs.data.length} clubs`);
```

## Available API Clients

The generated client provides access to all Strava API endpoints through these specialized clients:

- **`stravaClient.activities`** - Activity management (create, read, update activities)
- **`stravaClient.athletes`** - Athlete profile and data
- **`stravaClient.clubs`** - Club management and membership
- **`stravaClient.gears`** - Equipment (bikes, shoes) information
- **`stravaClient.routes`** - Route management and export
- **`stravaClient.segmentEfforts`** - Segment effort data
- **`stravaClient.segments`** - Segment exploration and management
- **`stravaClient.streams`** - Activity and segment stream data
- **`stravaClient.uploads`** - File upload for activities

## Authentication

The client automatically uses the access token from your `stravaConfig`. If you need to update tokens (e.g., after a refresh):

```typescript
stravaClient.updateTokens(newAccessToken, newRefreshToken);
```

## Error Handling

All API calls return axios promises. Handle errors appropriately:

```typescript
try {
  const athlete = await stravaClient.athletes.getLoggedInAthlete();
  console.log(athlete.data);
} catch (error) {
  if (error.response?.status === 401) {
    console.log('Token expired, need to refresh');
  } else {
    console.error('API error:', error.response?.data);
  }
}
```

## Type Safety

All API responses are fully typed. For example:

```typescript
const athlete: DetailedAthlete = (await stravaClient.athletes.getLoggedInAthlete()).data;
const activities: SummaryActivity[] = (await stravaClient.activities.getLoggedInAthleteActivities()).data;
```

## Regenerating the Client

If Strava updates their API, you can regenerate this client:

```bash
# Install OpenAPI Generator CLI globally
npm install -g @openapitools/openapi-generator-cli

# Generate the client
openapi-generator-cli generate \
  -i https://developers.strava.com/swagger/swagger.json \
  -g typescript-axios \
  -o ./src/generated/strava-client \
  --additional-properties=supportsES6=true,npmName=@strava-mcp/strava-client,npmVersion=1.0.0,withInterfaces=true \
  --skip-validate-spec
```

## Example Usage

See `src/examples/stravaClientExample.ts` for a complete example of using the client.

## API Documentation

For detailed API documentation, visit:
- [Strava API Documentation](https://developers.strava.com/docs/)
- [Strava API Playground](https://developers.strava.com/playground)

## Generated Files

This directory contains:
- `api.ts` - All API client classes and interfaces
- `configuration.ts` - Configuration and authentication setup
- `base.ts` - Base API functionality
- `common.ts` - Common utilities
- `index.ts` - Main exports
- `docs/` - Generated documentation for each endpoint
- `package.json` - Package configuration
- `tsconfig.json` - TypeScript configuration

