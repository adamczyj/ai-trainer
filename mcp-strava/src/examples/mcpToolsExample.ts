#!/usr/bin/env tsx

import { allTools } from '@src/tools/index';

/**
 * Example demonstrating how to use the MCP tools
 */
async function demonstrateMcpTools() {
  console.log('🚴‍♂️ Strava MCP Tools Example\n');

  // Example 1: Get athlete activities
  console.log('1. Getting athlete activities (last 10 activities):');
  const activitiesTool = allTools.find(tool => tool.name === 'get_athlete_activities');
  if (activitiesTool) {
    try {
      const result = await activitiesTool.handler({
        perPage: 10,
        page: 1
      });
      console.log('   ✅ Success! Retrieved activities data');
      console.log(`   📊 Response length: ${result.content[0]?.text?.length || 0} characters`);
    } catch (error) {
      console.log('   ❌ Error (expected if not authenticated):', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  // Example 2: Get activity by ID
  console.log('\n2. Getting activity by ID (example with ID 123456):');
  const activityByIdTool = allTools.find(tool => tool.name === 'get_activity_by_id');
  if (activityByIdTool) {
    try {
      const result = await activityByIdTool.handler({
        id: 123456,
        includeAllEfforts: false
      });
      console.log('   ✅ Success! Retrieved activity data');
      console.log(`   📊 Response length: ${result.content[0]?.text?.length || 0} characters`);
    } catch (error) {
      console.log('   ❌ Error (expected if not authenticated or activity not found):', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  // Example 3: Get activity comments
  console.log('\n3. Getting activity comments (example with ID 123456):');
  const commentsTool = allTools.find(tool => tool.name === 'get_activity_comments');
  if (commentsTool) {
    try {
      const result = await commentsTool.handler({
        id: 123456,
        pageSize: 5
      });
      console.log('   ✅ Success! Retrieved comments data');
      console.log(`   📊 Response length: ${result.content[0]?.text?.length || 0} characters`);
    } catch (error) {
      console.log('   ❌ Error (expected if not authenticated or activity not found):', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  // Example 4: Show all available tools
  console.log('\n4. All available tools:');
  allTools.forEach((tool, index) => {
    console.log(`   ${index + 1}. ${tool.name}`);
    console.log(`      Description: ${tool.description}`);
    console.log(`      Parameters: ${Object.keys(tool.inputSchema['properties'] || {}).join(', ')}`);
    console.log('');
  });

  console.log('🎉 Example completed!');
  console.log('\n💡 To use these tools with actual data:');
  console.log('   1. Set up your Strava API credentials');
  console.log('   2. Run the OAuth authentication flow');
  console.log('   3. Start the MCP server: npm run dev');
  console.log('   4. Connect your MCP client to use the tools');
}

// Run the example
demonstrateMcpTools().catch((error) => {
  console.error('Unexpected error during example:', error);
  process.exit(1);
}); 