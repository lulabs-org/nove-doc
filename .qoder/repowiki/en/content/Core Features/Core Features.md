# Core Features

<cite>
**Referenced Files in This Document**   
- [NOVE项目书.md](file://NOVE项目书.md)
- [完整方案构思.md](file://完整方案构思.md)
- [实施路线图.md](file://实施路线图.md)
- [技术框架方案探讨.md](file://技术框架方案探讨.md)
- [项目介绍.md](file://项目介绍.md)
- [项目名称.md](file://项目名称.md)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [AI-Powered Q&A with RAG](#ai-powered-qa-with-rag)
3. [Meeting Intelligence](#meeting-intelligence)
4. [Personalized Learning Paths](#personalized-learning-paths)
5. [Intelligent Agent Orchestration](#intelligent-agent-orchestration)
6. [Automated Reporting](#automated-reporting)
7. [Semantic Search and Permission-Aware Retrieval](#semantic-search-and-permission-aware-retrieval)
8. [Low-Code Agent Configuration](#low-code-agent-configuration)
9. [User Workflows and Interaction Patterns](#user-workflows-and-interaction-patterns)
10. [Technical Implementation Overview](#technical-implementation-overview)

## Introduction

The NOVE platform is designed as an enterprise-grade intelligent education system that integrates AI capabilities with organizational knowledge to deliver personalized, efficient, and secure educational services. Inspired by the concept of "tài zǐ xǐ mǎ" (tutor to the crown prince), NOVE aims to provide each learner with elite-level, tailored educational support through a combination of human expertise and AI augmentation.

Targeted at educational institutions, vocational training organizations, and corporate training departments, NOVE leverages Retrieval-Augmented Generation (RAG), meeting intelligence, personalized learning, intelligent agent orchestration, and automated reporting to transform how knowledge is accessed, processed, and applied. The system emphasizes real-world usability, data security, and iterative development, ensuring rapid deployment of minimum viable products (MVP) while maintaining scalability for future expansion.

This document details the core features of NOVE, focusing on domain models, user workflows, technical implementation, and practical usage scenarios for teachers, students, and administrators.

**Section sources**
- [项目介绍.md](file://项目介绍.md#L1-L40)
- [项目名称.md](file://项目名称.md#L1-L46)

## AI-Powered Q&A with RAG

The AI-powered Q&A system is the central knowledge access point of NOVE, enabling users to retrieve accurate, context-aware answers from a vast repository of structured and unstructured data. Built on Retrieval-Augmented Generation (RAG), this feature combines semantic search with large language model (LLM) reasoning to deliver reliable, citable responses.

### Domain Model
The RAG system operates across four layers:
- **Query Understanding**: User questions are analyzed for intent and key entities using LLMs.
- **Semantic Retrieval**: Queries are vectorized and matched against embeddings in a vector database (Pinecone → Weaviate/Milvus).
- **Permission-Aware Filtering**: Retrieved results are filtered based on user roles and data access policies (RBAC/ABAC).
- **Response Generation**: Contextual information is fed into LLMs (GPT-4, Claude, DeepSeek) to generate natural language answers with source citations.

### User Workflows
- **Teachers**: Retrieve course materials, SOPs, or case studies by asking natural language questions (e.g., "Show me the 2023 curriculum changes").
- **Students**: Ask conceptual questions (e.g., "Explain the flipped classroom model used in our program") and receive answers with linked references.
- **Administrators**: Audit knowledge coverage and query effectiveness through built-in analytics.

### Technical Implementation
The RAG pipeline is implemented using:
- **Embedding Models**: text-embedding-ada-002 for consistent vectorization.
- **Vector Database**: Pinecone for initial deployment, transitioning to Weaviate for hybrid (keyword + vector) search.
- **LLM Orchestration**: Multi-model routing based on task complexity (GPT-4 for synthesis, Claude for long documents).
- **Citation & Traceability**: Every answer includes hyperlinks to source documents, enabling fact-checking and deeper exploration.

**Section sources**
- [NOVE项目书.md](file://NOVE项目书.md#L100-L150)
- [技术框架方案探讨.md](file://技术框架方案探讨.md#L100-L150)

## Meeting Intelligence

NOVE’s meeting intelligence system automates the capture, processing, and utilization of meeting data from platforms like Feishu, transforming passive recordings into actionable knowledge.

### Domain Model
The system processes meetings through a structured pipeline:
1. **Data Ingestion**: Feishu meetings are captured via OAuth 2.0 and Webhook subscriptions upon completion.
2. **ASR & Transcription**: Audio is converted to text using third-party or on-premise ASR.
3. **Intelligent Summarization**: LLMs generate concise summaries, extract key decisions, and identify discussion themes.
4. **Action Item Extraction**: Tasks, owners, and deadlines are automatically detected and structured.
5. **Knowledge Integration**: Summaries and action items are stored in PostgreSQL and indexed in the vector database for retrieval.

### User Workflows
- **Teachers/Staff**: After a meeting, they receive an AI-generated summary with action items automatically assigned and tracked in a Kanban-style dashboard.
- **Students**: Access public meeting summaries (e.g., lecture recordings) with searchable transcripts and key point highlights.
- **Administrators**: Monitor action item completion rates and meeting effectiveness metrics via operational dashboards.

### Technical Implementation
- **Event-Driven Architecture**: Webhooks trigger asynchronous processing via Redis/BullMQ queues.
- **LLM Processing**: Claude is preferred for long-form summarization due to its 100K+ context window.
- **Data Linking**: Action items are linked to users and projects in the relational database, enabling cross-meeting analysis.
- **Closed-Loop Tracking**: Task status updates are synchronized with Feishu To-Do lists, ensuring accountability.

**Section sources**
- [NOVE项目书.md](file://NOVE项目书.md#L60-L100)
- [技术框架方案探讨.md](file://技术框架方案探讨.md#L200-L250)

## Personalized Learning Paths

NOVE enables "one student, one plan" education by dynamically generating and adapting learning paths based on individual progress, preferences, and performance.

### Domain Model
Learning paths are composed of:
- **Learning Objects**: Modular content units (videos, readings, quizzes) tagged with metadata (difficulty, topic, duration).
- **Progress Tracking**: Real-time monitoring of completion, quiz scores, and engagement metrics.
- **Adaptive Engine**: Recommends next steps using collaborative filtering and knowledge gap analysis.
- **AI Tutoring**: Simulates teaching scenarios (e.g., mock Q&A) for skill practice.

### User Workflows
- **Students**: Receive a 30-day onboarding plan upon joining, with weekly updates based on performance. Can request adjustments (e.g., "I need more practice on presentation skills").
- **Teachers**: View student progress dashboards, identify struggling learners, and intervene with personalized guidance.
- **Administrators**: Analyze cohort-level learning trends and optimize curriculum design.

### Technical Implementation
- **Recommendation Algorithm**: Hybrid model combining content-based filtering (document embeddings) and behavioral analysis (user interaction logs).
- **Learning Analytics**: Stored in PostgreSQL with time-series extensions for trend analysis.
- **AI Simulation**: Uses fine-tuned LLMs to generate realistic student-teacher dialogues for practice.
- **Integration**: Syncs with LMS systems to import/export grades and attendance.

**Section sources**
- [项目介绍.md](file://项目介绍.md#L20-L30)
- [完整方案构思.md](file://完整方案构思.md#L100-L120)

## Intelligent Agent Orchestration

NOVE allows organizations to create department-specific AI agents (e.g., Teaching Assistant, Admin Assistant) through low-code configuration, encapsulating domain knowledge and workflows.

### Domain Model
Agents are defined by:
- **Data Scope**: Bound to specific data sources (e.g., "only教研会议 + 课程PPT").
- **Functional Modules**: Composable capabilities (Q&A, report generation, task reminders).
- **Behavior Parameters**: Response style, formality, and output format.
- **Access Control**: Role-based visibility and operation permissions.

### User Workflows
- **Administrators**: Use a visual interface to create a "Teaching Assistant" agent by selecting data sources and enabling Q&A and lesson planning modules.
- **Teachers**: Interact with their department’s agent to generate lesson plans or answer pedagogical questions.
- **Students**: Consult a "Learning Assistant" for study advice or resource recommendations.

### Technical Implementation
- **Low-Code Engine**: Drag-and-drop interface for data source binding and module selection.
- **Dynamic Routing**: Incoming queries are classified (intent detection) and routed to appropriate agent pipelines.
- **API Exposure**: Agents can be deployed as Web widgets, Feishu bots, or REST APIs for third-party integration.
- **Versioning**: Agent configurations are version-controlled, allowing rollback and A/B testing.

**Section sources**
- [完整方案构思.md](file://完整方案构思.md#L50-L100)
- [技术框架方案探讨.md](file://技术框架方案探讨.md#L150-L200)

## Automated Reporting

NOVE automates the generation of operational and analytical reports, reducing manual effort and improving decision-making speed.

### Domain Model
Reports are generated from:
- **Daily Digests**: Aggregated summaries of meetings, document updates, and task progress.
- **Performance Metrics**: Team/individual KPIs (e.g., action item completion rate).
- **Learning Analytics**: Student progress, knowledge mastery, and engagement trends.
- **Custom Reports**: User-defined queries with templated outputs.

### User Workflows
- **Managers**: Receive daily email digests with key updates and pending tasks.
- **Administrators**: Generate monthly performance reports with visualizations for leadership review.
- **Teachers**: Access student progress reports to inform teaching adjustments.

### Technical Implementation
- **Template Engine**: Jinja-like templates populated with data from PostgreSQL and vector queries.
- **Scheduling**: Cron-based triggers for daily/weekly reports.
- **Visualization**: Integrated with Metabase/Superset for interactive dashboards.
- **Distribution**: Reports delivered via email, Feishu messages, or exported as PDF/Excel.

**Section sources**
- [完整方案构思.md](file://完整方案构思.md#L70-L80)
- [NOVE项目书.md](file://NOVE项目书.md#L200-L220)

## Semantic Search and Permission-Aware Retrieval

NOVE’s search system goes beyond keyword matching, enabling context-aware, secure access to organizational knowledge.

### Domain Model
- **Semantic Indexing**: Documents are chunked, embedded, and stored in a vector database.
- **Hybrid Search**: Combines vector similarity with keyword and metadata filtering (e.g., date, author, department).
- **Permission Layer**: Queries are augmented with user role context to filter results at retrieval time.
- **Citation & Provenance**: Every retrieved snippet includes source attribution and access control metadata.

### User Workflows
- **Teachers**: Search for "all decisions about user retention from 2023 meetings" and receive only results they are authorized to view.
- **Students**: Find relevant study materials with natural language queries, with results filtered by course enrollment.
- **Auditors**: Trace information lineage and verify data access compliance.

### Technical Implementation
- **Embedding Pipeline**: Uses LLMs to create intelligent document chunks (not just fixed-size splits).
- **Weaviate Hybrid Search**: Leverages bm25 + vector search for higher precision.
- **Prisma ORM**: Enforces row-level security in PostgreSQL based on user roles.
- **Audit Logging**: All search queries and results are logged for compliance.

**Section sources**
- [技术框架方案探讨.md](file://技术框架方案探讨.md#L120-L150)
- [NOVE项目书.md](file://NOVE项目书.md#L130-L150)

## Low-Code Agent Configuration

To empower non-technical users, NOVE provides a visual interface for creating and managing AI agents without coding.

### Domain Model
The configuration interface includes:
- **Data Source Selector**: Checkbox-based selection of knowledge bases (e.g., "Feishu Docs", "Course Library").
- **Capability Palette**: Drag-and-drop functional modules (Q&A, Summarization, Task Extraction).
- **Parameter Panel**: Sliders and dropdowns to adjust model temperature, response length, etc.
- **Preview & Test**: Real-time chat interface to test the agent before deployment.

### User Workflows
- **Department Heads**: Create a "Sales Assistant" by selecting CRM data and enabling "client follow-up" and "report generation" modules.
- **IT Admins**: Review and approve agent configurations before publication.
- **End Users**: Provide feedback on agent performance, triggering configuration refinements.

### Technical Implementation
- **Configuration Store**: Agent definitions saved as JSON in PostgreSQL.
- **Runtime Engine**: Loads configurations and instantiates processing pipelines using dependency injection (NestJS).
- **Validation Layer**: Ensures data access policies are respected during configuration.
- **Deployment**: Agents are deployed as microservices or serverless functions (future).

**Section sources**
- [完整方案构思.md](file://完整方案构思.md#L60-L70)
- [技术框架方案探讨.md](file://技术框架方案探讨.md#L180-L200)

## User Workflows and Interaction Patterns

NOVE supports distinct workflows for different user roles, emphasizing seamless human-AI collaboration.

### Teacher Workflow
1. **Retrieve Materials**: Ask the RAG system, "Find the latest teaching SOP for project-based learning."
2. **Prepare Class**: Use the Teaching Assistant agent to generate a lesson plan from recent meeting notes.
3. **Conduct Meeting**: Hold a Feishu meeting; NOVE auto-generates summary and action items.
4. **Follow Up**: Check the action item dashboard and update task statuses.

### Student Workflow
1. **Ask Questions**: Query, "What are the key takeaways from last week’s lecture on innovation?"
2. **Receive Learning Plan**: Get a personalized weekly study schedule with recommended resources.
3. **Practice Skills**: Engage in AI-simulated Q&A sessions for oral exam preparation.
4. **Track Progress**: View a dashboard showing mastered topics and upcoming milestones.

### Administrator Workflow
1. **Configure Agent**: Use the low-code interface to create a new "HR Assistant" for onboarding.
2. **Monitor System**: Review operational dashboards for usage, performance, and security.
3. **Audit Access**: Generate compliance reports showing data access patterns.
4. **Optimize**: Adjust knowledge base indexing based on search effectiveness metrics.

**Section sources**
- [NOVE项目书.md](file://NOVE项目书.md#L30-L60)
- [完整方案构思.md](file://完整方案构思.md#L90-L120)

## Technical Implementation Overview

NOVE is built on a modular, full-stack TypeScript architecture designed for rapid iteration and enterprise scalability.

### Frontend
- **Framework**: Next.js for SSR and API routes.
- **UI**: Tailwind CSS + shadcn/ui for responsive, accessible interfaces.
- **State**: Zustand for lightweight state management.
- **Real-Time**: WebSocket and Server-Sent Events for live updates.

### Backend
- **Framework**: NestJS for modular, type-safe services.
- **Database**: PostgreSQL (Prisma ORM) for relational data; Pinecone/Weaviate for vectors.
- **Caching**: Redis for session and query results.
- **Async Processing**: BullMQ for meeting transcription and indexing jobs.

### AI & Data
- **Models**: Multi-LLM strategy (GPT-4, Claude, DeepSeek) with task-based routing.
- **RAG**: Hybrid retrieval with permission filtering and citation tracking.
- **Knowledge Graph**: Neo4j for entity-relationship analysis (future).
- **Security**: RBAC/ABAC, data encryption, audit logging, and PII redaction.

### Deployment
- **Containerization**: Docker for consistent environments.
- **Orchestration**: Kubernetes for scalability (future).
- **Monitoring**: APM, error tracking, and business metrics dashboards.

This architecture supports the 12-week MVP roadmap, with clear evolution paths for microservices and advanced AI capabilities.

**Section sources**
- [技术框架方案探讨.md](file://技术框架方案探讨.md#L1-L300)
- [实施路线图.md](file://实施路线图.md#L1-L34)
- [NOVE项目书.md](file://NOVE项目书.md#L250-L300)