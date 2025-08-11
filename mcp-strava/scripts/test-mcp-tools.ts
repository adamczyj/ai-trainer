#!/usr/bin/env tsx

import { allTools } from '@src/tools/index';

/**
 * Test script to verify MCP tools are properly configured
 */
async function testMcpTools() {
  try {
    console.log('Testing MCP Tools Configuration...');
    
    // Test 1: Check if tools are loaded
    console.log(`Loaded ${allTools.length} tools:`);
    
    for (const tool of allTools) {
      console.log(`  - ${tool.name}: ${tool.description}`);
      
      // Test 2: Validate tool structure
      if (!tool.name || !tool.description || !tool.inputSchema || !tool.handler) {
        throw new Error(`Invalid tool structure for ${tool.name}`);
      }
      
      // Test 3: Validate input schema
      if (typeof tool.inputSchema !== 'object') {
        throw new Error(`Invalid input schema for ${tool.name}`);
      }
      
      // Test 4: Validate handler is a function
      if (typeof tool.handler !== 'function') {
        throw new Error(`Invalid handler for ${tool.name}`);
      }
    }
    
    console.log('✅ All tools are properly configured');
    
    // Test 5: Test tool registration (simulate the registration process)
    console.log('Testing tool registration simulation...');
    
    const mockServer = {
      tool: (name: string, description: string, inputSchema: any, handler: any) => {
        console.log(`  Registered tool: ${name}`);
        return { name, description, inputSchema, handler };
      }
    };
    
    const registeredTools = allTools.map(tool => 
      mockServer.tool(tool.name, tool.description, tool.inputSchema, tool.handler)
    );
    
    console.log(`✅ Successfully registered ${registeredTools.length} tools`);
    
    // Test 6: Show available activities tools
    const activitiesTools = allTools.filter(tool => tool.name.startsWith('get_'));
    console.log('Available activities tools:');
    activitiesTools.forEach(tool => {
      console.log(`  - ${tool.name}: ${tool.description}`);
    });
    
    console.log('🎉 All tests passed! MCP tools are ready to use.');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run the test
testMcpTools().catch((error) => {
  console.error('Unexpected error during testing:', error);
  process.exit(1);
}); 