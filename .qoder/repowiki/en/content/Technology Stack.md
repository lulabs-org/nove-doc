# Technology Stack

<cite>
**Referenced Files in This Document**   
- [技术框架方案探讨.md](file://技术框架方案探讨.md)
- [NOVE项目书.md](file://NOVE项目书.md)
- [完整方案构思.md](file://完整方案构思.md)
- [实施路线图.md](file://实施路线图.md)
</cite>

## Table of Contents
1. [Frontend Technologies](#frontend-technologies)  
2. [Backend Frameworks](#backend-frameworks)  
3. [Database Systems](#database-systems)  
4. [AI Models and Intelligence Layer](#ai-models-and-intelligence-layer)  
5. [Analytics and Data Visualization](#analytics-and-data-visualization)  
6. [Infrastructure and Deployment](#infrastructure-and-deployment)  
7. [Integration and Real-Time Communication](#integration-and-real-time-communication)  
8. [Security and Compliance](#security-and-compliance)  
9. [Performance and Scalability Considerations](#performance-and-scalability-considerations)

## Frontend Technologies

The frontend stack is designed for high performance, developer efficiency, and seamless integration with AI-driven features.

### Core Framework: Next.js
- **Rationale**: Selected for its hybrid rendering capabilities (SSR and SSG), which enhance SEO for knowledge retrieval pages and improve initial load performance.
- **Version Compatibility**: Uses the latest stable version with App Router, ensuring compatibility with React 18+ features.
- **Integration Approach**: Leverages built-in API routes to simplify communication with the NestJS backend, reducing the need for external API gateways.
- **Maintainability**: Full TypeScript support enables type-safe communication between frontend and backend, minimizing runtime errors.
- **Community Support**: Backed by Vercel with extensive documentation, plugins, and a large open-source ecosystem.

### UI Design System
- **Tailwind CSS**: Utility-first CSS framework chosen for rapid UI development and consistent design language across components.
- **shadcn/ui**: Component library built on Radix UI and Tailwind, offering accessible, customizable, and production-ready UI elements.
- **Specialized Components**:
  - Meeting minutes viewer with citation highlighting
  - RAG-powered Q&A interface with source attribution
  - Kanban-style action item board
  - Low-code agent configuration panel

### State Management and Real-Time Interaction
- **Zustand**: Lightweight state management solution ideal for medium-scale applications, avoiding boilerplate associated with Redux.
- **Real-Time Communication**:
  - **WebSocket**: Enables bidirectional communication for live session updates and teacher-student interaction.
  - **Server-Sent Events (SSE)**: Used for streaming AI responses from LLMs to provide real-time feedback during query processing.
- **Caching Strategy**: React Query manages server state with intelligent caching, background refetching, and automatic garbage collection.

**Section sources**
- [技术框架方案探讨.md](file://技术框架方案探讨.md#L1-L50)
- [NOVE项目书.md](file://NOVE项目书.md#L200-L250)

## Backend Frameworks

The backend architecture prioritizes modularity, type safety, and seamless integration with AI services.

### Primary Framework: NestJS
- **Rationale**: Chosen for its modular architecture, dependency injection system, and native TypeScript support, making it ideal for complex business logic in educational AI systems.
- **Version Compatibility**: Aligned with Node.js LTS versions and compatible with Prisma ORM for database operations.
- **Integration Approach**: Utilizes decorators and guards for role-based access control (RBAC/ABAC), integrates Swagger for automatic API documentation generation.
- **Maintainability**: Clear separation of concerns through modules, controllers, and services enhances testability and long-term code health.
- **Community Support**: Enterprise-grade framework with strong community backing, regular updates, and extensive third-party module ecosystem.

### Alternative Option: FastAPI (Python)
- **Rationale**: Considered for AI-heavy workloads due to Python’s dominance in machine learning libraries (e.g., PyTorch, Hugging Face).
- **Use Case**: Recommended when deep algorithmic research or frequent model tuning is required.
- **Trade-offs**: While offering superior AI/ML tooling, it introduces full-stack language fragmentation and weaker type safety compared to TypeScript.

**Section sources**
- [技术框架方案探讨.md](file://技术框架方案探讨.md#L51-L100)
- [NOVE项目书.md](file://NOVE项目书.md#L251-L300)

## Database Systems

A multi-database strategy ensures optimal performance for structured, vector, and cached data.

### Primary Database: PostgreSQL with Prisma ORM
- **Rationale**: Chosen for ACID compliance, robust relational modeling, and support for complex queries involving user roles, permissions, and hierarchical data.
- **Schema Design**: Supports fine-grained access control with row-level security policies.
- **ORM Integration**: Prisma provides type-safe database access and migration management, streamlining development workflows.
- **Performance**: Optimized for transactional integrity in user management, meeting records, and task tracking.

### Vector Databases
- **Pinecone (Initial Phase)**:
  - **Rationale**: Fully managed service enabling rapid prototyping and deployment of semantic search capabilities.
  - **Use Case**: Ideal for early-stage RAG system validation with minimal DevOps overhead.
- **Weaviate (Long-Term Evolution)**:
  - **Rationale**: Open-source, hybrid search engine combining keyword and vector search for improved retrieval accuracy.
  - **Advantage**: Offers greater control over deployment, scalability, and customization.
- **Milvus**:
  - **Rationale**: High-performance vector database suitable for large-scale deployments requiring distributed indexing and real-time search.
  - **Use Case**: Targeted for enterprise-level applications with massive knowledge bases.

### Caching Layer: Redis
- **Role**: Stores session states, frequently accessed query results, and powers asynchronous task queues.
- **Implementation**: Integrated with BullMQ for managing background jobs such as meeting transcription and index rebuilding.
- **Scalability**: Supports horizontal scaling and persistence options for production reliability.

**Section sources**
- [技术框架方案探讨.md](file://技术框架方案探讨.md#L101-L150)
- [NOVE项目书.md](file://NOVE项目书.md#L301-L350)

## AI Models and Intelligence Layer

A multi-model strategy enables task-specific optimization across cost, latency, and capability.

### Model Selection Strategy
- **GPT-4**:
  - **Use Case**: Complex reasoning, report generation, and high-quality meeting summarization.
  - **Rationale**: Superior performance in multi-step inference and natural language understanding.
- **Claude**:
  - **Use Case**: Long-context document analysis and detailed content extraction.
  - **Rationale**: Supports extended context windows (up to 200K tokens), ideal for processing full meeting transcripts.
- **DeepSeek**:
  - **Use Case**: Cost-sensitive scenarios and on-premise deployment requirements.
  - **Rationale**: Offers competitive performance with lower API costs and potential for local hosting.
- **LLaMA-3**:
  - **Use Case**: Customizable base model for domain-specific fine-tuning.
  - **Rationale**: Open-weight model allows full control over training data, privacy, and deployment.

### RAG System Architecture
- **Embedding Model**: text-embedding-ada-002 for consistent vector representations.
- **Retrieval Process**: Combines semantic similarity with keyword matching and temporal filtering.
- **Context Enrichment**: Integrates user role-based permission filtering to ensure data visibility compliance.
- **Response Generation**: Orchestrates multiple LLMs based on query complexity and cost constraints.

**Section sources**
- [技术框架方案探讨.md](file://技术框架方案探讨.md#L151-L200)
- [NOVE项目书.md](file://NOVE项目书.md#L351-L400)

## Analytics and Data Visualization

Comprehensive analytics empower data-driven decision-making and system optimization.

### Data Warehouse: ClickHouse
- **Rationale**: Columnar database optimized for fast analytical queries over large datasets.
- **Use Case**: Aggregating user behavior logs, AI performance metrics, and operational KPIs.
- **Performance**: Handles high-cardinality data efficiently, supporting real-time dashboards.

### Visualization Tools
- **Metabase**:
  - **Rationale**: Open-source BI tool with intuitive interface for non-technical stakeholders.
  - **Integration**: Connects directly to PostgreSQL and ClickHouse for live reporting.
- **Apache Superset**:
  - **Rationale**: Enterprise-grade platform for advanced visualizations and dashboard sharing.
  - **Flexibility**: Supports custom plugins and deep integration with existing data infrastructure.

**Section sources**
- [完整方案构思.md](file://完整方案构思.md#L150-L180)
- [NOVE项目书.md](file://NOVE项目书.md#L401-L420)

## Infrastructure and Deployment

Modern DevOps practices ensure scalability, resilience, and maintainability.

### Containerization: Docker
- **Rationale**: Enables consistent environments across development, testing, and production.
- **Usage**: Packages application services, databases, and AI models into portable units.

### Orchestration: Kubernetes
- **Rationale**: Provides automated scaling, self-healing, and rolling updates for microservices.
- **Future-Proofing**: Essential for transitioning from monolithic to microservice architecture as user base grows.
- **Deployment Strategy**: Supports blue-green deployments and canary releases for zero-downtime updates.

**Section sources**
- [完整方案构思.md](file://完整方案构思.md#L200-L214)
- [实施路线图.md](file://实施路线图.md#L25-L30)

## Integration and Real-Time Communication

Seamless integration with external platforms enhances functionality and user experience.

### FlyBook Integration
- **Authentication**: OAuth 2.0 for secure enterprise authorization.
- **Event Subscription**: Webhooks monitor meeting start/end events and document changes.
- **API Usage**: Retrieves meeting transcripts, participant lists, and calendar data.

### Asynchronous Task Processing
- **Message Queue**: Redis-powered BullMQ handles long-running tasks like audio transcription and index updates.
- **Error Handling**: Implements retry mechanisms and dead-letter queues for fault tolerance.

**Section sources**
- [技术框架方案探讨.md](file://技术框架方案探讨.md#L201-L250)
- [NOVE项目书.md](file://NOVE项目书.md#L421-L450)

## Security and Compliance

Robust security measures protect sensitive educational data and ensure regulatory compliance.

### Access Control Models
- **RBAC (Role-Based Access Control)**:
  - Roles: System Admin, Department Admin, Regular User
  - Hierarchical role inheritance simplifies permission management.
- **ABAC (Attribute-Based Access Control)**:
  - Dynamic policies based on department, project, and time windows.
  - Enables fine-grained data isolation at row and column levels.

### Data Protection
- **Encryption**: TLS 1.3 for transit, AES-256 for storage.
- **Key Management**: HashiCorp Vault for secure secret storage and rotation.
- **Data Masking**: Automatic PII detection and redaction in logs and outputs.

### Audit and Monitoring
- **Full-Chain Logging**: Tracks all user actions with timestamps and IP addresses.
- **Watermarking**: Embeds traceable identifiers in generated content.
- **Compliance**: Aligns with GDPR, FERPA, and other data protection regulations.

**Section sources**
- [技术框架方案探讨.md](file://技术框架方案探讨.md#L251-L273)
- [NOVE项目书.md](file://NOVE项目书.md#L451-L500)

## Performance and Scalability Considerations

Architectural decisions prioritize responsiveness, availability, and growth readiness.

### Performance Targets
| Metric | Target | Monitoring Method |
|-------|--------|-------------------|
| **Query Response Time** | Avg < 2s, 99th < 5s | APM + UX telemetry |
| **System Availability** | ≥ 99.5% | Health checks + auto-recovery |
| **Concurrency** | 1000+ users, QPS > 500 | Load testing + elastic scaling |

### Caching Strategy
- **Multi-Layer Cache**:
  - Browser: Static assets
  - CDN: Global content delivery
  - Redis: Hot data (permissions, sessions)
  - PostgreSQL: Query result caching
- **Cache Invalidation**: Version-based invalidation ensures consistency across layers.

### Scalability Design
- **Horizontal Scaling**: Stateless services allow easy replication under load balancers.
- **Database Sharding**: Future-proofing via department- or time-based partitioning.
- **Cold-Warm-Hot Data Separation**: Tiered storage optimizes cost and performance.

**Section sources**
- [技术框架方案探讨.md](file://技术框架方案探讨.md#L274-L300)
- [NOVE项目书.md](file://NOVE项目书.md#L501-L550)