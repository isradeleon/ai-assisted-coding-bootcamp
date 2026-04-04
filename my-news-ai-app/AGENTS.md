# About this app

This is a News app built with Kotlin Multiplatform.
It targets both mobile platforms, iOS and Android.
The UI is shared with Compose Multiplatform.
This app will be offline-first.

## Root Package
* All app code is organized under the root package: `com.isradeleon.mynewsapp`

## Architecture
* The project follows Clean Architecture principles, with the following main packages:
  * `data` (with subpackages: repository, local, remote, model)
  * `domain` (with subpackages: model, repository, usecase)
  * `presentation` (with subpackages: screen, viewmodel, component)
  * `di` (dependency injection)
  * `common` (shared utilities)
* All these packages are under `com.isradeleon.mynewsapp`.

## Rules
* Don't be too verbose, keep it concise and simple.
* Don't build the app unless instructed to.
* Don't modify, add or remove any of the dependencies unless instructed to.