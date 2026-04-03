---
name: kmp-koin-setup
description: Step by step set up for Koin dependency injection in a Kotlin Multiplatform project, with shared UI through Compose Multiplatform.
---

# Koin setup

1. In the dependency injection package (di), inside the commonMain module, create the initKoin function:

```kotlin
fun initKoin(
    config: KoinAppDeclaration? = null
) = startKoin {
    config?.invoke(this)
    modules(platformModules, sharedModules)
}
```

2. In the same file, create the expected constant for the platform specific modules using the 'expect' keyword:

```kotlin
expect val platformModules: Module
```

3. **Following the same package structure** for the project inside commonMain, now create the respective actual platform modules:

**Inside androidMain**

```kotlin
actual val platformModules = module {
  /** Platform specific modules go here. */
}
```

**Inside iosMain**

```kotlin
actual val platformModules = module {
  /** Platform specific modules go here. */
}
```

4. Now in the project package (androidMain module), create the application class, and override the onCreate function calling initKoin:

```kotlin
class MyApplication: Application(), KoinComponent {
    override fun onCreate() {
        super.onCreate()
        initKoin {
            androidLogger()
            androidContext(
                this@KMPAppV2Application
            )
        }
    }
}
```

5. Finally inside the iosMain module (IMPORTANT: NOT THE iosApp package), call the initKoin function from the configure callback (since we're implementing Compose Multiplatform), from the ComposeUIViewController:

```kotlin
fun MainViewController() = ComposeUIViewController(
    configure = {
        initKoin()
    }
) { App() }
```
