import SwiftUI
import ComposeApp

@main
struct iOSApp: App {
    init() {
        MainViewControllerKt.doInitKoin()

        // Failing implementation for Koin initialization
        //KoinInitializerKt.initKoin(
          //  platformSpecificModules: [PlatformModuleKt.platformModule]
        //)
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}