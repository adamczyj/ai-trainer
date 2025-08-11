# Strava MCP Server

A Model Context Protocol (MCP) server that provides access to Strava API data through various tools and functions.

## Features

- **Athlete Management**: Get athlete profiles and statistics
- **Activity Tracking**: List, retrieve, and analyze activities
- **Club Integration**: Access club information and activities
- **Gear Management**: Track equipment and gear details
- **Route Planning**: Access and manage routes
- **Segment Analysis**: Search and analyze segments and efforts
- **Stream Data**: Get detailed activity stream data

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Strava API credentials (Client ID and Client Secret)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd strava-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Set up your Strava API credentials:
```bash
cp .env.example .env
# Edit .env with your Strava API credentials
```

4. Build the project:
```bash
npm run build
```

5. Get your Strava tokens:
```bash
npm run get:tokens
```

## Claude Desktop Integration

This MCP server can be integrated with Claude Desktop to provide Strava data access directly within Claude.

### Automatic Setup

Run the setup script to automatically configure Claude Desktop:

```bash
./scripts/setup-claude-desktop.sh
```

This script will:
- Build the project if needed
- Create the Claude Desktop configuration directory
- Generate the MCP configuration file
- Back up any existing configuration

### Quick Setup (Manual)

Or manually copy the configuration file:

```bash
cp claude-desktop-mcp-config-tsx.json ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### Manual Setup

If you prefer to set up manually, create a configuration file at:
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

With the following content:
```json
{
  "mcpServers": {
    "strava": {
      "command": "node",
      "args": ["/path/to/your/strava-mcp/dist/index.js"],
      "env": {
        "NODE_ENV": "production",
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

### After Setup

1. Restart Claude Desktop
2. The Strava MCP server will be available
3. You can now ask Claude to help you with Strava data

### Available Tools in Claude

Once configured, you can ask Claude to:
- Get your athlete profile
- List your recent activities
- Get detailed activity information
- Search for segments
- Access your clubs
- Get gear information
- Retrieve activity streams

## Development

### Running in Development Mode

```bash
npm run dev
```

### Testing

```bash
npm run test
```

### Available Scripts

- `npm run build` - Build the TypeScript project
- `npm run dev` - Run in development mode with hot reload
- `npm run start` - Run the built server
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run get:tokens` - Get Strava OAuth tokens
- `npm run oauth:server` - Start OAuth server for token acquisition

## Configuration

The server uses environment variables for configuration. Create a `.env` file with:

```
STRAVA_CLIENT_ID=your_client_id
STRAVA_CLIENT_SECRET=your_client_secret
STRAVA_REDIRECT_URI=http://localhost:3000/callback
NODE_ENV=development
LOG_LEVEL=info
```

## API Tools

The server provides the following MCP tools:

### Athletes
- `getAthlete` - Get current athlete profile
- `getAthleteStats` - Get athlete statistics
- `getAthleteZones` - Get athlete heart rate zones

### Activities
- `getActivities` - List athlete activities
- `getActivityById` - Get detailed activity information
- `getActivityComments` - Get activity comments
- `getActivityKudoers` - Get activity kudoers
- `getActivityLaps` - Get activity laps
- `getActivityZones` - Get activity zones
- `getActivityStreams` - Get activity stream data

### Clubs
- `getClubActivities` - Get club activities
- `getClubById` - Get club details
- `getClubMembers` - Get club members
- `getClubAnnouncements` - Get club announcements
- `getClubEvents` - Get club events

### Gears
- `getGearById` - Get gear details

### Routes
- `getRouteById` - Get route details
- `getRouteAsGPX` - Get route as GPX
- `getRouteAsTCX` - Get route as TCX

### Segments
- `getSegmentById` - Get segment details
- `getSegmentEffortById` - Get segment effort details
- `exploreSegments` - Explore segments in an area
- `getStarredSegments` - Get starred segments

### Streams
- `getActivityStreams` - Get activity stream data
- `getSegmentEffortStreams` - Get segment effort streams
- `getSegmentStreams` - Get segment streams

## License

MIT 