---
name: kmp-android-architecture
description: Clean Architecture patterns for Kotlin Multiplatform and/or Android projects.
---

# Clean Architecture

Based on the clean architecture principles for the separation of concerns, but applied to mobile apps development with Kotlin Multiplatform (specificaly with shared UI between Android & iOS with Compose Multiplatform), or also for Android apps development

## Key dependencies for KMP projects

- ViewModels
- Compose multiplatform
- Compose navigation (with safe type args since version 2.8.0 or higher) [Documentation](https://developer.android.com/jetpack/compose/navigation)
- Koin for dependency injection
- Ktor for networking (both platforms)
- Kotlin Serialization (for safe compose navigation args & network serialization)
- Room (supports KMP since version 2.7.0 and higher) with SQLite bundled [Documentation](https://developer.android.com/kotlin/multiplatform/room)
- SQLite bundled
- KSP (Kotlin Symbol Processing)

## Key dependencies for Android projects

- Compose
- Compose navigation (with safe type args since version 2.8.0 or higher)[Documentation](https://developer.android.com/jetpack/compose/navigation)
- Hilt for dependency injection
- Retrofit for networking & Moshi or Gson for serialization
- Kotlin Serialization (for safe compose navigation args)
- Room
- KSP (Kotlin Symbol Processing)

## Project structure

```
project/
├── data
│   ├── mappers
│   │   └── CartMapper
│   ├── repositories
│   │   └── cart
│   │       └── CartRepositoryImpl
│   ├── remote
│   │   ├── dtos
│   │   │   └── CartItemsResponseDTO
│   │   └── source
│   │       └── CartRemoteDataSource
│   └── local
│       ├── entities
│       │   └── CartEntity
│       └── daos
│           └── CartDao
├── domain
│   ├── use_cases
│   │   └── cart
│   │       └── AddItemToCartUseCase
│   ├── model
│   │   └── cart
│   │       ├── Cart
│   │       └── CartItem
│   └── repository
│       └── CartRepository
├── ui
│   ├── screens
│   │   └── cart
│   │       ├── CartScreen
│   │       ├── CartViewModel
│   │       └── CartUIState
│   ├── composables // Reusable UI
│   │   └── cart
│   │       └── CartItem
│   └── navigation
│       ├── Routes // sealed class
│       └── components
│           ├── MyTopAppBar
│           └── MyBottomNavbar
├── common
│   ├── network
│   │   └── apis
│   │       └── CartRemoteDataSourceApi
│   ├── utils // Utility classes
│   └── database
│       └── MyDatabase
└── di // Dependency Injection modules
```

## Layers

### Domain

Contains the use cases for business logic, models & repository abstractions.

- **Use cases**: Define one single business logic operation at a time.
- **Models**: Represent an object part of the business logic in plain kotlin.
- **Repositories**: Repositories defined as interfaces to better abstract data for the use cases.

### Data

Here are the mapper files, repository implementations, remote & also local data source interfaces (if necessary, since the local database usually doesn't need to change as much as an API could).

- **Mappers**: Here are the functions responsible for converting DTOs to models and vice versa, named after the domain model. Also models to entities and vice versa. IMPORTANT: Never convert DTOs to entitites or entities to DTOs directly.
- **Repositories**: Here are the repository implementations.
- **Remote**: Here are the DTO definitions & remote data source interfaces.
- **Local**: Here are the Room entities and Daos. Local data source abstractions might not be necessary.

### UI

Here we have the screens, reusable UI composables and navigation components.

- **Screens**: Represent a whole section of the app, like HomeScreen, ProfileScreen, etc. These must be next to their corresponding ViewModel class & UI state sealed class.
- **Composables**: Reusable UI composables.
- **Navigation**: Route sealed class for compose navigation.

### Common

Here we have the network, utils and database package.

- **Network**: Here we put the necessary abstractions & implementations for networking. Including the remote data source implementations inside an API package.
- **Utils**: Utility classes and extensions.
- **Database**: Here we put the room database abstract class. We store the database constructor here as well.

### DI (dependency injection)

Dependency injection modules go here.