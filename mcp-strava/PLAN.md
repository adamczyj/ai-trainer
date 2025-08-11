# Strava MCP Server - Architectural Plan

## 1. **Core Architecture Overview**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   LLM Client    │◄──►│   MCP Server    │◄──►│   Strava API    │
│   (ChatGPT,     │    │   (Your App)    │    │   (OAuth2)      │
│   Claude, etc.) │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 2. **Technology Stack**
- **Language**: TypeScript/Node.js (for MCP server compatibility)
- **Framework**: Express.js or Fastify for HTTP handling
- **MCP Implementation**: Use the official MCP SDK for TypeScript
- **Strava Integration**: Strava API v3 with OAuth2 authentication
- **Data Storage**: SQLite or PostgreSQL for caching and user sessions
- **Authentication**: JWT tokens for MCP server authentication

## 3. **Core Components**

### **A. MCP Server Core**
- **Resource Provider**: Expose Strava activities as MCP resources
- **Tool Provider**: Provide tools for querying activities, stats, and user data
- **Prompt Provider**: Supply context about user's Strava profile and recent activities

### **B. Strava Integration Layer**
- **OAuth2 Handler**: Manage Strava authentication flow
- **API Client**: Wrapper for Strava API calls with rate limiting
- **Data Transformer**: Convert Strava API responses to MCP-compatible format

### **C. Data Management**
- **Activity Cache**: Store recent activities to reduce API calls
- **User Session Store**: Manage authenticated user sessions
- **Rate Limiter**: Respect Strava API rate limits

## 4. **MCP Resources & Tools**

### **Resources (Read-only data)**
- `strava/activities` - List of recent activities
- `strava/activity/{id}` - Detailed activity information
- `strava/athlete` - User profile and stats
- `strava/stats` - Weekly/monthly/yearly statistics

### **Tools (Actions)**
- `get_activities` - Query activities with filters (date, type, distance)
- `get_activity_details` - Get detailed metrics for specific activity
- `get_athlete_stats` - Retrieve user statistics
- `search_activities` - Search activities by description or location

## 5. **Data Flow**

### **Authentication Flow**:
1. User authenticates with Strava via OAuth2
2. MCP server stores refresh token securely
3. Server uses refresh token to get access tokens as needed

### **Query Flow**:
1. LLM requests Strava data via MCP
2. MCP server checks cache first
3. If cache miss, calls Strava API with stored credentials
4. Transforms data to MCP format and returns to LLM

## 6. **Security Considerations**
- **Token Storage**: Encrypt refresh tokens at rest
- **API Keys**: Store Strava client credentials securely
- **Rate Limiting**: Implement proper rate limiting to avoid API abuse
- **User Isolation**: Ensure users can only access their own data

## 7. **Configuration Management**
- **Environment Variables**: Strava API credentials, MCP server config
- **User Settings**: Default activity types, time ranges, privacy preferences
- **Cache Settings**: TTL for different data types

## 8. **Error Handling & Resilience**
- **API Failures**: Graceful degradation when Strava API is unavailable
- **Token Refresh**: Automatic token refresh on expiration
- **Rate Limit Handling**: Queue requests when approaching limits
- **Data Validation**: Validate all API responses before serving

## 9. **Deployment Architecture**
```
┌─────────────────┐
│   Reverse Proxy │ (Nginx/Traefik)
└─────────┬───────┘
          │
┌─────────▼───────┐
│   MCP Server    │ (Docker container)
│   - Strava API  │
│   - Cache       │
│   - Auth        │
└─────────────────┘
```

## 10. **Development Phases**

**Phase 1**: Basic MCP server with Strava authentication
**Phase 2**: Core activity data retrieval and caching
**Phase 3**: Advanced querying and filtering capabilities
**Phase 4**: Performance optimization and monitoring
**Phase 5**: Advanced features (webhooks, real-time updates)

## 11. **Key Benefits of This Architecture**
- **Scalable**: Can handle multiple users and high query volumes
- **Secure**: Proper OAuth2 flow and token management
- **Efficient**: Caching reduces API calls and improves response times
- **Extensible**: Easy to add new Strava data types and features
- **Standards Compliant**: Follows MCP specification for broad LLM compatibility

---

*This architecture provides a robust foundation for connecting LLMs to Strava data while maintaining security, performance, and scalability. The MCP protocol ensures compatibility with various LLM clients, and the modular design allows for easy extension and maintenance.* 