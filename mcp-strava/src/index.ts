import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { config } from '@src/utils/config';
import { logger } from '@src/utils/logger';
import { allTools } from '@src/tools/index';


// Create MCP server instance
const server = new McpServer({
  name: 'strava-mcp-server',
  version: '1.0.0'
});

// Create transport
const transport = new StdioServerTransport();



// Graceful shutdown handler
const gracefulShutdown = (signal: string) => {
  logger.info(`Received ${signal}, shutting down gracefully...`);
  
  // Close transport
  transport.close();
  
  // Exit process
  process.exit(0);
};

// Error handler
const errorHandler = (error: Error) => {
  logger.error('Unhandled error:', error);
  process.exit(1);
};

// Setup process event handlers
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('uncaughtException', errorHandler);
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection:', reason);
  process.exit(1);
});

// Main server startup
async function startServer() {
  try {
    logger.info('Starting Strava MCP Server...');
    logger.info(`Environment: ${config.get('NODE_ENV', 'development')}`);
    logger.info(`Log level: ${config.get('LOG_LEVEL', 'info')}`);

    // Register all Strava tools
    for (const tool of allTools) {
      server.registerTool(
        tool.name,
        {
          title: tool.title,
          description: tool.description,
          inputSchema: tool.inputSchema
        },
        tool.handler
      );
    }
    
    logger.info(`Registered ${allTools.length} tools (${allTools.length} Strava tools)`);

    // Start the MCP server
    await server.connect(transport);
    logger.info('Transport connected');
    logger.info('Server started!');
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer().catch((error) => {
  logger.error('Unexpected error during startup:', error);
  process.exit(1);
}); 

